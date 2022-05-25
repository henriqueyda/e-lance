import json
import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')

tableAreaUsuario = dynamodb.Table('Usuarios')

def lambda_handler(event, context):
    email = str(event['email'])
    try:
        response = tableAreaUsuario.query(
            KeyConditionExpression=Key('email').eq(email))
        return {
            'statusCode': 200,
            'body': json.dumps(response['Items'][0])
        }
    except Exception as e:
        return {
            'statusCode': 400,
            'body': json.dumps('Erro ao tentar ver dados do usuario:'+repr(e))
        }