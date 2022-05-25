$(function () {

    $('form').on('submit', function (e) {
  
        e.preventDefault();
        let tipo;

        const xhttp = new XMLHttpRequest();

        var url = "https://w9bdr30j99.execute-api.us-east-1.amazonaws.com/versao1";
        xhttp.open("POST", url);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        var data = {
            "email": document.getElementById("email_address").value
        };
        var jsondata = JSON.stringify(data);
    
        xhttp.send(jsondata);
    
        xhttp.onload = function() {
            const obj = JSON.parse(xhttp.responseText);
            if (obj.statusCode == 200) {
                let prop = JSON.parse(obj.body);
                tipo = prop.tipo;
                $.ajax({

                    type: 'post',
                    url: 'https://o08k2cv2u2.execute-api.us-east-1.amazonaws.com/versao1',
                    data: $('form').serialize(),
                    success: function (response) {
                        if(response.statusCode == "200"){
                            let username = "username=" + document.getElementById("email_address").value;
                            tipo = "tipo=" + tipo;
                            let d = new Date();
                            d.setTime( d.getTime() + 60 * 60 * 1000 );
                            let expires = "expires="+ d.toUTCString();
                            let cookie1  = username + ";" + expires + ";path=/";
                            let cookie2 = tipo + ";" + expires + ";path=/";
                            document.cookie = cookie1;
                            document.cookie = cookie2;
        
                            alert(response.body)
                            window.location.replace('index.html');
                        }
                        if(response.statusCode == "401"){
                            alert(response.body)
                            window.location.reload()
                        }
                    }
                });
            }
        }
  
    });
  
});