const xhttp = new XMLHttpRequest();

var url = "https://gjpmh4jaal.execute-api.us-east-1.amazonaws.com/versao-1";

xhttp.open("POST", url);
xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

var data = {
    "id": "768943fa-5fcc-4cba-a86b-7b35f6618ba8"
};
var jsondata = JSON.stringify(data);

xhttp.send(jsondata);

xhttp.onload = () => {
    const obj = JSON.parse(xhttp.responseText);

    if (obj.statusCode == 200) {
        let prop = JSON.parse(obj.body);
        $("#nome").val(prop.nome + ' ' + prop.sobrenome)
        $("#email").val(prop.email)
        $("#estado").val(prop.estado)
        $("#cidade").val(prop.cidade)
        $("#endereco").val(prop.endereco)
        $("#numero").val(prop.numero)
        $("#cep").val(prop.cep)
    }
};
