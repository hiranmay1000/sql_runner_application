from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

# Debug: Print MONGO_URI to verify
print("MONGO_URI =", os.getenv("MONGO_URI"))

MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise Exception("❌ MONGO_URI is missing!")

client = MongoClient(MONGO_URI)

db = client["sql-runner-online-db"]
users_collection = db["user-credentials"]
