from app.db.database import users_collection
from app.models.user import UserCreate, UserInDB, UserUpdate
from bson import ObjectId

async def create_user(user: UserCreate) -> UserInDB:
    new_user = await users_collection.insert_one(user.dict())
    return UserInDB(id=str(new_user.inserted_id), **user.dict())

async def get_user_by_username(username: str) -> UserInDB:
    user = await users_collection.find_one({"username": username})
    if user:
        return UserInDB(id=str(user["_id"]), **user)
    return None

async def update_user(username: str, user_update: UserUpdate) -> UserInDB:
    update_data = {key: value for key, value in user_update.dict(exclude_unset=True).items()}
    await users_collection.update_one({"username": username}, {"$set": update_data})
    updated_user = await users_collection.find_one({"username": username})
    return UserInDB(id=str(updated_user["_id"]), **updated_user) if updated_user else None
