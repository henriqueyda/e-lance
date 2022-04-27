const xhttp = new XMLHttpRequest();
var url = "https://ieerbq8o9a.execute-api.us-east-1.amazonaws.com/versao1";

xhttp.open("GET", url, true);
xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhttp.send();

xhttp.onload = function(){
    const obj = JSON.parse(this.responseText);
    const arr = obj.body;
    debugger
    arr.forEach(element => {
        let item = `<tr>
        <td><img src="${element.foto}" height="60" alt=""></th>
        <td>${element.marca}</td>
        <td>${element.ano}</td>
        <td>${element.nome}</td>
        <td>
            <p>Lance inicial: ${element.lance_minimo}</p>
            <p>Número de lances: ${element.numero_lances}</p>
            <button class="btn font-weight-bold text-uppercase" onclick="window.location.href='detalhes.html?veiculo=${element.id}'" style="background: var(--cinza-escuro);color:var(--branco); font-size: 12px;">dar lance</button>
        </td>
    </tr>`;
      document.getElementById("tabela-veiculos").innerHTML += item;
    });
    
}