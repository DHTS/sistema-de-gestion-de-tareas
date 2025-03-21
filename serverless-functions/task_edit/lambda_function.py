import json
import os
import pymongo

def get_db_connection():
    client = pymongo.MongoClient(os.environ['MONGODB_URI'])
    return client["taskmanager"]["tasks"]

def lambda_handler(event, context):
    try:
        if not all(k in event for k in ("id", "title", "description", "status")):
            return {"statusCode": 422, "body": json.dumps({"message": "Campos incompletos"})}

        db = get_db_connection()
        result = db.update_one({"id": event['id']}, {"$set": event})

        if result.matched_count == 0:
            return {
                "statusCode": 404,
                "body": json.dumps({"message": "Tarea no encontrada"})
            }

        return {
            "statusCode": 200,
            "body": json.dumps({"message": f"Tarea {event['id']} actualizada exitosamente"})
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"message": str(e)})
        }
