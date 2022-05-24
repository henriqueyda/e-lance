$(function () {
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split( ';' );
  let email;
  for( let i = 0; i < ca.length; i++ ){
      if( ca[i].indexOf( "username=" ) == 0 ){
          email = ca[i].substring( "username=".length, ca[i].length );
      }
      if( ca[i].indexOf( " tipo=" ) == 0 ){
        tipo = ca[i].substring( " tipo=".length, ca[i].length );
      }
  }

  if(tipo != "vendedor"){
    $('form').on('submit', function (e) {
      e.preventDefault();
  
      $.ajax({
        type: 'post',
        url: 'https://9onbskhs1i.execute-api.us-east-1.amazonaws.com/versao1',
        data: $('form').serialize() + "&email=" + email,
        success: function (response) {
          if(response.statusCode == "400"){
            alert("Erro ao cadastrar veículo!")
          }
          if(response.statusCode == "200"){
            alert("Veículo cadastrado com sucesso!")
            window.location.reload()
          }
        }
      });
  
    });
  }
  else {
    alert('Você precisa estar logado como vendedor para acessar esta página');
    window.location.replace('index.html');
  }
  
  });

$("#url").blur(function(e){
    // debugger
    if ($("#url").val() != '') {
        $("#imgUrl").attr("src", e.currentTarget.value);       
    }else{
        $("#imgUrl").attr("src", "images/sem-foto.jpg");  
    }
});

//mask para campo ano somente numeros
$('#ano').keyup(function () {
    this.value = this.value.replace(/[^0-9]/g, '');
  });