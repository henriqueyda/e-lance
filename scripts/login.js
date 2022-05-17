$(function () {

    $('form').on('submit', function (e) {
  
        e.preventDefault();
  
        $.ajax({

            type: 'post',
            url: 'https://o08k2cv2u2.execute-api.us-east-1.amazonaws.com/versao1',
            data: $('form').serialize(),
            success: function (response) {
                if(response.statusCode == "200"){
                    let username = "username=" + document.getElementById("email_address").value;
                    let d = new Date();
                    d.setTime( d.getTime() + 60 * 60 * 1000 );
                    let expires = "expires="+ d.toUTCString();
                    let c  = username + ";" + expires + ";path=/";
                    document.cookie = c;
                    alert(response.body)
                    window.location.replace('index.html');
                }
                if(response.statusCode == "401"){
                    alert(response.body)
                    window.location.reload()
                }
            }
        });
  
    });
  
});