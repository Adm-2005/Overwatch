# external imports
import pytz
from datetime import datetime
from pydantic import BaseModel, Field
from typing import Dict, Any, Optional
from fastapi.encoders import jsonable_encoder

# internal imports
from db.pydantic_objectid import PydanticObjectId

class Serialization(BaseModel):
    """Defines json and bson serialization methods."""
    def to_json(self) -> Dict[str, Any]:
        return jsonable_encoder(self, custom_encoder={PydanticObjectId: str})
    
    def to_bson(self) -> Dict[str, Any]:
        data = self.model_dump(by_alias=True)

        if not data.get('_id'):
            data.pop('_id', None)

        return data

class PlatformGroup(Serialization):
    """Base model for group entities across platforms."""
    id: Optional[PydanticObjectId] = Field(default=None, alias='_id')
    name: str
    owner_id: str
    active: bool = True
    created_at: datetime = Field(default_factory=datetime.now(tz=pytz.timezone('Asia/Kolkata')))
