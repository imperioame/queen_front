/* 
-------------------------------------------------------------------------------------------------------
FUNCIONES CREADORAS
-------------------------------------------------------------------------------------------------------
*/ 

function crear_contenido_en_vista_de_tablero(objeto_de_elementos){
    console.log('Estoy en la función qeu inyecta contenido a las vistas de tableros');
    /* 
    Forma de hacer las cosas:
    
    Recibo el elemento con sus claves y valores. Recibo el id del tablero

    pregunto si el id de tablero del elemento es igual al id de elemento que me pasaron.
    Si NOOOOO es igual, no hago nada;

    Si es igual:

        Consulto si es lista
            Si es lista consulto si ya había una ul abierta
                SI lo hay la inserto como un list item al final
                Si NO lo hay, creo una ul y un li al final de todo elr esto del contenido

        Si tiene status o fecha muestro esos componentes y cargo los datos

    */

    //Debería venir ordenado
    // primero formateo el "id_de_tablero" al string correspondiente para poder buscar el elemento
    id_del_tablero = 'tablero_numero_' + objeto_de_elementos.id_tablero;
    

    //Me aseguro de que el tablero no se haya borrado
    if($('#' + id_del_tablero).length != 0){

    console.log('esto es lo qeu voy a inyectar');
    console.log(objeto_de_elementos);
        
    //me fijo si es elemento de una lista, o solo texto
    if (objeto_de_elementos.es_lista){
        //es elemento de una lista, en principio me fijo si hay una ul
/*

    //Cambio esto por FORM - para que funcionen los checkbox

        if( !$('#' + id_del_tablero +' main ul').length){
            console.log('no encontró lista');

            //creo lista y la inyecto
            var nuevo_ul = '<ul class="tablero_Particular_listview"></ul>';
            $('#' + id_del_tablero +' main').append(nuevo_ul);
            //Refresheo la listview
            $('#' + id_del_tablero +' main .tablero_Particular_listview').listview();
        };
*/
        if( !$('#' + id_del_tablero +' main form fieldset').length){
            console.log('no encontró form con fieldset');

            //creo fieldset para checkboxes
            var nuevo_fieldset = '<form class="marco_fieldset"><fieldset data-role="controlgroup"></fieldset></form>';
            $('#' + id_del_tablero +' main').append(nuevo_fieldset);
        };

        //Me aseguré de que exista un ul
        //Ahora meto el contenido
        var status_es_nulo = (objeto_de_elementos.status === '') || (objeto_de_elementos.status === undefined) || (objeto_de_elementos.status === null);
        var texto_status = '';
        var css_de_status = '';

        //Proceso el texto de status y el CSS de status
        if(!status_es_nulo){
            texto_status = objeto_de_elementos.status.toString();

            css_de_status = 'estado_' + texto_status;
            
            console.log(css_de_status);

            texto_status = texto_status.substring(0,1);
            console.log('intenté convertir un status a string. me dio esto:');
            console.log(texto_status);
        }
        

        /*
        //De esta manera lo haría si funcionase el TOOLTIP
        var contenido_de_lista = `<li>\n
            <div class="elemento">\n
                <input type="checkbox" value="Realizado">\n
                <p class="contenido_elemento">`+ objeto_de_elementos.contenido +`</p>\n
                <div class="props">\n
                    <div class="estado_elemento `+ css_de_status +`"><a href="#tooltip_status_`+ objeto_de_elementos.id_tablero +`" data-rel="popup">` + texto_status + `</a></div>\n
                    <div class="deadline"><img src="imgs/icons/calendario.svg" alt="Fecha límite"><a href="#tooltip_deadline_`+ objeto_de_elementos.id_tablero + `" data-rel="popup">`+ objeto_de_elementos.deadline +`</a></div>\n
                </div>\n
            </div>\n
        </li>`;
        */


       var contenido_de_lista = `<label for="checkbox_elemento_`+ objeto_de_elementos.id_tablero +`_`+ objeto_de_elementos.indice_elemento +`">`+ objeto_de_elementos.contenido + `</label>\n
       <input type="checkbox" value="Realizado" id="checkbox_elemento_`+ objeto_de_elementos.id_tablero +`_`+ objeto_de_elementos.indice_elemento +`" name=checkbox_elemento_`+ objeto_de_elementos.id_tablero +`_`+ objeto_de_elementos.indice_elemento +` ">
       <!-- Por ahora esto no funciona\n
       <div class="props">\n
                        <div class="estado_elemento `+ css_de_status +`">p</div>\n
                        <div class="deadline"><img src="imgs/icons/calendario.svg" alt="Fecha límite"></div>\n
        </div> -->`;

        /*
        //A falta del tooltip:
        var contenido_de_lista = `<li data-icon="false">\n
            <a href="#">\n
                <div class="elemento">\n
                <form>\n
                    <label>\n
                        <input type="checkbox" name="checkbox_`+ objeto_de_elementos.indice_elemento +`">`+ objeto_de_elementos.contenido +`\n
                    </label>\n
                </form>\n
                    <div class="props">\n
                        <div class="estado_elemento `+ css_de_status +`"></div>\n
                        <div class="deadline"><img src="imgs/icons/calendario.svg" alt="Fecha límite"></div>\n
                    </div>\n
                </div>\n
            </a>\n
        </li>`;
        */
        


        //El tooltip se creó al crear la vista del tablero. Hay que cargarle el contenido nomás
        //esto se carga cuando el usuario haga click para abrir el popup
        //También hay que ponerle el color de status correspondiente.

        /*
        // SOLO SI USO UL
        //Lo inyecto en la UL
        $('#' + id_del_tablero +' main .tablero_Particular_listview').append(contenido_de_lista);
        $('#' + id_del_tablero +' main .tablero_Particular_listview').listview('refresh');
        console.log('cargue un li nuevo');
*/

        //Lo inyecto en EL FIELDSET
        $('#' + id_del_tablero +' main form fieldset').append(contenido_de_lista).enhanceWithin();
        //$('#' + id_del_tablero +' main form').trigger('create');
        //$('#' + id_del_tablero +' main form').enhanceWithin();
        //$('#' + id_del_tablero +' main form fieldset').trigger('create');
        console.log('cargue un checkbox nuevo');


        /*
        No me están andando el posicionamiento de estos elementos. los oculto

                // me fijo si tiene o no datos en status y deadline para ocultarlo o no
                if(status_es_nulo){
                    $('#' + id_del_tablero +' main .tablero_Particular_listview li:last .props .estado_elemento').addClass('ocultar');
                    console.log('oculté un status');
                }
                if(objeto_de_elementos.fecha_deadline === ''){
                    $('#' + id_del_tablero +' main .tablero_Particular_listview li:last .props .deadline').addClass('ocultar');
                    console.log('oculté un deadline');
                }
        */


    }else{
        //no es elemento de una lista, es un bloque de texto
        var contenido_bloque_texto = '<p>' + objeto_de_elementos.contenido + '</p>';
        $('#' + id_del_tablero +' main').append(contenido_bloque_texto);

        console.log('inyecté un bloque de texto');
    };

    //Oculto el aviso de tablero vacío
    $('#' + id_del_tablero +' main .aviso_de_vista_vacia').addClass('ocultar');

    }else{
        console.log('el contenido corresponde a un tablerooculto. no creo nada.')
    }

};

function procesar_tableros(){
//Gestiona todo el proceso de tableros - de todos los tableros
console.log("Estoy creando las vistas de los de tableros");

    for (i in objeto_maestro_datos.tableros){
        crear_vista_de_tablero(objeto_maestro_datos.tableros[i]);
    };

    //Por ultimo, luego de levantar la info, cargo los tableros en la vista de TABLEROS
    procesar_tableros_en_vista_de_tableros();

};

function crear_vista_de_tablero(objeto_tablero, forzar_creacion){
    //solo creo tableros para los que no estén ocultos
    if(!objeto_tablero.es_oculto || forzar_creacion == true){

        // Preparo el string del id que le corresponda al tablero
        var id_tablero_string = 'tablero_numero_' + objeto_tablero.id_tablero;

        //Creo la vista 
        var nueva_vista = '<div data-role="page" id="' + id_tablero_string + '" class="tablero_particular"></div>';
        //la inserto en el html
        $('body').append(nueva_vista);
    
        //creo el header con título del tablero
        var header_de_nueva_vista = `<header data-role="header">\n
        <!-- Botón de buscdor  -->\n
        <a href="#tableros_buscador` + id_tablero_string +`" data-role="button" data-rel="popup" data-transition="pop" data-position-to="origin" data-icon="lupaw" data-iconshadow="false" data-iconpos="notext" class="ui-btn-right boton_buscar">Buscador</a>\n
        <!-- Popup buscador -->\n
        <div class="header_buscador" id="tableros_buscador`+ id_tablero_string +`" data-role="popup" data-history="false">\n
            <form>\n
                <input data-type="search" id="buscador_de_` + id_tablero_string +`" placeholder="¿Qué buscas?">\n
            </form>\n
        </div>\n
        <!-- Botón de acciones -->\n
        <a href="#tableros_acciones`+ id_tablero_string +`" data-role="button" data-rel="popup" data-transition="pop" data-position-to="origin" data-icon="accionesw" data-iconshadow="false" data-iconpos="notext" class="ui-btn-right">Acciones</a>\n
        <!-- Popup acciones -->\n
        <div class="header_acciones" id="tableros_acciones`+ id_tablero_string +`" data-role="popup" data-history="false">\n
        <ul data-role="listview" data-icon="false">\n
            <li class="ui-li-icon"><a href="#" data-role="button" data-icon="descartar" data-iconshadow="false" data-iconpos="notext" class="descartar">Descartar</a></li>\n
            <!-- <li class="ui-li-icon"><a href="#" data-role="button" data-icon="" data-iconshadow="false" data-iconpos="notext" class="cambiar_color">Cambiar color</a></li> -->\n
            <li class="ui-li-icon fijar"><a href="#" data-role="button" data-icon="fijar" data-iconshadow="false" data-iconpos="notext">Fijar tablero</a></li>\n
            <!-- <li class="ui-li-icon"><a href="#" data-role="button" data-icon="estadisticas" data-iconshadow="false" data-iconpos="notext" class="estadisticas">Ver estadísticas</a></li> -->\n
            </ul>\n
        </div>\n
        <!-- Botón de back -->\n
        <a href="#" data-rel="back" data-icon="atrasw" data-iconpos="notext" class="ui-btn-left">atras</a>\n
        <div class="degrade_de_fondo_header"></div>\n
        <div class="header_texto">\n
            <h1>`+ objeto_tablero.titulo +`</h1>\n
            <p class="descripcion_del_header"></p>\n
        </div>\n
        </header>`;
    
        //Se lo agrego al elemento nuevo
        $('#'+id_tablero_string).append(header_de_nueva_vista);

    
        //Creo el main - le pongo el contenido básico y por defecto
        var main_de_nueva_vista = `<main role="main" class="ui-content" data-filter="true" data-input="#buscador_de_` + id_tablero_string +`">\n
        <!-- Botón para agrgar tableros - todo por js -->\n
        <div class="agregar">\n
        </div>\n
        <!-- A mostrar en caso de que el usuario no tenga contenido en el tablero -->\n
        <div class="aviso_de_vista_vacia">\n
            <h1>Nada por aquí.</h1>\n
            <h2>¡Presioná el botón <strong>+</strong> para agregar contenido!</h2>\n
        </div>\n
        <!-- A mostrar en caso de que el tablero esté en la papelera -->\n
        <div class="aviso_de_tablero_en_papelera">\n
            <h1>Tablero en papelera.</h1>\n
            <p>Este tablero se encuentra en la papelera. Puede recuperarlo para visualizarlo en la vista de tableros, o puede eliminarlo definitivamente</p>\n
            <a href="#" class="ui-btn ui-btn-inline ui-shadow boton_recuperar ui-corner-all">Recuperar</a>\n
            <a href="#popup_confirmacion_borrar_`+ id_tablero_string +`" data-rel="popup" data-position-to="window" class="ui-btn ui-btn-inline ui-shadow boton_eliminar color_rojo ui-corner-all">Eliminar</a>\n
        </div>\n
        </main>\n
        `;

    
        //Se lo agrego a la vista nueva
        $('#'+id_tablero_string).append(main_de_nueva_vista);

            
        //detecto si el tablero esta en papelera, si no lo está, entonces oculto el mensaje de tablero borrado
        if (!objeto_tablero.es_oculto){
            $('#'+id_tablero_string +' main .aviso_de_tablero_en_papelera').addClass('ocultar');
        };
        

    /*
    // Por ahora no va
                var modelo_popup = `<div data-role="popup" id="tooltip_status_`+ objeto_tablero.id_tablero +`" class="ui-content tooltip_status">\n
                    <p><strong></strong></p>\n
                </div>\n
                <div data-role="popup" id="tooltip_deadline_`+ objeto_tablero.id_tablero + `" class="ui-content tooltip_deadline">\n
                    <p></p>\n
                </div>\n`;
    
                //Le agrego los modelos de popup de status y deadline - estos se completarán dinámicamente cuando se los abra
                $('#'+id_tablero_string+' main').append(modelo_popup);
      */          
    
        //Creo el footer
        var footer_de_nueva_vista = `<footer data-role="footer" data-position="fixed">\n
            <div data-role="navbar">\n
                <ul>\n
                    <li><a href="#inicio" data-icon="hoy">Mi día</a></li>\n
                    <li><a href="#tableros" data-icon="tableros">Tableros</a></li>\n
                    <!-- <li><a href="#calendario" data-icon="calendario">Calendario</a></li> -->\n
                    <li><a href="#ajustes" data-icon="ajustes">Ajustes</a></li>\n
                </ul>\n
            </div>\n
        </footer>`;
    
        //Se lo agrego a la vista nueva
        $('#'+id_tablero_string).append(footer_de_nueva_vista);

    
        //Creo el spinner desplegable
        var menu_agregar_elemento_de_nueva_vista = `<div class="menu_agregar_elemento">\n
            <div class="bajar">\n
                <h3>Esconder Panel</h3>\n
            </div>\n
            <form>\n
                <input type="text" value="" placeholder="Titulo" autofocus required>\n
                <label for="es_lista`+ id_tablero_string +`">¿Es elemento de lista?</label>\n
                <input type="checkbox" name="es_lista" id="es_lista`+ id_tablero_string +`">\n
                <select name="status">\n
                    <option value="">Sin status</option>\n
                </select>\n
                <label for="input_deadline_`+ id_tablero_string +`">Fecha límite</label>\n
                <input type="date" name="Fecha límite" id="input_deadline_`+ id_tablero_string +`" class="selector_deadline">\n
                <input type="submit" value="Guardar">\n
            </form>\n
        </div>`;
    
        //Se lo agrego a la vista nueva
        $('#'+id_tablero_string).append(menu_agregar_elemento_de_nueva_vista);

    
        //Recorro el vector de estados dentro del objeto maestro e inyecto
        for (i in objeto_maestro_datos.estados) {
            console.log('entre al buccle para crear las options');

            //Creo la etiqueta
            var option_nueva = '<option value="'+ objeto_maestro_datos.estados[i].valor +'">'+ objeto_maestro_datos.estados[i].titulo +'</option>';

            //Busco el select y le agrego la options 
                $('#'+id_tablero_string+' form select').append(option_nueva);
        };


        var popup_confirm_eliminar_tablero = `<!-- Popup para eliminar el tablero de la db-->\n
        <div data-role="popup" id="popup_confirmacion_borrar_`+ id_tablero_string +`" class="popup_confirmacion_borrar_tab">\n
            <div>
                <div data-role="header">\n
                    <h1>¿Borrar Tablero?</h1>\n
                    </div>\n
                <div role="main" class="ui-content">\n
                        <h2 class="ui-title">¿Está seguro de borrar el caché?</h2>\n
                        <p>Esto borrará el tablero definitivamente. Esta acción no se puede deshacer.</p>\n
                            <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b" data-rel="back">Cancelar</a>\n
                            <a href="#" id="borrar_`+ id_tablero_string +`" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b color_rojo borrar_un_tablero_del_sistema" data-transition="flow">Borrar</a>\n
                </div>\n
            </div>
        </div>`;


        $('#'+id_tablero_string).append(popup_confirm_eliminar_tablero);
        $('#'+id_tablero_string +' main .aviso_de_tablero_en_papelera a').enhanceWithin();
        /*$('#'+id_tablero_string +' #popup_confirmacion_borrar_'+id_tablero_string).popup({
            dismissible: false,
            overlyaTheme: 'b',
            transition: 'pop'
        });*/

/*
        var popup_confirm_eliminar_tablero = `<div id="popup_confirmacion_borrar_`+ id_tablero_string +`"></div>`;
        $('#'+id_tablero_string).append(popup_confirm_eliminar_tablero);
        
        $('body').on('click', '#'+id_tablero_string+' .boton_eliminar' , function () {
            //create a div for the popup
            var $popUp = $('#popup_confirmacion_borrar_'+ id_tablero_string).popup({
                dismissible: false,
                overlyaTheme: "b",
                transition: "pop"
            }).on("popupafterclose", function () {
                //remove the popup when closing
                $(this).remove();
            }).css({
                'width': '270px',
                    'height': '200px',
                    'padding': '5px'
            });
            //create a title for the popup
            $("<h2/>", {
                text: "Header"
            }).appendTo($popUp);
        
            //create a message for the popup
            $("<p/>", {
                text: "Welcome!"
            }).appendTo($popUp);
        
            //create a form for the pop up
            $("<form>").append($("<input/>", {
                type: "password",
                name: "password",
                placeholder: "Enter Password.."
            })).appendTo($popUp);
        
            //Create a submit button(fake)
            $("<a>", {
                text: "Submit"
            }).buttonMarkup({
                inline: false,
                mini: true,
                icon: "check"
            }).on("click", function () {
                $popUp.popup("close");
                //that.subscribeToAsset(callback);
            }).appendTo($popUp);
        
            //create a back button
            $("<a>", {
                text: "Back",
                    "data-rel": "back"
            }).buttonMarkup({
                inline: false,
                mini: true,
                theme: "e",
                icon: "back"
            }).appendTo($popUp);
        
            $popUp.popup('open').trigger("create");
        });
*/

        //Populo el tablero:
        for (i in objeto_maestro_datos.elementos){
            if( objeto_maestro_datos.elementos[i].id_tablero === objeto_tablero.id_tablero){
                crear_contenido_en_vista_de_tablero(objeto_maestro_datos.elementos[i]);
            };
        };

    }else{
        console.log('el tablero a crear vista está oculto y no se solicitó forzar la creación - no creo nada');
    };
    

};

function cargar_elementos_en_inicio(){
    //Función que se llama cada vez que se necesita reprocesar la info de la vista de inicio
    //Tiene que recorrer el array de elementos, detectar todos los que tengan deadline HOY
    //y crear la lsita en INICIO

    //Seteo de la fecha de hoy en el header
    setear_dia_de_hoy_en_header_de_vista_inicio();

    //Vacío el ul de la vista
    $('#inicio main form').empty();

    //muestro el aviso de lista vacía
    $('#inicio main #dia_libre').removeClass('ocultar');

    array_de_elementos = objeto_maestro_datos.elementos;
    array_de_tableros = objeto_maestro_datos.tableros;

    //Ordenano el array de elementos por fecha_deadline
    //array_de_elementos.sort( comparar_elementos_por_fecha() );


    for(i in array_de_elementos){
        console.log("Estoy haciendo una iteración para cargar elementos en incio");
        
        var el_tablero_esta_oculto;
        //Averiguo si el tablero al que pertenece este elemento es oculto o no
        for(j in array_de_tableros){
            if(array_de_tableros[j].id_tablero === array_de_elementos[i].id_tablero){

                el_tablero_esta_oculto = array_de_tableros[j].es_oculto;
                console.log('encontré un elemento del tablero' + array_de_tableros[j].id_tablero);
                console.log('Tablero oculto?: ' + array_de_tableros[j].es_oculto);
            };
        };

        //- Si tablero está oculto no listo nada..
        if(!el_tablero_esta_oculto){

            //por cada elemento pregunto si la fecha_deadline eento pregunto si la fecha_deadline es hoy (con la función hoy_en_formato_de_fecha_almacenable())
            if(array_de_elementos[i].fecha_deadline === hoy_en_formato_de_fecha_almacenable()){
                console.log('encontré un elemento que vence hoy');
                
                //formateo el id del tablero al que corresponde este elemento:
                var id_tablero_string = 'tablero_numero_' + array_de_elementos[i].id_tablero;
                
                
                
                //Identifico el título del tablero en el que se encuentra
                var titulo_del_tablero_perteneciente = cual_es_el_titulo(array_de_tableros, array_de_elementos[i].id_tablero);


                //Detecto si tiene status y creo el caracter a mostrar
                //Aprovecho el condicional para determinar la clase a incluirle al status
                if(array_de_elementos[i].status.length){
                    var caracter_status = array_de_elementos[i].status.substring(0,1);
                    var clase_del_status = 'estado_' + array_de_elementos[i].valor;
                };

                //Creo el html a inyectar
                var elemento_para_inicio = `<!-- <li class="ui-li-icon">-->\n
                        <!-- <img src="imgs/icons/sol.svg" alt="¡Vence hoy!" class="ui-li-icon ui-corner-none">-->\n
                        <!-- <form>-->\n
                        <!-- <label>\n
                                    <input type="checkbox" name="esto es una prueba de mierda">` + array_de_elementos[i].contenido + `</label>-->\n


                                    <input class="listview_inicio_checkbox" type="checkbox" value="Realizado" id="checkbox_` + id_tablero_string + array_de_elementos[i].indice_elemento +`">\n
                                    <label for="checkbox_` + id_tablero_string + array_de_elementos[i].indice_elemento +`" class="listview_inicio_bloque_de_texto">\n
                                            <h2>` + array_de_elementos[i].contenido + `</h2>\n
                                            <p>En: ` + titulo_del_tablero_perteneciente + `</p>\n
                                            <p class="ocultar">#` + id_tablero_string + `</p>\n
                                    </label>\n
                                    <!-- <div class="ui-li-aside listview_inicio_estado ` + clase_del_status +`">\n
                                    <p>`+ caracter_status +`</p> -->\n
                        <!-- <form>-->\n
                <!-- </li>-->`;

                //Lo inyecto
                $('#inicio main form').append(elemento_para_inicio).enhanceWithin();

                //también tengo que ocultar el aviso_de_vista_vacia
                $('#inicio main #dia_libre').addClass('ocultar');

            };

        };
        
    };

    //Refresheo la listview
    $('#inicio main ul').listview();

};


function procesar_tableros_en_vista_de_tableros(){
    console.log('voy a cargar los tableros en la vista de tableros');
    //Esta función está pensada para llamarse siempre que se cargue o borre un tablero
    //También en la inicialización de la app


    //Primero borro todos los tableros que estén cargados actualmente
    //Luego recorro todo el array de tableros
        //por cada tablero encontrado recorro el array de elementos
        //Matcheo los elementos que sean de ese tablero
        //Y voy creando el HTML en la vista de tableros
        
    //Borro los tableros fijos
    $('#tableros main #tableros_fijados .tablero').remove();
    //Borro los otros tableros
    $('#tableros main #otros_tableros .tablero').remove();
    
    //para saber si tengo que mostrar o no los separadores de tablero fijado y oculto
    existe_algun_tablero_visible = false;
    
    // activo el aviso de vista vacía, por si no hay más contenido
    $('#sin_tableros').removeClass('ocultar');

    var numero_de_tablero_fijado = 0;
    var numero_de_tablero_otro = 0;


    //Me fijo que haya datos de tableros - tal vez no hay nada y no hay que hacer nada
    if(objeto_maestro_datos.tableros.length){
        console.log('Existen tableros, los voy a cargar');


        //Recorro el array
        for (i in objeto_maestro_datos.tableros){
            console.log('tablero numero '+i);

            //Si está oculto lo ignoro
            if(!objeto_maestro_datos.tableros[i].es_oculto){
                
                //SI hay al menos un tablero no oculto, puedo mostrar.
                existe_algun_tablero_visible = true;

                //primero borro el aviso de vista vacía
                $('#sin_tableros').addClass('ocultar');

                //Preparo el string del id del tablero
                var id_tablero_string = 'tablero_numero_' + objeto_maestro_datos.tableros[i].id_tablero;

                //Creo el esquema base del tablero, sin cargarle contenido
                //El contenido lo busco e inyecto luego de ser creado
                var card_del_tablero = `<div class="tablero">\n
                    <a href="#`+ id_tablero_string +`">\n
                        <h2>`+ objeto_maestro_datos.tableros[i].titulo +`</h2>\n
                        <div>\n
                            <ul>\n
                            </ul>\n
                        </div>\n
                    </a>\n
                </div>`;
                
                
                
                //Desde acá es para ver donde inyectarlo
                //Me fijo si es fijado o no
                if(objeto_maestro_datos.tableros[i].es_destacado){

                    numero_de_tablero_fijado++;
                    //calculo si va en el ui-block-a o ui-block-b
                    if(numero_de_tablero_fijado % 2 == 0){
                        //Es impar, va del otro lado
                        $('#tableros main #tableros_fijados .ui-grid-a .ui-block-b').append(card_del_tablero);
                        
                    }else{
                        //es par, va del lado izquierdo - es ui-block-a
                        $('#tableros main #tableros_fijados .ui-grid-a .ui-block-a').append(card_del_tablero);
                    };
                }else{
                    //No fue fijado, va dentro del bloque de "otros"

                    numero_de_tablero_otro++;
                    //calculo si va en el ui-block-a o ui-block-b
                    if(numero_de_tablero_otro % 2 == 0){
                        //Es impar, va del otro lado
                        $('#tableros main #otros_tableros .ui-grid-a .ui-block-b').append(card_del_tablero);
                    }else{
                        //es par, va del lado izquierdo - es ui-block-a
                        $('#tableros main #otros_tableros .ui-grid-a .ui-block-a').append(card_del_tablero);
                        
                    };
                };

                //Ahora recorro el array de elementos, e inyecto los que tengna el id de este tablero

                for (j in objeto_maestro_datos.elementos){
                    if(objeto_maestro_datos.elementos[j].id_tablero === objeto_maestro_datos.tableros[i].id_tablero){
                        //Solo me interesan los elementos que tengan este mismo id
                        console.log('encontré un elmeneto de este tablero');

                        //Me fijo si es item de lista, si lo es lo inyecto ahí
                        if(objeto_maestro_datos.elementos[j].es_lista){
                            console.log('el elemento es de una lista');
                            //es elemento de una lista, en principio aseguro que haya ul
                            if( !$('#tableros main .tablero a[href="#'+ id_tablero_string +'"] div ul').length){
                                console.log('no encontró lista');

                                //creo lista y la inyecto
                                var nuevo_ul = '<ul></ul>';
                                $('#tableros main .tablero a[href="#'+ id_tablero_string +'"] div').append(nuevo_ul);
                            };
                        
                            //creo el HTML a inyectar
                            var li_para_inyectar = '<li>'+ objeto_maestro_datos.elementos[j].contenido +'</li>';

                            //Inyecto en la nueva lista
                            $('#tableros main .tablero a[href="#'+ id_tablero_string +'"] div ul').append(li_para_inyectar);    
                        }else{
                            console.log('el elemento es un parrafo');

                            //creo el html a inyectar
                            var p_para_inyectar = '<p>'+ objeto_maestro_datos.elementos[j].contenido +'</p>';

                            //lo inyecto
                            $('#tableros main .tablero a[href="#'+ id_tablero_string +'"] div').append(p_para_inyectar);

                        };
                    };
                };

                



            };

        };

        
        //console.log('para saber si hay tab visible');
        //console.log(existe_algun_tablero_visible);

        //ya se si hay o no tableros visibles:
        if (existe_algun_tablero_visible){
            //Si no hay tableros destacados, oculto la section
            if(numero_de_tablero_fijado === 0){
                $('#tableros main #tableros_fijados').addClass('ocultar');
                // Y ADEMAS le cambio el título a "otros tableros", para que no quede raro
                $('#tableros main #otros_tableros h2').first().text('Mis tableros:');
            }else{
                //hay tableros destacados, me aseguro que se muestre
                $('#tableros main #tableros_fijados').removeClass('ocultar');
                //Si hay tableros destacados, los no destacados se llaman "Otros"
                $('#tableros main #otros_tableros h2').first().text('Otros:');
            };

            //Si no hay tableros en 'otros', oculto la section
            if(numero_de_tablero_otro === 0){
                $('#tableros main #otros_tableros').addClass('ocultar');
            }else{
                //hay tableros en "otros", me aseguro que se muestre
                $('#tableros main #otros_tableros').removeClass('ocultar');
            };
        }else{
            //si no hay tableros visibles, oculto ambos
            $('#tableros main #tableros_fijados').addClass('ocultar');
            $('#tableros main #otros_tableros').addClass('ocultar');
        };
    };
        
}


function cargar_lista_de_borradores(){
    $("#lista_de_borradores").remove();

    var nuevo_collapsible = '<div id="lista_de_borradores" data-collapsed-icon="descartar" data-expanded-icon="descartar"></div>';

    $('#ajustes main').append(nuevo_collapsible);

    var no_hay_ocultos = true;
    var cant_de_ocultos = 0;

    for (i in objeto_maestro_datos.tableros){
        if (objeto_maestro_datos.tableros[i].es_oculto){
            
            if(no_hay_ocultos){
                var listview_en_collapsible = '<ul></ul>';
                $('#lista_de_borradores').append(listview_en_collapsible);
                $('#lista_de_borradores ul').listview();
            }
            no_hay_ocultos = false;
            cant_de_ocultos++;

            var string_id_vista_tablero = '#tablero_numero_' + objeto_maestro_datos.tableros[i].id_tablero;

            var contenido_del_collapsible = '<li><a href="'+ string_id_vista_tablero +'">'+ objeto_maestro_datos.tableros[i].titulo +'</a></li>';
            $('#lista_de_borradores ul').append(contenido_del_collapsible);
            $('#lista_de_borradores ul').listview('refresh');
        };
    };

    var encabezado_del_collapsible;
    if (no_hay_ocultos){
        encabezado_del_collapsible = '<h2>No tenés tableros en papelera</h2>'
    }else{
        encabezado_del_collapsible = '<h2>Hay '+ cant_de_ocultos +' tableros en papelera:</h2>'
    }

    $('#lista_de_borradores').prepend(encabezado_del_collapsible);
    $('#lista_de_borradores').collapsible().trigger("create");
};

/* 
-------------------------------------------------------------------------------------------------------
Funciones generales
-------------------------------------------------------------------------------------------------------
*/ 

//Para saber que elemento corresponde a que tablero - es solo el ordenamiento, la aplicación está en la función creadora
/*
function comparar_elementos_por_tablero( a, b ) {
    console.log('entre a comparar ids de tableros en el elemento');
    if ( a.id_tablero < b.id_tablero ){
      return -1;
      console.log('di una respuesta -1 en la comparación');
    }
    if ( a.id_tablero > b.id_tablero ){
      return 1;
      console.log('di respuesta 1 en comparacion');
    }
    return 0;
    console.log('di respuesta 0 en comparación - significa uqe son iguiales');
};
*/
//Para ordenar por fecha los elementos - es solo el ordenamiento, la aplicación está en la función creadora
/*function comparar_elementos_por_fecha( a, b ) {
    console.log('entre a comparar fechas de elementos');
    if ( a.fecha_deadline < b.fecha_deadline ){
      return -1;
      console.log('di una respuesta -1 en la comparación');
    }
    if ( a.fecha_deadline > b.fecha_deadline ){
      return 1;
      console.log('di respuesta 1 en comparacion');
    }
    return 0;
    console.log('di respuesta 0 en comparación - significa uqe son iguiales');
};
*/
function hoy_en_formato_de_fecha_almacenable(){

    // Variable con la fecha de hoy
    var fecha_de_hoy = new Date();
    //console.log(fecha_de_hoy);

    dd = String(fecha_de_hoy.getDate()).padStart(2, '0');
    //console.log(mm);
    yyyy = fecha_de_hoy.getFullYear();

    
    //un preformateo muy cabeza para agregar "0" para los meses menores al 10 - así formatea igual que el input date
    var mm = fecha_de_hoy.getMonth();
    //console.log('este ese el mes actual segun sistema: '+ mm);
    mm++;
    //console.log('le sumé uno, ahora da: '+ mm);
    if( mm < 10){
        mm = "0" + mm;
    }else{
        mm = mm;
    };

    var hoy = yyyy+'-'+ mm +'-'+dd


    return hoy;
};

//Pongo la fecha de hoy cuando se crea la página INICIO
function setear_dia_de_hoy_en_header_de_vista_inicio(){
    // array de meses
    var mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // Variable con la fecha de hoy
    var fecha_de_hoy = new Date();
    //console.log(fecha_de_hoy);

    dd = String(fecha_de_hoy.getDate()).padStart(2, '0');
    mm = mes[fecha_de_hoy.getMonth()];
    //console.log(mm);
    yyyy = fecha_de_hoy.getFullYear();

    //formato_de_fecha_almacenable = yyyy+'-'+fecha_de_hoy.getMonth()+'-'+dd

    fecha_de_hoy = "Hoy es " + dd + ' de ' + mm + ' del ' + yyyy;
    //console.log(fecha_de_hoy);

    $('#inicio .descripcion_del_header').text(fecha_de_hoy);

};


//Para setear la imagen que se va a mostrar en el header
$(document).on('pagebeforeshow', function(){

    var posicion_random = Math.random(imagenes_fondo_header.length) * imagenes_fondo_header.length;
    $('header').css('backgroundImage', imagenes_fondo_header[Math.floor(posicion_random)]);
});

//Para saber un título de tablero a partir de un id
function cual_es_el_titulo(array_de_tableros_a_buscar, id_buscado){
    for(j in array_de_tableros_a_buscar){
        if(array_de_tableros_a_buscar[j].id_tablero === id_buscado){
            return array_de_tableros_a_buscar[j].titulo;
        }
    }
};

//Para ocultar los separadores de tablero fijado y otros tableros de la vista de tableros
function ocultar_tableros_fijados_y_otros(){
    $('#tableros main #tableros_fijados').addClass('ocultar');
    $('#tableros main #otros_tableros').addClass('ocultar');
};


//Para saber un id_tablero a partir del #id 
function averiguar_id_tablero(texto_id_buscado){
    //console.log('estas buscando este id: '+texto_id_buscado);

    //console.log('yo te quiero devolver: '+texto_id_buscado.substring(16, texto_id_buscado.length));
    
    //Me pueden pasar el id con o sin #, yo tengo que procesar correctamente
    if (~texto_id_buscado.indexOf("#")){
        console.log('el id buscado contiene #, te devuelvo: '+texto_id_buscado.substring(16, texto_id_buscado.length))
        return parseInt(texto_id_buscado.substring(16, texto_id_buscado.length));
    }else{
        console.log('el id buscado no contiene #, te devuelvo: '+texto_id_buscado.substring(15, texto_id_buscado.length))
        return parseInt(texto_id_buscado.substring(15, texto_id_buscado.length));
    };

};

//Para obtener un tablero a partir de un texto #id 
function obtener_objeto_tablero_a_partir_de_texto_id(texto_id_buscado){

    var id_numerico = averiguar_id_tablero(texto_id_buscado);
    console.log('voy a buscar el tablero con id: '+id_numerico);

    for(var k in objeto_maestro_datos.tableros){
        console.log('entre al bucle a buscar el tablero con id correspondiente');
        if(objeto_maestro_datos.tableros[k].id_tablero === id_numerico){
            console.log('encontre tablero correcto');
            return objeto_maestro_datos.tableros[k];
        }
    }
};



//OJOOOOOOOOOO ESTO NO ANDA TODAVÍA
/*
//Al abrir un popup en la vista de tablero particular
$('body').on('vclick','.tablero_particular main ul li .props .estado_elemento',function(){
    console.log('hiciste click para abrir un pupup');
    var id_del_tablero_clickeado = $(this).parent().parent().parent().parent().parent().parent().attr('id');

    console.log('su main debería ser:');
    console.log(id_del_tablero_clickeado);

    //tengo que convertir la clase del status a string - sacarle todo lo que no sea el status - y buscar esa key en el array de status
    var status_a_buscar = $(this).attr('class').toString().substring(23, $(this).attr('class').toString().length);

    console.log('Voy a buscar este status:');
    console.log(status_a_buscar);

    //Recorro el array de status buscando al elemento que tenga la key de "valor" igual al texto de la clase que reconocí
    for (i in objeto_maestro_datos.estados){
        console.log('Iteración de array. estoy buscando el status en el array de status');
        if(objeto_maestro_datos.estados[i].valor == status_a_buscar){
            console.log('encontré status, lo voy a inyectar');
            // le meto el texto al popup
            console.log('lo estoy intentando meter aca:');
            console.log($(id_del_tablero_clickeado + 'main .tooltip_status'));
            $(id_del_tablero_clickeado + 'main .tooltip_status p').text(objeto_maestro_datos.estados[i].titulo);
        }
    }
});
*/


//Eliminar definitivamente todos los elementos de un tablero
//Recibe el id de tablero, recorre el objeto maestro de elementos y elimina posiciones
function borrar_elementos_del_sistema(id_tablero){
    console.log('me pidieron uqe borre todos los elementos del tablero con id: ' + id_tablero);
    
    for (var k in objeto_maestro_datos.elementos){
        if(objeto_maestro_datos.elementos[k].id_tablero == id_tablero){
            console.log('encontré un elemento para borrar');
            
            var eliminado = objeto_maestro_datos.elementos.splice(k,1);
            console.log('eliminé el elemento:');
            console.log(eliminado);
        };
    };

};


/* 
-------------------------------------------------------------------------------------------------------
Comportamientos de la interfáz
-------------------------------------------------------------------------------------------------------
*/ 

$(document).on("ready", function () {
    $.mobile.defaultPageTransition = 'fade';
    $.mobile.defaultDialogTransition = 'pop';
});


//botones en pantalla de logueo:
$('#crear_cuenta').on('vclick', function(){
    $('#msj_response_login').text('');
    $('#crear_cuenta').addClass('ocultar');
    $('#acceder_cuenta').removeClass('ocultar');
    $('#formulario_acceder_cuenta_existente').addClass('ocultar');
    $('#formulario_crear_cuenta').removeClass('ocultar');
});
$('#acceder_cuenta').on('vclick', function(){
    $('#msj_response_login').text('');
    $('#crear_cuenta').removeClass('ocultar');
    $('#acceder_cuenta').addClass('ocultar');
    $('#formulario_acceder_cuenta_existente').removeClass('ocultar');
    $('#formulario_crear_cuenta').addClass('ocultar');
});

$('#bienvenida_comenzar').on('vclick', function(){
    //vuelvo a dejar todo como estaba.... por las dudas
    $('#logueo').removeClass('ocultar');
    $('#msj_response_login').text('');
    $('#msj_bienvenida').addClass('ocultar');
    
});

//Navegación por swipe
$('#inicio').on('swipeleft', function(){
    $.mobile.changePage('#tableros', {transition: 'slide', reverse: false});
});

$('#tableros').on('swipeleft', function(){
    $.mobile.changePage('#ajustes', {transition: 'slide', reverse: false});
});
$('#tableros').on('swiperight', function(){
    $.mobile.changePage('#inicio', {transition: 'slide', reverse: true});
});

$('#ajustes').on('swiperight', function(){
    $.mobile.changePage('#tableros', {transition: 'slide', reverse: true});
});



//Comportamiento del spinner dentro de vistas de tableros creadas
// Evento delegado
$('body').on('vclick', '.tablero_particular .agregar', function(){
    console.log('hiciste vclick para agregar un elemento');
    $('.menu_agregar_elemento').slideToggle();
    $('.tablero_particular .agregar').addClass('ocultar');
    //css('display','none');

    //Fuerzo el foco en el primer elemento
    $('#titulo_tablero').focus();

});

$('body').on('vclick', '.menu_agregar_elemento .bajar' , function(){
    $('.menu_agregar_elemento').slideToggle();
    $('.tablero_particular .agregar').removeClass('ocultar');
    //css('display','block');

});


//Cuando el usuario toque algo que no sea el spinner, debería bajar
/*
Todavía no está funcionando esto
$('body').on('vclick', '.tablero_particular main' , function() {
    console.log('hiciste click en agregar elemento de clase');
    console.log($(this).attr('class'));


    if($(this).attr('class') != 'agregar'){
        console.log('la clase es diferente a agregar');
        $('.menu_agregar_elemento').slideUp();
        $('.tablero_particular .agregar').css('display','block');
    
    }
    
});
*/


$('#tableros .agregar').on('vclick', function(){
    $('.menu_agregar_tablero').slideToggle();
    $('#tableros .agregar').addClass('ocultar');
    //css('display','none');

    //Fuerzo el foco en el primer elemento
    $('.menu_agregar_tablero form input:first-child').focus();

});

$('.menu_agregar_tablero .bajar').on('vclick', function(){
    $('.menu_agregar_tablero').slideToggle();
    $('#tableros .agregar').removeClass('ocultar');
    //css('display','block');

});


//Comportamiento longpress de los elementos del tablero de inicio
$('#inicio main ul').on('taphold', 'li', function(){
    console.log('longpreseaste un item en inicio, te quiero llevar a:');
    console.log($(this).find('.ocultar').text());
    $.mobile.navigate($(this).find('.ocultar').text());
});


//Cuando se abre la app, no renderea las vistas de tableros ocultos para mejorar la eficiencia
//En este caso, si el usuario quiere volver a ingresar desde la papelera, entonces tengo que crear las vistas
$('#ajustes main').on('click','#lista_de_borradores a',function(){
    
    console.log('hiciste click a un tablero en papelera, me quiero asegurar de que la vista exista');
    var id_de_la_vista_buscada = $(this).attr('href');
    var existe_vista_buscada = $(id_de_la_vista_buscada).length;

    console.log('busco este id: '+id_de_la_vista_buscada);

    if(!existe_vista_buscada){
        console.log('la vista no existe, la creo');

        crear_vista_de_tablero(obtener_objeto_tablero_a_partir_de_texto_id(id_de_la_vista_buscada), true);

    }else{
        console.log('la vista existe, no hago nada');
    }
});

//Adicional para cuando el usuario no le pega al anchor del tablero, en la vista de tableros
$('#tableros main').on('vclick', '.tablero', function(){
    console.log('estoy intentando mandar a esta dirección: ');
    console.log($(this).find('a').attr('href'));
    $.mobile.navigate( '#'+$(this).find('a').attr('href') );
});


//Función del botón uqe borra todo
$('#ajustes #popup_confirmacion_borrar #borrar_todo').on('vclick', function(){
    borrar_localstorage();
});


//Al presionar botón de "fijar" tablero
$('body').on('vclick','.fijar',function(){
    console.log('hiciste click para fijar un talbero');

        
    //Detecto el Id de tablero al que pertenece
    var id_tablero_calculado = $(this).parent().parent().parent().parent().attr('id').toString();
    //console.log('estoy buscnado a: ');
    //console.log($(this).parent().parent().parent().parent());
    var id_tablero_a_buscar = averiguar_id_tablero(id_tablero_calculado);
    //console.log('el id encontrado es:');
    //console.log(id_tablero_a_buscar);

    //Busco el tablero en el objeto maestro de datos y le cambio su valor de "es_destacado"
    for(i in objeto_maestro_datos.tableros){
        //Busco el tablero que corresponda:
        if(objeto_maestro_datos.tableros[i].id_tablero === id_tablero_a_buscar){
            
            //Averiguo si YA estaba destacado. Si es así, entonce lo saco del destacado
            if(objeto_maestro_datos.tableros[i].es_destacado){
                objeto_maestro_datos.tableros[i].es_destacado = false;
            }else{
                objeto_maestro_datos.tableros[i].es_destacado = true;
            }

            //Guardo en bd y local
            ep_cargar_tablero(objeto_maestro_usuario.correo, objeto_maestro_datos.tableros[i]);
        };
    };

});

//Al presionar botón de "Eliminar" de un tablero - funciona también para recuperar el tablero
$('body').on('vclick','.descartar',function(){
    console.log('hiciste click para ocultar/recuperar un talbero');
        
    //Detecto el Id de tablero al que pertenece
    var id_tablero_calculado = $(this).parent().parent().parent().parent().parent().attr('id').toString();
    //console.log('estoy buscnado a: ');
    //console.log($(this).parent().parent().parent().parent().parent());
    var id_tablero_a_buscar = averiguar_id_tablero(id_tablero_calculado);
    console.log('el id encontrado es:');
    console.log(id_tablero_a_buscar);

    //Busco el tablero en el objeto maestro de datos y le cambio su valor de "es_oculto"
    for(i in objeto_maestro_datos.tableros){
        if(objeto_maestro_datos.tableros[i].id_tablero === id_tablero_a_buscar){
            console.log('encontre tablero. Averiguo si lo tengo que ocultar o mostrar');
            if(objeto_maestro_datos.tableros[i].es_oculto){
                //Lo tengo que mostrar
                console.log('el tablero estaba oculto, lo tengo que mostrar');
                objeto_maestro_datos.tableros[i].es_oculto = false;
                //oculto el mensaje de tablero en papelera
                $('#'+ id_tablero_calculado +' main .aviso_de_tablero_en_papelera').addClass('ocultar');

            }else{
                console.log('el tablero estaba visible, lo tengo que ocultar');
                //lo oculto
                objeto_maestro_datos.tableros[i].es_oculto = true;

                //Muestro el aviso de tablero en papelera
                $('#'+id_tablero_calculado +' main .aviso_de_tablero_en_papelera').removeClass('ocultar');
                
                //Llevo al usuario a la vista de tableros
                $.mobile.navigate('#tableros');
            
            };

            //Guardo en db y local
            ep_cargar_tablero(objeto_maestro_usuario.correo, objeto_maestro_datos.tableros[i]);

        };
    };
    
    //Lo cargo en la lista de papelera dentro de Ajustes:
    cargar_lista_de_borradores();
    
    //Reproceso la vista de inicio
    cargar_elementos_en_inicio();


});


//Al confirmar eliminar un tablero en papelera
$('body').on('vclick','.borrar_un_tablero_del_sistema',function(){
    console.log('confirmaste para borrar un tablero del sistema');
    console.log('voy a detectar que id tiene este tablero');

    console.log('el id detectado es: '+ $(this).parent().parent().parent().parent().parent().attr('id'));
    var id_tablero_a_eliminar = averiguar_id_tablero($(this).parent().parent().parent().parent().parent().attr('id'));

    console.log('el id del tablero a borra es: '+id_tablero_a_eliminar);

    //Primero borro todos los elementos relacionados
    //Eso lo hago desde el endpoint - borro en db - luego borro en local
    ep_eliminar_elemento(objeto_maestro_usuario.correo,id_tablero_a_eliminar);
    //Este mismo endpoint, si no genera excepción, borra el tablero.

});

//Al recuperar un tablero presionando el botón "recuperar del mensaje"
$('body').on('vclick','.tablero_particular .boton_recuperar',function(){
    console.log('presionaste para recuperar un tablero en papelera');
    console.log('voy a detectar que id tiene este tablero');

    console.log('el id detectado es: '+ $(this).parent().parent().parent().attr('id'));
    var id_del_tablero_a_recuperar_formato_texto_completo = $(this).parent().parent().parent().attr('id');
    var id_tablero_a_recuperar = averiguar_id_tablero(id_del_tablero_a_recuperar_formato_texto_completo);

    console.log('el id del tablero a recuperar es: '+id_tablero_a_recuperar);

    for(i in objeto_maestro_datos.tableros){
        if(objeto_maestro_datos.tableros[i].id_tablero == id_tablero_a_recuperar){
            objeto_maestro_datos.tableros[i].es_oculto = false;
            //Actualizo en bd:
            ep_cargar_tablero(objeto_maestro_usuario.correo, id_tablero_a_recuperar);
        };
    };

        //Reproceso la lista de borradores en ajustes
        cargar_lista_de_borradores();

        //oculto el mensaje de tablero en papelera
        $('#'+ id_del_tablero_a_recuperar_formato_texto_completo +' main .aviso_de_tablero_en_papelera').addClass('ocultar');

});

//Validador del 'repetir contraseña'
$('#repetir_contrasena').on('keyup', function(){
    
    var contrasena = $('#crear_contrasena').val();
    var contrasena_repetida = $('#repetir_contrasena').val();

    if(contrasena === contrasena_repetida){
        contrasenas_matchean = true;
        $('#mensaje_error_repetir_contrasena').addClass('ocultar');
    }else{
        contrasenas_matchean = false;
        $('#mensaje_error_repetir_contrasena').removeClass('ocultar');
    }
});

$('#crear_contrasena').on('keyup', function(){
    
    var contrasena = $('#crear_contrasena').val();
    var contrasena_repetida = $('#repetir_contrasena').val();

    if(contrasena === contrasena_repetida){
        contrasenas_matchean = true;
        $('#mensaje_error_repetir_contrasena').addClass('ocultar');
    }else{
        contrasenas_matchean = false;
        $('#mensaje_error_repetir_contrasena').removeClass('ocultar');
    }
});


/* 
-------------------------------------------------------------------------------------------------------
Recepción de formularios de nuevo elemento / tablero
-------------------------------------------------------------------------------------------------------
*/ 


//Form de login
$('#formulario_acceder_cuenta_existente').on('submit', function(){

    $('#msj_response_login').text('');

    //Tengo que consultar con DB si el usuario existe y traer los datos que ese usuario tenga
    
    var correo = $('#login_correo').val();
    var contrasena = $('#login_contrasena').val();

    $('#loader_bienvenida').removeClass('ocultar');

    //Hacemos la consulta a la bd
    ep_login(correo, contrasena);
    //El proceso continúa con la funcion: obtener_datos_de_servidor

    return false;
});

//Form de crear cuenta parte 1 - info báscia
$('#formulario_crear_cuenta').on('submit', function(){
    if(contrasenas_matchean){
        //Almaceno el dato en localstorage
        objeto_maestro_usuario.correo = $('#formulario_crear_cuenta #crear_correo').val();
        objeto_maestro_usuario.contrasena = $('#formulario_crear_cuenta #crear_contrasena').val();
        //no los mando a db porque todavía le falta completar el resto de la info

        //No vacío los campos por las dudas que el correo ya exista

        //Configuro lo que se debe ver
        $('#formulario_crear_cuenta').addClass('ocultar');
        $('#msj_mas_informacion').removeClass('ocultar');
        $('#formulario_mas_informacion').removeClass('ocultar');
        $('#acceder_cuenta').addClass('ocultar');
        $('#msj_login').addClass('ocultar');
        
    };
    return false;
});
//Form de crear cuenta parte 2 - más info
$('#formulario_mas_informacion').on('submit', function(){
    
    $('#msj_response_login').text('');
    $('#loader_bienvenida').removeClass('ocultar');

    //Almaceno el dato en localstorage
    objeto_maestro_usuario.nombre = $('#formulario_mas_informacion #crear_nombre').val();
    objeto_maestro_usuario.apellido = $('#formulario_mas_informacion #crear_apellido').val();
    
    //Mando todo a la db para finalizar la creación de usuario // esta función también guarda en localstorage
    ep_crear_usuario(objeto_maestro_usuario.correo, objeto_maestro_usuario.contrasena, objeto_maestro_usuario.nombre, objeto_maestro_usuario.apellido);


    //vuelvo a setear la visibilidad de los formularios como estaba
    $('#msj_mas_informacion').addClass('ocultar');
    $('#formulario_mas_información').addClass('ocultar');
    $('#acceder_cuenta').removeClass('ocultar');
    $('#msj_login').removeClass('ocultar');
    $('#logueo').removeClass('ocultar');
    $('#formulario_acceder_cuenta_existente').removeClass('ocultar');
    $('#formulario_crear_cuenta').addClass('ocultar');
    $('#formulario_mas_informacion').addClass('ocultar');


    return false;
});


// Form del nuevo tablero
$('#tableros .menu_agregar_tablero form').on('submit',function(){
    console.log('hiciste vclick para agregar un tablero');
    
    //Recepciono el valor del formulario
    var titulo_tablero = $('#titulo_tablero').val();

    //Almaceno el dato en localstorage y recepciono el objeto almacenado
    guardar_nuevo_tablero_en_objeto_maestro(titulo_tablero);
    console.log('guardé el tablero');
    
	return false;
	
});

// Form de nuevo elemento
// el accionador debe estar delegado
$('body').on('submit', '.tablero_particular .menu_agregar_elemento form',function(){
    
    //Detecto el Id de tablero al que pertenece
    var id_tablero_calculado = $(this).parent().parent().attr('id').toString();
    var id_tablero_para_guardar = averiguar_id_tablero(id_tablero_calculado);
    
    //detecto la posición de este elmeneto dentro del tablero
    //la forma más facil es detectar preguntar al objeto maestro
    var indice_elemento = 0;
    for (i in objeto_maestro_datos.elementos){
        if(objeto_maestro_datos.elementos[i].id_tablero === id_tablero_para_guardar){
            indice_elemento++;
        }
    };


    //Recepciono los valores del formulario
    var deadline = $('#'+id_tablero_calculado+' .menu_agregar_elemento form .selector_deadline').val();
    $('#'+id_tablero_calculado+' .menu_agregar_elemento form .selector_deadline').val('');

    var contenido = $('#'+id_tablero_calculado+' .menu_agregar_elemento form input:first-child').val();
    $('#'+id_tablero_calculado+' .menu_agregar_elemento form input:first-child').val('');

    var es_lista = $('#'+id_tablero_calculado+' .menu_agregar_elemento form input:checkbox').prop("checked");
    $('#'+id_tablero_calculado+' .menu_agregar_elemento form input:checkbox').prop('checked', false).checkboxradio("refresh");

    var status = $('#'+id_tablero_calculado+' .menu_agregar_elemento form option:selected').val();
    $('#'+id_tablero_calculado+' .menu_agregar_elemento form select')[0].selectedIndex = 0;
    $('#'+id_tablero_calculado+' .menu_agregar_elemento form select').selectmenu('refresh', true);

    console.log(deadline);

    deadline = deadline.toString();
    console.log('la fecha formateada a string: ')
    console.log(deadline);
    


    var objeto_elementos_a_almacenar = {
        id_elemento: '',
        indice_elemento: indice_elemento,
        id_tablero: id_tablero_para_guardar,
        es_lista: es_lista,
        contenido: contenido,
        status: status,
        fecha_deadline: deadline,
        fecha_creacion: hoy_en_formato_de_fecha_almacenable()
    };

    console.log(objeto_elementos_a_almacenar);

    //mando a bd - me devuelve el id.
    var response = ep_cargar_elemento(objeto_elementos_a_almacenar);
    if (response == '-1'){
        alert('hubo un error en la carga');
    }else{
        objeto_elementos_a_almacenar.id_elemento = response;

        //Almaceno el dato en localstorage
        guardar_datos_en_localstorage();
        console.log('guardé el elemento');
        
        //Llamo a las funciones creadoras
        crear_contenido_en_vista_de_tablero(objeto_elementos_a_almacenar);
        console.log('cargué los datos');
        procesar_tableros_en_vista_de_tableros();
        cargar_elementos_en_inicio();


        //Escondo el spinner y vuelvo a mostrar el '+'
        $('.menu_agregar_elemento').slideToggle();
        $('.tablero_particular .agregar').removeClass('ocultar');
    };

    return false;
	
});




/*
//Tecnicamente es un form....
//Tachar elementos realizados
$('body').on('vclick', '.tablero_particular .marco_fieldset fieldset .ui-controlgroup-controls div', function(){

    console.log('hiciste click en un checkbox');
    $(this).hide();

});
*/



/* 
-------------------------------------------------------------------------------------------------------
Funciones de Almacenaje y BORRADO
-------------------------------------------------------------------------------------------------------
*/ 


function guardar_nuevo_tablero_en_objeto_maestro(titulo_tablero){
    console.log('entré para guardar un nuevo tablero');
    //Envío el objeto a la API
    //Recibo el ID que le creó
    //Guardo el dato en localstorage, en la última posición del aray
    //Creo el subobjeto que le corresponda


    //Defino su id:
    //var id_de_nuevo_tablero = objeto_maestro_datos.ultimo_id_de_tablero + 1;
    //Esto servía cuando el id del tablero lo manejaba el front - ahora lo maneja el back


    var subobjeto_del_tablero = {
        id_tablero: -1,
        titulo: titulo_tablero,
        es_destacado: false,
        es_oculto: false,
        fecha_creacion: hoy_en_formato_de_fecha_almacenable()
    };

    //esta función guarda en db y en local, también asigna el id del tablero
    ep_cargar_tablero(objeto_maestro_usuario.correo, subobjeto_del_tablero);

    //Devuelvo por return el subobjeto creado, para utilizarse en lo que sea
    //return subobjeto_del_tablero;
    //Depreciado: no devuelvo nada lo maneja todo el endpoint
};

/*
Esto no hace falta si el id me lo entrega la bd.

function guardar_nuevo_elemento_en_objeto_maestro(objeto_elemento_a_almacenar){
    console.log('entré para guardar un nuevo objeto');
    //Agarro el objeto maestro. 
    //Agarro el array de elementos del objeto maestro
    //Me posiciono en la última posición del array
    //guardo el subobjeto en esa posicipon

    //Defino su id:
    objeto_maestro_datos.elementos[objeto_maestro_datos.elementos.length] = objeto_elemento_a_almacenar;

    //Guardo datos en bd y local
    guardar_datos_en_localstorage();
};
*/


function guardar_datos_en_localstorage(){
    console.log('entré para guardar datos en el localstorage');

    //Stringifico los datos
    var datos_a_guardar = JSON.stringify( objeto_maestro_datos );

    //Pusheo los datos al locaslstorage
    localStorage.setItem('datos_app', datos_a_guardar);
};

/*
Se separó esta función, no hay forma de cargar todos los datos juntos a bd,
primero se carga el tablero, luego el elemento.
function almacenar_cambios(){
    //Esta función almacena en db.
    //1) Conecta con endpoint cargar_datos
    //2) guarda en localstorage una cópia
    
    ep_cargar_datos(objeto_maestro_usuario.correo, objeto_maestro_datos);

    guardar_datos_en_localstorage();
}
*/

function guardar_usuario_en_localstorage(){
    console.log('entré para guardar el usuario en el localstorage');

    //Stringifico los datos
    var datos_a_guardar = JSON.stringify( objeto_maestro_usuario );

    //Pusheo los datos al locaslstorage
    localStorage.setItem('datos_usuario', datos_a_guardar);
};


function borrar_localstorage(){
    console.log('entré para borrar todo');

    //al carajo con todo:
    localStorage.clear();

    //Reseteo las variables:
    inicializar_variables();
    //reproceso la vista de tableros
    procesar_tableros_en_vista_de_tableros();
    //Proceso la vista de tableros
    cargar_elementos_en_inicio();
    //Reproceso la lista de 'papelera'
    cargar_lista_de_borradores();
    //oculto los separadores de tablero fijado y otros, en la vista de tableros
    ocultar_tableros_fijados_y_otros();

    


    //Lo llevo a la vista de bienvenida para que se vuelva a loguear
    $.mobile.navigate('#bienvenida');
}