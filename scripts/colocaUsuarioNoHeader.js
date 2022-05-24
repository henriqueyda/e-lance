function getUsuario(){
    const xhttp = new XMLHttpRequest();
    var url = "https://w9bdr30j99.execute-api.us-east-1.amazonaws.com/versao1";

    xhttp.open("POST", url);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split( ';' );
    let email;
    for( let i = 0; i < ca.length; i++ ){
        if( ca[i].indexOf( "username=" ) == 0 ){
            email = ca[i].substring( "username=".length, ca[i].length );
        }
        if( ca[i].indexOf( "username=" ) == 0 ){
            tipo = ca[i].substring( "tipo=".length, ca[i].length );
        }
    }

    if(email != null){
        var data = {
            "email": email
        };
        var jsondata = JSON.stringify(data);

        xhttp.send(jsondata);

        xhttp.onload = () => {
            const obj = JSON.parse(xhttp.responseText);
            if (obj.statusCode == 200) {
                // debugger
                let prop = JSON.parse(obj.body);
                document.getElementById("nome-usuario").innerHTML = `Olá ${prop.nome}`
                document.getElementById("acessar-conta").style.display = 'none';
                document.getElementById("cadastrar").style.display = 'none';
                document.getElementById("logout").style.display = 'block';
                document.getElementById("areaUsuario").style.display = 'block';

                if(tipo == "comprador"){
                    $("#navOptions").append(`
                    <a class="p-3" href="cadastroVeiculo.html" style="color: var(--branco);">Cadastrar Veículo</a>
                    `);
                }
                
            }
        }
    }
    else{
        document.getElementById("nome-usuario").style.display = 'none';
    }
}
getUsuario();