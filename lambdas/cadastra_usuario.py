import json
from urllib.parse import unquote_plus
import boto3

dynamodb = boto3.resource('dynamodb')
tabelaUsuarios = dynamodb.Table('Usuarios')

def lambda_handler(event, context):
    try:
        infos = [element.split("=")[1] for element in unquote_plus(event['body'], encoding='utf-8').split("&")]
        nome = infos[0]
        sobrenome = infos[1]
        cep = infos[2]
        cidade = infos[3]
        estado = infos[4]
        endereco = infos[5]
        numero = infos[6]
        email = infos[7]
        senha = infos[8]
        tipo = infos[10]
        
        lista_email = [usuario['email'] for usuario in tabelaUsuarios.scan()['Items']]
        
        if email in lista_email:
            return {
                'statusCode': 409,
                'body': 'email ja cadastrado'
            }
        
        response = tabelaUsuarios.put_item(
            Item={
                'nome': nome,
                'sobrenome': sobrenome,
                'cep': cep,
                'cidade': cidade,
                'estado': estado,
                'endereco': endereco,
                'numero': numero,
                'email': email,
                'senha':  senha,
                'tipo': tipo
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
        
