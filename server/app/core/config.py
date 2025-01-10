import os
from dotenv import load_dotenv

# Load the environment variables from the .env file
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB = os.getenv("MONGO_DB")
