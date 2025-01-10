from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# MongoDB settings
MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB = os.getenv("MONGO_DB")

# Create MongoDB client
client = AsyncIOMotorClient(MONGO_URI)
database = client[MONGO_DB]

# Reference to collections
users_collection = database["users"]
passwords_collection = database["passwords"]
