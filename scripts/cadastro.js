$(function () {

    $('form').on('submit', function (e) {

      e.preventDefault();

      $.ajax({
        type: 'post',
        url: 'https://feegcmfjie.execute-api.us-east-1.amazonaws.com/versao1',
        data: $('form').serialize(),
        success: function () {
          alert('form was submitted');
        }
      });

    });

});