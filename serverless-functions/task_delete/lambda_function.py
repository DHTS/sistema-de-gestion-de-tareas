import json
import os
import pymongo

def get_db_connection():
    client = pymongo.MongoClient(os.environ['MONGODB_URI'])
    return client["taskmanager"]["tasks"]

def lambda_handler(event, context):

    try:
        task_id = event['id']

        if not task_id:
            return {"statusCode": 422, "body": json.dumps({"message": "ID de tarea requerido"})}

        db = get_db_connection()
        result = db.delete_one({"id": task_id})

        if result.deleted_count == 0:
            return {"statusCode": 404, "body": json.dumps({"message": "Tarea no encontrada"})}

        return {"statusCode": 200, "body": json.dumps({"message": f"Tarea {task_id} eliminada exitosamente"})}

    except Exception as e:
        return {"statusCode": 500, "body": json.dumps({"message": str(e)})}
