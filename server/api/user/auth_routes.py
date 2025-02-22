# external imports
import pytz
import datetime as dt
from typing import Dict, Any
from flask import request, current_app, jsonify, abort
from flask_jwt_extended import create_access_token, create_refresh_token

# internal imports
from api import mongo
from api.user import auth_bp
from db.user_models import User
from db.pydantic_objectid import PydanticObjectId

@auth_bp.route('/register', methods=['POST'])
def register() -> Dict[str, Any]:
    users = mongo.db.users

    try:
        data = request.get_json()

        if not data:
            abort(400, 'Missing required fields.') 
        
        user = User()
        user_id = str(users.insert_one(user.to_bson()).inserted_id)
        user.id = PydanticObjectId(user_id)

        return jsonify({
            'message': 'Registration successful',
            'data': {
                'user': user.to_json(),
                'access_token': create_access_token(
                    identity=user_id, 
                    expires_delta=dt.timedelta(seconds=current_app.config.JWT_ACCESS_TOKEN_EXPIRES)
                ),
                'refresh_token': create_refresh_token(
                    identity=user_id,
                    expires_delta=dt.timedelta(seconds=current_app.config.JWT_REFRESH_TOKEN_EXPIRES)
                )
            },
        }), 201

    except Exception as e:
        current_app.logger.error('Error while registration: %s', e)
        raise e
    
@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        req_fields = ['']

        if not data or not all(field in data for field in req_fields):
            abort(400, 'Missing required fields.')

            
    except Exception as e:
        current_app.logger.error('Error while login: %s', e)
        raise e