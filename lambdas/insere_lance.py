import json
from datetime import datetime, timedelta
from urllib.parse import unquote_plus
import boto3
import re
from decimal import Decimal
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
tabelaVeiculos = dynamodb.Table('Veiculos')

def lambda_handler(event, context):
    try:
        data_hora = (datetime.now() - timedelta(hours=3))
        infos = [element.split("=")[1] for element in unquote_plus(event['body'], encoding='utf-8').split("&")]
        
        id_veiculo = infos[0]
        id_cliente = infos[1]
        nome = infos[2]
        valor = infos[3]
        
        response = tabelaVeiculos.query(
            KeyConditionExpression=Key('id').eq(id_veiculo)
        )
        data_hora_expiracao = datetime.strptime(response['Items'][0]['data_hora_expiracao'],'%Y-%m-%d %H:%M:%S')
        
        
        valor = valor.replace('.', '')
        valor = valor.replace(',', '.')
        
        valor = Decimal(valor)
        
        if data_hora >= data_hora_expiracao:
            return {
                'statusCode': 410,
                'body': json.dumps('Oferta expirada! Não é possível inserir lances')
            }
        
        
        tabelaVeiculos.update_item(
            Key={
                "id":id_veiculo
            },
            UpdateExpression="SET lances = list_append(lances, :l)",
            ExpressionAttributeValues={
                ':l': [{
                   "valor": valor,
                   "nome": nome,
                   "data_hora": data_hora.strftime('%Y-%m-%d %H:%M:%S'),
                   "id_cliente": id_cliente
                }],
            },
            ReturnValues="UPDATED_NEW"
        )
    
        return {
            'statusCode': 200,
            'body': json.dumps('Lance inserido com sucesso')
        }
    except Exception as e:
        return {
            'statusCode': 400,
            'body': json.dumps('Erro ao tentar inserir lances' + repr(e))
        }
        
