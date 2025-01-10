from app.db.database import passwords_collection
from app.models.password import PasswordCreate, PasswordInDB, PasswordUpdate
from bson import ObjectId

async def add_password(password: PasswordCreate) -> PasswordInDB:
    new_password = await passwords_collection.insert_one(password.dict())
    return PasswordInDB(id=str(new_password.inserted_id), **password.dict())

async def get_passwords_by_user(username: str) -> list[PasswordInDB]:
    passwords = []
    async for password in passwords_collection.find({"username": username}):
        passwords.append(PasswordInDB(id=str(password["_id"]), **password))
    return passwords

async def update_password(password_id: str, password_update: PasswordUpdate) -> PasswordInDB:
    update_data = {key: value for key, value in password_update.dict(exclude_unset=True).items()}
    await passwords_collection.update_one({"_id": ObjectId(password_id)}, {"$set": update_data})
    updated_password = await passwords_collection.find_one({"_id": ObjectId(password_id)})
    return PasswordInDB(id=str(updated_password["_id"]), **updated_password) if updated_password else None

async def delete_password(password_id: str) -> bool:
    result = await passwords_collection.delete_one({"_id": ObjectId(password_id)})
    return result.deleted_count > 0
