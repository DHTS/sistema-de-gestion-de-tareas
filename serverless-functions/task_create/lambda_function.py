import json
import os
import pymongo
import random
import string

def get_db_connection():
    print("Intentando conectar a MongoDB...")
    client = pymongo.MongoClient(os.environ['MONGODB_URI'], serverSelectionTimeoutMS=5000)
    client.admin.command('ping')
    print("Conectado exitosamente a MongoDB")

    return client["taskmanager"]["tasks"]

def lambda_handler(event, context):

    try:
        task = json.loads(event['body'])

        if not all(k in body for k in ("id_", "title", "description", "status")):
            return {"statusCode": 422, "body": json.dumps({"message": "Campos incompletos"})}

        db = get_db_connection()
        db.insert_one(task)

        return {"statusCode": 201, "body": json.dumps({"message": "Tarea creada", "task": task})}

    except Exception as e:
        return {"statusCode": 500, "body": json.dumps({"message": str(e)})}
