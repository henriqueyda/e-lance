import json
from urllib.parse import unquote_plus
import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
tabelaUsuarios = dynamodb.Table('Usuarios')

def lambda_handler(event, context):
    infos = [element.split("=")[1] for element in unquote_plus(event['body'], encoding='utf-8').split("&")]
    email = infos[0]
    senha = infos[1]
    
    response = tabelaUsuarios.query(
        KeyConditionExpression=Key('email').eq(email)
    )
    if len(response['Items']) != 0:
        usuario = response['Items'][0]
        if usuario['senha'] == senha:
            return {
                'statusCode': 200,
                'body': 'Login efetuado com sucesso!'
            }
        else:
            return {
                'statusCode': 401,
                'body': 'Senha inválida!'
            }
    else:
        return {
            'statusCode': 401,
            'body': 'Usuário inválido!'
        }
