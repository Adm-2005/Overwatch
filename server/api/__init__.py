# external imports
from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from logging.config import dictConfig
from flask_jwt_extended import JWTManager

# internal imports
from config import Config
from errors import register_error_handlers

mongo = PyMongo()
jwt = JWTManager()

def create_app(config_object: Config) -> Flask:
    dictConfig(config_object.LOGGING_INFO)

    app = Flask(__name__)
    app.config.from_object(config_object)
    CORS(
        app,
        origins=[app.config.get('CLIENT_URL')],
        allow_headers=['Authorization', 'Content-Type'],
        supports_credentials=True
    )

    mongo.init_app(app)
    jwt.init_app(app)

    register_error_handlers(app)

    # importing blueprints inside the factory function
    # to avoid circular imports
    from user import user_bp

    app.register_blueprint(user_bp, url_prefix='/user')

    return app