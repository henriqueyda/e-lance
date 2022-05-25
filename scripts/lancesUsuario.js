$(document).ready(function () {
    $.ajax({
        url: 'https://5uf2ge170m.execute-api.us-east-1.amazonaws.com/versao1',
        method: 'GET',
        contentType: "application/json;charset=UTF-8",
        sucess: function (data) {
            console.log(data)
        }
    });
});