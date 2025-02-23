from flask import Blueprint

tele_bp = Blueprint('telegram', __name__)

from api.telegram import routes, bot