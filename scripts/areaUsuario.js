const xhttp = new XMLHttpRequest();

var url = "https://w9bdr30j99.execute-api.us-east-1.amazonaws.com/versao1";

xhttp.open("POST", url);
xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

let decodedCookie = decodeURIComponent(document.cookie);
let ca = decodedCookie.split(';');
let email;
for (let i = 0; i < ca.length; i++) {
    if (ca[i].indexOf("username=") == 0) {
        email = ca[i].substring("username=".length, ca[i].length);
    }
}

if (email != null) {

    var data = {
        "email": email
    };
    var jsondata = JSON.stringify(data);

    xhttp.send(jsondata);

    xhttp.onload = () => {
        const obj = JSON.parse(xhttp.responseText);
        console.log(obj)
        if (obj.statusCode == 200) {
            let prop = JSON.parse(obj.body);
            $("#nome").val(prop.nome + ' ' + prop.sobrenome)
            $("#email").val(prop.email)
            $("#estado").val(prop.estado)
            $("#cidade").val(prop.cidade)
            $("#endereco").val(prop.endereco)
            $("#endereco").attr('title', prop.endereco)
            $("#numero").val(prop.numero)
            $("#cep").val(prop.cep)
            ajaxLancesUsuario(prop.email);
        } else {
            alert('Estamos com problemas na consulta dos seus dados. Entre em contato com um Administrador!')
        }
    };
}

else {
    alert('Você precisa estar logado para acessar esta página');
    window.location.replace('login.html');
}

function ajaxLancesUsuario(email) {
    $.ajax({
        url: `https://d90i52trsl.execute-api.us-east-1.amazonaws.com/versao1?email=${email}`,
        method: 'GET',
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            for (let i = 0; i < data.body.length; i++) {
                const element = data.body[i];
                $("#tbody").append(`
                    <tr>
                        <td>${i+1}</td>
                        <td>${element.valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                        <td></td>
                        <td>${element.data_hora}</td>
                    </tr>
                `);
                
            }
        }
    });
} 