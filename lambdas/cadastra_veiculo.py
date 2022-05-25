import json
from urllib.parse import unquote_plus
from datetime import datetime
import boto3
from decimal import Decimal
import uuid
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
tabelaVeiculos = dynamodb.Table('Veiculos')
tabelaUsuarios = dynamodb.Table('Usuarios')

def lambda_handler(event, context):
    try:
        infos = [element.split("=")[1] for element in unquote_plus(event['body'], encoding='utf-8').split("&")]
        
        nome = infos[0]
        marca = infos[1]
        ano = infos[2]
        descricao = infos[3]
        lance_minimo = Decimal(infos[4])
        data_hora_expiracao = datetime.strptime(infos[5],'%Y-%m-%dT%H:%M')
        url_imagem = infos[6]
        email = infos[7]
        
        response_usuarios = tabelaUsuarios.query(
            KeyConditionExpression=Key('email').eq(email)
        )
        usuario = response_usuarios['Items'][0]
        nome_anunciante = usuario['nome'] + ' ' + usuario['sobrenome']
        lances = {}
        
        response = tabelaVeiculos.put_item(
            Item={
                'id': str(uuid.uuid4()),
                'nome': nome,
                'marca': marca,
                'ano': ano,
                'descricao': descricao,
                'lance_minimo': lance_minimo,
                'data_hora_expiracao': data_hora_expiracao.strftime('%Y-%m-%d %H:%M:%S'),
                'foto': url_imagem,
                'email_anunciante': email,
                'anunciante': nome_anunciante,
                'lances': lances
            }    
        )
        
        return {
            'statusCode': 200,
            'body': response
        }
    except Exception as e:
        return {
            'statusCode': 400,
            'body': json.dumps('Erro ao tentar cadastrar usuário' + repr(e))
        }
        
