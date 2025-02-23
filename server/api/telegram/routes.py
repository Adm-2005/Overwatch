# external imports
from flask import request, current_app, abort

# internal imports
from api.telegram import tele_bp
from api.telegram.bot import TelegramBot

@tele_bp.route('/connection', methods=['POST'])
def connect_to_telegram_group():
    try:
        pass

    except Exception as e:
        current_app.logger.error('Error while connecting to telegram: %s', e)
        raise e