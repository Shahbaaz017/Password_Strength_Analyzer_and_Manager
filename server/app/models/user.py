from pydantic import BaseModel
from bson import ObjectId
from typing import Optional

class UserBase(BaseModel):
    username: str
    password: str

# This will be used for when returning a user from the database
class UserInDB(UserBase):
    id: str

# This is used for user creation (without the ID)
class UserCreate(UserBase):
    pass

# This is used for updating the user (optional fields)
class UserUpdate(BaseModel):
    password: Optional[str]
