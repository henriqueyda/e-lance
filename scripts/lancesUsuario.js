$(document).ready(function () {
    $.ajax({
        url: 'https://d90i52trsl.execute-api.us-east-1.amazonaws.com/versao1',
        method: 'POST',
        data: JSON.stringify({"email": document.getElementById("email_address").value}),
        contentType: "application/json;charset=UTF-8",
        sucess: function (data) {
            console.log(data)
        }
    });
});
