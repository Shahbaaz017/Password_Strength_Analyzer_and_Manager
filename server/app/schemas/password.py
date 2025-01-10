from pydantic import BaseModel
from typing import Optional

class PasswordCreate(BaseModel):
    service: str
    username: str
    password: str

class PasswordUpdate(BaseModel):
    password: Optional[str]

class PasswordInDB(PasswordCreate):
    id: str
