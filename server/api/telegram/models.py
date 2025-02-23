from api.db.base_models import PlatformGroup

class TelegramGroup(PlatformGroup):
    """Model for Telegram groups."""
    group_id: str
    bot_token: str