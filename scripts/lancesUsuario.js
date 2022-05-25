$(document).ready(function () {
    $.ajax({
        url: 'https://q06uzv22s4.execute-api.us-east-1.amazonaws.com/testeinicial/',
        method: 'GET',
        ContentType: "application/json;charset=UTF-8",
        sucess: function (data) {
            console.log(data)
        }
    });
});