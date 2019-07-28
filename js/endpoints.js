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
    .fail(function(response) {
        console.log('falló en logueo. Mensaje del servidor:');
        console.log(response.mensaje);

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
    }).fail(function(response){
        console.log('falló obtener datos de usuario. Mensaje del servidor:');
        console.log(response.mensaje);
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
    .fail(function(response) {
        console.log('falló en crear usuario. Mensaje del servidor:');
        console.log(response.mensaje);

        //este correo estaba usado, falló la creación
        $("#msj_response_login").text("El correo está en uso. Pruebe con uno diferente, o intente loguear a su cuenta");

        $('#loader_bienvenida').addClass('ocultar');

    });
};

function ep_cargar_tablero(correo_usuario, datos_a_cargar){
    $.post(url_ep_cargar_tablero, {correo: correo_usuario, tablero: datos_a_cargar}, "json")
    .done(function(response){
        
        //pregunto si se suponía que tenía que actualizar o cargar un nuevo tablero
        if(datos_a_cargar.id_tablero == -1){
            //tenía uqe cargar uno nuevo, entonces:
            $('#titulo_tablero').val('');
            response = JSON.parse(response);
            console.log('recibí el id del tablero: ');
            console.log(response);
    
    
            datos_a_cargar.id_tablero = response.id_tablero;
    
    
            objeto_maestro_datos.tableros[objeto_maestro_datos.tableros.length] = datos_a_cargar;
            //objeto_maestro_datos.ultimo_id_de_tablero = id_de_nuevo_tablero;
        
        
            //Guardo en local
            guardar_datos_en_localstorage();
    
            //Llamo a las funciones creadoras
            crear_vista_de_tablero(datos_a_cargar);
            console.log('creé la vista');
            procesar_tableros_en_vista_de_tableros();
    
            //Escondo el spinner y vuelvo a mostrar el '+'
            $('.menu_agregar_tablero').slideToggle();
            $('#tableros .agregar').removeClass('ocultar');
    
            // LLevo al usuario a la nueva vista
            var id_tablero_string = 'tablero_numero_' + datos_a_cargar.id_tablero;
            $.mobile.navigate( '#'+id_tablero_string );
            console.log('llevé al usuario a la nueva vista');
    
            //return response.id_tablero;
        }else{
            //El tablero existía, solo tenía que actualizarlo
            
            //Guardo en local
            guardar_datos_en_localstorage();
            
            //Recargo página de tableros
            procesar_tableros_en_vista_de_tableros();

        };
    })
    .fail(function(response) {
        console.log('falló la carga del tablero. Mensaje del servidor:');
        console.log(response.mensaje);
        $.mobile.navigate('#inicio');
        //return -1;
    });
};

function ep_cargar_elemento(objeto_de_elemento){
    $.post(url_ep_cargar_elemento, {elemento: objeto_de_elemento}, "json")
    .done(function(response){
        response = JSON.parse(response);
        return response.id_elemento;
    })
    .fail(function(response) {
        console.log('falló en cargar un elemento. Mensaje del servidor:');
        console.log(response.mensaje);
        return '-1';
    });
};


function ep_eliminar_elemento(correo_usuario, id_tablero){
    $.post(url_ep_eliminar_elemento, {correo: correo_usuario, id_tablero: id_tablero}, "json")
    .done(function(){

        //Borre de bd, ahora borro en local
        //Primero borro todos los elementos que sean de este tablero
        borrar_elementos_del_sistema(id_tablero);

        //Ahora borro el tablero en bd y local
        ep_eliminar_tablero(correo_usuario. id_tablero);
    })
    .fail(function(response) {
        console.log('falló en eliminar el elemento. Mensaje del servidor:');
        console.log(response.mensaje);
        //return -1;
    });
};

function ep_eliminar_tablero(correo_usuario, id_tablero){
    $.post(url_ep_eliminar_tablero, {correo: correo_usuario, id_tablero: id_tablero}, "json")
    .done(function(){
        
        //Borré de bd, ahora borro de local
        console.log('lo busco en el array de tableros');
        for (i in objeto_maestro_datos.tableros){
            if(objeto_maestro_datos.tableros[i].id_tablero == id_tablero){
                console.log('encontré el tablero que tengo que eliminar');
                //console.log('es el tablero: ');
                //console.log(objeto_maestro_datos.tableros[i]);

                var eliminado = objeto_maestro_datos.tableros.splice(i,1);
                console.log('eliminé el tablero:');
                console.log(eliminado);

            };
        };


        //Guardo los datos en bd y local
        guardar_datos_en_localstorage();

        //Recargo página de tableros
        procesar_tableros_en_vista_de_tableros();

        //Reproceso la lista de borradores en ajustes
        cargar_lista_de_borradores();

        //Llevo al usuario a la vista de tableros
        $.mobile.navigate('#tableros');

    })
    .fail(function(response) {
        console.log('falló en eliminar el tablero. Mensaje del servidor:');
        console.log(response.mensaje);
        //return -1;
    });
};