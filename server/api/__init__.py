# external imports
from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from logging.config import dictConfig
from flask_jwt_extended import JWTManager

# internal imports
from api.config import Config
from api.errors import register_error_handlers

mongo = PyMongo()
jwt = JWTManager()

def create_app(config_object: Config) -> Flask:
    dictConfig(config_object.LOGGING_CONFIG)

    app = Flask(__name__)
    app.config.from_object(config_object)
    CORS(
        app,
        origins=[app.config.get('CLIENT_URL'), app.config.get('API_URL')],
        allow_headers=['Authorization', 'Content-Type'],
        supports_credentials=True
    )

    mongo.init_app(app)
    jwt.init_app(app)

    register_error_handlers(app)

    # importing blueprints inside the factory function
    # to avoid circular imports
    from api.user import user_bp
    from api.discord import disc_bp
    from api.telegram import tele_bp
    from api.moderation import mod_bp

    app.register_blueprint(user_bp, url_prefix='/user')
    app.register_blueprint(disc_bp, url_prefix='/discord')
    app.register_blueprint(tele_bp, url_prefix='/telegram')
    app.register_blueprint(mod_bp, url_prefix='/moderation')

    # starting bots for all active and connected platform groups 
    from api.discord.utils import start_discord_bot
    from api.telegram.utils import start_telegram_bot

    active_discord_servers = mongo.db.discord_servers.find({ 'active': True })
    active_telegram_groups = mongo.db.telegram_groups.find({ 'active': True })

    for server in active_discord_servers:
        start_discord_bot(server["server_id"])

    for group in active_telegram_groups:
        start_telegram_bot(group["group_id"], group["bot_token"])

    return app