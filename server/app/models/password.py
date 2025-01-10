from pydantic import BaseModel
from bson import ObjectId
from typing import Optional

class PasswordBase(BaseModel):
    service: str
    username: str
    password: str

# This will be used for returning passwords from the database
class PasswordInDB(PasswordBase):
    id: str

# This is used for creating a password record
class PasswordCreate(PasswordBase):
    pass

# This is used for updating password details (optional fields)
class PasswordUpdate(BaseModel):
    password: Optional[str]
