import json
from datetime import datetime, timedelta
from urllib.parse import unquote_plus
import boto3
import re
from decimal import Decimal
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
tabelaVeiculos = dynamodb.Table('Veiculos')
tabelaUsuarios = dynamodb.Table('Usuarios')

def lambda_handler(event, context):
    try:
        data_hora = (datetime.now() - timedelta(hours=3))
        infos = [element.split("=")[1] for element in unquote_plus(event['body'], encoding='utf-8').split("&")]
        
        id_veiculo = infos[0]
        valor = infos[1]
        email = infos[2]
        
        valor = valor.replace('.', '')
        valor = valor.replace(',', '.')
        
        valor = Decimal(valor)
        
        response_veiculos = tabelaVeiculos.query(
            KeyConditionExpression=Key('id').eq(id_veiculo)
        )
        data_hora_expiracao = datetime.strptime(response_veiculos['Items'][0]['data_hora_expiracao'],'%Y-%m-%d %H:%M:%S')
        lance_minimo = Decimal(response_veiculos['Items'][0]['lance_minimo'])
        nome_veiculo = response_veiculos['Items'][0]['marca'] + ' ' + response_veiculos['Items'][0]['nome']
        
        if valor < lance_minimo:
            return {
                'statusCode': 400,
                'body': 'Você não pode cadastrar um lance menor que o lance mínimo!'
            }
        
        response_usuarios = tabelaUsuarios.query(
            KeyConditionExpression=Key('email').eq(email)
        )
        usuario = response_usuarios['Items'][0]
        nome = usuario['nome'] + ' ' + usuario['sobrenome']
        
        
        if data_hora >= data_hora_expiracao:
            return {
                'statusCode': 410,
                'body': json.dumps('Oferta expirada! Não é possível inserir lances')
            }
        
        tabelaVeiculos.update_item(
            Key={
                "id":id_veiculo
            },
            UpdateExpression="SET lances.#usuario = list_append(if_not_exists(lances.#usuario, :empty_list), :l)",
            ExpressionAttributeNames={
                "#usuario": email
            },
            ExpressionAttributeValues={
                ':l': [{
                    "id_veiculo": id_veiculo,
                    "nome_veiculo": nome_veiculo,
                    "valor": valor,
                    "nome": nome,
                    "data_hora": data_hora.strftime('%Y-%m-%d %H:%M:%S')
                }],
                ':empty_list': []
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
        
