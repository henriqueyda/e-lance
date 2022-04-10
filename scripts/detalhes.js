function getIdVeiculo(){
    let params = (new URL(document.location)).searchParams;
    let idVeiculo = params.get("veiculo");
    return idVeiculo;
}

function getInfos(){
    let idVeiculo = getIdVeiculo();
    document.getElementById("envia-id-veiculo").value = idVeiculo;
    const xhttp = new XMLHttpRequest();
    var data = {
    "id_veiculo": idVeiculo
    };
    var jsondata = JSON.stringify(data);
    var url = "https://wgcnbbjq5g.execute-api.us-east-1.amazonaws.com/versao1";
    xhttp.open("POST", url);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(jsondata);
    return xhttp
}

function putInfos(){
    const obj = JSON.parse(this.responseText)
    infosCarro(obj);
    infosMaiorLance(obj);
}

function infosCarro(obj){
    document.getElementById("img-carro").src = obj.body.foto;
    document.getElementById("nome").innerHTML = `<b>${obj.body.nome}</b>`;
    document.getElementById("ano").innerHTML = `<b>Ano</b> - ${obj.body.ano}`;
    document.getElementById("marca").innerHTML = `<b>Marca</b> - ${obj.body.marca}`;
    document.getElementById("lance-minimo").innerHTML = `<b>Lance Mínimo</b> - ${obj.body.lance_minimo.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`;
    document.getElementById("descricao").innerHTML = `<b>Descrição</b> - ${obj.body.descricao}`;
    document.getElementById("anunciante").innerHTML = `<b>Anunciante</b> - ${obj.body.anunciante}`;
}

function infosMaiorLance(obj){
    let arrayLances = obj.body.lances;
    let maxLance = arrayLances.reduce((max, lance) => max.valor > lance.valor ? max : lance);
    document.getElementById("nome-maior-lance").innerHTML = `${maxLance.nome}`;
    document.getElementById("valor-maior-lance").innerHTML = `${maxLance.valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`;
    document.getElementById("horario-maior-lance").innerHTML = `${maxLance.data_hora}`;
}

function enviaLance(){
    const xhttp = new XMLHttpRequest();

    var data = {
        "id_veiculo":document.getElementById("envia-id-veiculo").value,
        "id_cliente":document.getElementById("envia-id-cliente").value,
        "nome":document.getElementById("envia-nome").value,
        "valor":document.getElementById("envia-valor").value,
    };
    xhttp.onload = function(){
        window.location.reload();
    }
    var jsondata = JSON.stringify(data);
    var url = "https://3wd0cl8tcc.execute-api.us-east-1.amazonaws.com/versao1";
    xhttp.open("POST", url);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(jsondata);
}


xhttp = getInfos();
xhttp.onload = putInfos;
