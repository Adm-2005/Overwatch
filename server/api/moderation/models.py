# external imports
import pytz
from enum import Enum
from pydantic import Field
from datetime import datetime
from typing import Optional, List

# internal imports
from api.db.base_models import Serialization
from api.db.pydantic_objectid import PydanticObjectId

class Action(Enum):
    DELETED = 'deleted'
    WARNED = 'warned'
    BANNED = 'banned'

class Message(Serialization):
    """Stores messages sent in groups."""
    id: Optional[PydanticObjectId] = Field(alias='_id', default=None)
    msg_id: str
    user_id: str
    group_id: str
    username: str
    content: str
    timestamp: datetime = Field(default_factory=datetime.now(tz=pytz.timezone('Asia/Kolkata')))

class FlaggedMessage(Message):
    """Stores flagged messages after AI analysis."""
    reason: str 
    reviewed: bool = False
    action_taken: Optional[Action] = Field(default=None)

class MarkedUser(Serialization):
    """Tracks users flagged for repeated violations."""
    id: Optional[PydanticObjectId] = Field(alias='_id', default=None)
    user_id: str
    username: str
    group_id: str
    infractions: int = 1
    last_infraction: datetime = Field(default_factory=datetime.now(tz=pytz.timezone('Asia/Kolkata')))
    flagged_messages: List[str] = []

class Alert(Serialization):
    """Stores alerts for moderators or law enforcement."""
    id: Optional[PydanticObjectId] = Field(alias='_id', default=None)
    group_id: str
    user_id: str
    message_id: str
    reason: str
    reviewed: bool = False
    timestamp: datetime = Field(default_factory=datetime.utcnow)