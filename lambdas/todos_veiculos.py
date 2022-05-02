import json
import boto3
from datetime import datetime, timedelta

dynamodb = boto3.resource('dynamodb')

tabela_veiculos = dynamodb.Table('Veiculos')

def lambda_handler(event, context):
    try:
        response = tabela_veiculos.scan()
        lista_veiculos_ordenada = sorted(response['Items'], key=lambda dici: len(dici['lances']), reverse=True)
        data_hora = (datetime.now() - timedelta(hours=3))
        
        lista_destaque = []
        for veiculo in lista_veiculos_ordenada:
            data_hora_expiracao = datetime.strptime(veiculo['data_hora_expiracao'],'%Y-%m-%d %H:%M:%S')
            if data_hora <= data_hora_expiracao:
                dici = {}
                dici['nome'] = veiculo['nome']
                dici['marca'] = veiculo['marca']
                dici['ano'] = veiculo['ano']
                dici['lance_minimo'] = veiculo['lance_minimo']
                dici['numero_lances'] = len(veiculo['lances'])
                dici['foto'] = veiculo['foto']
                dici['id'] = veiculo['id']
                lista_destaque.append(dici)
        
        # TODO implement
        return {
            'statusCode': 200,
            'body': lista_destaque
        }
    except:
        return {
            'statusCode': 400,
            'body': json.dumps('Erro ao tentar pegar todos os veículos')
        }
