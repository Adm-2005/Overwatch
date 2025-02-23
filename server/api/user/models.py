# external imports
import pytz
from enum import Enum
from pydantic import Field, EmailStr
from datetime import datetime, timezone
from fastapi.encoders import jsonable_encoder
from typing import Optional, List, Dict, Any
from werkzeug.security import check_password_hash, generate_password_hash

# internal imports
from db.base_models import Serialization
from db.pydantic_objectid import PydanticObjectId

class Platform(Enum):
    DISCORD = 'discord'
    TELEGRAM = 'telegram'

class UserRole(Enum):
    MODERATOR = 'moderator'
    LAW_ENFORCEMENT = 'law_enforcement'

class User(Serialization):
    """Represents the user of the application."""
    id: Optional[PydanticObjectId] = Field(alias='_id', default=None)
    username: str 
    email: EmailStr
    hash_pw: Optional[str] = Field(default='')
    role: UserRole = Field(default=UserRole.MODERATOR)
    handles: Optional[Dict[str, Any]] = Field(default = {}) # discord and telegram IDs
    joined_at: Optional[datetime] = Field(default=lambda: datetime.now(tz=pytz.timezone('Asia/Kolkata')))

    def set_hash_pw(self, password: str) -> None:
        """
        Sets password hash.

        Args:
            password: password to set.

        Returns:
            None
        """
        self.hash_pw = generate_password_hash(password)

    def check_hash_pw(self, password: str) -> bool:
        """
        Verifies password against the hashed password stored in db.

        Args:
            password: password to check.

        Returns:
            bool: True if password is correct.
        """
        return check_password_hash(self.hash_pw, password)

    def update_last_active(self) -> None:
        self.last_active = datetime.now(tz=timezone.tzname('Asia/Kolkata'))

    def to_json(self, include_creds: bool = False) -> Dict[str, Any]:
        """
        Overrides the to_json method of Serialization class to protect sensitive information.

        Args:
            include_creds: when True sensitive info is omitted.

        Returns:
            data: json serialized fields.
        """
        data = jsonable_encoder(self, custom_encoder={PydanticObjectId: str})

        if not include_creds:
            data.pop('hash_pw', None)

        return data
    
class Moderator(User):
    """Represents moderator users."""
    platform_groups: Optional[List[PydanticObjectId]] = Field(default=[])

class LawEnforcement(User):
    """Represents law enforcement representatives."""
    agency: str
    country: str
    state: str
    district: str 