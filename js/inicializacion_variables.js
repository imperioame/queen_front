
/* 
-------------------------------------------------------------------------------------------------------
Declaración de variables globales
-------------------------------------------------------------------------------------------------------
*/ 

var i;
var j;
var subobjeto_de_tablero;
var objeto_maestro_datos;
var objeto_maestro_usuario;
var imagenes_fondo_header;
var existe_algun_tablero_visible;
var dd;
var mm;
var yyyy;
var formato_de_fecha_almacenable;
var contrasenas_matchean;
//var ep_cargar_datos;
var url_ep_login;
var url_ep_crear_usuario;
var url_ep_cargar_tablero;
var url_ep_cargar_elemento;
var url_ep_datos_usuario;
var url_ep_eliminar_elemento;
var url_ep_eliminar_tablero;


function inicializar_variables(){

    /*
    ********************************************************************
    //Rutas de los endpoints 
    ********************************************************************
    */
    url_ep_login = 'http://id.distritografico.com.ar/queen_back/php/login.php';
    url_ep_crear_usuario = 'http://id.distritografico.com.ar/queen_back/php/crear_usuario.php';
    url_ep_cargar_tablero = 'http://id.distritografico.com.ar/queen_back/php/cargar_tablero.php';
    url_ep_datos_usuario = 'http://id.distritografico.com.ar/queen_back/php/datos_usuario.php';
    url_ep_cargar_elemento = 'http://id.distritografico.com.ar/queen_back/php/cargar_elemento.php';
    url_ep_eliminar_tablero = 'http://id.distritografico.com.ar/queen_back/php/eliminar_tablero.php'
    url_ep_eliminar_elemento = 'http://id.distritografico.com.ar/queen_back/php/eliminar_elemento.php'
    // ********************** Rutas localhost ********************** //
    /*
    url_ep_login = 'localhost/queen_back/php/php/login.php';
    url_ep_crear_usuario = 'localhost/queen_back/php/php/crear_usuario.php';
    url_ep_cargar_tablero = 'localhost/queen_back/php/php/cargar_tablero.php';
    url_ep_datos_usuario = 'localhost/queen_back/php/php/datos_usuario.php';
    url_ep_cargar_elemento = 'localhost/queen_back/php/php/cargar_elemento.php';
    url_ep_eliminar_tablero = 'localhost/queen_back/php/php/eliminar_tablero.php'
    url_ep_eliminar_elemento = 'localhost/queen_back/php/php/eliminar_elemento.php'
    */

    i = 0;
    j = 0;
    subobjeto_de_tablero = {};
    objeto_maestro_datos = {
        //es_primera_vez: true,
        //ultimo_id_de_tablero: 0,
        //ultimo_id_de_elemento: 0,
        tableros: [],
        elementos: [],
        estados: []
    };
    objeto_maestro_usuario = {
        correo: '',
        contrasena: '',
        nombre: '',
        apellido: ''
    }

    

    existe_algun_tablero_visible = false;

    dd = '';
    mm = '';
    yyyy = '';

    // Vector de archivos de img para los header
    imagenes_fondo_header = [];
    imagenes_fondo_header[0] = "url(./imgs/arte_antiguo.jpg)";
    imagenes_fondo_header[1] = "url(./imgs/astronomia.jpg)";
    imagenes_fondo_header[2] = "url(./imgs/floral.jpg)";
    imagenes_fondo_header[3] = "url(./imgs/lineas.jpg)";
    imagenes_fondo_header[4] = "url(./imgs/semillas.jpg)";
    imagenes_fondo_header[5] = "url(./imgs/triangulos.jpg)";
    /*
    Imágenes de mi autoría. No se utilizan porque requieren ajustes y retoques para quedar bien
    imagenes_fondo_header[0] = "url(./imgs/bring_it.jpg)";
    imagenes_fondo_header[1] = "url(./imgs/aware.jpg)";
    imagenes_fondo_header[2] = "url(./imgs/barro.jpg)";
    imagenes_fondo_header[3] = "url(./imgs/camosas.jpg)";
    imagenes_fondo_header[4] = "url(./imgs/destino.jpg)";
    */

    // Array de status - incluye colores
    objeto_maestro_datos.estados = [{
        titulo: "Nuevo",
        valor: "nuevo",
        color: "#9CB5FF"
    },
    {
        titulo: "Pendiente",
        valor: "pendiente",
        color: "#EBD265"
    },
    {
        titulo: "En progreso",
        valor: "en_progreso",
        color: "#A8FF78"
    },
    {
        titulo: "Realizado",
        valor: "realizado",
        color: "#7DF0D4"
    }];

    contrasenas_matchean = false;

};

//fuerzo la inicialización de las variables antes del evento document ready - esto me está rompiendo el pagebeforeshow
inicializar_variables();

/* 
-------------------------------------------------------------------------------------------------------
Obtención de datos de localstorage
-------------------------------------------------------------------------------------------------------
*/ 
$(document).on('ready', function () {
    //ajuste de transición por defecto
    $.mobile.defaultPageTransition = 'fade';
    $.mobile.defaultDialogTransition = 'pop';

    var datos_guardados = window.localStorage.getItem('datos_app');
    var dato_de_usuario_guardado = window.localStorage.getItem('datos_usuario');

    //Me fijo si hay datos guardados o no
    if (datos_guardados != "undefined" && datos_guardados != null && datos_guardados != "") {
        
        console.log("hay datos guardados, y los extraigo");
        
        objeto_maestro_datos = JSON.parse(datos_guardados);

        //objeto_maestro_datos.es_primera_vez = false;

        //Creo las vistas - las lleno de datos - cargo los tableros en la vista de tableros
        procesar_tableros();
        
        //Hay datos guardados = usuario ya logueado
        //Salteo la página de bienvenida
        //$.mobile.navigate('#inicio');

    }else{
        console.log('No hay nada en localstorate');

        //también oculto en la vista de tableros los section fijados y otros
            ocultar_tableros_fijados_y_otros();

            console.log('este es el nuevo esquema de datos: ');
            console.log(objeto_maestro_datos);

    };
    //Puede ser que aún no haya creado absolutamente nada, pero tenga usuario y esté logueado.
    //Consulto si está logueado:
    if (dato_de_usuario_guardado != "undefined" && dato_de_usuario_guardado != null && dato_de_usuario_guardado != ""){
        
        objeto_maestro_usuario = JSON.parse(dato_de_usuario_guardado);
        
        //Lo llevo a la vista de inicio
        $.mobile.navigate('#inicio');

        //Si está logueado, pido datos al servidor:
        ep_datos_usuario(objeto_maestro_usuario.correo);
    };
    //Si no estaba logueado no pasa nada, se queda en bienvenida

});
