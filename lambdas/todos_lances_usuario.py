import json
import boto3

client = boto3.resource('dynamodb')

tabela_veiculos = client.Table('Veiculos')

def lambda_handler(event, context):
    email = event['email'] 
    lances = []
    try:
        veiculos = tabela_veiculos.scan()['Items']
        for veiculo in veiculos:
            if email in veiculo['lances']:
                lances += veiculo['lances'][email]

        return {
            'statusCode': 200,
            'body': lances
        }

    except Exception as ex:
        return {
            'statusCode': 400,
            'body': "Erro ao obter todos os lances: "+repr(ex)
        }