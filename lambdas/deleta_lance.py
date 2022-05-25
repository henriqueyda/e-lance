import json
import boto3
from decimal import Decimal

client = boto3.resource('dynamodb')

tabela_veiculos = client.Table('Veiculos')

def lambda_handler(event, context):
    email = event['email'] 
    data_hora = event['data_hora']
    valor = event['valor']
    try:
        veiculos = tabela_veiculos.scan()['Items']
        for veiculo in veiculos:
            id_veiculo = veiculo['id']
            if email in veiculo['lances']:
                index = 0
                for lance in veiculo['lances'][email]:
                    if lance['data_hora'] == data_hora and lance['valor'] == Decimal(valor):
                        tabela_veiculos.update_item(
                            Key={
                                "id":id_veiculo
                            },
                            UpdateExpression=f"REMOVE lances.#usuario[{index}]",
                            ExpressionAttributeNames={
                                "#usuario": email
                            },
                            ReturnValues="ALL_NEW"
                        )
                        return {
                            'statusCode': 200,
                            'body': 'Lance removido com sucesso'
                        }
                    index += 1
        return {
            'statusCode': 404,
            'body': 'Lance não encontrado'
        }   
                        
        
    except Exception as ex:
        return {
            'statusCode': 400,
            'body': repr(ex)
        }