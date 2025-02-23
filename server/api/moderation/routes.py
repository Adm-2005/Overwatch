# external imports
from flask import request, current_app, jsonify, abort

# internal imports
from api import mongo  
from api.moderation import mod_bp
from api.moderation.services import classify_image, classify_text_messages
from api.moderation.models import Message, FlaggedMessage, Alert, MarkedUser


@mod_bp.route('/analyse', methods=['POST'])
def analyse_messages():
    try:
        data = request.get_json()
        message = Message(**data)

        text_result = classify_text_messages(message.content)
        flagged = text_result['label'] == 'toxic'
        severity = text_result.get('severity')

        image_flagged = False
        if 'image_path' in data:
            image_flagged = classify_image(data['image_path'])

        if flagged or image_flagged:
            flagged_msg = FlaggedMessage(
                **message.model_dump(),
                reason='Toxic content' if flagged else 'Objectionable image',
                severity=severity if flagged else 'high',
                reviewed=False
            )
            mongo.db.flagged_messages.insert_one(flagged_msg.to_bson())

            marked_user = mongo.db.marked_users.find_one(
                {"user_id": message.user_id, "group_id": message.group_id}
            )
            if marked_user:
                mongo.db.marked_users.update_one(
                    {"user_id": message.user_id, "group_id": message.group_id},
                    {"$inc": {"infractions": 1}, "$push": {"flagged_messages": str(flagged_msg.id)}}
                )
            else:
                new_marked_user = MarkedUser(
                    user_id=message.user_id,
                    username=message.username,
                    group_id=message.group_id,
                    infractions=1,
                    flagged_messages=[str(flagged_msg.id)]
                )
                mongo.db.marked_users.insert_one(new_marked_user.to_bson())

            if flagged_msg.severity == 'high':
                alert = Alert(
                    group_id=message.group_id,
                    user_id=message.user_id,
                    message_id=str(flagged_msg.id),
                    reason=flagged_msg.reason,
                    reviewed=False
                )
                mongo.db.alerts.insert_one(alert.to_bson())

        return jsonify({"message": "Message analyzed", "flagged": flagged or image_flagged}), 200

    except Exception as e:
        current_app.logger.error('Error while analysing message: %s', e)
        abort(500, description="Internal Server Error")


@mod_bp.route('/actions', methods=['POST'])
def take_actions():
    try:
        data = request.get_json()
        message_id = data.get("message_id")
        action = data.get("action")

        if not message_id or not action:
            abort(400, description="Missing required fields")

        flagged_msg = mongo.db.flagged_messages.find_one({"_id": message_id})
        if not flagged_msg:
            abort(404, description="Flagged message not found")

        mongo.db.flagged_messages.update_one(
            {"_id": message_id},
            {"$set": {"action_taken": action, "reviewed": True}}
        )

        if action in ['banned', 'warned']:
            mongo.db.marked_users.update_one(
                {"user_id": flagged_msg['user_id'], "group_id": flagged_msg['group_id']},
                {"$inc": {"infractions": 1}}
            )

        return jsonify({"message": "Action recorded"}), 200

    except Exception as e:
        current_app.logger.error('Error while taking action: %s', e)
        abort(500, description="Internal Server Error")


@mod_bp.route('/flagged', methods=['GET'])
def get_flagged_messages():
    try:
        flagged_messages = list(mongo.db.flagged_messages.find({"reviewed": False}))
        for msg in flagged_messages:
            msg["_id"] = str(msg["_id"])

        return jsonify(flagged_messages), 200

    except Exception as e:
        current_app.logger.error('Error while fetching flagged messages: %s', e)
        abort(500, description="Internal Server Error")
