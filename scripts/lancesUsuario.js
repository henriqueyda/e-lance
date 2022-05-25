$(document).ready(function () {
    $.ajax({
        url: `https://d90i52trsl.execute-api.us-east-1.amazonaws.com/versao1?email=${$("#email").val()}`,
        method: 'GET',
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            console.log(data)
        }
    });
});
