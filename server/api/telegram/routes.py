# external imports
from bson import ObjectId
from datetime import datetime
from pymongo import DESCENDING
from flask import request, current_app, jsonify, abort
from flask_jwt_extended import get_jwt_identity, jwt_required

# internal imports
from api import mongo
from api.telegram import tele_bp
from api.user.models import User
from api.telegram.bot import TelegramBot
from api.telegram.models import TelegramGroup
from api.utils.pagination import pagination_links
from api.db.pydantic_objectid import PydanticObjectId

@tele_bp.route('/connection', methods=['POST'])
def connect_to_telegram_group():
    telegram_groups = mongo.db.telegram_groups

    try:
        data = request.get_json()
        group_id = data.get('group_id')
        bot_token = data.get('bot_token')
        name = data.get('name')
        owner_id = data.get('owner_id')  

        if not group_id or not bot_token or not name or not owner_id:
            abort(400, 'Missing required fields.')

        existing_group = telegram_groups.find_one({'group_id': group_id})
        if existing_group:
            abort(400, 'Group already connected.')

        telegram_group = TelegramGroup({
            'group_id': group_id,
            'bot_token': bot_token,
            'name': name,
            'owner_id': owner_id,
            'active': True,
            'channels_monitored': []
        })
        inserted_id = str(telegram_groups.insert_one(telegram_group.to_bson()).inserted_id)
        telegram_group.id = PydanticObjectId(inserted_id)

        bot = TelegramBot(bot_token)
        bot.run()

        return jsonify({
            'message': 'Group connected successfully.', 
            'group': telegram_group.to_json()
        }), 201

    except Exception as e:
        current_app.logger.error('Error while connecting to Telegram group: %s', e)
        raise e

@tele_bp.route('/groups', methods=['POST'])
@jwt_required()
def get_all_groups_for_user():
    users = mongo.db.users
    telegram_groups = mongo.db.telegram_groups

    try:
        current_user_id = get_jwt_identity()

        res = users.find_one({'_id': ObjectId(current_user_id)})
        if not res:
            abort(404, 'User not found.')
        
        page = max(int(request.args.get('page', 1)), 1)
        per_page = max(min(int(request.args.get('per_page', 10)), 100), 1)

        query = {'owner_id': ObjectId(current_user_id)}
        cursor = telegram_groups.find(query)\
            .sort('created_at', DESCENDING).skip(per_page * (page - 1)).limit(per_page)
        group_count = telegram_groups.count_documents(query)

        links = pagination_links('.get_all_groups_for_user', group_count, page, per_page)

        return jsonify({
            'message': 'Groups fetched successfully.',
            'data': {
                'groups': [TelegramGroup(**doc).to_json() for doc in cursor],
                'links': links
            }
        }), 200

    except Exception as e:
        current_app.logger.error('Error while fetching connected groups: %s', e)
        raise e
