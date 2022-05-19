document.getElementById("logout").onclick = (e) =>{
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split( ';' );
    let email;
    for( let i = 0; i < ca.length; i++ ){
        if( ca[i].indexOf( "username=" ) == 0 ){
            email = ca[i].substring( "username=".length, ca[i].length );
        }
    }
    if(email != null){
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        alert('Usuário deslogado com sucesso!');
        //limpar o cookie do name e header
        document.location.reload(true);
    }
    else{
        alert('Já está deslogado!');
        e.preventDefault();
    }
}
