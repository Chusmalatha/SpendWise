import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("MONGODB_DB_NAME", "spendwise")

client = AsyncIOMotorClient(MONGODB_URL)
db = client[DB_NAME]

async def save_lead(lead_data: dict):
    """Save lead information and their audit results to MongoDB"""
    collection = db["leads"]
    result = await collection.insert_one(lead_data)
    return str(result.inserted_id)

async def get_lead(lead_id: str):
    """Fetch lead/audit data by ID"""
    from bson import ObjectId
    collection = db["leads"]
    return await collection.find_one({"_id": ObjectId(lead_id)})
