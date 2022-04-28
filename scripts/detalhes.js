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
    timer(obj);
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

$(function () {

    $('form').on('submit', function (e) {

      e.preventDefault();

      $.ajax({
        type: 'post',
        url: 'https://3wd0cl8tcc.execute-api.us-east-1.amazonaws.com/versao1',
        data: $('form').serialize(),
        success: function (response) {
            alert("Lance inserido com sucesso")
            window.location.reload()
        }
      });

    });

});

function timer(obj){
    // Set the date we're counting down to
    var countDownDate = new Date(obj.body.data_hora_expiracao).getTime();
      
    // Update the count down every 1 second
    var x = setInterval(function() {
    
      // Get today's date and time
      var now = new Date().getTime();
    
      // Find the distance between now and the count down date
      var distance = countDownDate - now;
    
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
      // Display the result in the element with id="demo"
      document.getElementById("demo").innerHTML = days + "D " + hours + "H "
      + minutes + "M " + seconds + "S ";
    
      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "Acabou o Tempo!";
      }
    }, 1000);
}


xhttp = getInfos();
xhttp.onload = putInfos;
timer();
