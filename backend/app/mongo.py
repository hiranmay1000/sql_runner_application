from pymongo import MongoClient
from urllib.parse import quote_plus
import os



MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)

db = client["sql-runner-online-db"]
users_collection = db["user-credentials"]
