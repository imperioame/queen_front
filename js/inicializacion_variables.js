
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
var ep_login;
var ep_cargar_datos;
var ep_datos_usuario;
var ep_crear_usuario;


function inicializar_variables(){

    /*
    ********************************************************************
    //Rutas de los endpoints 
    ********************************************************************
    */
    ep_login = 'login.php';
    ep_crear_usuario = 'crear_usuario.php';
    ep_cargar_datos = 'cargar_datos.php';
    ep_datos_usuario = 'datos_usuario.php';
    
        
    i = 0;
    j = 0;
    subobjeto_de_tablero = {};
    objeto_maestro_datos = {
        es_primera_vez: true,
        ultimo_id_de_tablero: 0,
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
    imagenes_fondo_header[0] = "url(./imgs/bring_it.jpg)";
    imagenes_fondo_header[1] = "url(./imgs/aware.jpg)";
    imagenes_fondo_header[2] = "url(./imgs/barro.jpg)";
    imagenes_fondo_header[3] = "url(./imgs/camosas.jpg)";
    imagenes_fondo_header[4] = "url(./imgs/destino.jpg)";


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

    var datos_guardados = window.localStorage.getItem('datos_app');
    var dato_de_usuario_guardado = window.localStorage.getItem('datos_usuario');

    //Me fijo si hay datos guardados o no
    if (datos_guardados != "undefined" && datos_guardados != null && datos_guardados != "") {
        
        console.log("hay datos guardados, y los extraigo");
        
        objeto_maestro_datos = JSON.parse(datos_guardados);

        objeto_maestro_datos.es_primera_vez = false;

        //Me anticipo ordenando el array de elementos por id_tablero
            //La función comparar_elementos_por_tablero está definida en index.js
            //objeto_maestro_datos.elementos.sort( comparar_elementos_por_tablero );   

        for (i in objeto_maestro_datos.tableros){
            console.log("Estoy creando las vistas de los de tableros");
            /* Del objeto, tableros me define las vistas que tengo que crear, y el contenido qeu 
            tengo que meter en la vista de "Tableros" */

            //la función está definido en index.js - crea los html para la vista del tablero - no llena de contenido
            crear_vista_de_tablero(objeto_maestro_datos.tableros[i]);

            /* SE REDEFINIÓ LA LÓGICA : LA FUNCIÓN crear_vista_de_tablero POPULA SU PROPIO TABLERO
            //ahora lleno las vistas que cree con los elementos que les corresponda
            for (j in objeto_maestro_datos.elementos){
                console.log("Estoy buscando los datos que le correspondan a las vistas de tableros");
                    // De este objeto traigo todos los elementos para incluirlos en la vista recien creada
                    //para eso tengo que filtrar los que correspondan al id de este tablero particular 

                    //la función está definida en index.js - crea el html que corresponda para el contenido en el tablero
                    crear_contenido_en_vista_de_tablero(objeto_maestro_datos.elementos[j]);
                    
            };*/
        };


        //Por ultimo, luego de levantar la info, cargo los tableros en la vista de TABLEROS
        procesar_tableros_en_vista_de_tableros();

        
        //Hay datos guardados = usuario ya logueado
        //Salteo la página de bienvenida
        $.mobile.navigate('#inicio');

    }else{
        console.log('No hay nada en localstorate');
        /*Esto lo hice en la incialización de variables
        //Para no romper nada, defino la estuctura básica del objeto maestro
            objeto_maestro_datos.tableros = [];
            objeto_maestro_datos.elementos = [];

        //Si no hay datos guardados, seteo que el "ultimo_id_de_tablero" es 0 y es_primera_vez es true
            objeto_maestro_datos.es_primera_vez = true;
            objeto_maestro_datos.ultimo_id_de_tablero = 0;
        */

        //también oculto en la vista de tableros los section fijados y otros
            ocultar_tableros_fijados_y_otros();

            console.log('este es el nuevo esquema de datos: ');
            console.log(objeto_maestro_datos);

            //Puede ser que aún no haya creado absolutamente nada, pero tenga usuario y esté logueado.
            //Consulto si está logueado:
            if (dato_de_usuario_guardado != "undefined" && dato_de_usuario_guardado != null && dato_de_usuario_guardado != ""){
                //Lo llevo a la vista de inicio
                $.mobile.navigate('#inicio');
            };
            //Si no estaba logueado no pasa nada, se queda en bienvenida

    }

    //Adicionalmente, cargo los elementos que correspondan a INICIO - esto implica la fecha de hoy, hay que cargarla haya o no datos en localstorage
    cargar_elementos_en_inicio();
    //también creo la lista de papelera en página de ajustes (para actualizar el texto al que corersponda)
    cargar_lista_de_borradores();


});
