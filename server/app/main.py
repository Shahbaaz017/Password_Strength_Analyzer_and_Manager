from fastapi import FastAPI, HTTPException
from app.schemas.user import UserCreate, UserUpdate, UserInDB
from app.schemas.password import PasswordCreate, PasswordUpdate, PasswordInDB
from app.crud.user import create_user, get_user_by_username, update_user
from app.crud.password import add_password, get_passwords_by_user, update_password, delete_password

app = FastAPI()

# User registration route
@app.post("/register", response_model=UserInDB)
async def register_user(user: UserCreate):
    existing_user = await get_user_by_username(user.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    return await create_user(user)

# User update route
@app.put("/user/{username}", response_model=UserInDB)
async def modify_user(username: str, user_update: UserUpdate):
    user = await update_user(username, user_update)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Password management routes
@app.post("/passwords", response_model=PasswordInDB)
async def create_password(password: PasswordCreate):
    return await add_password(password)

@app.get("/passwords/{username}", response_model=list[PasswordInDB])
async def get_user_passwords(username: str):
    passwords = await get_passwords_by_user(username)
    if not passwords:
        raise HTTPException(status_code=404, detail="No passwords found for this user")
    return passwords

@app.put("/password/{password_id}", response_model=PasswordInDB)
async def change_password(password_id: str, password_update: PasswordUpdate):
    updated_password = await update_password(password_id, password_update)
    if not updated_password:
        raise HTTPException(status_code=404, detail="Password not found")
    return updated_password

@app.delete("/password/{password_id}", status_code=204)
async def remove_password(password_id: str):
    success = await delete_password(password_id)
    if not success:
        raise HTTPException(status_code=404, detail="Password not found")
