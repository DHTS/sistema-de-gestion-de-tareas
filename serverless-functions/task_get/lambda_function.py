import json
import os
import pymongo

def get_db_connection():
    print("Intentando conectar a MongoDB...")
    client = pymongo.MongoClient(os.environ['MONGODB_URI'], serverSelectionTimeoutMS=5000)
    client.admin.command('ping')
    print("Conectado exitosamente a MongoDB")

    return client["taskmanager"]["tasks"]

def lambda_handler(event, context):
    try:
        db = get_db_connection()

        print("Realizando consulta a la base de datos...")
        tasks = list(db.find({}, {'_id': 0}))
        print(f"Tareas recuperadas: {tasks}")

        return {
            "statusCode": 200,
            "body": json.dumps({"tasks": tasks})
        }

    except Exception as e:
        print("Error:", e)
        return {
            "statusCode": 500,
            "body": json.dumps({"message": str(e)})
        }
