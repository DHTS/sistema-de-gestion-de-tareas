import json
import os
import pymongo
import random
import string

def get_db_connection():
    client = pymongo.MongoClient(os.environ['MONGODB_URI'])
    return client["taskmanager"]["tasks"]

def lambda_handler(event, context):

    try:
        body = json.loads(event['body'])

        if not all(k in body for k in ("title", "description", "status")):
            return {"statusCode": 422, "body": json.dumps({"message": "Campos incompletos"})}

        db = get_db_connection()

        task_id = ''.join(random.choices(string.ascii_letters + string.digits, k=8))

        task = {
            "id": task_id,
            "title": body["title"],
            "description": body["description"],
            "status": body["status"]
        }

        db.insert_one(task)

        return {"statusCode": 201, "body": json.dumps({"message": "Tarea creada", "task": task})}

    except Exception as e:
        return {"statusCode": 500, "body": json.dumps({"message": str(e)})}
