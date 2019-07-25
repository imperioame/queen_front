function ep_login(correo_usuario, contrasena){
    //envio correo y contraseña, recibo ok o rechazo    
    $.post(url_ep_login, {correo: correo_usuario, contrasena: contrasena}, "json")
    .done(function(response) {
        //Limpio los datos de acceso
        $('#login_correo').val('');
        $('#login_contrasena').val('');
        objeto_maestro_usuario.correo = correo_usuario;
        objeto_maestro_usuario.contrasena = contrasena;


        //veamos que me trajo:
        console.log('Así lo traigo de la api:');
        console.log(response);
        console.log('Así lo parseo:');
        console.log(JSON.parse(response));

        
        //guardo nombre y apellido del usuario
        objeto_maestro_usuario.nombre = JSON.parse(response).nombre;
        objeto_maestro_usuario.apellido = JSON.parse(response).apellido;

        //Guardo los datos de usuario en local:
        guardar_usuario_en_localstorage();

        //Solicita los datos que haya de este usuario en la db - los carga y continua a la sig vista
        ep_datos_usuario(objeto_maestro_usuario.correo);

        //Redirijo a vista de inicio
        $.mobile.navigate('#inicio');

        $('#loader_bienvenida').addClass('ocultar');

    })
    .fail(function() {
        $("#msj_response_login").text("Usuario o contraseña incorrectos.");
        $('#loader_bienvenida').addClass('ocultar');

    });
};


function ep_datos_usuario(usuario){
    //envio correo del usuario - recibo el objeto maestro de datos
    $.post(url_ep_datos_usuario, {correo: usuario}, "json").done(function(response){
        
        //Empaqueto datos en el objeto maestro de datos e inserto en localstorage

        console.log('recibí esto:');
        console.log(JSON.parse(response));

        objeto_maestro_datos.tableros = JSON.parse(response).tableros;
        objeto_maestro_datos.elementos = JSON.parse(response).elementos;

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

        guardar_usuario_en_localstorage();

        //oculto formularios y muestro msj de bienvenida
        $('#logueo').addClass('ocultar');
        $('#msj_bienvenida').removeClass('ocultar');
        $('#msj_bienvenida h1').append(objeto_maestro_usuario.nombre);

        $('#loader_bienvenida').addClass('ocultar');
    })
    .fail(function() {

        //este correo estaba usado, falló la creación
        $("#msj_response_login").text("El correo está en uso. Pruebe con uno diferente, o intente loguear a su cuenta");

        $('#loader_bienvenida').addClass('ocultar');

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
        response = JSON.parse(response);
        return response.id_elemento;
    })
    .fail(function() {
        return '-1';
    });
};
