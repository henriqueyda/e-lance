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
                let prop = JSON.parse(obj.body);
                document.getElementById("nome-usuario").innerHTML = `Olá ${prop.nome}`
                document.getElementById("acessar-conta").style.display = 'none';
            }
        }
    }
    else{
        document.getElementById("nome-usuario").style.display = 'none';
    }
}

function getDestaques(){
    const xhttp = new XMLHttpRequest();
    var url = "https://wguop43zv6.execute-api.us-east-1.amazonaws.com/versao1";
  
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send();
  
    xhttp.onload = function(){
        const obj = JSON.parse(this.responseText);
        const arr = obj.body;
        arr.forEach(element => {
            let item = `<div class="item" style="box-shadow: 0 0 6px 0 #dadada;">
            <img class="d-block" src="${element.foto}" alt="First slide">
            <p>Nome: ${element.nome}</p>
            <p>Número total de lances: ${element.numero_lances}</p>
            <button class="border-0 btn-details" onclick="window.location.href='detalhes.html?veiculo=${element.id}'">Ver mais detalhes</button>
          </div>`;
          $('.owl-carousel').owlCarousel('add', item).owlCarousel('update');
        });
        
    }
}

getUsuario();
getDestaques();

  