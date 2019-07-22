function ep_login(correo_usuario, contrasena){
    //envio correo y contraseña, recibo ok o rechazo    
    $.post(ep_login, {correo: correo_usuario, contrasena: contrasena}, obtener_datos_de_servidor, "json")
    .done(function() {
        $('#login_correo').val('');
        $('#login_contrasena').val('');
        objeto_maestro_usuario.correo = correo_usuario;
        objeto_maestro_usuario.contrasena = contrasena;

    })
    .fail(function() {
        $("#msj_response_login").text("No se pudo enviar la consulta al servidor. Aguarde unos instantes y reintente.");
    });
};

function obtener_datos_de_servidor (response){
    //Se llama desde el endpoint de logueo.
    if (response.mensaje == "401"){
        $("#msj_response_login").text("Usuario o contraseña incorrectos.");
        
        //blanqueo el usuario y contraseña, porque falló.
        objeto_maestro_usuario.correo = '';
        objeto_maestro_usuario.contrasena = '';
    }else{
        //guardo nombre y apellido del usuario
        objeto_maestro_usuario.nombre = response.nombre;
        objeto_maestro_usuario.apellido = response.apellido;
        
        //Solicita los datos que haya de este usuario en la db - los carga y continua a la sig vista
        ep_datos_usuario(objeto_maestro_usuario.correo);



        //Redirijo a vista de inicio
        $.mobile.navigate('#inicio');
    };

};


function ep_datos_usuario(usuario){
    //envio correo del usuario - recibo el objeto maestro de datos
    $.post(ep_datos_usuario, {correo: usuario}, almacenar_informacion, "json")
    .fail(function() {
        alert("No se pudo enviar la consulta al servidor.");
    });
};

function almacenar_informacion (response){
    //Se llama desde el endpoint de obtención de datos.
    if (response.mensaje == "404"){
        alert("No hay datos por el usuario");
    }else{
        //Empaqueto datos en el objeto maestro de datos e inserto en localstorage
        


        guardar_datos_en_localstorage();
        
        //Actualizo vistas
        procesar_tableros();
        cargar_elementos_en_inicio();
        cargar_lista_de_borradores();

    };

};

function ep_crear_usuario (correo_usuario, contrasena_usuario, nombre_usuario, apellido_usuario){
    $.post(ep_crear_usuario, {correo: correo_usuario, contrasena: contrasena_usuario, nombre: nombre_usuario, apellido: apellido_usuario}, confirmacion_creacion_usuario, "json")
    .fail(function() {
        $("#msj_response_login").text("No se pudo enviar la consulta al servidor. Aguarde unos instantes y reintente.");
    });
};

function confirmacion_creacion_usuario(response){
    if(response == true){
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
    }else{
        //este correo estaba usado, falló la creación
        $("#msj_response_login").text("El correo está en uso. Pruebe con uno diferente, o intente loguear a su cuenta");

        //vuelvo a setear la visibilidad de los formularios como estaba
        $('#formulario_crear_cuenta').removeClass('ocultar');
        $('#msj_mas_informacion').addClass('ocultar');
        $('#formulario_mas_información').addClass('ocultar');
        $('#acceder_cuenta').removeClass('ocultar');
        $('#msj_login').removeClass('ocultar');
    };
};

function ep_cargar_datos(correo_usuario, datos_a_cargar){
    $.post(ep_cargar_datos, {correo: correo_usuario, datos: datos_a_cargar}, "json")
    .fail(function() {
        alert("Hubo un error en la comunicación con el servidor");
    });
};