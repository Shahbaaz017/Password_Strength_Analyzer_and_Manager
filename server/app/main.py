from fastapi import FastAPI
from app.db.database import users_collection

app = FastAPI()

@app.get("/test-db")
async def test_db():
    # Try to fetch one user from the database
    user = await users_collection.find_one({"username": "test"})
    if user:
        return {"message": "User found", "user": user}
    return {"message": "No user found"}
