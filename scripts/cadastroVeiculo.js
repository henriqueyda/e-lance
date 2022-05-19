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