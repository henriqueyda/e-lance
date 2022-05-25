import json
import boto3

dynamodb = boto3.resource('dynamodb')

tabela_veiculos = dynamodb.Table('Veiculos')

def lambda_handler(event, context):
    try:
        id_veiculo = event['id_veiculo']
        email = event['email']
        
        response = tabela_veiculos.get_item(Key={"id":id_veiculo})['Item']['lances'][email]
        
        return {
            'statusCode': 200,
            'body': response
        }
    except:
        return {
            'statusCode': 400,
            'body': json.dumps('Erro ao tentar acessar lances do usu')
        }
