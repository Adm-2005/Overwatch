# external imports
from bson import ObjectId
from datetime import datetime
from pymongo import DESCENDING
from flask import request, current_app, jsonify, abort
from flask_jwt_extended import get_jwt_identity, jwt_required

# internal imports
from api import mongo
from api.discord import disc_bp
from api.user.models import User
from api.discord.bot import DiscordBot
from api.discord.models import DiscordServer
from api.utils.pagination import pagination_links
from api.db.pydantic_objectid import PydanticObjectId

@disc_bp.route('/connection', methods=['POST'])
def connect_to_discord_server():
    discord_servers = mongo.db.discord_servers

    try:
        data = request.get_json()
        server_id = data.get('server_id')
        name = data.get('name')
        owner_id = data.get('owner_id')  

        if not server_id or not name or not owner_id:
            abort(400, 'Missing required fields.')

        existing_server = discord_servers.find_one({'server_id': server_id})
        if existing_server:
            abort(400, 'Server already connected.')

        discord_server = DiscordServer({
            'server_id': server_id,
            'name': name,
            'owner_id': owner_id,
            'active': True,
            'channels_monitored': []
        })
        inserted_id = str(discord_servers.insert_one(discord_server.to_bson()).inserted_id)
        discord_server.id = PydanticObjectId(inserted_id)

        bot = DiscordBot(server_id)
        bot.run(current_app.config['DISCORD_TOKEN'])  

        return jsonify({
            'message': 'Server connected successfully.', 
            'server': discord_server.to_json(), 
            'invite_url': current_app.config.get('DISCORD_BOT_URL')
        }), 201

    except Exception as e:
        current_app.logger.error('Error while connecting to Discord server: %s', e)
        raise e

@disc_bp.route('/servers', methods=['POST'])
@jwt_required()
def get_all_servers_for_user():
    users = mongo.db.users
    discord_servers = mongo.db.discord_servers

    try:
        current_user_id = get_jwt_identity()

        res = users.find_one({'_id': ObjectId(current_user_id)})
        if not res:
            abort(404, 'User not found.')
        
        page = max(int(request.args.get('page')), 1)
        per_page = max(min(int(request.args.get('per_page')), 100), 1)

        query = {'user_id': ObjectId(current_user_id)}
        cursor = discord_servers.find(query)\
            .sort('created_at', DESCENDING).skip(per_page * (page - 1)).limit(per_page)
        server_count = discord_servers.count_documents(query)

        links = pagination_links('.get_all_servers_for_user', server_count, page, per_page)

        return jsonify({
            'message': 'Servers fetched successfully.',
            'data': {
                'servers': [DiscordServer(**doc).to_json() for doc in cursor],
                'links': links
            }
        }), 200

    except Exception as e:
        current_app.logger.error('Error while fetching connected servers: %s', e)
        raise e