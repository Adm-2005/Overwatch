# external imports
from pydantic import Field
from datetime import datetime, timezone
from fastapi.encoders import jsonable_encoder
from typing import Optional, List, Dict, Any

# internal imports
from db.base_models import Serialization
from db.pydantic_objectid import PydanticObjectId

class User(Serialization):
    id: Optional[PydanticObjectId] = Field(alias='_id', default=None)
    name: Optional[str] = Field(default='')
    created_at: Optional[datetime] = Field(default=lambda: datetime.now(tz=timezone.tzname('Asia/Kolkata')))
    last_active: Optional[datetime] = Field(default=None)

    def update_last_active(self) -> None:
        self.last_active = datetime.now(tz=timezone.tzname('Asia/Kolkata'))

    def to_json(self, include_creds: bool = False) -> Dict[str, Any]:
        data = jsonable_encoder(self, custom_encoder={PydanticObjectId: str})

        if not include_creds:
            for cred in ['hashed_upi_id', 'aadhar_number']:
                data.pop(cred, None)

        return data

class Location(Serialization):
    id: Optional[PydanticObjectId] = Field(alias='_id', default=None)
    vendor_id: Optional[PydanticObjectId] = Field(default=None)
    location: Dict[str, float] = Field(default={'lat': 0.0, 'long': 0.0})
    timestamp: str = Field(default=None)
    popular_items: List[str] = Field(default=[])

