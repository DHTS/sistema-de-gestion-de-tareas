import json
import os
import pymongo

def get_db_connection():
    client = pymongo.MongoClient(os.environ['MONGODB_URI'])
    return client["taskmanager"]["tasks"]

def lambda_handler(event, context):

    try:
        db = get_db_connection()
        
        tasks = list(db.find({}, {'_id': 0}))

        return {
            "statusCode": 200,
            "body": json.dumps({"tasks": tasks})
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"message": str(e)})
        }
