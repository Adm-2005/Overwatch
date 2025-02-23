from flask import Blueprint

disc_bp = Blueprint('discord', __name__)

from api.discord import routes, bot