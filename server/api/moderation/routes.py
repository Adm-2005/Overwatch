# external imports
from flask import request, current_app, jsonify, abort

# internal imports
from api.moderation import mod_bp
from api.moderation.models import Message

@mod_bp.route('/analyse', methods=['POST'])
def analyse_messages():
    try:
        data = request.get_json()
        message = Message(**data)

    except Exception as e:
        current_app.logger.error('Error while analysing message: %s', e)
        raise e
    
@mod_bp.route('/actions', methods=['POST'])
def take_actions():
    try:
        pass

    except Exception as e:
        current_app.logger.error('Error while taking action: %s', e)
        raise e
    
@mod_bp.route('/flagged', methods=['GET'])
def get_flagged_messages():
    try:
        pass

    except Exception as e:
        current_app.logger.error('Error while fetching flagged messages: %s', e)
        raise e
    