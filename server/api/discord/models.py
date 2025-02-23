# external imports
from pydantic import Field
from datetime import datetime
from typing import Optional, List

# internal imports
from api.db.base_models import PlatformGroup
from api.db.pydantic_objectid import PydanticObjectId

class DiscordServer(PlatformGroup):
    """Model for Discord servers."""
    server_id: str
    channels_monitored: Optional[List[str]] = Field(default=[])  