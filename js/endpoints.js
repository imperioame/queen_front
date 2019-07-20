function ep_login(correo_usuario, contrasena){
    //envio correo y contraseña, recibo ok o rechazo    
    $.post(ep_login, {correo: correo_usuario, contrasena: contrasena}, obtener_datos_de_servidor, "json")

    .done(function() {
        $('#login_correo').val('');
        $('#login_contrasena').val('');    
    })
    .fail(function() {
        $("#msj_response_login").text("No se pudo enviar la consulta al servidor. Aguarde unos instantes y reintente.");
    });
};

function ep_datos_usuario(usuario){
    //envio correo del usuario - recibo el objeto maestro de datos

    return response;
}