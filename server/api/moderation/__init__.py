from flask import Blueprint

mod_bp = Blueprint('moderation', __name__)

from api.moderation import routes