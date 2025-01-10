from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    username: str
    password: str

class UserInDB(UserCreate):
    id: str

class UserUpdate(BaseModel):
    password: Optional[str]
