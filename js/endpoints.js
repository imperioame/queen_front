function ep_login(correo_usuario, contrasena){
    //envio correo y contraseña, recibo ok o rechazo    
    $.post(url_ep_login, {correo: correo_usuario, contrasena: contrasena}, "json")
    .done(function(response) {
        //Limpio los datos de acceso
        $('#login_correo').val('');
        $('#login_contrasena').val('');
        objeto_maestro_usuario.correo = correo_usuario;
        objeto_maestro_usuario.contrasena = contrasena;

        //guardo nombre y apellido del usuario
        objeto_maestro_usuario.nombre = response.nombre;
        objeto_maestro_usuario.apellido = response.apellido;

        //Solicita los datos que haya de este usuario en la db - los carga y continua a la sig vista
        ep_datos_usuario(objeto_maestro_usuario.correo);

        //Redirijo a vista de inicio
        $.mobile.navigate('#inicio');
    })
    .fail(function() {
        $("#msj_response_login").text("Usuario o contraseña incorrectos.");
    });
};


function ep_datos_usuario(usuario){
    //envio correo del usuario - recibo el objeto maestro de datos
    $.post(url_ep_datos_usuario, {correo: usuario}, "json").done(function(response){
        
        //Empaqueto datos en el objeto maestro de datos e inserto en localstorage

        objeto_maestro_datos.tableros = response.tableros;
        objeto_maestro_datos.elementos = response.elementos;

        guardar_datos_en_localstorage();

        //Actualizo vistas
        procesar_tableros();
        cargar_elementos_en_inicio();
        cargar_lista_de_borradores();
    });
};

function ep_crear_usuario (correo_usuario, contrasena_usuario, nombre_usuario, apellido_usuario){
    $.post(url_ep_crear_usuario, {correo: correo_usuario, contrasena: contrasena_usuario, nombre: nombre_usuario, apellido: apellido_usuario}, "json")
    .done(function(){
        $('#formulario_crear_cuenta #crear_nombre').val('');
        $('#formulario_crear_cuenta #crear_apellido').val('');
        $('#formulario_crear_cuenta #crear_correo').val('');
        $('#formulario_crear_cuenta #crear_contrasena').val('');
        $('#formulario_crear_cuenta #repetir_contrasena').val('');
        objeto_maestro_usuario.correo = correo_usuario;
        objeto_maestro_usuario.contrasena = contrasena_usuario;
        objeto_maestro_usuario.nombre = nombre_usuario;
        objeto_maestro_usuario.apellido = apellido_usuario;

        $.mobile.navigate('#inicio');
    })
    .fail(function() {
        //este correo estaba usado, falló la creación
        $("#msj_response_login").text("El correo está en uso. Pruebe con uno diferente, o intente loguear a su cuenta");

        //vuelvo a setear la visibilidad de los formularios como estaba
        $('#formulario_crear_cuenta').removeClass('ocultar');
        $('#msj_mas_informacion').addClass('ocultar');
        $('#formulario_mas_información').addClass('ocultar');
        $('#acceder_cuenta').removeClass('ocultar');
        $('#msj_login').removeClass('ocultar');
    });
};

function ep_cargar_tablero(correo_usuario, datos_a_cargar){
    $.post(url_ep_cargar_datos, {correo: correo_usuario, datos: datos_a_cargar}, "json")
    .done(function(){

    })
    .fail(function() {
        alert("Hubo un error en la comunicación con el servidor");
    });
};

function ep_cargar_elemento(objeto_de_elemento){
    $.post(url_ep_cargar_elemento, {elemento: objeto_de_elemento}, "json")
    .done(function(response){
        return response;
    })
    .fail(function() {
        return '-1';
    });
};
