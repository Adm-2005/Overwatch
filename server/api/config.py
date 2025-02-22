import os
from dotenv import load_dotenv

base_dir = os.path.join(os.path.dirname(__file__), '..')
load_dotenv(os.path.join(base_dir, '.env'))

class Config:
    TESTING = os.getenv('TESTING').lower() in ['true', 'yes', 'ok']
    CLIENT_URL = os.getenv('CLIENT_URL')
    MONGODB_URI = os.getenv('MONGODB_URI')
    JWT_SECRET = os.getenv('JWT_SECRET')
    SECRET_KEY = os.getenv('SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES', 18000))
    JWT_REFRESH_TOKEN_EXPIRES = int(os.getenv('JWT_REFRESH_TOKEN_EXPIRES', 86400))
    LOGGING_CONFIG = {
        'version': 1,
        'formatters': {'default': {
            'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
        }},
        'handlers': {'wsgi': {
            'class': 'logging.StreamHandler',
            'stream': 'ext://flask.logging.wsgi_errors_stream',
            'formatter': 'default'
        }},
        'root': {
            'level': 'INFO',
            'handlers': ['wsgi']
        }
    }