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
          <img class="d-block" src="${element.foto}" onclick="window.location.href='detalhes.html?veiculo=${element.id}'" alt="First slide" style="cursor:pointer;">
          <p>Nome: ${element.nome}</p>
          <p>Número total de lances: ${element.numero_lances}</p>
          <button class="border-0 btn-details" onclick="window.location.href='detalhes.html?veiculo=${element.id}'">Ver mais detalhes</button>
        </div>`;
        $('.owl-carousel').owlCarousel('add', item).owlCarousel('update');
      });
      
  }
}

getDestaques();