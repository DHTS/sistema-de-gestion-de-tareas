import json
import os
import pymongo

def get_db_connection():
    client = pymongo.MongoClient(os.environ['MONGODB_URI'])
    return client["taskmanager"]["tasks"]

def lambda_handler(event, context):

    try:
        task_id = event['pathParameters'].get('id')

        if not task_id:
            return {
                "statusCode": 422,
                "body": json.dumps({"message": "ID de tarea requerido"})
            }

        body = json.loads(event['body'])

        update_data = {}
        allowed_fields = ["title", "description", "status"]
        for field in allowed_fields:
            if field in body:
                update_data[field] = body[field]

        if not update_data:
            return {
                "statusCode": 422,
                "body": json.dumps({"message": "Ningún campo válido proporcionado"})
            }

        db = get_db_connection()

        result = db.update_one({"id": task_id}, {"$set": update_data})

        if result.matched_count == 0:
            return {
                "statusCode": 404,
                "body": json.dumps({"message": "Tarea no encontrada"})
            }

        return {
            "statusCode": 200,
            "body": json.dumps({"message": f"Tarea {task_id} actualizada exitosamente", "updated_fields": update_data})
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"message": str(e)})
        }
