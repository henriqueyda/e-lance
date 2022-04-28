$(function () {

    $('form').on('submit', function (e) {

      e.preventDefault();

      $.ajax({
        type: 'post',
        url: 'https://feegcmfjie.execute-api.us-east-1.amazonaws.com/versao1',
        data: $('form').serialize(),
        success: function (response) {
            if(response.statusCode == "409"){
                alert("Email já cadastrado! Tente novamente")
            }
            if(response.statusCode == "200"){
                alert("Usuário cadastrado com sucesso!")
                window.location.reload()
            }
        }
      });

    });

});