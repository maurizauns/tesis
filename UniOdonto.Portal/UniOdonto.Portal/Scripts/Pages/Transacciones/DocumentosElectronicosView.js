function clipFloat(num,dec){
    a = parseFloat(num);
    a = a.toFixed(5);
    var t= a + "";
    i = t.indexOf(".");
    num = parseFloat(t.substring(0,(i+dec+1)));
    return (num)
}

function truncate(num){
    var trunc = 0;
    num = parseFloat(num);
    if(num >= 0.000001){
        num = num.toString();
        split = num.split('.');
        if( split.length > 1 ){
            decimals = split[1];
            if( decimals.length < 6 ){
                trunc = parseFloat(num);
            }else{
                conc = split[0].concat('.', decimals.substring(0,6));
                trunc = parseFloat(conc);
            }
        }else{
            trunc = parseFloat(num);
        }
    }else{
        trunc = num;
    }
    trunc = trunc.toFixed(6);
    return trunc;
}

function redondear(num){
    /*
    * Params:
    * num: numero a redondear
    * es_subtotal: parametro opcional para tomar el redondeo diferente unicamente en el subtotal
    */
    var es_subtotal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    //a = truncate(num);
    a = parseFloat(num);
    a = a.toFixed(6);
    var t = a  + "";
    i = t.indexOf("."); //posicion del punto
    numero = parseFloat(t.substring(0,(i+3)));
    segundo_digito = parseFloat(t.substring((i+2),(i+3)));
    tercer_digito = parseFloat(t.substring((i+3),(i+4)));
    otros_digitos = parseFloat(t.substring(i+4));

			
    if ((tercer_digito > 5) || (tercer_digito == 5 && otros_digitos > 0) || (tercer_digito == 5 && otros_digitos == 0 && (segundo_digito % 2) != 0)){
        numero = parseFloat(numero + 0.01);
        numero = numero.toFixed(2);
    }
			

    return (numero);
}

function subredondear(num){
    var round2 =round(2);
    return round2(num);
}

function round(n) {
    n = Math.pow(10,n);
    return function(num) {
        return Math.round(num*n)/n;
    }
}


function SeleccionarPrecio(precio,id){
    id_precio = "#id_"+id.substr(8)+"-precio_venta_manual";
    $(id_precio).val(parseFloat(precio));
    calcularSubtotalProducto($(id_precio));
}


function calcularTotalProductos(){
    var total = 0;
    var valores = $('input[id$="-cantidad"]'), valor;
    for(var i=0;i<valores.length;i++) {
        valor = parseFloat(valores[i].value);
        if (valor > 0 && !isNaN(valor)) {
            total = total + valor;
        }
    }
    total = total - 2;
    $('#id_total_productos').val(total.toFixed(2));
    calcularProductosPersona();
}

function calcularProductosPersona(){
    var total = parseFloat($('#id_total_productos').val());
    var personas = parseFloat($('#id_pax').val());
    var total_persona = total/personas;
    if (total_persona > 0 && !isNaN(total_persona)) {
        $('#id_total_productos_persona').val(total_persona.toFixed(2));
    }
    else{
        $('#id_total_productos_persona').val(0.00);
    }
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

function calcularServicio(total){
    if($('#id_desactivar_servicio').is(':checked')){
        var porcentaje_servicio = 'None';
        var servicio = parseFloat(porcentaje_servicio);
        //para el nuevo calculo de servicio
        var prods = $('.tiene-servicio > input[value="1"]');
        var sub_serv = 0.00;
        $.each(prods, function(k, v){
            var sub_tr = $(v).closest("tr").find("input[name$=-subtotal]")[0].value;
            sub_serv = parseFloat(sub_serv) + parseFloat(sub_tr);
        });
        total = sub_serv;
        var valor_servicio = ((servicio*total)/100);
        valor_servicio = roundToTwo(parseFloat(valor_servicio));
        //$('#id_servicio').val(roundToTwo(valor_servicio));
        //$('#id_servicio').attr('value',roundToTwo(valor_servicio));
        $('#id_servicio').val(valor_servicio);
        $('#id_servicio').attr('value',valor_servicio);
    }else{
        valor_servicio = 0.00;
        $('#id_servicio').val('0.00');
        $('#id_servicio').attr('value','0.00');
    }
    try{
        return roundToTwo(valor_servicio);
    }catch(Exception){
        return 0.00;
    }
}

function bloquear_lote(tr){
			
}


function mostrarAplicaIva(){
    fecha_emision = $('#id_fecha_emision').val();
    fecha_cadena = (''+fecha_emision).split('/');
    data_fecha_emision = new Date(fecha_cadena[2],fecha_cadena[1]-1,fecha_cadena[0]);
    fecha_tope = new Date(2016,06-1,01);
    tipoDocumento = $('#id_tipo_documento').val();

    if(data_fecha_emision >= fecha_tope && tipoDocumento != 'NCT'){
        $('.aplica_iva_12').show();
    }else{
        $('.aplica_iva_12').hide();
    }
}

function cargarComboIva(){
    fecha_emision = $('#id_fecha_emision').val();
    fecha_cadena = (''+fecha_emision).split('/');
    fecha = fecha_cadena[2] + '-' + fecha_cadena[1] + '-' + fecha_cadena[0];

    url = "/sistema/contabilidad/get_porcentajes_iva?fecha=" + fecha ;
    $.ajax({
        url: url,
        type: "GET",
        async: false,
        data: "",
        beforeSend:function(){
        },
        error:function()
        {

        },
        success: function(data){
            combo_porcentajes_iva = $('#id_porcentaje_iva');
            porcentajes = '';

            iva_a_la_fecha = data.iva_a_la_fecha;
            $.each(data.porcentajes_iva, function(index, value) {
                porcentaje = "" + value;
                if(iva_a_la_fecha==value){
                    hidden_control = ' hidden ';
                }else{
                    hidden_control = '';
                }
                porcentajes = porcentajes + '<option '+hidden_control+' value="'+porcentaje+'">'+porcentaje+'</option>';
            });
            combo_porcentajes_iva.html(porcentajes);

            //$(combo_porcentajes_iva).prop('selectedIndex', 0);
        },
        complete: function(){

        }

    });
}

//Porcentaje IVA
function actualizarIVA(){
    if ($('#id_aplica_iva_12').is(':checked')){
        porcentaje_iva_actual = $('#id_porcentaje_iva').val();

        var valores = $('#productos').find('input[id$="-cantidad"]');
        for(var i=0;i<valores.length;i++) {
            calcularSubtotalProducto($(valores[i]));
        }
        var valores = $('#cuentas').find('input[id$="-cantidad"]');
        for(var i=0;i<valores.length;i++) {
            calcularSubtotalCuenta($(valores[i]));
        }

        setarPorcentajeProductos();
        setarPorcentajeCuentas();


        $('.label-iva').html(porcentaje_iva_actual + '%');
    }else{
        fecha_emision = $('#id_fecha_emision').val();

        tipo_documento = $('#id_tipo_documento').val();
        tipo_registro_documento = $('#id_tipo_registro_documento').val();
        documento_relacionado = $('#id_documento_relacionado_id').val();
        //Fecha
        fecha_cadena = (''+fecha_emision).split('/');
        fecha = fecha_cadena[2] + '-' + fecha_cadena[1] + '-' + fecha_cadena[0];

        mostrarAplicaIva();

        if(tipo_documento == 'NCT' && documento_relacionado && documento_relacionado != ''){
            url = "/sistema/registro/documento/get_porcentaje_iva/" + documento_relacionado ;
        }else{
            if(tipo_documento == 'REE' && tipo_registro_documento == 'CLI' ){
                url = "/sistema/contabilidad/impuesto_iva_fecha?fecha=" + fecha ;
                documentos_reembolso = $("#documentos");

                /*var valores = $(documentos_reembolso).find('input[id$="-documento_id"]'), valor;
                for(var i=1;i<2;i++) {
                    valor = parseFloat(valores[i].value);
                    url = "/sistema/registro/documento/get_porcentaje_iva/" +  valores[i].value;
                }*/
            }else{
                url = "/sistema/contabilidad/impuesto_iva_fecha?fecha=" + fecha ;
            }
        }
        //console.log(url);
        $.ajax({
            url: url,
            type: "GET",
            async: true,
            data: "",
            beforeSend:function(){
            },
            error:function()
            {

            },
            success: function(data){
                porcentaje = parseFloat(data['obj']['porcentaje']);
                porcentaje_iva_actual = porcentaje;
                $('#id_porcentaje_iva').val(porcentaje_iva_actual);
                $('#id_porcentaje_iva').prop('selected', 'selected');
            },
            complete: function(){
                setearLabelIva();
                var valores = $('#productos').find('input[id$="-cantidad"]');
                for(var i=0;i<valores.length;i++) {
                    calcularSubtotalProducto($(valores[i]));
                }
                var valores = $('#cuentas').find('input[id$="-cantidad"]');
                for(var i=0;i<valores.length;i++) {
                    calcularSubtotalCuenta($(valores[i]));
                }
                setarPorcentajeProductos();
                setarPorcentajeCuentas();
            }

        });
    }

    /*porcentaje_iva_actual = parseFloat('12');
    setearLabelIva();
    var valores = $('#productos').find('input[id$="-cantidad"]');
    for(var i=0;i<valores.length;i++) {
        calcularSubtotalProducto($(valores[i]));
    }
    var valores = $('#cuentas').find('input[id$="-cantidad"]');
    for(var i=0;i<valores.length;i++) {
        calcularSubtotalCuenta($(valores[i]));
    }
    setarPorcentajeProductos();
    setarPorcentajeCuentas();*/
}

function setearLabelIva(){
    var valores = $('.label-iva');
    for(var i=0;i<valores.length;i++) {
        $(valores[i]).html(porcentaje_iva_actual + '%');
    }
}

function setarPorcentajeCuentas(){

    var valores = $('#cuentas').find('select[id$="-porcentaje_iva"]');
    for(var i=0;i<valores.length;i++) {
        opciones = $(valores[i]).find('option');

        var seleccionado = $(valores[i]).find('option:selected');

        for(j = 0; j < opciones.length; j++){
            if( !isNaN($(opciones[j]).val()) && $(opciones[j]).val() > 0 ){
                $(opciones[j]).hide();
            }
            if( !isNaN($(opciones[j]).val()) && $(opciones[j]).val() ==  $('#id_porcentaje_iva').val() ){
                $(opciones[j]).show();
            }
        }

        for(j = 0; j < opciones.length; j++){
            porcentaje = $(opciones[j]).val();
            if(porcentaje && !isNaN(porcentaje) && porcentaje > 0 ){

                /*if(porcentaje == porcentaje_iva_actual){
                    $(opciones[j]).hide();
                }else{
                    $(opciones[j]).hide();
                }*/
                ///akiiiiii

                //$('.porcentajes_iva_detalle').hide();

                if($(seleccionado).val() && !isNaN($(seleccionado).val()) && $(seleccionado).val() > 0 ){
                    if(porcentaje == porcentaje_iva_actual){
                        $(opciones[j]).prop('selected', 'selected');
                    }else{
                        $(opciones[j]).removeProp('selected');
                    }
                }
            }
        }
    }setarPorcentajeActivos();
}

function existe_valor_en_seleccionables(seleccionables,valor){
    for(i=0;i<seleccionables.length;i++){
        if(seleccionables[i].value == valor){
            return true;
        }
    }
    return false;
}

function setear_primero_en_seleccionables(seleccionables){
    for(i=0;i<seleccionables.length;i++){
        $('#id_porcentaje_iva').val(seleccionables[i].value);
    }
}

function set_valor_porcentaje(){
    seleccionables = $('#id_porcentaje_iva option:not([hidden])');
    if(primera_carga){
				
        impuesto_a_buscar = '12.00';
        impuesto_a_buscar = parseInt(impuesto_a_buscar);
        if(existe_valor_en_seleccionables(seleccionables,impuesto_a_buscar)){
            $('#id_porcentaje_iva').val(impuesto_a_buscar);
        }else{
            setear_primero_en_seleccionables(seleccionables);
        }
				
    }else{
        setear_primero_en_seleccionables(seleccionables);
    }
}

function setarPorcentajeActivos(){
    var valores = $('#activos').find('select[id$="-porcentaje_iva"]');
    for(var i=0;i<valores.length;i++) {
        opciones = $(valores[i]).find('option');

        var seleccionado = $(valores[i]).find('option:selected');
        for(j = 0; j < opciones.length; j++){

            porcentaje = $(opciones[j]).val();
            if(porcentaje && !isNaN(porcentaje) && porcentaje > 0 ){
                if(porcentaje == porcentaje_iva_actual){
                    $(opciones[j]).show();
                }else{
                    $(opciones[j]).hide();
                }
                if($(seleccionado).val() && !isNaN($(seleccionado).val()) && $(seleccionado).val() > 0 ){
                    if(porcentaje == porcentaje_iva_actual){
                        $(opciones[j]).attr('selected',  'selected');
                    }
                }
            }
        }
    }
}

function setarPorcentajeProductos(){


    porcentaje_iva_actual = $('#id_porcentaje_iva').val();
    ////waaaaa



    var valores = $('#productos').find('input[id$="-porcentaje_iva"]');
    for(var i=0;i<valores.length;i++) {
        if($(valores[i]).val() && !isNaN($(valores[i]).val()) && $(valores[i]).val() > 0 ){
            $(valores[i]).val(porcentaje_iva_actual);
        }
    }

    var valores_producto = $('#productos').find('input[id$="-hidden_porcentaje_iva_producto"]');
    for(var j=0;j<valores_producto.length;j++) {

        if($(valores_producto[j]).val() && !isNaN($(valores_producto[j]).val()) && $(valores_producto[j]).val() > 0 ){
            $(valores_producto[j]).val(porcentaje_iva_actual);
        }
    }
			
}

function setarPorcentajeProductosMedical(){
    var valores = $('#productosm').find('input[id$="-porcentaje_iva"]');
    for(var i=0;i<valores.length;i++) {

        if($(valores[i]).val() && !isNaN($(valores[i]).val()) && $(valores[i]).val() > 0 ){
            $(valores[i]).val(porcentaje_iva_actual);
        }
    }

    var valores_producto = $('#productosm').find('input[id$="-hidden_porcentaje_iva_producto"]');
    for(var j=0;j<valores_producto.length;j++) {

        if($(valores_producto[j]).val() && !isNaN($(valores_producto[j]).val()) && $(valores_producto[j]).val() > 0 ){
            $(valores_producto[j]).val(porcentaje_iva_actual);
        }
    }
}

//Importaciones
function calcularTotalDAU() {
    sub_salvaguardia = 0.00;
    sub_advalorem = 0.00;
    sub_fodinfa = 0.00;
    sub_iva = 0.00;
    sub_ice = 0.00;
    sub_control = 0.00;

    sub_salvaguardia = sub_salvaguardia + parseFloat($('#id_sub_salvaguardia').val());
    sub_advalorem = sub_advalorem + parseFloat($('#id_sub_advalorem').val());
    sub_fodinfa = sub_fodinfa + parseFloat($('#id_fod_infa').val());
    sub_iva = sub_iva + parseFloat($('#id_iva').val());
    sub_ice = sub_ice + parseFloat($('#id_sub_ice').val());
    sub_control = sub_control + parseFloat($('#id_sub_control').val());
    total = sub_salvaguardia + sub_advalorem + sub_fodinfa + sub_iva + sub_ice + sub_control;

    if(!isNaN(total)){
        $('#id_total').val(total.toFixed(2));
        // Para total de la deuda - Configuración Pagos Cuotas
				
        var total_doc = parseFloat('125.00000');
        var total_retenciones = parseFloat('2.23000');
        var total_deuda = total_doc - total_retenciones;
        $('#id_total_deuda').val(total_deuda.toFixed(2));
				
    }
}

function calcularSubTotalDAU(){
    var sub_fob = 0.00,
    sub_transporte = 0.00,
    sub_seguro = 0.00,
    sub_valoraduana = 0.00,
    sub_advalorem = 0.00,
    sub_salvaguardia = 0.00,
    sub_fod = 0.00,
    sub_ivat = 0.00,
    sub_ice = 0.00,
    sub_control = 0.00,
    total = 0.00;

    var valores = $('.val-fob'), valor;
    for(var i=0;i<valores.length;i++) {
        valor = parseFloat(valores[i].value);
        if (valor > 0 && !isNaN(valor)) {
            sub_fob = sub_fob + valor;
        }
    }
    valores = $('.val-transporte');
    for(var i=0;i<valores.length;i++) {
        valor = parseFloat(valores[i].value);
        if (valor > 0 && !isNaN(valor)) {
            sub_transporte = sub_transporte + valor;
        }
    }

    valores = $('.val-seguro');
    for(var i=0;i<valores.length;i++) {
        valor = parseFloat(valores[i].value);
        if (valor > 0 && !isNaN(valor)) {
            sub_seguro = sub_seguro + valor;
        }
    }

    valores = $('.val-salvaguardia'), valor;
    for(var i=0;i<valores.length;i++) {
        valor = parseFloat(valores[i].value);
        if (valor > 0 && !isNaN(valor)) {
            sub_salvaguardia = sub_salvaguardia + valor;
        }
    }

    valores = $('.val-arancel');
    for(var i=0;i<valores.length;i++) {
        valor = parseFloat(valores[i].value);
        if (valor > 0 && !isNaN(valor)) {
            sub_advalorem = sub_advalorem + valor;
        }
    }

    valores = $('.val-fod');
    for(var i=0;i<valores.length;i++) {
        valor = parseFloat(valores[i].value);
        if (valor > 0 && !isNaN(valor)) {
            sub_fod = sub_fod + valor;
        }
    }

    valores = $('.val-ivat');
    for(var i=0;i<valores.length;i++) {
        valor = parseFloat(valores[i].value);
        if (valor > 0 && !isNaN(valor)) {
            sub_ivat = sub_ivat + valor;
        }
    }

    valores = $('.val-ice');
    for(var i=0;i<valores.length;i++) {
        valor = parseFloat(valores[i].value);
        if (valor > 0 && !isNaN(valor)) {
            sub_ice = sub_ice + valor;
        }
    }

    valores = $('.val-control');
    for(var i=0;i<valores.length;i++) {
        valor = parseFloat(valores[i].value);
        if (valor > 0 && !isNaN(valor)) {
            sub_control = sub_control + valor;
        }
    }

    valores = $('.val-valoraduana');
    for(var i=0;i<valores.length;i++) {
        valor = parseFloat(valores[i].value);
        if (valor > 0 && !isNaN(valor)) {
            sub_valoraduana = sub_valoraduana + valor;
        }
    }

    var iva = 0.00, fod_infa = 0.00, advalorem = 0.00, total = 0.00;

    $('#id_sub_fob').val(sub_fob.toFixed(2));
    $('#id_sub_transporte').val(sub_transporte.toFixed(2));
    $('#id_sub_seguro').val(sub_seguro.toFixed(2));
    $('#id_sub_valoraduana').val(sub_valoraduana.toFixed(2));
    $('#id_sub_salvaguardia').val(sub_salvaguardia.toFixed(2));
    $('#id_sub_advalorem').val(sub_advalorem.toFixed(2));
    $('#id_fod_infa').val(sub_fod.toFixed(2));
    $('#id_iva').val(sub_ivat.toFixed(2));
    $('#id_sub_ice').val(sub_ice.toFixed(2));
    $('#id_sub_control').val(sub_control.toFixed(2));

    if(!isNaN($('#id_iva').val())){
        iva = parseFloat($('#id_iva').val());
    }

    if(!isNaN($('#id_fod_infa').val())){
        fod_infa = parseFloat($('#id_fod_infa').val());
    }

    if(!isNaN($('#id_sub_advalorem').val())){
        advalorem = parseFloat($('#id_sub_advalorem').val());
    }

    //total = parseFloat(iva.toFixed(2)) + parseFloat(fod_infa.toFixed(2)) + parseFloat(sub_advalorem.toFixed(2)) + parseFloat(sub_salvaguardia.toFixed(2)) + parseFloat(sub_ice.toFixed(2));
    //$('#id_total').val(total.toFixed(2));
    calcularTotalDAU();
}

function calcularCantidadItemsDocumento(){

    var cantidad = 0;

        	

}

function calcularTotal() {
    var subtotal = 0.00, subtotal_iva = 0.00, subtotal_0 = 0.00, baseIVA = 0.00, descuento = 0.00, ice_0 = 0.00, ice_iva = 0.00 ;
    var comision_iva = 0.00;
    var ice_gravabe = 0;
    var valores = $('.val-subtotal'), valor;
    for(var i=0;i<valores.length;i++) {
        valor = parseFloat(valores[i].value);
        if (valor > 0 && !isNaN(valor)) {
            subtotal = subtotal + valor;
        }
    }
    //if ($('#id_tipo_registro_documento').val() == 'CLI') {
    valores = $("#cuentas").find('.val-ice');
    for(var i=0;i<valores.length;i++) {
        tr = $(valores[i]).closest('tr');
        var porcentajeIVA = parseInt($(tr).find('select[id$="-porcentaje_iva"]').val());
        valor = parseFloat(valores[i].value);
        if (valor > 0 && !isNaN(valor)) {
            if(porcentajeIVA > 0){
                ice_iva = ice_iva + valor;
            }
            else{
                ice_0 = ice_0 + valor;
            }
        }
    }

    valores = $("#productos").find('.val-ice');
    for(var i=0;i<valores.length;i++) {
        tr = $(valores[i]).closest('tr');
        var porcentajeIVA = parseInt($(tr).find('input[id$="-porcentaje_iva"]').val());
        valor = parseFloat(valores[i].value);
        if (valor > 0 && !isNaN(valor)) {
            if(porcentajeIVA > 0){
                ice_iva = ice_iva + valor;
            }
            else{
                ice_0 = ice_0 + valor;
            }
        }
    }
    //}
			

    valores = $('.val-gravable');
    for(var i=0;i<valores.length;i++) {
        valor = parseFloat(valores[i].value);
        if (valor > 0 && !isNaN(valor)) {
            baseIVA = baseIVA + valor;
            subtotal_iva = subtotal_iva + valor;
        }
    }
    subtotal_0 = subtotal - subtotal_iva;
    valores = $('.val-descuento');
    for(var i=0;i<valores.length;i++) {
        valor = parseFloat(valores[i].value);
        if (valor > 0 && !isNaN(valor)) {
            descuento = descuento + valor;
        }
    }

			

    $('#id_subtotal_iva').val(subtotal_iva.toFixed(2));
    $('#id_subtotal_0').val(subtotal_0.toFixed(2));
    $('#id_descuento').val(descuento.toFixed(2));
			
    //$('#id_iva').val(redondear((baseIVA + ice) * porcentaje_iva_actual/100));
    $('#id_iva').val(roundToTwo(redondear((baseIVA + ice_iva ) * porcentaje_iva_actual/100)));
			
    $('#id_iva_gasto').val(redondear((baseIVA + ice_iva) * porcentaje_iva_actual/100));
    handleSelectEnviarIVAGasto();
    $('#id_ice').val(redondear(ice_iva + ice_0));
			
    ivard = roundToTwo(redondear((baseIVA + ice_iva) * porcentaje_iva_actual/100));
    ivard = parseFloat(ivard);
    ibpnr = 0;
				
    // $('#id_total').val(redondear(subtotal + redondear((baseIVA * porcentaje_iva_actual/100) + ice)));
    $('#id_total').val((subtotal + ivard + ice_0 + ice_iva + ibpnr).toFixed(2));
    // Para total de la deuda - Configuración Pagos Cuotas
				
    var total_doc = parseFloat('125.00000');
    var total_retenciones = parseFloat('2.23000');
    var total_deuda = total_doc - total_retenciones;
    $('#id_total_deuda').val(total_deuda.toFixed(2));
				
			
			
			
			
			
    // Campos de gasolinera
			

    //es_gasolinera
			


			
    /*Forma de pago con total de factura*/
    n_tr=$('#tdetalle_pago tr').length;
    if (n_tr==2){
        tr = $('#tdetalle_pago tr')[1];
        $(tr).find("input[id*='-valor']").val($('#id_total').val());
    }

		
    calcularTotalIBPNRProductos();
    calcularCantidadItemsDocumento();
}

function colocarTotalDocReembolsoProveedor(el,total_doc_prov){
    $($(el).closest('tr').find('input[id$="-total"]')[0]).val(total_doc_prov);
}

function calcularTotalDocsReembolsoProveedor(el) {
    total_base_0 = calcularTotalBase0(el);
    total_base_iva  = calcularTotalBaseIva(el);
    total_base_no_objeto = calcularTotalBaseNoObjeto(el);
    total_base_exento = calcularTotalBaseExento(el);
    total_iva = calcularTotalIvaProv(el);
    total_ice = calcularTotalIceProv(el);
    colocarTotalDocProv(el);
    total_doc_prov  = total_base_0 + total_base_iva + total_base_no_objeto + total_base_exento + total_iva + total_ice;
    $('#id_totaldocs_prov_total').html(total_doc_prov.toFixed(2));

}

function colocarTotalDocProv(el) {
    base_0 = 0.00,base_iva = 0.00,base_no_objeto = 0.00,base_exento = 0.00,iva=0.00,ice = 0.00;

    s_base_0 = $($(el).closest('tr').find('input[id$="-base_0"]')[0]).val();
    s_base_iva = $($(el).closest('tr').find('input[id$="-base_iva"]')[0]).val();
    s_base_no_objeto = $($(el).closest('tr').find('input[id$="-base_no_objeto"]')[0]).val();
    s_base_exento = $($(el).closest('tr').find('input[id$="-base_exento"]')[0]).val();
    s_iva = $($(el).closest('tr').find('input[id$="-iva"]')[0]).val();
    s_ice = $($(el).closest('tr').find('input[id$="-ice"]')[0]).val();
    if(s_base_0 > 0 && !isNaN(s_base_0))
        base_0 = parseFloat(s_base_0).toFixed(2);
    if(s_base_iva > 0 && !isNaN(s_base_iva))
        base_iva = parseFloat(s_base_iva).toFixed(2);
    if(s_base_no_objeto > 0 && !isNaN(s_base_no_objeto))
        base_no_objeto = parseFloat(s_base_no_objeto).toFixed(2);
    if(s_base_exento > 0 && !isNaN(s_base_exento))
        base_exento = parseFloat(s_base_exento).toFixed(2);
    if(s_iva > 0 && !isNaN(s_iva))
        iva = parseFloat(s_iva).toFixed(2);
    if(s_ice > 0 && !isNaN(s_ice))
        ice = parseFloat(s_ice).toFixed(2);

    total = parseFloat(base_0) + parseFloat(base_iva) + parseFloat(base_no_objeto) + parseFloat(base_exento) + parseFloat(iva) + parseFloat(ice);
    total = redondear(total);

    $($(el).closest('tr').find('input[id$="-total"]')[0]).val(total);
}

function retornaTipo(num){
    var tipo_id = $('#id_docreembolsoproveedor_'+num+'-tipo_proveedor').val();
    var t_id='';
    if(tipo_id == 'C'){
        t_id = 'ced';
    }
    if(tipo_id == 'R'){
        t_id = 'ruc';
    }
    if(tipo_id == 'P'){
        t_id = 'pas';
    }
    var tipo = $('[id^=id_docreembolsoproveedor_'+num+'-tipo_documento_'+t_id+']').val();
    return tipo;
}

function calcularTotalBase0(el) {

    total = 0.00;
    cont = 0;
    num = '';
    $('.doc_reemb_prov_base_0').each(function() {
        cont++;
    });
    for(i=0;i<=cont;i++){
        num = i.toString();
        var valor = $('#id_docreembolsoproveedor_'+num+'-base_0').val();
        var tipo = retornaTipo(num);
        x = parseFloat(valor);
        if (x > 0 && !isNaN(x)){
            if (tipo == '04'){
                total = total - x;
            }else{
                total = total + x;
            }
        }
    }

    $('#id_totaldocs_prov_base0').html(total.toFixed(2));
    return total;
}

function calcularTotalBaseIva(el) {
    total = 0.00;
    cont = 0;
    num = '';
    $('.doc_reemb_prov_base_iva').each(function() {
        cont++;
    });
    for(i=0;i<=cont;i++){
        num = i.toString();
        var valor = $('#id_docreembolsoproveedor_'+num+'-base_iva').val();
        var tipo = retornaTipo(num);
        x = parseFloat(valor);
        if (x > 0 && !isNaN(x)){
            if (tipo == '04'){
                total = total - x;
            }else{
                total = total + x;
            }
        }
    }

    $('#id_totaldocs_prov_baseiva').html(total.toFixed(2));
    return total;
}

function calcularTotalBaseNoObjeto(el) {
    total = 0.00;
    cont = 0;
    num = '';
    $('.doc_reemb_prov_base_no_objeto').each(function() {
        cont++;
    });

    for(i=0;i<=cont;i++){
        num = i.toString();
        var valor = $('#id_docreembolsoproveedor_'+num+'-base_no_objeto').val();
        var tipo = retornaTipo(num);
        x = parseFloat(valor);
        if (x > 0 && !isNaN(x)){
            if (tipo == '04'){
                total = total - x;
            }else{
                total = total + x;
            }
        }
    }
    $('#id_totaldocs_prov_base_no_objeto').html(total.toFixed(2));
    return total;
}

function calcularTotalBaseExento(el) {
    total = 0.00;
    cont = 0;
    num = '';
    $('.doc_reemb_prov_base_exento').each(function() {
        cont++;
    });

    for(i=0;i<=cont;i++){
        num = i.toString();
        var valor = $('#id_docreembolsoproveedor_'+num+'-base_exento').val();
        var tipo = retornaTipo(num);
        x = parseFloat(valor);
        if (x > 0 && !isNaN(x)){
            if (tipo == '04'){
                total = total - x;
            }else{
                total = total + x;
            }
        }
    }
    $('#id_totaldocs_prov_base_exento').html(total.toFixed(2));
    return total;
}

function calcularTotalIvaProv(el) {
    total = 0.00;
    cont = 0;
    num = '';
    $('.doc_reemb_prov_iva').each(function() {
        cont++;
    });

    for(i=0;i<=cont;i++){
        num = i.toString();
        var valor = $('#id_docreembolsoproveedor_'+num+'-iva').val();
        var tipo = retornaTipo(num);
        x = parseFloat(valor);
        if (x > 0 && !isNaN(x)){
            if (tipo == '04'){
                total = total - x;
            }else{
                total = total + x;
            }
        }
    }

    $('#id_totaldocs_prov_iva').html(total.toFixed(2));
    return total;
}

function calcularTotalIceProv(el) {
    total = 0.00;
    cont = 0;
    num = '';
    $('.doc_reemb_prov_ice').each(function() {
        cont++;
    });

    for(i=0;i<=cont;i++){
        num = i.toString();
        var valor = $('#id_docreembolsoproveedor_'+num+'-ice').val();
        var tipo = retornaTipo(num);
        x = parseFloat(valor);
        if (x > 0 && !isNaN(x)){
            if (tipo == '04'){
                total = total - x;
            }else{
                total = total + x;
            }
        }
    }
    $('#id_totaldocs_prov_ice').html(total.toFixed(2));
    return total;
}

/*function calcularTotalProv(el) {
    var total = 0.00;
    cont = 0;
    $('.doc_reemb_prov_total').each(function() {
        num = cont.toString();
        var tipo = retornaTipo(num);
        var valor = $(this).val();
        x = parseFloat(valor);
        if (x > 0 && !isNaN(x)){
            if (tipo == '04'){
                total = total - x;
            }else{
                total = total + x;
            }
        }
        cont++;
    });
    $('#id_totaldocs_prov_total').html(total.toFixed(2));
    return total;
}*/
/******** ******/



function calcularTotalDocsReembolso() {
    total_docs = calcularTotalDocs();
    total_subiva  = calcularTotalSubIva();
    total_sub0 = calcularTotalSub0();
    total_iva = calcularTotalIva();
    total_saldo = calcularTotalSaldo();

    //colocarTotalesEnTabla(total_docs,total_subiva,total_sub0,total_iva,total_saldo);
}

function colocarTotalesEnTabla(total_docs,total_subiva,total_sub0,total_iva,total_saldo){

    $('#totales_reembolso_sub_iva').html(total_subiva.toFixed(2));
    $('#totales_reembolso_sub_0').html(total_sub0.toFixed(2));
    $('#totales_reembolso_iva').html(total_iva.toFixed(2));
    $('#totales_reembolso_saldo').html(total_saldo.toFixed(2));
    $('#totales_reembolso_total').html(total_docs.toFixed(2));


}


function calcularTotalDocs() {
    var total = 0.00;
    $('.documento_total').each(function() {
        var valor = $(this).html();
        x = parseFloat(valor);
        if (x > 0 && !isNaN(x))
            total = total + x;
    });
    $('#id_totaldocsreembolso').html(total.toFixed(2));
    return total;
}

function calcularTotalSubIva() {
    var total = 0.00;
    $('.documento_sub_iva').each(function() {
        var valor = $(this).html();
        x = parseFloat(valor);
        if (x > 0 && !isNaN(x))
            total = total + x;
    });
    $('#id_totaldocs_sub_iva').html(total.toFixed(2));
    return total;
}

function calcularTotalSub0() {
    var total = 0.00;
    $('.documento_sub_0').each(function() {
        var valor = $(this).html();
        x = parseFloat(valor);
        if (x > 0 && !isNaN(x))
            total = total + x;
    });
    $('#id_totaldocs_sub_0').html(total.toFixed(2));
    return total;
}

function calcularTotalIva() {
    var total = 0.00;
    $('.documento_iva').each(function() {
        var valor = $(this).html();
        x = parseFloat(valor);
        if (x > 0 && !isNaN(x))
            total = total + x;
    });
    $('#id_totaldocs_iva').html(total.toFixed(2));
    return total;
}

function calcularTotalSaldo() {
    var total = 0.00;
    $('.documento_saldo').each(function() {
        var valor = $(this).html();
        x = parseFloat(valor);
        if (x > 0 && !isNaN(x))
            total = total + x;
    });
    $('#id_totaldocs_saldo').html(total.toFixed(2));
    return total;
}

function calcularSubtotalProducto(caller) {
    var tr = $(caller).closest('tr');
    var cantidad = parseFloat($(tr).find('input[id$="-cantidad"]').val());
    var porcentajeIVA = parseInt($(tr).find('input[id$="-porcentaje_iva"]').val());

    var tipoDocumento = $('#id_tipo_documento').val();
    if (( tipoDocumento == 'DNA' || tipoDocumento == 'NAI' || tipoDocumento == 'NCL')){
        porcentajeIVA = null;
        $(tr).find('input[id$="-porcentaje_iva"]').val("");
    }
    else{
        if((exterior && $('#id_tipo_registro_documento').val() == 'CLI') || (tipoDocumento == 'NVE') || (artesanal && $('#id_tipo_registro_documento').val() == 'PRO')){
            porcentajeIVA = 0;
            $(tr).find('input[id$="-porcentaje_iva"]').val(0);
        }else{
					
        }
    }
    var porcentajeICE = parseFloat($(tr).find('input[id$="-porcentaje_ice"]').val());
    var valorICE = parseFloat($(tr).find('input[id$="-valor_ice"]').val());
    var porcentajeDesc = parseFloat($(tr).find('input[id$="-porcentaje_descuento"]').val());
    var valorDesc = parseFloat($(tr).find('input[id$="-descuento"]').val());
    var hidden_maneja_pvpmanual = $(tr).find('input[id$="-hidden_maneja_pvpmanual"]').val();
    var precio;
    var subtotal = null, descuento = null, subtotal_ice = null;
    var maneja_pvpmanual_per = false;
    if($('#persona_maneja_pvpmanual').val() == '1')
        maneja_pvpmanual_per = true;
    if ($('#id_tipo_registro_documento').val() == 'CLI') {
				
        if (hidden_maneja_pvpmanual == "1" || maneja_pvpmanual_per)
            precio = parseFloat($(tr).find('input[id$="-precio_venta_manual"]').val());
        else
            precio = parseFloat($(tr).find('select[id$="-precio_venta"]').val());
				
        if(tipoDocumento == 'NCL'){
            porcentajeIVA = 0;
        }
    } else {
        precio = parseFloat($(tr).find('input[id$="-precio_compra"]').val());
    }
    if (cantidad && precio && (cantidad * precio) > 0) {
        subtotal = cantidad * precio;
        subtotal_ice = subtotal;
				
        if (porcentajeDesc && porcentajeDesc > 0 && porcentajeDesc <= 100) {				
            descuento = subtotal * (porcentajeDesc / 100.00);
            descuento = parseFloat(redondear(descuento, es_subtotal=true));
            subtotal = subtotal - descuento;
            subtotal = parseFloat(redondear(subtotal, es_subtotal=true));
        }
				
    }
    if (descuento && descuento > 0) {
        $(tr).find('input[id$="-descuento"]').val(redondear(descuento, es_subtotal=true));
    } else {
        $(tr).find('input[id$="-descuento"]').val("0.00");
    }
    $(tr).find('input[id$="-ice"]').val(0);
    $(tr).find('input[id$="-base_cero"]').val(0);
    $(tr).find('input[id$="-base_gravable"]').val(0);
    $(tr).find('input[id$="-base_no_gravable"]').val(0);
    if (subtotal && subtotal > 0) {
        $(tr).find('input[id$="-subtotal"]').val(redondear(subtotal,  es_subtotal=true));
        if ($('#id_tipo_registro_documento').val() == 'CLI') {
					
            if (hidden_maneja_pvpmanual == "1" || maneja_pvpmanual_per){
                if ( tipoDocumento == 'DNA' || tipoDocumento == 'NAI' || tipoDocumento == 'NCL') {
                    $(tr).find('input[id$="-base_cero"]').val(0.00);
                    $(tr).find('input[id$="-base_gravable"]').val(0.00);
                    $(tr).find('input[id$="-base_no_gravable"]').val(redondear(subtotal,  es_subtotal=true));
                }else{
                    if(exterior || (tipoDocumento == 'NVE')){
                        $(tr).find('input[id$="-base_cero"]').val(redondear(subtotal,  es_subtotal=true));
                        $(tr).find('input[id$="-base_gravable"]').val(0.00);
                        $(tr).find('input[id$="-base_no_gravable"]').val(0.00);
                    }else{
                        var porcentajeIVA = parseInt($(tr).find('input[id$="-hidden_porcentaje_iva_producto"]').val());
                        if (porcentajeIVA == 0) {
                            $(tr).find('input[id$="-base_cero"]').val(redondear(subtotal,  es_subtotal=true));
                            $(tr).find('input[id$="-base_gravable"]').val(0.00);
                            $(tr).find('input[id$="-base_no_gravable"]').val(0.00);
                        }
                        else if (porcentajeIVA > 0) {
                            $(tr).find('input[id$="-base_cero"]').val(0.00);
                            $(tr).find('input[id$="-base_gravable"]').val(redondear(subtotal,  es_subtotal=true));
                            $(tr).find('input[id$="-base_no_gravable"]').val(0.00);
                        }
                        else {
                            $(tr).find('input[id$="-base_cero"]').val(0.00);
                            $(tr).find('input[id$="-base_gravable"]').val(0.00);
                            $(tr).find('input[id$="-base_no_gravable"]').val(redondear(subtotal,  es_subtotal=true));
                        }

                    }

                    if (porcentajeICE){
                        $(tr).find('input[id$="-ice"]').val(redondear((subtotal_ice * (porcentajeICE / 100.00))));
                    }else{
                        if(valorICE){
                            $(tr).find('input[id$="-ice"]').val(redondear((cantidad * valorICE)));
                        }
                        else{
                            $(tr).find('input[id$="-ice"]').val(0.00);
                        }
                    }
                }
            }else{
                var optprecio = $(tr).find('select[id$="-precio_venta"] option:selected');
                var baseprecio, baseice;

                // base cero
                baseprecio = parseFloat($(optprecio).attr('basecero')) * cantidad;
							
                if (porcentajeDesc && porcentajeDesc > 0 && porcentajeDesc <= 100) {
                    dcto = baseprecio * (porcentajeDesc / 100);
                    dcto = parseFloat(redondear(dcto));
                    baseprecio = baseprecio - dcto;
                }
								
                f = $('#tipo_persona').val();
                if ( tipoDocumento == 'DNA' || tipoDocumento == 'NAI' || tipoDocumento == 'NCL') {
                    if(tipoDocumento == 'NCL') {
                        $(tr).find('input[id$="-base_cero"]').val(0.00);
                    }else{
                        if (porcentajeIVA == null && parseFloat($(optprecio).attr('base0'))!=0) {
                            $(tr).find('input[id$="-base_cero"]').val(0.00);
                        }else{
                            $(tr).find('input[id$="-base_cero"]').val(redondear(baseprecio,es_subtotal=true));
                        }
                    }
                }else{
                    //$(tr).find('input[id$="-base_cero"]').val(redondear(baseprecio));

                    if (exterior || (tipoDocumento == 'NVE')) {
                        if (porcentajeIVA == 0 && parseFloat($(optprecio).attr('basecero'))==0 && parseFloat($(optprecio).attr('baseiva'))!=0) {
                            baseprecio = parseFloat($(optprecio).attr('baseiva')) * cantidad;
                        }else if (porcentajeIVA == 0 && parseFloat($(optprecio).attr('basecero'))==0 && parseFloat($(optprecio).attr('basenoiva'))!=0){
                            baseprecio = parseFloat($(optprecio).attr('basenoiva')) * cantidad;
                        }else{
                            baseprecio = parseFloat($(optprecio).attr('basecero')) * cantidad;
                        }
									
                        if (porcentajeDesc && porcentajeDesc > 0 && porcentajeDesc <= 100) {
                            dcto = baseprecio * (porcentajeDesc / 100);
                            dcto = parseFloat(redondear(dcto));
                            baseprecio = baseprecio - dcto;
                        }
									
                        $(tr).find('input[id$="-base_cero"]').val(redondear(baseprecio,es_subtotal=true));
                    }else{
                        $(tr).find('input[id$="-base_cero"]').val(redondear(baseprecio,es_subtotal=true));
                    }
                }

                // base gravable
                baseprecio = parseFloat($(optprecio).attr('baseiva')) * cantidad;
							
                if (porcentajeDesc && porcentajeDesc > 0 && porcentajeDesc <= 100) {
                    dcto = baseprecio * (porcentajeDesc / 100);
                    dcto = parseFloat(redondear(dcto));
                    baseprecio = baseprecio - dcto;
                }
							
                f = $('#tipo_persona').val();
                if (tipoDocumento == 'NVE' || tipoDocumento == 'DNA' || tipoDocumento == 'NCL' || tipoDocumento == 'NAI' || exterior) {
                    if(tipoDocumento == 'NCL'){
                        porcentajeIVA = null;
                    }
                    if ((porcentajeIVA == null || porcentajeIVA == 0) && parseFloat($(optprecio).attr('baseiva'))!=0) {
                        $(tr).find('input[id$="-base_gravable"]').val(0.00);
                    }else{
                        $(tr).find('input[id$="-base_gravable"]').val(redondear(baseprecio, es_subtotal=true));
                    }
                }else{
                    $(tr).find('input[id$="-base_gravable"]').val(redondear(baseprecio, es_subtotal=true));
                }

                // base no gravable
                if (tipoDocumento == 'DNA' || tipoDocumento == 'NCL' || tipoDocumento == 'NAI') {
                    if (porcentajeIVA == null && parseFloat($(optprecio).attr('basenoiva'))==0 && parseFloat($(optprecio).attr('baseiva'))!=0) {
                        baseprecio = parseFloat($(optprecio).attr('baseiva')) * cantidad;
                    }else if (porcentajeIVA == null && parseFloat($(optprecio).attr('basenoiva'))==0 && parseFloat($(optprecio).attr('basecero'))!=0){
                        baseprecio = parseFloat($(optprecio).attr('basecero')) * cantidad;
                    }else{
                        baseprecio = parseFloat($(optprecio).attr('basenoiva')) * cantidad;
                    }
								
                    if (porcentajeDesc && porcentajeDesc > 0 && porcentajeDesc <= 100) {
                        dcto = baseprecio * (porcentajeDesc / 100);
                        dcto = parseFloat(redondear(dcto));
                        baseprecio = baseprecio - dcto;
                    }
								
                    $(tr).find('input[id$="-base_no_gravable"]').val(redondear(baseprecio, es_subtotal=true));
                }else{

                    //Si es exterior se va a porcentaje 0
                    if (exterior || (tipoDocumento == 'NVE')) {
                        $(tr).find('input[id$="-base_no_gravable"]').val(0.00);
                    }else{
                        baseprecio = parseFloat($(optprecio).attr('basenoiva')) * cantidad;
									
                        if (porcentajeDesc && porcentajeDesc > 0 && porcentajeDesc <= 100) {
                            dcto = baseprecio * (porcentajeDesc / 100);
                            dcto = parseFloat(redondear(dcto));
                            baseprecio = baseprecio - dcto;
                        }
									
                        $(tr).find('input[id$="-base_no_gravable"]').val(redondear(baseprecio, es_subtotal=true));
                    }
                }

                // ice
                baseice = parseFloat($(optprecio).attr('ice')) * cantidad;
                $(tr).find('input[id$="-ice"]').val(redondear(baseice));
            }
					
        }
        else{
            if (porcentajeIVA == 0) {
                $(tr).find('input[id$="-base_cero"]').val(redondear(subtotal,  es_subtotal=true));
            }
            else if (porcentajeIVA > 0) {
                $(tr).find('input[id$="-base_gravable"]').val(redondear(subtotal,  es_subtotal=true));
            }
            else {
                $(tr).find('input[id$="-base_no_gravable"]').val(redondear(subtotal,  es_subtotal=true));
            }

            if (porcentajeICE){
                $(tr).find('input[id$="-ice"]').val(redondear((subtotal_ice * (porcentajeICE / 100.00))));
            }else{
                if(valorICE){
                    $(tr).find('input[id$="-ice"]').val(redondear((cantidad * valorICE)));
                }
                else{
                    $(tr).find('input[id$="-ice"]').val(0.00);
                }
            }
            if (exterior ) {}
        }
				
    }
    else {
        $(tr).find('input[id$="-subtotal"]').val("0.00");
        if (porcentajeICE){
            $(tr).find('input[id$="-ice"]').val(redondear((subtotal_ice * (porcentajeICE / 100.00))));
        }else{
            if(valorICE){
                $(tr).find('input[id$="-ice"]').val(redondear((cantidad * valorICE)));
            }
            else{
                $(tr).find('input[id$="-ice"]').val(0.00);
            }
        }
    }
			
    if (hidden_maneja_pvpmanual == "1" || maneja_pvpmanual_per){
        if ($(tr).find('input[id$="-precio_venta_manual"]').val()) {
            $(tr).find('input[id$="-hidden_precio_venta"]').val($(tr).find('input[id$="-precio_venta_manual"]').val());
        }
    }else{
        if ($(tr).find('select[id$="-precio_venta"]').val()) {
            $(tr).find('input[id$="-hidden_precio_venta"]').val($(tr).find('select[id$="-precio_venta"]').val());
        }
    }
    calcularTotal();
			
    if ($(tr).find('select[id$="-unidad"]').val()) {
        $(tr).find('input[id$="-hidden_unidad"]').val($(tr).find('select[id$="-unidad"]').val());
    }
    if ((artesanal && $('#id_tipo_registro_documento').val() == 'PRO')){
        var por_iva = $(tr).find('input[id$="-porcentaje_iva"]');
        por_iva.val(0);
    }
    if ((exterior && $('#id_tipo_registro_documento').val() == 'CLI')){
        var por_iva = $(tr).find('input[id$="-porcentaje_iva"]');
        por_iva.val(0);
    }

			

			
}

function calcularSubtotalCuenta(caller){
    var tr = $(caller).closest('tr');
    var cantidad = parseFloat($(tr).find('input[id$="-cantidad"]').val());
    var valor = parseFloat($(tr).find('input[id$="-valor"]').val());
    var porcentajeIVA = parseInt($(tr).find('select[id$="-porcentaje_iva"]').val());
    var porcentajeICE = parseFloat($(tr).find('input[id$="-porcentaje_ice"]').val());
    var porcentajeDesc = parseFloat($(tr).find('input[id$="-porcentaje_descuento"]').val());
    var subtotal = 0.00, descuento = 0.00, subtotal_ice = 0.00;
    if (cantidad && valor > 0 && !isNaN(valor)) {
        subtotal = cantidad * valor;
        subtotal_ice = subtotal;
				
        if (!isNaN(porcentajeDesc) && porcentajeDesc && porcentajeDesc > 0 && porcentajeDesc <= 100) {
            descuento = subtotal * (porcentajeDesc / 100.00);
            descuento = redondear(descuento);
            subtotal = subtotal - descuento;
        }
				
    }
    $(tr).find('input[id$="-ice"]').val(0);
    if (descuento && descuento > 0 && !isNaN(descuento)) {
        $(tr).find('input[id$="-descuento"]').val(redondear(descuento));
    } else {
        $(tr).find('input[id$="-descuento"]').val("0.00");
    }

    if (!isNaN(subtotal) && subtotal && subtotal > 0) {
        $(tr).find('input[id$="-subtotal"]').val(redondear(subtotal,  es_subtotal=true));
        if (porcentajeIVA == 0) {
            $(tr).find('input[id$="-base_cero"]').val(redondear(subtotal,  es_subtotal=true));
            $(tr).find('input[id$="-base_gravable"]').val(0);
            $(tr).find('input[id$="-base_no_gravable"]').val(0);
            if (porcentajeICE){
                $(tr).find('input[id$="-ice"]').val(redondear((subtotal_ice * (porcentajeICE / 100.00))));
            }
        }
        else if (porcentajeIVA > 0) {
            $(tr).find('input[id$="-base_gravable"]').val(redondear(subtotal,  es_subtotal=true));
            $(tr).find('input[id$="-base_cero"]').val(0);
            $(tr).find('input[id$="-base_no_gravable"]').val(0);
            if (porcentajeICE){
                $(tr).find('input[id$="-ice"]').val(redondear((subtotal_ice * (porcentajeICE / 100.00))));
            }
        }
        else {
            $(tr).find('input[id$="-base_no_gravable"]').val(redondear(subtotal,  es_subtotal=true));
            $(tr).find('input[id$="-base_gravable"]').val(0);
            $(tr).find('input[id$="-base_cero"]').val(0);
            if (porcentajeICE){
                $(tr).find('input[id$="-ice"]').val(redondear((subtotal_ice * (porcentajeICE / 100.00))));
            }
        }
    }
    else {
        $(tr).find('input[id$="-subtotal"]').val("0.00");
        //$(tr).find('input[id$="-ice"]').val(0);
        $(tr).find('input[id$="-base_cero"]').val(0);
        $(tr).find('input[id$="-base_gravable"]').val(0);
        $(tr).find('input[id$="-base_no_gravable"]').val(0);
        if (!isNaN(subtotal_ice) && subtotal_ice && subtotal_ice > 0 && porcentajeICE){
            $(tr).find('input[id$="-ice"]').val(redondear((subtotal_ice * (porcentajeICE / 100.00))));
        }
    }
    calcularTotal();
}

		

		


function calcularValorRetencionIR(caller){
    var tr = $(caller).closest('tr');
    var base = parseFloat($(tr).find('input[id$="-base"]').val());
    var porcentaje = parseFloat($(tr).find('input[id$="-porcentaje"]').val());
    var valor = 0.00;
    if (base && porcentaje > 0 && !isNaN(porcentaje)) {
        valor = base * (porcentaje / 100.00);
    }
    $(tr).find('input[id$="-valor"]').val(redondear(valor));
}

function calcularValorCuotaAmortizacion(caller){
    var tr = $(caller).closest('tr');
    var neto = parseFloat($(tr).find('input[id$="-valor"]').val());
    var numero_cuotas = parseFloat($(tr).find('input[id$="-numero_cuotas"]').val());
    var valor_cuota = 0.00;
    if (neto && numero_cuotas > 0 && !isNaN(neto) && !isNaN(numero_cuotas)) {
        valor_cuota = parseFloat((neto / numero_cuotas));
    }
    $(tr).find('input[id$="-valor_cuota"]').val(valor_cuota.toFixed(2));
}

function calcularICECuenta(caller) {
    var tr = $(caller).closest('tr');
    var porcentajeICE = parseFloat($(tr).find('input[id$="-porcentaje_ice"]').val());
    var baseGrav = parseFloat($(tr).find('input[id$="-base_gravable"]').val());
    $(tr).find('input[id$="-ice"]').val(0);
    if (porcentajeICE > 0 && !isNaN(porcentajeICE) && baseGrav > 0 && !isNaN(baseGrav)) {
        $(tr).find('input[id$="-ice"]').val(baseGrav * (porcentajeICE / 100.00));
    }
}

function seleccionar_persona_nc(){
    var personaid, tiporeg;
    personaid = $('#id_persona_id').val();

    tiporeg = $('#id_tipo_registro_documento').val();
    if (personaid) {
        documentoField.dlgUrl = urldocumento + '?persona_id=' + personaid + '&tipo_registro=' + tiporeg;
        return true;
    } else {
        showMessage('Registrar Documento Electrónico', 'Para seleccionar el documento debe seleccionar primero a la persona');
        return false;
    }
}

function generarProyectos() {

    var proys = {}, data = {};
    var trs = '', tr, base, porcentaje, valor;
    trs = '';
    pr_nombre = "";
    pr_id = "";

    if (trs) {
        trs = '#dtemplate_proyecto, ' + trs;
    }
    else {
        trs = '#dtemplate_proyecto';
    }
    $('#tdetalle_proyecto>tr').not(trs).remove();

    $('.item-proyecto').each(function(key, value) {
        codigo_item = "";
        fila = $(value).closest('tr');
        cantidad = $(fila).find('input[id$="-cantidad"]').val();
        detalle = $(fila).find('input[class~="object-description"]').val();
        sub = $(fila).find('input[id$="-subtotal"]').val();

        producto_fila = $(fila).find('input[id$="-producto_id"]').val();
        cuenta_fila = $(fila).find('input[id$="-cuenta_id"]').val();
        pr = $(fila).find('input[id$="-proyecto_id"]');

        //var idSubproyecto = $(fila).find('input[id$="-subproyecto_id"]').val();
        //var nombreSubproyecto = $(fila).find('input[id$="-subproyecto_nombre"]').val();

        if(pr){
            td = pr.closest("td");
            pr_id = pr.val();
            pr_nombre = $(td).find('input[class~="object-description"]').val();
        }


        if(producto_fila){
            cod = $(fila).find('input[id$="-producto_id"]').attr('id');
            index = cod.indexOf('-');
            code = cod.substring(12,index);
            codigo_item= "pro-"+code;
        }
        else{
            if(cuenta_fila){
                cod = $(fila).find('input[id$="-cuenta_id"]').attr('id');
                index = cod.indexOf('-');
                code = cod.substring(10,index);
                codigo_item= "cta-"+code;
            }
        }

        if (trs == '') {
            trs = 'tr.proy-' + key;
        }
        else {
            trs = trs + ',' + 'tr.proy-' + key;
        }
        tr = $('tr.proy-' + key);

        if (tr.length <= 0){
            proyect.agregarDetalle();

        }
        tr = proyect.getLastRow();

        $(tr).addClass('proy-' + key);
        $(tr).find('.label-cantidad').html(cantidad);
        $(tr).find('.label-detalle').html(detalle);
        $(tr).find('.label-sub').html(sub);
        $(tr).find('input[id$="-hidden_item"]').val(codigo_item);
        if(pr){
            $(tr).find('input[id$="-proyecto_id"]').val(pr);
            $(tr).find('input[class~="object-description"]').val(pr_nombre);

            /*
            if(idSubproyecto != null && idSubproyecto != "")
            {
                $(tr).find('input[id$="-subproyecto_id"]').val(idSubproyecto);
                $(tr).find('span.form-control').text(nombreSubproyecto);
            }
            */

        }
        tr_nuevo = true;
    });




}

function generarRetencionesIR() {
    var rets = {}, data = {};
    var trs = '', tr, base, porcentaje, valor;
    tipo_doc = $('#id_tipo_registro_documento').val();
    $('.base-retencion').each(function(key, value) {
        var codigo = $(value).attr('codigoret'), valor = 0.00;
        if (!rets[codigo]) {
            rets[codigo] = 0.00;
        }
        valor = parseFloat($(value).val());
        if (valor > 0 && !isNaN(valor)) {
            rets[codigo] = rets[codigo] + valor;
        }
    });
    $.each(rets, function(key, value) {
        tr_nuevo = false;
        porcentaje = parseFloat(porcent_ret[key]);
        tipoEmisionRetencion = $('#id_tipo_retencion').val();
        if ((porcentaje >= 0) || (tipoEmisionRetencion=='E')){
            if (trs == '') {
                trs = 'tr.ret-' + key;
            }
            else {
                trs = trs + ',' + 'tr.ret-' + key;
            }
            tr = $('tr.ret-' + key);
            if (tr.length <= 0){
                documento.detalles_retenciones.agregarDetalle();
                tr = documento.detalles_retenciones.getLastRow();
                $(tr).addClass('ret-' + key);
                tr_nuevo = true;
            }
            $(tr).find('input[id$="-tipo"]').val('IR');
            $(tr).find('input[id$="-codigo_sri"]').val(key);

            base = parseFloat(rets[key]);
            t_doc = $('#id_tipo_documento').val();
            if( t_doc == "EXP" && key == 327){
                monto_ir = $('#id_monto_pagado_ir').val();
                if (monto_ir == ""){
                    monto_ir = 0;
                }else{
                    monto_ir = parseFloat(monto_ir);
                }

                base = base + monto_ir;
                $('#expensas_campos_utilidades').show();
            }else{
                $('#expensas_campos_utilidades').hide();
                $('#id_anio_utilidades').val('');
                $('#id_monto_pagado_ir').val('');
            }
            $(tr).find('input[id$="-base"]').val(base.toFixed(2));

            //CAMBIOS HECHOS PARA SETEAR EL PORCENTAJE DE UNA RETENCION
            data['codigo_sri'] = key;
            $.ajax({
                type: "GET",
                url: urlprefix + "/contabilidad/tipo_porcentaje_retencion_ir/",
                data: data,
                dataType: "json",
                async: false,
                success: function(data, textStatus) {
                    var es_porcentaje_variable = data['es_porcentaje_variable'];
                    if (es_porcentaje_variable == true){
                        $(tr).find('input[id$="-porcentaje"]').removeAttr('readonly');
                        //$(tr).find('input[id$="-porcentaje"]').val(7);
                    }else{
                        $(tr).find('input[id$="-porcentaje"]').attr('readonly', 'true');
                        $(tr).find('input[id$="-porcentaje"]').val(porcentaje.toFixed(2));
                        valor = base * (porcentaje / 100.00);
                        $(tr).find('input[id$="-valor"]').val(redondear(valor));
                    }
                }
            });
            //CAMBIOS HECHOS PARA SETEAR UNA CUENTA
            if (tr_nuevo == true)
            {
                data['tipo_doc'] = tipo_doc;
                data['codigo_sri'] = key;
                $.ajax({
                    type: "GET",
                    url: urlprefix + "/contabilidad/cuenta_retencion_ir/",
                    data: data,
                    dataType: "json",
                    async: true,
                    success: function(data, textStatus) {
                        var tr = $('tr.ret-' + key);
                        if(data['retencion_id'] && data['retencion_nombre']){
                            var retencion_id     = data['retencion_id'];
                            var retencion_nombre = data['retencion_nombre'];
                            $(tr).find('input[id$="-retencion_id"]').val(retencion_id);
                            $(tr).find('input[class~="object-description"]').val(retencion_nombre);
                        }
                    }
                });
            }
            //FIN PARA SETEAR UNA CUENTA
        }
    });
    if (trs) {
        trs = '#dtemplate_retencion, ' + trs;
    }
    else {
        trs = '#dtemplate_retencion';
    }
    $('#tdetalle_retencion>tr').not(trs).remove();
}

function generarRetencionesIVA() {
    var rets = {}, data = {};
    var trs = '', tr, base, porcentaje, valor;
    tipo_doc = $('#id_tipo_registro_documento').val();
    $('.base-retencion-iva').each(function(key, value) {
        var codigo = $(value).attr('codigoretiva'), valor = 0.00;
        if (!rets[codigo]) {
            rets[codigo] = 0.00;
        }
        valor = parseFloat($(value).val());
        if (valor > 0 && !isNaN(valor)) {
            rets[codigo] = rets[codigo] + valor;
        }
    });
    $.each(rets, function(key, value) {
        tr_nuevo = false;
        porcentaje = parseFloat(porcent_retiva[key]);
        if (trs == '') {
            trs = 'tr.ret-iva-' + key;
        }
        else {
            trs = trs + ',' + 'tr.ret-iva-' + key;
        }
        tr = $('tr.ret-iva-' + key);
        if (tr.length <= 0){
            documento.detalles_retenciones_iva.agregarDetalle();
            tr = documento.detalles_retenciones_iva.getLastRow();
            $(tr).addClass('ret-iva-' + key);
            tr_nuevo = true;
        }
        $(tr).find('input[id$="-tipo"]').val('IV');
        $(tr).find('input[id$="-codigo_sri"]').val(key);
        base = parseFloat(rets[key]) *(porcentaje_iva_actual / 100.00);
        base = redondear(base); //
        $(tr).find('input[id$="-base"]').val(base);
        $(tr).find('input[id$="-porcentaje"]').val(porcentaje.toFixed(2));
        valor = base * (porcentaje / 100.00);
        $(tr).find('input[id$="-valor"]').val(redondear(valor));
        //CAMBIOS HECHOS PARA SETEAR UNA CUENTA
        if (tr_nuevo == true)
        {
            data['tipo_doc'] = tipo_doc;
            data['codigo_sri'] = key;
            $.ajax({
                type: "GET",
                url: urlprefix + "/contabilidad/cuenta_retencion_iva/",
                data: data,
                dataType: "json",
                async: true,
                success: function(data, textStatus) {
                    tr = $('tr.ret-iva-' + key);
                    if(data['retencion_id'] && data['retencion_nombre']){
                        var retencion_id     = data['retencion_id'];
                        var retencion_nombre = data['retencion_nombre'];
                        $(tr).find('input[id$="-retencion_id"]').val(retencion_id);
                        $(tr).find('input[class~="object-description"]').val(retencion_nombre);
                    }
                }
            });
        }
        //FIN PARA SETEAR UNA CUENTA
    });
    if (trs) {
        trs = '#dtemplate_retencion_iva, ' + trs;
    }
    else {
        trs = '#dtemplate_retencion_iva';
    }
    $('#tdetalle_retencion_iva>tr').not(trs).remove();
}

function generarGastosAmortizados() {

    var amts = {}, amts_nombres = {};
    var trs = '', tr, subtotal;

    $('.gasto-amortizado').each(function(key, value) {
        fila = $(value).closest('tr');
        cuenta_nombre = $(fila).find('input[class~="object-description"]').val();
        subtotal = parseFloat($(fila).find('input[id$="-subtotal"]').val());
        cuenta_id = $(fila).find('input[id$="-cuenta_id"]').val();
        if ((subtotal > 0 && !isNaN(subtotal)) && !amts[cuenta_id]){
            amts[cuenta_id] = 0.00;
            amts_nombres[cuenta_id] = cuenta_nombre;
        }
        if (subtotal > 0 && !isNaN(subtotal))
            amts[cuenta_id] = amts[cuenta_id] + subtotal;
    });

    $.each(amts, function(key, value) {
        if (trs == '')
            trs = 'tr.amt-' + key;
        else
            trs = trs + ',' + 'tr.amt-' + key;
        tr = $('tr.amt-' + key);
        if (tr.length <= 0){
            amortizacion.agregarDetalle();
            tr = amortizacion.getLastRow();
            $(tr).addClass('amt-' + key);
        }
        $(tr).find('input[id$="-valor"]').val(value.toFixed(2));
        $(tr).find('input[id$="-cuenta_costo_id"]').val(key);
        $(tr).find('td[class~="cuenta_nombre"]').html(amts_nombres[key]);
        calcularValorCuotaAmortizacion($(tr).find('input[id$="-valor"]'));
    });
    if (trs)
        trs = '#dtemplate_amortizacion, ' + trs;
    else
        trs = '#dtemplate_amortizacion';
    $('#tdetalle_amortizacion>tr').not(trs).remove();
}

function getNumeroAutorizacion() {
    var fecha, persona_id, tipo_doc, data = {};
    fecha = $('#id_fecha_emision').val();
    persona_id = $('#id_persona_id').val();
    tipo_doc = $('#id_tipo_registro_documento').val();
    if (fecha && tipo_doc) {
        data['fecha'] = fecha;
        if (persona_id) {
            data['persona_id'] = persona_id;
        }
        $.ajax({
            type: "GET",
            url: urlprefix + "/registro/autorizacion/",
            data: data,
            dataType: "json",
            async: true,
            success: function(data, textStatus) {
                var arr_aut_empresa = data['autorizacion-empresa'];
                var arr_autret_empresa = data['autorizacion-retencion-empresa'];
                var arr_aut_persona = data['autorizacion-persona'];
                var arr_autret_persona = data['autorizacion-retencion-persona'];
                var html_combo_aut_empresa = '';
                var html_combo_autret_empresa = '';
                var html_combo_aut_persona = '';
                var html_combo_autret_persona = '';
                if(arr_aut_empresa.length > 1){
                    for(i=0;i<arr_aut_empresa.length;i++){
                        html_combo_aut_empresa += "<option value = "+arr_aut_empresa[i]+" selected='' >"+arr_aut_empresa[i]+"</option>";
                    }
                }
                // if(arr_autret_empresa.length > 1){
                // for(i=0;i<arr_autret_empresa.length;i++){
                // html_combo_autret_empresa += "<option value = "+arr_autret_empresa[i]+" selected='' >"+arr_autret_empresa[i]+"</option>";
                // }
                // }
                if(arr_aut_persona.length > 1){
                    for(i=0;i<arr_aut_persona.length;i++){
                        html_combo_aut_persona += "<option value = "+arr_aut_persona[i]+" selected='' >"+arr_aut_persona[i]+"</option>";
                    }
                }
                if(arr_autret_persona.length > 1){
                    for(i=0;i<arr_autret_persona.length;i++){
                        html_combo_autret_persona += "<option value = "+arr_autret_persona[i]+" selected='' >"+arr_autret_persona[i]+"</option>";
                    }
                }
                var autDoc = '', autRet = '', combo_autDoc = '', combo_autRet = '';
                if (tipo_doc == 'CLI') {
                    if( !es_documento_electronico ){
                        autDoc = arr_aut_empresa[0];
                    }
                    combo_autDoc = html_combo_aut_empresa;
                    autDocAnt = arr_aut_persona[0];
                    autRet = arr_autret_persona[0];
                    combo_autRet = html_combo_autret_persona;
                    autRetAnt = arr_autret_empresa[0];
                } else if (tipo_doc == 'PRO') {
                    autDoc = arr_aut_persona[0];
                    combo_autDoc = html_combo_aut_persona;
                    autRet = arr_autret_empresa[0];
                    combo_autRet = html_combo_autret_empresa;
                    autDocAnt = arr_aut_empresa[0];
                    autRetAnt = arr_autret_persona[0];
                }

                if ($('#id_autorizacion').val() == autDocAnt)
                    $('#id_autorizacion').val('');
                if ($('#id_autorizacion_retencion').val() == autRetAnt)
                    $('#id_autorizacion_retencion').val('');

                //AUTORIZACIÓN DEL DOCUMENTO
                var combo_valor_anterior = $('#autorizacion_combo').val();
                $('#autorizacion_combo').html(combo_autDoc);
                if (combo_autDoc){
                    var index = 1;
                    $.each($('#autorizacion_combo option'), function(){
                        if ($(this).val() == combo_valor_anterior) {
                            $('#autorizacion_combo').val(combo_valor_anterior);
                        } else {
                            index++;
                        }
                    })
                }
                if (!$('#id_autorizacion').val()) {
                    if (combo_autDoc){
                        $('#hay_combo_autorizacion').val("1");
                        $('#id_autorizacion').css("display","none");
                        $('#mostrar_autorizacion_combo').css("display","none");
                        $('#autorizacion_combo').css("display","");
                        $('#mostrar_autorizacion').css("display","");
                    }
                    else{
                        $('#id_autorizacion').val(autDoc);
                        $('#hay_combo_autorizacion').val("0");
                        $('#id_autorizacion').css("display","");
                        $('#mostrar_autorizacion_combo').css("display","none");
                        $('#autorizacion_combo').css("display","none");
                        $('#mostrar_autorizacion').css("display","none");
                    }
                }else{ //EDICION DE LA AUTORIZACION
                    $('#id_autorizacion').css("display","");
                    $('#autorizacion_combo').css("display","none");
                    $('#mostrar_autorizacion').css("display","none");
                    if (combo_autDoc){
                        $('#hay_combo_autorizacion').val("1");
                        $('#mostrar_autorizacion_combo').css("display","");
                    }else{
                        $('#hay_combo_autorizacion').val("0");
                        $('#mostrar_autorizacion_combo').css("display","none");
                    }
                }
                //AUTORIZACION DE LA RETENCIÓN
                // $('#autorizacion_retencion_combo').html(combo_autRet);
                // if (!$('#id_autorizacion_retencion').val()) {
                // if (combo_autRet){
                // $('#hay_combo_autorizacion_retencion').val("1");
                // $('#id_autorizacion_retencion').css("display","none");
                // $('#mostrar_autorizacion_retencion_combo').css("display","none");
                // $('#autorizacion_retencion_combo').css("display","");
                // $('#mostrar_autorizacion_retencion').css("display","");
                // }
                // else{
                // $('#id_autorizacion_retencion').val(autRet);
                // $('#hay_combo_autorizacion_retencion').val("0");
                // $('#id_autorizacion_retencion').css("display","");
                // $('#mostrar_autorizacion_retencion_combo').css("display","none");
                // $('#autorizacion_retencion_combo').css("display","none");
                // $('#mostrar_autorizacion_retencion').css("display","none");
                // }
                // }else{ //EDICION DE LA AUTORIZACION
                // $('#id_autorizacion_retencion').css("display","");
                // $('#autorizacion_retencion_combo').css("display","none");
                // $('#mostrar_autorizacion_retencion').css("display","none");
                // if (combo_autRet){
                // $('#hay_combo_autorizacion_retencion').val("1");
                // $('#mostrar_autorizacion_retencion_combo').css("display","");
                // }else{
                // $('#hay_combo_autorizacion_retencion').val("0");
                // $('#mostrar_autorizacion_retencion_combo').css("display","none");
                // }
                // }
			  			
			  			
                cambiarTamanio($('#id_autorizacion'));
                cambiarTamanio($('#id_autorizacion_retencion'));
						
						
            }
        });
    }
}

function getNumeroAutorizacionRetencion() {
    var fecha, persona_id, tipo_doc, data = {};
    fecha = $('#id_fecha_emision').val();
    var fecha_retencion = $('#id_fecha_emision_retencion').val();
    persona_id = $('#id_persona_id').val();
    tipo_doc = $('#id_tipo_registro_documento').val();
    if (fecha_retencion && tipo_doc) {
        data['fecha'] = fecha;
        data['tipo_doc'] = tipo_doc;
        if (persona_id) {
            data['persona_id'] = persona_id;
        }
        if(fecha_retencion){
            data['con_fecha_retencion'] = '1';
            data['fecha_retencion'] = fecha_retencion;
        }
        $.ajax({
            type: "GET",
            url: urlprefix + "/registro/autorizacion/",
            data: data,
            dataType: "json",
            async: true,
            success: function(data, textStatus) {
                var arr_aut_empresa = data['autorizacion-empresa'];
                var arr_autret_empresa = data['autorizacion-retencion-empresa'];
                var arr_aut_persona = data['autorizacion-persona'];
                var arr_autret_persona = data['autorizacion-retencion-persona'];
                var html_combo_aut_empresa = '';
                var html_combo_autret_empresa = '';
                var html_combo_aut_persona = '';
                var html_combo_autret_persona = '';
                if(arr_aut_empresa.length > 1){
                    for(i=0;i<arr_aut_empresa.length;i++){
                        html_combo_aut_empresa += "<option value = "+arr_aut_empresa[i]+" selected='' >"+arr_aut_empresa[i]+"</option>";
                    }
                }
                if(arr_autret_empresa.length > 1){
                    for(i=0;i<arr_autret_empresa.length;i++){
                        html_combo_autret_empresa += "<option value = "+arr_autret_empresa[i]+" selected='' >"+arr_autret_empresa[i]+"</option>";
                    }
                }
                if(arr_aut_persona.length > 1){
                    for(i=0;i<arr_aut_persona.length;i++){
                        html_combo_aut_persona += "<option value = "+arr_aut_persona[i]+" selected='' >"+arr_aut_persona[i]+"</option>";
                    }
                }
                if(arr_autret_persona.length > 1){
                    for(i=0;i<arr_autret_persona.length;i++){
                        html_combo_autret_persona += "<option value = "+arr_autret_persona[i]+" selected='' >"+arr_autret_persona[i]+"</option>";
                    }
                }
                var autDoc = '', autRet = '', combo_autDoc = '', combo_autRet = '';
                if (tipo_doc == 'CLI') {
                    autDoc = arr_aut_empresa[0];
                    combo_autDoc = html_combo_aut_empresa;
                    autRet = arr_autret_persona[0];
                    combo_autRet = html_combo_autret_persona;
                    autDocAnt = arr_aut_persona[0];
                    autRetAnt = arr_autret_empresa[0];
                } else if (tipo_doc == 'PRO') {
                    autDoc = arr_aut_persona[0];
                    combo_autDoc = html_combo_aut_persona;
                    autRet = arr_autret_empresa[0];
                    combo_autRet = html_combo_autret_empresa;
                    autDocAnt = arr_aut_empresa[0];
                    autRetAnt = arr_autret_persona[0];
                }

                if ($('#id_autorizacion').val() == autDocAnt)
                    $('#id_autorizacion').val('');
                if ($('#id_autorizacion_retencion').val() == autRetAnt)
                    $('#id_autorizacion_retencion').val('');

                //AUTORIZACIÓN DEL DOCUMENTO
                $('#autorizacion_combo').html(combo_autDoc);
                if (!$('#id_autorizacion').val()) {
                    if (combo_autDoc){
                        $('#hay_combo_autorizacion').val("1");
                        $('#id_autorizacion').css("display","none");
                        $('#mostrar_autorizacion_combo').css("display","none");
                        $('#autorizacion_combo').css("display","");
                        $('#mostrar_autorizacion').css("display","");
                    }
                    else{
                        $('#id_autorizacion').val(autDoc);
                        $('#hay_combo_autorizacion').val("0");
                        $('#id_autorizacion').css("display","");
                        $('#mostrar_autorizacion_combo').css("display","none");
                        $('#autorizacion_combo').css("display","none");
                        $('#mostrar_autorizacion').css("display","none");
                    }
                }else{ //EDICION DE LA AUTORIZACION
                    $('#id_autorizacion').css("display","");
                    $('#autorizacion_combo').css("display","none");
                    $('#mostrar_autorizacion').css("display","none");
                    if (combo_autDoc){
                        $('#hay_combo_autorizacion').val("1");
                        $('#mostrar_autorizacion_combo').css("display","");
                    }else{
                        $('#hay_combo_autorizacion').val("0");
                        $('#mostrar_autorizacion_combo').css("display","none");
                    }
                }
                //AUTORIZACION DE LA RETENCIÓN
                $('#autorizacion_retencion_combo').html(combo_autRet);
                if (!$('#id_autorizacion_retencion').val()) {
                    if (combo_autRet){
                        $('#hay_combo_autorizacion_retencion').val("1");
                        $('#id_autorizacion_retencion').css("display","none");
                        $('#label_retencion').css("display","none");
                        $('#mostrar_autorizacion_retencion_combo').css("display","none");
                        $('#autorizacion_retencion_combo').css("display","");
                        $('#mostrar_autorizacion_retencion').css("display","");
                    }
                    else if($('#id_tipo_retencion').val() != 'E')
                    {
                        $('#id_autorizacion_retencion').val(autRet);
                        $('#hay_combo_autorizacion_retencion').val("0");
                        $('#id_autorizacion_retencion').css("display","");
                        $('#label_retencion').css("display","");
                        $('#mostrar_autorizacion_retencion_combo').css("display","none");
                        $('#autorizacion_retencion_combo').css("display","none");
                        $('#mostrar_autorizacion_retencion').css("display","none");
                    }
                }else{ //EDICION DE LA AUTORIZACION
                    $('#id_autorizacion_retencion').css("display","");
                    $('#label_retencion').css("display","");
                    $('#autorizacion_retencion_combo').css("display","none");
                    $('#mostrar_autorizacion_retencion').css("display","none");
                    if (combo_autRet){
                        $('#hay_combo_autorizacion_retencion').val("1");
                        $('#mostrar_autorizacion_retencion_combo').css("display","");
                    }else{
                        $('#hay_combo_autorizacion_retencion').val("0");
                        $('#mostrar_autorizacion_retencion_combo').css("display","none");
                    }
                }
			  			
                cambiarTamanio($('#id_autorizacion'));
                cambiarTamanio($('#id_autorizacion_retencion'));
						
            }
        });
    }
}

function setearIVA() {
    var fecha, persona_id, tipo_doc, data = {};
    fecha = $('#id_fecha_emision').val();
    persona_id = $('#id_persona_id').val();
    tipo_doc = $('#id_tipo_registro_documento').val();
    var tipoDocumento = $('#id_tipo_documento').val();

    if (persona_id) {
        var tipo = artesanal;
        var tipo2 = exterior;
        if (tipo || tipo2){
            var f;
            if(tipo && tipo_doc == 'PRO'){
                $('#tipo_persona').val("ARTESANAL");
                f = $('#tipo_persona').val();
                var valores = $('.val-iva');
                if (tipo_doc == 'PRO'){
                    for(var i=0;i<valores.length;i++) {
                        valores[i].value=0;
                        //calcularSubtotalProducto(valores[i]);
                    }
                }
            }
            if(tipo2 && tipo_doc == 'CLI'){
                $('#tipo_persona').val("EXTERIOR");
                f = $('#tipo_persona').val();
                var valores = $('.val-iva');
                if (tipo_doc == 'CLI'){
                    for(var i=0;i<valores.length;i++) {
                        valores[i].value=0;
                        //calcularSubtotalProducto(valores[i]);
                    }
                }
            }

            var valores = $('.val-iva');
            for(var i=0;i<valores.length;i++) {
                calcularSubtotalProducto(valores[i]);
            }

        }else{
            var valores = $('.label-unidad');
            for(var i=1;i<valores.length;i++) {
                celda = valores[i];
                f = $('#tipo_persona').val();
                if (f!="NONE") {
                    producto.eliminarDetalles(celda);
                }
            }
            calcularTotal();
            if (f=="ARTESANAL"){$('#tipo_persona').val("NO ARTESANAL");}
            if (f=="EXTERIOR"){$('#tipo_persona').val("NO EXTERIOR");}
        }
    }
}

function setearIVA_no_autorizados() {
    var fecha, persona_id, tipo_doc, data = {};
    fecha = $('#id_fecha_emision').val();
    persona_id = $('#id_persona_id').val();
    tipo_doc = $('#id_tipo_registro_documento').val();
    var tipoDocumento = $('#id_tipo_documento').val();

    //NUEVO
    if (tipoDocumento == 'NVE' || tipoDocumento == 'DNA' || tipoDocumento == 'NAI' || tipoDocumento == 'NCL'){
        var valores = $('.val-iva');
        for(var i=0;i<valores.length;i++) {
            valores[i].value="";
            calcularSubtotalProducto(valores[i]);
        }
    }else{
        var valores = $('.val-iva');
        for(var i=0;i<valores.length;i++) {
                	
            calcularSubtotalProducto(valores[i]);
        }

        calcularTotal();
    }

}

function cambiarTamanio(caller){
		    
    autorizacion = $(caller).val();
    autorizacion = autorizacion.replace(/_/g, '');
    $(caller).attr('padding-lef','5px');
    $(caller).attr('padding-right','5px');
    if (autorizacion.length > 10){
        $(caller).attr('size', 40);
        $(caller).parent().removeClass('col-md-2');
        $(caller).parent().removeClass('col-md-3');
        $(caller).parent().addClass('col-md-5');
    }
    else{
        $(caller).attr('size', 12);
        $(caller).parent().removeClass('col-md-2');
        $(caller).parent().removeClass('col-md-5');
        $(caller).parent().addClass('col-md-3');
    }
			
}

		

function handleSelectTipoRetencion(generarIR) {

    /* Seteo si se muestra o no el campo de autorizacion de retencion  */
    var tipoRegistro = $('#id_tipo_registro_documento').val();
    var tipoDocumento = $('#id_tipo_documento').val();
    var tipoEmisionRetencion = $('#id_tipo_retencion').val();
    if (generarIR){generarRetencionesIR();}
			
    if (tipoRegistro == 'PRO' && (tipoDocumento == 'FAC' || tipoDocumento == 'NDT' || tipoDocumento == 'NVE' || tipoDocumento == 'LQC' || tipoDocumento == 'LMU' || tipoDocumento == 'TMR' || tipoDocumento == 'BEP' || tipoDocumento == "CPA" || tipoDocumento == 'EIE' || tipoDocumento == 'EIF' || tipoDocumento == 'REE' || tipoDocumento == 'EXP' || tipoDocumento == 'PEA')){
        if (tipoEmisionRetencion == 'E'){
            /*Cargar estab y pto emision por defecto*/
						
            var esta_ptoe_default=null;
            if(esta_ptoe_default){
                esta_ptoe_default=esta_ptoe_default.split('-');
                establec = esta_ptoe_default[0];
                pto_emis = esta_ptoe_default[1];
                $('#id_establecimiento_retencion').val(establec);
                $('#id_punto_emision_retencion').val(pto_emis);
            }
						
            /* fin cargar default */
            $('.ingreso_retencion').hide();
            if(!tiene_retencion)
            {
                $('#label_retencion').hide();
                $('#id_autorizacion_retencion').val('');
                $('#id_autorizacion_retencion').hide();
            }
            $('.retencion_electronica').show();
            $('.retencion_fisica').hide();
            $("#id_numero_documento_retencion").unmask();
            $('#id_numero_documento_retencion').attr('readonly', true);
            $('.retencion_fisica').find("input[name='anulado_retencion']").attr('id','');
            $('.retencion_electronica').find("input[name='anulado_retencion']").attr('id','id_anulado_retencion');
        }else{
            $('.ingreso_retencion').show();
            $('#label_retencion').show();
            $('#id_autorizacion_retencion').show();
            $('.retencion_electronica').hide();
            $('.retencion_fisica').show();
            $('#id_numero_documento_retencion').attr('readonly', false);
            $("#id_numero_documento_retencion").mask("999-999-9?99999999");
            $('.retencion_fisica').find("input[name='anulado_retencion']").attr('id','id_anulado_retencion');
            $('.retencion_electronica').find("input[name='anulado_retencion']").attr('id','');
        }
    }
			
}



function handleSelectTipoDocumento() {

    //console.log('select tipo doc');
    var tipo_d = $('#id_tipo_documento').val();
    personafield['dlgUrl'] = personafield['dlgUrl'] + '&tipodocumento=' + tipo_d;
    personafield['dlgUrl'] = personafield['dlgUrl'].replace("&manejabloq=1", "");
			

    //$('#id_persona_id').val("");
    /* Seteo el tab a cuenta x cobrar ó cuenta x cobrar dependiendo del tipo de registro y
    tipo de documento seleccionado  */
    var tipoRegistro = $('#id_tipo_registro_documento').val();
    var tipoDocumento = $('#id_tipo_documento').val();
    /*cargar estab y pto emision por defecto*/
			
			

    //Validacion de mostrar subir adjunto
    if (tipoRegistro == 'PRO'){


        //Mostrar boton para subir archivo adjunto
        $('.subirAdjunto').show();
				
				
        //Ocultar tab de formas de pago
        $('#tabs_pagos').hide();
        //$('#pagos').hide();


        if (tipoDocumento == 'PEA'){
            $('#id_codigo_sustento').find("option[value='08']").hide();
        }else if (tipoDocumento == 'CVE'){
            $('#id_codigo_sustento').find("option[value='08']").hide();
            $('#id_codigo_sustento').find("option[value='02']").hide();
            $('#id_codigo_sustento').find("option[value='07']").hide();
        }else{
            $('#id_codigo_sustento').find("option[value='08']").show();
            $('#id_codigo_sustento').find("option[value='02']").show();
            $('#id_codigo_sustento').find("option[value='07']").show();
        }

        if (tipoDocumento == 'FAC' || tipoDocumento == 'NVE' || tipoDocumento == 'NCT' || tipoDocumento == 'NDT'){
            $('#id_codigo_sustento').find("option[value='14']").show();
        }else{
            $('#id_codigo_sustento').find("option[value='14']").hide();
        }

    }else{
        //Ocultar boton para subir archivo adjunto


        $('.subirAdjunto').hide();
				
				
        //Mostrar tab de formas de pago
        $('#tabs_pagos').show();
        //$('#pagos').show();
    }

			
    if (tipoRegistro == 'PRO' && (tipoDocumento == 'FAC' || tipoDocumento == 'NDT' || tipoDocumento == 'NVE' || tipoDocumento == 'LQC' || tipoDocumento == 'LMU' || tipoDocumento == 'TMR' || tipoDocumento == 'BEP' || tipoDocumento == 'CPA' || tipoDocumento == 'PEA' || tipoDocumento == 'EIE' || tipoDocumento == 'EIF' || tipoDocumento == 'REE' || tipoDocumento == 'EXP')){
        $('.tipo_emision_retencion').show();
    }else{
        $('.tipo_emision_retencion').hide();
    }
			

    //Esconder las pestañas de productos, retencion y proyectos para DAC
    if (tipoDocumento == "REE"){
        $('#tabs_documentos').show();
        $('#contenedor_totales_reembolso').show();
        if (tipoRegistro == 'PRO'){
            $('#contenedor_documentos_cliente').hide();
            $('#contenedor_documentos_proveedor').show();
        }else{
            $('#contenedor_documentos_proveedor').hide();
            $('#contenedor_documentos_cliente').show();
        }
    }else{
        $('#tabs_documentos').hide();
        $('#contenedor_totales_reembolso').hide();
        //$('#documentos').hide();
        if(bandi == true){
            $( "#tabs" ).tabs( "option", "active", 0 );
        }
        bandi = true;
    }

    if (tipoDocumento == 'DAC' || tipoDocumento == 'CUO'){
        $('#tabs_productos').hide();
        $('#tabs_proyectos').hide();
        $('#tabs_retenciones').hide();
        $('#productos').hide();
        $('#proyectos').hide();
        $('#retenciones').hide();
        $('#cuentas').show();
        $( "#tabs" ).tabs( "option", "active", 1 );
    }else{
        $('#tabs_productos').show();
				
        $('#tabs_retenciones').show();
    }



    if (tipoRegistro == 'CLI'){
        $("#id_tipo_documento").find("option[value='DAU']").hide();
    }else{
        $("#id_tipo_documento").find("option[value='DAU']").show();
    }
    //Cosas para IVA Gasto
    if (tipoRegistro == 'PRO' && (tipoDocumento == 'FAC' || tipoDocumento == 'LQC'|| tipoDocumento == 'TMR' || tipoDocumento == 'BEP' || tipoDocumento == 'CPA' || tipoDocumento == 'EIE' || tipoDocumento == 'LMU' || tipoDocumento == 'NDT' || tipoDocumento == 'NCT' || tipoDocumento == "NCL" || tipoDocumento == 'PEA' || tipoDocumento == 'NVE' || tipoDocumento == 'EIF' || tipoDocumento == 'REE' || tipoDocumento == 'CVE')){
        $('.iva_gasto').css('display', '');
        $('.td-iva-doc').css('display', 'none');
    }else{
        $('#id_enviar_iva_gasto').attr('checked', false);
        $('.iva_gasto').css('display', 'none');
        $('.td-iva-doc').css('display', 'block');
    }
    //Fin cosas para IVA Gasto
    if (tipoDocumento == 'RET') {
        $('#tabs').tabs('select', 0);
        $('#tabs').tabs('disable', 2);
    } else {
        $('#tabs').tabs('enable', 2);
    }
    if (tipoDocumento == 'RET' || tipoDocumento == 'NCT' || tipoDocumento == "NCL" || tipoDocumento == 'NDT') {
        $('#trdocrelacionado').css('display', 'block');
    } else {
        $('#trdocrelacionado').css('display', 'none');
    }
    if(tipoRegistro == 'PRO' && (tipoDocumento == 'NVE' || tipoDocumento == 'EIF' || tipoDocumento == 'IMP' || tipoDocumento == 'DNA' || tipoDocumento == 'NCL' || tipoDocumento == 'NAI' || tipoDocumento == 'DAU' || tipoDocumento == 'DAC' || tipoDocumento == 'CUO' || tipoDocumento == 'CVE')){
        $('.td-iva-nuevo').css('display', 'none');
    }else{
        $('.td-iva-nuevo').css('display', 'table-cell');
    }




    /* Verifico según el tipo de documento si se debe mostrar el campo autorizacion */
    if(es_documento_electronico)
    {
        $("#id_numero_documento").mask("999-999-9?99999999");
        $("#id_punto_emision").mask("999");
        $('#trautorizacion').css('display', 'none');
        $('#id_autorizacion').css("display","none");
				
        $('#mostrar_autorizacion_combo').css("display","none");
        $('#autorizacion_combo').css("display","none");
        $('#mostrar_autorizacion').css("display","none");
    }
    else
    {
        if (tipoDocumento == 'FAC' || tipoDocumento == "TMR" || tipoDocumento == "BEP" || tipoDocumento == "CPA" || tipoDocumento == 'EIE' || tipoDocumento == 'NVE' || tipoDocumento == 'NDT' || tipoDocumento == 'NCT' || tipoDocumento == 'RET' || tipoDocumento == 'LQC' || tipoDocumento == 'TMR' || tipoDocumento == 'EIF' || tipoDocumento == 'LMU' || tipoDocumento == 'PEA' || tipoDocumento == 'REE' || tipoDocumento == 'EXP' || tipoDocumento == 'CVE') {
            $("#id_numero_documento").mask("999-999-9?99999999");
            $('#trautorizacion').css('display', 'inline');
            $("#id_autorizacion").mask("999?9999999999999999999999999999999999999999999999");
        } else {
            $("#id_numero_documento").unmask();
            $('#trautorizacion').css('display', 'none');
        }
    }
    setearIVA_no_autorizados();
    //handleTipoRegistroTipoDocumento();

    /*if (tipoDocumento == 'OCV' || tipoDocumento == 'PRE' || tipoDocumento == 'COT'){
            $('#tabs_pagos').empty();
            $('#pagos').empty();
    }*/
			
    if (tipoDocumento == 'PTO'){
        $('#tabs_pagos').empty();
        $('#pagos').empty();
        $('#trentregar').addClass("hide");
        $('#trcuenta').addClass("hide");
        //$('#trordencompraventa').addClass("hide");
        //pidgey
    }

			
			
			

    //Cosas para Cotizacion RENTING N.2
            

    if(tipoDocumento == 'FAC' || tipoDocumento == 'PRE' ){
        $('.info-hoteleria').show();
    }else{
        $('.info-hoteleria').hide();
    }

    actualizarIVA();

    if (tipoDocumento != 'NCT') {
        $('.aplica_iva_12').show();
    } else {
        $('.aplica_iva_12').hide();
    }

    validarSecuenciaDna();

    if (tipoDocumento == 'PRE' || tipoDocumento == 'COT' || tipoDocumento == 'OCV' || tipoDocumento == 'PTO' ) {
        $('#tabs_activosfijos').hide();
        $('#tabs_cuotas').hide();
        $('#tabs_retenciones').hide();
        $('#xml_proveedor').remove();
        $('.es_proforma').remove();

    }

    if ( tipoDocumento == 'PTO' ) {
        $("#trreferencia").hide();
        $("#tricetotal").hide();
        $("#panelpresupuesto").show();
    }else{
        $("#trreferencia").show();
        $("#tricetotal").show();
        $("#panelpresupuesto").hide();
    }
			
			

    if ( tipoDocumento == 'DNA' ) {
        $("#trreserva").show();
    }else{
        $("#trreserva").hide();
    }

    handleTipoRegistroTipoDocumento(); //Al final para evitar conflictos
    completaSecuenciaNumeroDocumentoFisico();
}

function handlePresupuesto(){

    var tipoRegistro = $("#id_tipo_registro_documento").val();
    var tipoDocumento = $("#id_tipo_documento").val();
    //if (tipoRegistro == 'CLI') {
    if(tipoRegistro == 'CLI' && tipoDocumento == "PTO"){
        //console.log($("#tabs_productos"));
        $("#tabs_productos").hide();
        $("#tabs_cuentas").addClass("hide");
        $("#tabs_productospre").show();
        $("#tabs_productos").removeClass("active");
        //$("#productos").addClass("hide");
        $("#productos").removeClass("active");
        $("#tabs_productospre").addClass("active");
        $("#productospre").addClass("active");
        $("#trbodegaid").appendTo('#divbodegapre');
        $("#divreferencia").appendTo('#divdetallevisacom');
        $("#divadicional1").appendTo('#divproductovisacom');
        $("#divadicional2").appendTo('#divlugarvisacom');
        $("#trordencompraventa").addClass("hide");
        $(".campoadicionalempresa").addClass("hide");
        $(".totales_presupuesto").removeClass("hide");
        $("#panelpresupuesto").show();
        $("#trexcedermargen").show();
        //$( "#tabs" ).tabs( "option", "active", 0 );
					
					
					
					
						
					
        //$("#tabs_productospre").addClass("active");
        //$("#productospre").addClass("active");
        //console.log($("#tabs_productos"));

    }else{
        $("#tabs_productos").show();
        $("#tabs_cuentas").removeClass("hide");
        $("#tabs_productospre").hide();
        $("#tabs_productos").addClass("active");
        $("#tabs_productospre").removeClass("active");
        $("#productos").addClass("active");
        $("#productospre").removeClass("active");
        $("#trbodegaid").appendTo('#divbodegaproducto');
        $("#divreferencia").appendTo('#divexternoreferencia');
        $("#divadicional1").appendTo('#divexternoadicional1');
        $("#divadicional2").appendTo('#divexternoadicional2');
        $("#trordencompraventa").removeClass("hide");
        $(".campoadicionalempresa").removeClass("hide");
        $(".totales_presupuesto").addClass("hide");
        $("#panelpresupuesto").hide();
        $("#trexcedermargen").hide();
        //$( "#tabs" ).tabs( "option", "active", 0 );
					
					

					
						
					
    }
				
    //}
}

function validarSecuenciaDna()
{
    if(es_documento_electronico || !habilitar_secuencia_dna)
    {
        return;
    }

    var tipodocumento = $('#id_tipo_documento').val();
    var tipoRegistro = $('#id_tipo_registro_documento').val();

    if(tipodocumento == "DNA" && tipoRegistro == "CLI")
    {
        $("#id_numero_documento").prop("readonly","true");
        if(documento_nuevo || tipo_documento_guardado != 'DNA')
        {
            $.get( "/sistema/registro/documento/secuencia/", {"tipo" : "DNA"})
            .done(function( data )
            {
                $("#id_numero_documento").val(data.numero_documento);
            });
        }
        else
        {
            $("#id_numero_documento").val(numero_documentoactual);
        }
    }
    else
    {
        //$("#id_numero_documento").val("");
        $("#id_numero_documento").removeAttr("readonly");
    }
}

function handleSelectVencimiento() {
    var vencimiento = $('#id_vencimiento').val();
    if (vencimiento <= 0) {
        $('#lblnotificarvencimiento').hide();
        $('#trvencimiento2').css('display', 'none');
        if ($('#id_notificar_vencimiento').prop('checked')){
            $('#id_notificar_vencimiento').click()
        }
    } else {
        $('#lblnotificarvencimiento').css('display', 'inline');
        $('#trvencimiento2').show();
    }
}

function handleSelectEnviarIVAGasto() {
    var iva_gasto = $('#id_iva_gasto').val();
    var tipoRegistro = $('#id_tipo_registro_documento').val();
    var tipoDocumento = $('#id_tipo_documento').val();
    if ((tipoRegistro=='PRO' && tipoDocumento=='NVE') || (tipoRegistro=='PRO' && tipoDocumento=='CVE')){ //Condicion para enviar IVA al gasto de Notas de Venta
        $('#lblenviarivagasto').css('display', 'inline');
        $('#lblenviarivactabs').css('display', 'inline');
    }else{
        if ((isNaN(iva_gasto) || iva_gasto <= 0)){
            $('#lblenviarivagasto').css('display', 'none');
            $('#lblenviarivactabs').css('display', 'none');
        }else{
            $('#lblenviarivagasto').css('display', 'inline');
            $('#lblenviarivactabs').css('display', 'inline');
        }
    }
}

function eliminarProdVacio(){
    var prods = $("#productos").find('input[id$="-producto_id"]');
    for(var i=1;i<prods.length;i++) {
        valor = prods[i].value;
        if(!valor || valor == ''){
            producto.eliminarDetalles($(prods[i]).parent());
        }
    }
}

function eliminarCtaVacio(){
    var prods = $('input[id$="-cuenta_id"]');
    for(var i=1;i<prods.length;i++) {
        valor = prods[i].value;
        if(!valor || valor == ''){
            documento.detalles_cuentas.eliminarDetalles($(prods[i]).parent());
        }
    }
}

function guardar(){
    if ($('#hay_combo_autorizacion').val() == "1" && $("#autorizacion_combo").css("display") != "none"){
        $('#id_autorizacion').val($('#autorizacion_combo').val());
    }

    var tipoRet = $("#id_tipo_retencion").val();
    if (tipoRet != 'E' && $('#hay_combo_autorizacion_retencion').val() == "1" && $("#autorizacion_retencion_combo").css("display") != "none"){
        $('#id_autorizacion_retencion').val($('#autorizacion_retencion_combo').val());
    }
    generarRetencionesIVA();
    generarRetencionesIR();
			
			
			
				
    if($("#docs_agrupados").val()){
        //$('#dlgGuardar').dialog('open');
						
        showConfirm('Guardar Documentos Agrupados', 'Los documentos que se agruparon se eliminar&aacute;n ¿Est&aacute; seguro que desea continuar?', function() {
            document.forms.docForm.submit();
        });
                        
        return false;
    }
				
			

			
    document.forms.docForm.submit();
}

function guardarDocumento(){
    if (es_documento_electronico && $('#id_id').val()=='' ){
        consultar_secuencia();
    }
    if(productos_cargando <= 0)
    {
				
        try{
            eliminarProdVacio();
            eliminarCtaVacio();
        }catch(err){
            console.log(err);
        }
				
        guardar();
        $('#guardar_documento').attr("href","javascript:;");
    }
    else
    {
        showMessage('Cont&iacute;fico', 'Por favor espere que se carguen todos los productos' );
    }
}

function producir(){
			
}

function desbloquear(){

			
}

function aprobar(){
			
}

function cargarEvento(obj){
    var personaid = obj['asociada_id'];
    var personarazonsocial = obj['asociada_nombre'];
    tr = $('#trpersona');
    if ($(tr).find('input[class~="object-description"]').val() == ''){
        $('#id_persona_id').val(personaid);
        $(tr).find('input[class~="object-description"]').val(personarazonsocial);
    }
}

function setearVendedor(obj){
    var vendedorid = obj['vendedor_id'];
    $('#id_vendedor_id').val(vendedorid);
}

function setearVendedorNC(obj){
    var vendedorid = obj['vendedor'];
    $('#id_vendedor_id').val(vendedorid);
}

function bodegasPredeterminadas(){
    var tipoRegistro = $('#id_tipo_registro_documento').val();
    var filtro = 'venta=1';
    if (tipoRegistro == 'PRO'){
        filtro = 'compra=1';
    }
    url = "/sistema/inventario/bodega/control/json/";
    $.ajax({
        url: url + '?' + filtro,
        type: "GET",
        async: false,
        data: "",
        beforeSend:function(){
        },
        error:function()
        {
            console.log("Ha ocurrido un error");
        },
        success: function(data){
            tr = $('#trbodegaid');
            if(data['obj']['pk'] && data['obj']['nombre']){
                var bodega_id     = data['obj']['pk'];
                var bodega_nombre = data['obj']['nombre'];
                $(tr).find('input[id$="id_bodega_id"]').val(bodega_id);
                $(tr).find('input[class~="object-description"]').val(bodega_nombre);
            }
        },
        complete: function(){
        }
    });
}

		

function setear_numero_proforma(){
    tipo_documento = $("#id_tipo_documento").val();
    fecha_emision = $("#id_fecha_emision").val();
    $.ajax({
        url: "/sistema/registro/documento/get_secuencia_proforma/?tipo_documento=" + tipo_documento + "&fecha_emision=" + fecha_emision,
        type: "GET",
        async: true,
        data: "",
        beforeSend:function(){
        },
        error:function()
        {
            console.log("Ha ocurrido un error");
        },
        success: function(data){
            console.log(data);
            $("#lbl_numero_proforma").html();
            $("#lbl_numero_proforma").html(data.numero_documento);
            //var valor_pernoctacion2 = parseFloat(data.respuesta);
            //$('#id_tasa_pernoctacion').val(valor_pernoctacion2.toFixed(2));

        },
        complete: function(){
        }
    });
}

function handleTipoRegistroTipoDocumento() {
    //console.log('handle tipo registro y docu');
    var tipoRegistro = $('#id_tipo_registro_documento').val();
    var tipoDocumento = $('#id_tipo_documento').val();
    if ((tipoRegistro == 'CLI' && tipoDocumento == 'COT')|| tipoDocumento == 'PRE' || tipoDocumento == 'OCV' || tipoDocumento == 'PTO') {
        $('.trnumdoc').hide();
				
        if(tipoDocumento == 'PRE' || tipoDocumento == 'FAC'){
            $('.info-hoteleria').show();
        }else{
            $('.info-hoteleria').hide();
        }
        $('#div_sin_movimiento').hide();
    }
    else {
        $('#numero_proforma').hide();
        $('.info-hoteleria').hide();
        $('.trnumdoc').show();
        $('#div_sin_movimiento').show();

    }

			

			

			

			


    if (tipoDocumento != 'OCV'){
        $('.valida_monto').addClass('hide');
    }
			
			
			
			

    if (tipoRegistro == 'PRO'){

        $('#div_sin_movimiento').show();
        $('#xml_proveedor').show();
        $('#xml_retencion').hide();
        $('.group_xml_proveedor').addClass('input-group');
        $('.group_xml_retencion').removeClass('input-group');
				
				
    }else{
				
        $('#div_sin_movimiento').hide();
				
        $('#xml_proveedor').hide();
        $('#xml_retencion').show();
        $('.group_xml_proveedor').removeClass('input-group');
        $('.group_xml_retencion').addClass('input-group');
        $('.info-hoteleria').show();
				
				
    }

    if(tipoRegistro == 'PRO' && tipoDocumento != 'COT' && tipoDocumento != 'PRE' && tipoDocumento != 'OCV'){
        $('.pago-caja-chica').show();
    }else{
        $('.pago-caja-chica').hide();
    }

			

			
			
			

    if (tipoDocumento == 'OCV') {
        $("#trordencompraventa").addClass('hide');
        if (tipoRegistro == 'PRO'){
            $('.proveedordesconocido').show();
        }else{
            $('#id_proveedor_desconocido').attr('checked', false);
            $('.proveedordesconocido').hide();
        }
        ProveedorDesconocido();
    }else{
        $("#trordencompraventa").removeClass('hide');
    }
			
    //Lote
			



}

function generarProductoAdicional(){
    var agregar_detalle_producto = true;
    var prods = $('input[id$="-producto_id"]');
    for(var i=1;i<prods.length;i++) {
        valor = prods[i].value;
        if(!valor || valor == '') agregar_detalle_producto = false;
    }
    return agregar_detalle_producto;

}

function generarCuentaAdicional(){
    var agregar_detalle_cuenta = true;
    var prods = $('input[id$="-cuenta_id"]');
    for(var i=1;i<prods.length;i++) {
        valor = prods[i].value;
        if(!valor || valor == '') agregar_detalle_cuenta = false;
    }
    return agregar_detalle_cuenta;

}

function getDetallesDocumento(documento_id,tipo) {
    if(tipo=='doc'){ url = 'get_detalles_documento'; }
    else{ url = 'get_detalles_ocv'; }
    $('#tdetalle_producto_spinner').removeClass('hidden');
    $('#tdetalle_producto_spinner').addClass('show');
    $.getJSON('registro/documento/'+url+'/?documento_id=' + documento_id, function(data) {
        $('#tdetalle_producto_spinner').removeClass('show');
        $('#tdetalle_producto_spinner').addClass('hidden');
        $.each(data, function(key, val) {
            /*var tr;
            if(producto.detalles.length > 0)
                tr = movimiento.getLastRow();*/
            var tipoRegistro = $('#id_tipo_registro_documento').val();
            if(val['producto']){
                eliminarProdVacio();
                producto.agregarDetalle();
                tr = producto.getLastRow();
                dt = producto.getDetalle(tr);
                tr = $(dt.tr);
                $(tr).find('input[id$="-cantidad"]').val(val['cantidad']);
                $(tr).find('input[id$="-porcentaje_descuento"]').val(val['porcentaje_descuento']);
                var bien_id = $('<input>').attr({type: 'hidden', id: 'bien_id', name: 'bien_id'})
                tr.append(bien_id);
                $(tr).find('input[id$="bien_id"]').val(val['id']);
                if(tipoRegistro=='CLI'){
                    if(val['precio_venta_manual']){
                        $(tr).find('input[id$="-precio_venta_manual"]').val(val['precio_venta_manual']);
                    }
                    if(val['hidden_precio_vendido']){
                        $(tr).find('input[id$="-hidden_precio_vendido"]').val(val['hidden_precio_vendido']);
                    }
                    if(val['hidden_precio_venta']){
                        $(tr).find('input[id$="-hidden_precio_venta"]').val(val['hidden_precio_venta']);
                    }
                    if(val['precio_venta']){
                        $(tr).find('select[id$="-precio_venta"]').val(val['precio_venta']);
                    }
                    $(tr).find('input[id$="-serie_compra"]').val(val['serie_venta']);
                }else{
                    if(val['precio_compra']){
                        $(tr).find('input[id$="-precio_compra"]').val(val['precio_compra']);
                    }
                    if(val['unidad']){
                        $(tr).find('select[id$="-unidad"]').val(val['hidden_unidad']);
                    }
                    if(val['hidden_unidad']){
                        $(tr).find('input[id$="-hidden_unidad"]').val(val['hidden_unidad']);
                    }
                    $(tr).find('input[id$="-serie_venta"]').val(val['serie_compra']);
                }

                if(val['lote']){
                    $(dt.tr).find('input[id$="-lote"]').val(val['lote']);
                }
                if(val['fecha_expiracion']){
                    $(dt.tr).find('input[id$="-fecha_expiracion"]').val(val['fecha_expiracion']);
                }
                if(val['lotefield']){
                    $(dt.tr).find('input[data_id$="-lotefield"]').val(val['lotefield']);
                }

                var prod = JSON.parse(val['data_producto']) ;
                prod['es_doc_relacionado'] = true;
                if(val['serie_compra']){
                    dt.productofield.selectObj(val['producto'], "" + val['serie_compra']);
                }else{
                    dt.productofield.setObj(prod);
                }
                if(val['centro_costo_id']){
                    var costo = CentroCosto.getByIdSy('' + val['centro_costo_id'], false);
                    dt.centro_costo.setObj(costo);
                }
                calcularSubtotalProducto($(tr).find('input[id$="-cantidad"]'));
						
                $(dt.tr).find('input[id$="-lote"]').prop('readonly', true);
                $(dt.tr).find('input[id$="-fecha_expiracion"]').prop('readonly', true);
                $(dt.tr).find('input[data_id$="-lotefield"]').prop('readonly', true);
                $(dt.tr).find('input[data_id$="-lotefield"]').next().css('display', 'none');
            }
            if(val['cuenta_id']){
                eliminarCtaVacio();
                documento.detalles_cuentas.agregarDetalle();
                tr = documento.detalles_cuentas.getLastRow();
                dt = documento.detalles_cuentas.getDetalle(tr);
                //var cta = Cuenta.getById(val['cuenta_id'], false);
                var cta = Cuenta.getByIdForce(val['cuenta_id'], false);
                if(val['centro_costo_id']){
                    var costo = CentroCosto.getByIdSy('' + val['centro_costo_id'], false);
                    dt.centrocostofield.setObj(costo);
                }
                $(tr).find('input[id$="-cantidad"]').val(val['cantidad']);
                $(tr).find('input[id$="-porcentaje_descuento"]').val(val['porcentaje_descuento']);
                $(tr).find('select[id$="-porcentaje_iva"]').val(val['porcentaje_iva']);
                if(val['porcentaje_ice']){
                    $(tr).find('input[id$="-porcentaje_ice"]').val(val['porcentaje_ice']);
                }
                if(val['precio']){
                    $(tr).find('input[id$="-precio"]').val(val['precio']);
                }
                if(val['valor']){
                    $(tr).find('input[id$="-valor"]').val(val['valor']);
                }
                dt.cuentafield.setObj(cta);
                calcularSubtotalCuenta($(tr).find('input[id$="-cantidad"]'));
            }
        });
    });

}

function abrirDialogoRegistrar(){
    $('#dlgSelectObj').dialog('option', 'title', 'Registrar Persona');
}

function cerrarDialogoRegistrar(){
    bootbox.hideAll();
}

function eliminarDocumento(link, numDoc) {
    showConfirm('Eliminar documento', '¿Está seguro que desea eliminar el documento ' + numDoc + '?', function() {
        document.location.href = link.href;
    });
    return false;
}

function agregarItemsColor(caller){
    tr = $(caller).closest("tr");
    idproducto = $(tr).find('input.object-hidden[id$="producto_id"]').val();
    fecha = $('#id_fecha_emision').val();
    idbodega = $('#id_bodega_id').val();
    //Fecha
    fecha_cadena = (''+fecha).split('/');
    st = fecha_cadena[2] + '-' + fecha_cadena[1] + '-' + fecha_cadena[0];

    //$('#dlgColor').modal();
    tipo_doc = $('#id_tipo_registro_documento').val();
    if(tipo_doc == 'PRO'){
        idbodega='';
    }
    url_color = "/sistema/inventario/color/json/agregar?producto_id=" + idproducto + "&fecha=" + st + "&bodega_id=" + idbodega + "&term=''";
    $.ajax({
        url: url_color,
        type: "GET",
        async: true,
        data: "",
        beforeSend:function(){
        },
        error:function()
        {
            console.log("ERROR");
        },
        success: function(data){
            $('#dlgColor').modal();
            if(data.length == 0){
                $('#dlgColor .modal-body').html("<p>No hay colores disponibles para este producto</p>");
            }else{
                $('#dlgColor .modal-body').html(data);
            }
        },
        complete: function(){
            itemsincolor = caller;
        }

    });

}

function aplicarColoresMasivo(caller){
    var prod_obj = null;
    $('#dlgColor').modal('hide');
    dv = $('#dlgColor');
    producto_id = $('#dlgColor').find('#producto_id').val();
    $.getJSON('/sistema/inventario/producto/json/' + producto_id, function(data) {
        prod_obj = data['obj'];
        var valores = $('#dlgColor').find('input[id$="-idcolor_color"]');
        for(var i=0;i<valores.length;i++) {
            ttr = $(valores[i]).closest("tr");
            var cantidad = $(ttr).find('input[id$="-cantidad_color"]').val();
            if(!isNaN(cantidad) && cantidad > 0){
                if(prod_obj){
                    idcolor = $(valores[i]).val();
                    var color_obj = Color.getByIdSy(idcolor, false);
                    //$(ttr).find('input[id$="-aplicar_color"]').is(':checked');
                    eliminarProdVacio();
                    producto.agregarDetalle();
                    tr = producto.getLastRow();
                    dt = producto.getDetalle(tr);
                    dt.productofield.setObj(prod_obj);
                    dt.colorfield.setObj(color_obj);

                    $(dt.tr).find('input[id$="-cantidad"]').val(cantidad);

                    calcularSubtotalProducto($(dt.tr).find('input[id$="-cantidad"]'));
                }
            }
        }
        producto.eliminarDetalles(itemsincolor);
        itemsincolor = null;
    });
}

function handleFechaEmision(){
    cargarComboIva();
    set_valor_porcentaje();
    actualizarIVA();
    getNumeroAutorizacion();
}

//Lotes
function handleTipoLotes(tipo_registro, tipo) {
    var valores = $('input[id$="-producto_id"]');
    //console.log('Tipo Registro: '+ tipo_registro_documento+' Tipo Doc: '+tipo_documento +' valores: '+valores.length);
    //console.log('-----------------------');
    for(var i=1; i<valores.length; i++) {
        //console.log('val: '+ $(valores[i]).val());
				
        if($(valores[i]).val()){
            tr = $(valores[i]).closest("tr");
            if($(tr).find('input[id$="-maneja_lote"]').val() == 1){
                if((tipo_registro_documento == 'PRO' && tipo_documento != 'NCT' && tipo_documento != 'NCL')
                    || (tipo_registro_documento == 'CLI' && tipo_documento == 'NCT' && tipo_documento == 'NCL')){
                    //console.log('if');
                    $(tr).find('.lote_ingreso').show();
                    if($(tr).find('input[id$="-maneja_fechaexp"]').val() != 1){
                        $(tr).find('.lote_ingreso .fechaexp').hide();
                    }
                    $(tr).find('.lote_egreso').hide();
                }else if((tipo_registro_documento == 'CLI' && tipo_documento != 'NCT' && tipo_documento != 'NCL')
                    || (tipo_registro_documento == 'PRO' && tipo_documento == 'NCT' && tipo_documento == 'NCL')){
                    //console.log('else if');
                    $(tr).find('.lote_ingreso').hide();
                    $(tr).find('.lote_egreso').show();
                }else if(tipo_registro_documento == 'CLI' && tipo_documento == 'NCT'){ //permite que en notas de crédito de clientes se agreguen lotes
                    //console.log('else if: cliente - nct');
                    $(tr).find('.lote_ingreso').show();
                    if($(tr).find('input[id$="-maneja_fechaexp"]').val() != 1){
                        $(tr).find('.lote_ingreso .fechaexp').hide();
                    }
                    $(tr).find('.lote_egreso').hide();
                }
                else{
                    $(tr).find('.lote_ingreso').show();
                    if($(tr).find('input[id$="-maneja_fechaexp"]').val() != 1){
                        $(tr).find('.lote_ingreso .fechaexp').hide();
                    }
                    $(tr).find('.lote_egreso').show();
                }
            }
        }
    }
}

function cargarXML(documento){
    type="text/xml";
    /* documento: 1:factura, 0:retencion*/
    tipoDocumento = $('#id_tipo_documento').val();
    //console.log(tipoDocumento);
    if(documento){f = $("#file_xml_proveedor")[0].files[0];}
    else{f = $("#file_xml_retencion")[0].files[0];}
    if (f.type==type){
        var reader = new FileReader();
        reader.onload = function(event) {
            data = event.target.result;
            data = data.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"');
            var datos = {'xml':data,'documento':documento,'tipo':tipoDocumento};
            $.ajax({
                url: "/sistema/registro/documento/cargar_datos_xml/",
                type: "POST",
                async: true,
                data: datos,
                beforeSend:function(){},
                error:function(data)
                {
                    showMessage('Error Carga de XML', 'Ha existido un inconveniente al tratar de cargar XML');
                },
                success: function(data){
                    respuesta = data['respuesta'];
                    if (respuesta=='ok'){
                        if(documento){
                            $('#id_autorizacion').val(data['autorizacion']);
                            $('#id_numero_documento').val(data['documento']);
                            $('#id_fecha_emision').val(data['fecha']);
                            $("input[data_id='id_persona_id']").val(data['persona_nombre']);
                            $('#id_persona_id').val(data['persona_id']);
                            handleFechaEmision();
                            try{
                                cargarDetalleRetencionProveedor();
                            } catch(error){
                                console.log("error cargarDetalleRetencionProveedor() en cargarXML()")
                            }
                            /*
                            if (tipoDocumento=='NCT'){
                                $("input[data_id='id_documento_relacionado_id']").val(data['documentorelacionado_numero']);
                                $('#id_documento_relacionado_id').val(data['documentorelacionado_id']);
                                console.log("kkk");
                                documentoField.onSetObj();
                            }
                            */
                        }else{
                            $('#id_autorizacion_retencion').val(data['autorizacion']);
                            $('#id_numero_documento_retencion').val(data['retencion']);
                            $('#id_fecha_emision_retencion').val(data['fecha']);
                        }

                    }else{
                        showMessage('Error Carga de XML',data['mensaje']);
                    }

                },
                complete: function(){}
            });
        };
        reader.readAsText(f);
    }else{
        showMessage('Error Carga de XML',"Solo se permite carga de archivos con formato XML.");
    }
}


function cargarDetalleRetencionProveedor()
{
    var tipo_doc = $("#id_tipo_registro_documento").val();
    var persona_id = $("#id_persona_id").val();

    try {
        var num_detalles_ctas_doc = $("#tdetalle_cuenta > tr").length - 1;
        tr = documento.detalles_cuentas.getLastRow();
        dt = documento.detalles_cuentas.getDetalle(tr);
        if ( num_detalles_ctas_doc == 1 && tipo_doc == 'PRO' && persona_id != '' )
        {

            var parametros = { 'id_persona': persona_id };
            var url_view = urlprefix +"/persona/obtener_cuentas_proveedor/";
            $.ajax({
                url:url_view,
                type: "POST",
                async: true,
                data: parametros,
                success: function(data)
                {
                    var respuesta = parseInt(data.respuesta);
                    if( respuesta == 1)
                    {
                        var datos = data.datos;
                        var cuenta_recurrente = datos.cuenta_recurrente;
                        var nom_cuenta_recurrente = datos.nom_cuenta_recurrente;

                        var tipo_retencion_ir = datos.tipo_retencion_ir;
                        var cod_tipo_retencion_ir = datos.cod_tipo_retencion_ir;

                        var tipo_retencion_iva = datos.tipo_retencion_iva;
                        var cod_tipo_retencion_iva = datos.cod_tipo_retencion_iva;

                        // -- Pestaña Cuentas ---

                        //Cuenta
                        if (typeof cuenta_recurrente !== "undefined") {
                            var input_cuenta_recurrente = $(tr).find('input[id$="-cuenta_id"]');
                            input_cuenta_recurrente.val(cuenta_recurrente);
                            var td = input_cuenta_recurrente.closest('td');
                            $(td).find('input[class~="object-description"]').val(nom_cuenta_recurrente);
                        }

                        //Ret. IR
                        if (typeof tipo_retencion_ir !== "undefined") {
                            var input_tipo_retencion_ir = $(tr).find('input[id$="-tipo_retencion_ir_id"]');
                            input_tipo_retencion_ir.val(tipo_retencion_ir);
                            var td = input_tipo_retencion_ir.closest('td');
                            $(td).find('input[class~="object-description"]').val(cod_tipo_retencion_ir);
                            dt.tiporetirfield.selectObj(tipo_retencion_ir);
                        }

                        //Ret. IVA
                        if (typeof tipo_retencion_iva !== "undefined") {
                            var input_tipo_retencion_iva = $(tr).find('input[id$="-tipo_retencion_iva_id"]');
                            input_tipo_retencion_iva.val(tipo_retencion_iva);
                            var td = input_tipo_retencion_iva.closest('td');
                            $(td).find('input[class~="object-description"]').val(cod_tipo_retencion_iva);
                            dt.tiporetivafield.selectObj(tipo_retencion_iva);
                        }
                    }
                },
            });

        }else{
					

            if ( $.urlParam('cotizacion_rel') === null )
            {
                var input_cuenta_recurrente = $(tr).find('input[id$="-cuenta_id"]');
                input_cuenta_recurrente.val('');
                var td = input_cuenta_recurrente.closest('td');
                $(td).find('input[class~="object-description"]').val('');

                var input_tipo_retencion_ir = $(tr).find('input[id$="-tipo_retencion_ir_id"]');
                input_tipo_retencion_ir.val('');
                var td = input_tipo_retencion_ir.closest('td');
                $(td).find('input[class~="object-description"]').val('');

                var input_tipo_retencion_iva = $(tr).find('input[id$="-tipo_retencion_iva_id"]');
                input_tipo_retencion_iva.val('');
                var td = input_tipo_retencion_iva.closest('td');
                $(td).find('input[class~="object-description"]').val('');
            }

					
        }
    }
    catch(err) {
        console.info('.-.');
    }

}

/*
*Obtiene la Url actual de la pantalla y busca un parámetro "name"
*/
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^]*)').exec(window.location.href);
    if (results == null){
        return null;
    }else{
        return results[1] || 0;
    }
}

function bloquearCabeceraPrefactura()
{

    $("#id_tipo_registro_documento").attr("disabled", "disabled");
    $("#id_numero_documento").attr("readonly", true);
    var div_persona = $('#persona_documento .input-group');
    var input_persona = $(div_persona).find("input[type$='text']");
    var boton_persona = $(div_persona).find("span[type$='button']");
    $(input_persona).attr("readonly","readonly", "disabled", "disabled");
    $(boton_persona).attr("disabled", "disabled");
    $(boton_persona).unbind( "click" );

}



function desbloquearCabeceraPrefactura()
{

    $("#id_tipo_registro_documento").removeAttr("disabled");
    $("#id_numero_documento").removeAttr("readonly");
    var div_persona = $('#persona_documento .input-group');
    var input_persona = $(div_persona).find("input[type$='text']");
    var boton_persona = $(div_persona).find("span[type$='button']");
    $(input_persona).removeAttr("readonly");
    $(input_persona).removeAttr("disabled");
    $(boton_persona).removeAttr("disabled");

}


function actualizarDetallesProductosPVPXPersona(es_pvp_default_manual)
{
			
    $('#persona_maneja_pvpmanual').val('0');
    if (es_pvp_default_manual)
        $('#persona_maneja_pvpmanual').val('1');

    var detalles_productos = $('#tdetalle_producto').find('input[id$="-producto_id"]');
    $.each(detalles_productos, function(k, v){
        if (k != 0){
            var tr = $(v).closest("tr");
            if (producto){
                dt = producto.getDetalle(tr);
                var producto_id = $(v).closest("tr").find("input[id$=-producto_id]").val();
                if (producto_id > 0){
                    var productoObj = Producto.getByIdSy('' + producto_id, false);
                    dt.productofield.setObj(productoObj);
                }
            }
        }
    });
}

$(function() {

    //Cargar pto de emision y estab por default
			
    // opciones de cuotas

    $("#id_fecha_ini_vencimiento_cuotas").datepicker({ dateFormat: 'dd/mm/yy',changeMonth: true,changeYear: true});
			

				
				
    $( "#id_exportacion" ).prop( "checked", es_exportacion );
				
					
    $('a[href="#tab_cuotas"]').addClass('hide');
    $(".tabla_detalles_cuotas").addClass('hide');
					
				
				
				
				



			
    // /opciones de cuotas

    $('input[id$="-cuenta_costo_id"]').each(function(key, value) {
        fila = $(value).closest('tr');
        $(fila).addClass('amt-' + $(value).val());
    });
    //Enviar IVA Gasto/Cta BienServicio
    $('#id_enviar_iva_gasto').change(function(){
        $('#id_enviar_iva_cta_bs').attr('checked', false);
        $("#id_codigo_sustento").val("02");
    });
    $('#id_enviar_iva_cta_bs').change(function(){
        $('#id_enviar_iva_gasto').attr('checked', false);
        $("#id_codigo_sustento").val("02");
    });
    decimales = getNumeroDecimales();
			
			
    cambiarTamanio($('#id_autorizacion'));
    cambiarTamanio($('#id_autorizacion_retencion'));
			
			
    //BL
			
    new ObjectField($('#id_cuenta_caja_chica'));
			
			
				
				
				
			
			
    /* Triggers para pestañas de regsitro documentos*/

    $('#id_monto_pagado_ir').bind('keyup', generarRetencionesIR);

    $( "#tabs_retenciones" ).click(function() {
        generarRetencionesIVA();
        generarRetencionesIR();

    });
    $( "#tabs_proyectos" ).click(function() {
        generarProyectos();
    });
    $( "#tabs_amortizacion" ).click(function() {
        generarGastosAmortizados();
    });
			
    $('#id_fecha_registro').datepicker({ dateFormat: 'dd/mm/yy',changeMonth: true,changeYear: true});
            
            
    $('#id_fecha_emision').datepicker({ dateFormat: 'dd/mm/yy',changeMonth: true,changeYear: true});
            
            
    $('#id_fecha_emision_retencion').datepicker({ dateFormat: 'dd/mm/yy',changeMonth: true,changeYear: true});
			
			
			
			
    $("#id_numero_documento_retencion").mask("999-999-9?99999999");
    $("#id_autorizacion_retencion").mask("999?9999999999999999999999999999999999999999999999");


			
    cargarComboIva();//agregadooo
    actualizarIVA();

    empresafield = new ObjectField($('#id_cuenta_id'));

    personafield = new ObjectField($('#id_persona_id'), true);
    personafield['showAdd'] = true;
    personafield['dlgUrlAdd'] = urlprefix + "/persona/registrar/documento_persona/";
			
    // personafield['dlgTitle'] = "Registrar Persona";
    personafield['dlgWidth'] = "900";
    personafield['dlgHeight'] = "500";

    //PARA RETENCION
    persona_retfield = new ObjectField($('#id_persona_retencion'), true);
    persona_retfield['showAdd'] = true;
    persona_retfield['dlgUrlAdd'] = urlprefix + "/persona/registrar/documento_persona/";
			
    // persona_retfield['dlgTitle'] = "Registrar Persona";
    persona_retfield['dlgWidth'] = "900";
    persona_retfield['dlgHeight'] = "500";

			
			

    var tiene_persona = $('#persona_id').val();

    if(tiene_persona){

        $.ajax({
            url: urlprefix + "/persona/consultar_trans/"  + id + "/",

            type: "GET",
            async: true,
            data: {'test':'1'},
            beforeSend:function(){
            },
            error:function(data)
            {
                //console.log("error");
            },
            success: function(data){
                respuesta = data['respuesta'];

                if (respuesta=='1'){

                    $('#persona_transportista').removeClass('hide');
                }
                else{
                    $('#persona_transportista').addClass('hide');
                }

            },
            complete: function(){

            }
        });//fin ajax

    }
    else{
        $('#persona_transportista').addClass('hide');
    }

    personafield.onSetObj = function (obj) {
				
        if(obj){
            actualizarDetallesProductosPVPXPersona(obj['es_pvp_default_manual']);

            artesanal = obj['artesanal'];
            exterior = obj['exterior'];

            id = obj['id'];


            $.ajax({
                url: urlprefix + "/persona/consultar_trans/"  + id + "/",

                type: "GET",
                async: true,
                data: {'test':'1'},
                beforeSend:function(){
                },
                error:function(data)
                {
                    //console.log("error");
                },
                success: function(data){
                    respuesta = data['respuesta'];

                    if (respuesta=='1'){

                        $('#persona_transportista').removeClass('hide');
                    }
                    else{
                        $('#persona_transportista').addClass('hide');
                    }

                },
                complete: function(){

                }
            });//fin ajax

        }else{
            artesanal = false;
            exterior = false;
        }
        getNumeroAutorizacion(); setearIVA(); setearIVA_no_autorizados(); calcularTotal();

        if(obj){porcentaje_descuento = obj['descuento'];}

				
        if(obj){setearVendedor(obj);}
				
        //pvp por defecto
        if(obj && obj['pvp_default']){
            $('#id_pvp_default').val(obj['pvp_default']);
					
        }else{
            $('#id_pvp_default').val('');
        }

				
				
				
    };

			
    safe_url_personafield = personafield['dlgUrl'];
			
			
    documentoField = new ObjectField($('#id_documento_relacionado_id'));
    urldocumento = documentoField['dlgUrl'];
    documentoField.onButtonClick = function () {
        var personaid, tiporeg;
        personaid = $('#id_persona_id').val();
        tiporeg = $('#id_tipo_registro_documento').val();
        tipo_documento = $('#id_tipo_documento').val();
        if (personaid) {
            documentoField.dlgUrl = urldocumento + '?persona_id=' + personaid + '&tipo_registro=' + tiporeg + '&tipo_documento=' + tipo_documento + '&buscar_doc_relacionado=1';
            if($('#id_tipo_documento').val() == 'NCL'){
                documentoField.dlgUrl = documentoField.dlgUrl + '&solo_dna=1';
            } else if($('#id_tipo_documento').val() == 'NCT' || $('#id_tipo_documento').val() == 'NDT') {
                documentoField.dlgUrl = documentoField.dlgUrl + '&excluir_cotizacion=1' + '&excluir_dna=1';
            }
            return true;
        } else {
            showMessage('Registrar Documento Electrónico', 'Para seleccionar el documento debe seleccionar primero a la persona');
            return false;
        }
    };
    documentoField.onSetObj = function (obj) {
				
        if(obj['vendedor']){
            setearVendedorNC(obj);
        }

        if(obj['exportacion']){
            $('#id_exportacion').selected(true);
            $('.check_exportacion').show();
            $('.exportacion').show();
					
            $('#id_puerto_embarque').val(obj['puerto_embarque']);
            $('#id_pais_origen').val(obj['pais_origen']);
            $('#id_puerto_destino').val(obj['puerto_destino']);
            $('#id_pais_destino').val(obj['pais_destino']);
            $('#id_doc_transporte').val(obj['doc_transporte']);
            $('#id_correlativo').val(obj['correlativo']);
            $('#id_tipo_ingreso_exterior').val(obj['tipo_ingreso_exterior']);
            $('#id_impuesto_otro_pais').val(obj['impuesto_otro_pais']);
					
        }
        actualizarIVA();
    };
    //Importaciones/
			
			
            

            

			

            

			

    $('#id_tipo_registro_documento').bind('change',function(event, document_ready_flag){
        //console.log('change documento');
        var tiporeg = $('#id_tipo_registro_documento').val();
        var tipo_documento_proveedor = ['LQC'];
        var tipo_documento_cliente = ['FAC', 'NDT', 'NCT', 'REE'];

        if(bool_cambio == 0){
            bool_cambio =1;
        }
        else{
            personafield.reset();
            persona_retfield.reset();
            $('#persona_transportista').addClass('hide');
        }
        if (tiporeg == 'CLI') {
            $('.td-gasto').css('display', 'none');
            $('.vendedor').show();
					
					
            $('.precio-compra').hide();
            $('.unidades').hide();
            $('.label-unidad').show();
            $('.precio-venta').show();
            $('.descuento-ice').show();
            $('.descuento-ice input[type=text]').each(function(key, value) {
                var prefix;
                prefix = getPrefix($(value).attr('id'));
                if ((prefix != 'id_producto_template') && (prefix.indexOf('id_producto_') == 0)){
                    calcularSubtotalProducto(value);
                }
            });
					
                    
            $('#trrecepcionmercaderia').hide();

            if(es_documento_electronico) {
                // Ocultamos los tipos de documento de tipo Proveedor, mostramos los de tipo Cliente
                tipo_documento_proveedor.forEach(function(tipo){
                    $('#id_tipo_documento option[value="' + tipo + '"]').hide();
                });
                tipo_documento_cliente.forEach(function(tipo){
                    $('#id_tipo_documento option[value="' + tipo + '"]').show();
                });
                if (!document_ready_flag) {
                    $('#id_tipo_documento').val('FAC');
                }
            }
        } else {
            $('.td-gasto').css('display', 'table-cell');
            $('.vendedor').hide();
					
					
            $('.precio-compra').show();
            $('.unidades').show();
            $('.label-unidad').hide();
            $('.precio-venta').hide();
            $('.descuento-ice').show();
					
                    
            $('#trrecepcionmercaderia').show();

            if(es_documento_electronico) {
                // Ocultamos los tipos de documento de tipo Cliente, mostramos los de tipo Proveedor
                tipo_documento_proveedor.forEach(function(tipo){
                    $('#id_tipo_documento option[value="' + tipo + '"]').show();
                });
                tipo_documento_cliente.forEach(function(tipo){
                    $('#id_tipo_documento option[value="' + tipo + '"]').hide();
                });
                if (!document_ready_flag) {
                    $('#id_tipo_documento').val('LQC');
                }
            }
        }
        // Se muestra / esconden los campos de serie
        $('.seriado').not('.label-unidad').each(function(key, value) {
            if ((tiporeg == 'CLI' && $(value).hasClass('serie-venta')) ||
                (tiporeg != 'CLI' && $(value).hasClass('serie-compra')) ) {
                $(value).show();
            }
            else {
                $(value).hide();
            }
        });

        personafield['dlgUrl'] = safe_url_personafield + '?tipopersona=' + this.value;
        if (es_documento_electronico) {
            personafield['dlgUrl'] += '&es_documento_electronico=1';
        }
				
				
				
        handleSelectTipoDocumento();
				
        getNumeroAutorizacion();
        getNumeroAutorizacionRetencion();
        //handleTipoRegistroTipoDocumento();
        $($('.doc_reemb_prov')[0]).trigger('keyup');
        calcularTotalIBPNRProductos();
        validarSecuenciaDna();
    });


    $('#id_tipo_documento').bind('change', handleSelectTipoDocumento);
    $('#id_tipo_documento').bind('change', generarRetencionesIR);
    $('#id_vencimiento').bind('keyup', handleSelectVencimiento);

    var data_detalle_cuentas = {
        'templateDetalle': $('#dtemplate_cuenta'),
        'tableDetalle': $('#tdetalle_cuenta'),
        'prefixDetalle': 'template',
        'funcCompDetalle': DetalleCuenta.sonIguales,
        'klassDetalle': DetalleCuenta
    };

    var data_detalle_retenciones = {
        'templateDetalle': $('#dtemplate_retencion'),
        'tableDetalle': $('#tdetalle_retencion'),
        'prefixDetalle': 'template',
        'funcCompDetalle': DetalleRetencion.sonIguales,
        'klassDetalle': DetalleRetencion
    };

    var data_detalle_retenciones_iva = {
        'templateDetalle': $('#dtemplate_retencion_iva'),
        'tableDetalle': $('#tdetalle_retencion_iva'),
        'prefixDetalle': 'template',
        'funcCompDetalle': DetalleRetencionIVA.sonIguales,
        'klassDetalle': DetalleRetencionIVA
    };
    proyectofield = new ObjectField($('#id_proyecto_id'));
    proyectofield['dlgUrl'] = proyectofield['dlgUrl']+'?estado=AC'

    centro_costo_field = new ObjectField($('#id_centro_costo_id'));
    centro_costo_cuenta_field = new ObjectField($('#id_centro_costo_cuenta_id'));
    //SELECCION GRUPAL RETENCIONES

    retIrfield = new ObjectField($('#id_tipo_retencion_ir_id'));
    retIvafield = new ObjectField($('#id_tipo_retencion_iva_id'));

    retIrcuentasfield = new ObjectField($('#id_tipo_retencion_ir_cuentas_id'));
    retIvacuentasfield = new ObjectField($('#id_tipo_retencion_iva_cuentas_id'));

    $("#productos").find('input[class~="object-description"]').hide();
    boton = $("#productos").find('span[class~="btn-default"]');
    div_btn = boton.closest("div");
    boton.removeClass('input-group-addon');
    boton.css('padding','4');

    div_btn.css('position','relative');
    div_btn.css('float','right');

    $("#cuentas").find('input[class~="object-description"]').hide();
    boton = $("#cuentas").find('span[class~="btn-default"]');
    div_btn = boton.closest("div");
    boton.removeClass('input-group-addon');
    boton.css('padding','4');

    div_btn.css('position','relative');
    div_btn.css('float','right');

    retIrfield.onSetObj = function(obj){
        var retirid = obj['id'];
        var retirnombre = obj['codigo'];
        div = $("#productos");
        var rets = $(div).find('input[id$="-tipo_retencion_ir_id"]');
        $(producto.detalles).each(function(){
            this.tiporetirfield.setObj(obj);
        });
    };
    retIvafield.onSetObj = function(obj){
        $(producto.detalles).each(function(){
            this.tiporetivafield.setObj(obj);
        });
    };

    retIrcuentasfield.onSetObj = function(obj){
        $(documento.detalles_cuentas.detalles).each(function(){
            this.tiporetirfield.setObj(obj);
        });
    };
    retIvacuentasfield.onSetObj = function(obj){
        $(documento.detalles_cuentas.detalles).each(function(){
            this.tiporetivafield.setObj(obj);
        });
    };

    $('#id_tipo_retencion').bind('change',function(){handleSelectTipoRetencion(true);});
    handleSelectTipoRetencion(false);
    //FIN RETENCIONES

    proyectofield.onSetObj = function(obj, firstLoad){

        $("#subproyectoNombre").text((this.extraSelectParams != null)?this.extraSelectParams[1]:"");
        /*if(!proyecto_modificar)
        {
            console.log("Proyecto " + proyecto_modificar);
            proyecto_modificar = true;
            return;
        } */
        if(obj){
            var proyid = obj['id'];
            var proynombre = obj['nombre'];
            div = $("#productos");
            var proyectos = $(div).find('input[id$="-proyecto_id"]');
            for(var i=0;i<proyectos.length;i++) {
                var td = $(proyectos[i]).closest('td');
                $(td).find('input[id$="-proyecto_id"]').val(proyid);
                $(td).find('input[class~="object-description"]').val(proynombre);
                //$(td).find('input[id$="-subproyecto_id"]').val((this.extraSelectParams != null)?this.extraSelectParams[0]:"");
                //$(td).parent().find('input[id$="-subproyecto_nombre"]').val((this.extraSelectParams != null)?this.extraSelectParams[1]:"");
            }
            div2 = $("#cuentas");
            var proyectos = $(div2).find('input[id$="-proyecto_id"]');
            for(var i=0;i<proyectos.length;i++) {
                var td = $(proyectos[i]).closest('td');
                $(td).find('input[id$="-proyecto_id"]').val(proyid);
                $(td).find('input[class~="object-description"]').val(proynombre);
                //$(td).parent().find('input[id$="-subproyecto_id"]').val((this.extraSelectParams != null)?this.extraSelectParams[0]:"");
                //$(td).parent().find('input[id$="-subproyecto_nombre"]').val((this.extraSelectParams != null)?this.extraSelectParams[1]:"");
            }
            generarProyectos();
        }
    };

    centro_costo_field.onSetObj = function(obj){
        var centroid = obj['id'];
        var centronombre = obj['nombre'];
        div = $("#productos");
        var centros = $(div).find('input[id$="-centro_costo_id"]');
        for(var i=0;i<centros.length;i++) {
            var td = $(centros[i]).closest('td');
            $(td).find('input[id$="-centro_costo_id"]').val(centroid);
            $(td).find('input[class~="object-description"]').val(centronombre);


        }

    };

    centro_costo_cuenta_field.onSetObj = function(obj){
        var centroid = obj['id'];
        var centronombre = obj['nombre'];
        div = $("#cuentas");
        var centros = $(div).find('input[id$="-centro_costo_id"]');
        for(var i=0;i<centros.length;i++) {
            var td = $(centros[i]).closest('td');
            $(td).find('input[id$="-centro_costo_id"]').val(centroid);
            $(td).find('input[class~="object-description"]').val(centronombre);


        }

    };

    if ($('#id_bodega_id').is('*')) {
        bodegafield = new ObjectField($('#id_bodega_id'));
        safe_url_bodegafield = bodegafield['dlgUrl'];
        var tipoRegistro = $('#id_tipo_registro_documento').val();
        ;
    }

			

    documento = new DocumentoForm(data_detalle_cuentas,data_detalle_retenciones,data_detalle_retenciones_iva);

    docs_reembolso = new MasterDetail({
        'templateDetalle': $('#dtemplate_documento'),
        'tableDetalle': $('#tdetalle_documento'),
        'prefixDetalle': 'template',
        'funcCompDetalle': DetalleDocumento.sonIguales,
        'klassDetalle': DetalleDocumento
    });


    docs_reembolso_proveedor = new MasterDetail({
        'templateDetalle': $('#dtemplate_documento_proveedor'),
        'tableDetalle': $('#tdetalle_documento_proveedor'),
        'prefixDetalle': 'template',
        'funcCompDetalle': DetalleDocumentoProveedor.sonIguales,
        'klassDetalle': DetalleDocumentoProveedor
    });

    fondos_garantia = new MasterDetail({
        'templateDetalle': $('#dtemplate_fondos_garantia'),
        'tableDetalle': $('#tdetalle_fondos_garantia'),
        'prefixDetalle': 'template',
        'funcCompDetalle': FondoGarantia.sonIguales,
        'klassDetalle': FondoGarantia
    });

    amortizacion = new MasterDetail({
        'templateDetalle': $('#dtemplate_amortizacion'),
        'tableDetalle': $('#tdetalle_amortizacion'),
        'prefixDetalle': 'template',
        'funcCompDetalle': Amortizacion.sonIguales,
        'klassDetalle': Amortizacion
    });

    producto = new MasterDetail({
        'templateDetalle': $('#dtemplate_producto'),
        'tableDetalle': $('#tdetalle_producto'),
        'prefixDetalle': 'template',
        'funcCompDetalle': DetalleProductoForm.sonIguales,
        'klassDetalle': DetalleProductoForm
    });

			

    productom = new MasterDetail({
        'templateDetalle': $('#dtemplate_productom'),
        'tableDetalle': $('#tdetalle_productom'),
        'prefixDetalle': 'template',
        'funcCompDetalle': DetalleProductomForm.sonIguales,
        'klassDetalle': DetalleProductomForm
    });
			
    productopre = new MasterDetail({
        'templateDetalle': $('#dtemplate_productopre'),
        'tableDetalle': $('#tdetalle_productopre'),
        'prefixDetalle': 'template',
        'funcCompDetalle': DetalleProductopreForm.sonIguales,
        'klassDetalle': DetalleProductopreForm
    });

			
			
    proyect = new MasterDetail({
        'templateDetalle': $('#dtemplate_proyecto'),
        'tableDetalle': $('#tdetalle_proyecto'),
        'prefixDetalle': 'template',
        'funcCompDetalle': DetalleProyecto.sonIguales,
        'klassDetalle': DetalleProyecto
    });
			
    pagos = new MasterDetail({
        'templateDetalle': $('#dtemplate_pago'),
        'tableDetalle': $('#tdetalle_pago'),
        'prefixDetalle': 'template',
        'funcCompDetalle': DetallePagoDocumento.sonIguales,
        'klassDetalle': DetallePagoDocumento
    });

    $('body').on('keyup','.val-subtotal',function(){
        calcularTotal();
    });
    $('#id_fecha_emision').bind('change', handleFechaEmision);

    $('#id_fecha_emision_retencion').bind('change', getNumeroAutorizacionRetencion);
			
    $("#id_tipo_registro_documento").trigger("change", [true]);
			
    $('#id_vencimiento').trigger("keyup");

    $("#dlgImprimir").dialog({
        bgiframe: true,
        title: "Imprimir documento",
        autoOpen: false,
        height: 240,
        width: 420,
        resizable: false,
        modal: true
    });
    $('#dlgImprimir').dialog('option', 'buttons', {
        'Cerrar': function() {
            $(this).dialog('close');
        }
    });
    //para guardar documentos agrupados
    /*$("#dlgGuardar").dialog({
        bgiframe: true,
        title: "Guardar Documento",
        autoOpen: false,
        width: 350,
        resizable: false,
        modal: true
    });
    $('#dlgGuardar').dialog('option', 'buttons', {
        'Si': function(){
            $(this).dialog('close');
            document.forms.docForm.submit();
        },
        'No': function(){
            $(this).dialog('close');
        }
    });*/


			
    $('#autorizacion_combo').css({'width':'158px', 'float':'left'});
			

    $("#id_establecimiento_retencion").change(function(){
        consultar_secuencia_retencion();
    });

    $("#id_punto_emision_retencion").keyup(function(){
        consultar_secuencia_retencion();
    });

    $("#id_tipo_retencion").change(function(){
				
        consultar_secuencia_retencion();
				
    });

			
    $("#id_establecimiento").change(function(){
        consultar_secuencia();
    });

    $("#id_punto_emision").keyup(function(){
        consultar_secuencia();
    });

    $("#id_tipo_documento").change(function(){

        consultar_secuencia();
    });

			
    set_establecimiento();
			
			

			

    //setarPorcentajeCuentas();// xq?????????

			

    //mostrarAplicaIva();
    $('#id_aplica_iva_12').bind('click', AplicaIva12);
    $('#id_porcentaje_iva').bind('change',actualizarIVA);
    AplicaIva12();
    $('#id_exportacion').bind('click', MostrarCamposExportacion);
    MostrarCamposExportacion();
    $('#id_tipo_exportacion').bind('change', MostrarCamposExportacion2);

    $('#id_proveedor_desconocido').bind('click', ProveedorDesconocido);
    ProveedorDesconocido();
    /*Cargar Forma de pago por defecto */
    if(!hay_error){
        duplicar = "";
			
    }

    //hoteleria
    reservacionfield = new ObjectField($('#id_reservacion'));

    /*$('#id_pais_origen').select2({
        placeholder: "Buscar/Seleccionar",
        formatNoMatches: function() { return 'Pais no encontrado.'; },
        allowClear: true
    });*/

			



    primera_carga = false;
    /* por revisar carga de autorizacion */
    getNumeroAutorizacion();

			


			
			
			

    //Para bloquear campos en presupuesto anulado
			

			

});


function calcularTotalIBPNRProductos(){
    var total = 0;
			
    if (total == 0)
        total = '0.00';
    $('#id_ibpnr').val(total);
}

function calcularTotalPrespupuestoProductos(){
    var total = 0;
			
    /*if (total == 0)
        total = '0.00';
    $('#id_ibpnr').val(total);*/
}

function AplicaIva12(){

    if ($('#id_aplica_iva_12').is(':checked')){
        cargarComboIva();
        set_valor_porcentaje();
        porcentaje_iva_actual = $('#id_porcentaje_iva').val();

        $('.aplica_porcentaje_iva').show();
        $('.label-iva').html(porcentaje_iva_actual + '%');

        //actualizarIVA();
        recalcularValoresIVA();

    }else{
        $('.aplica_porcentaje_iva').hide();
        actualizarIVA();
        recalcularValoresIVA();
    }

}

		

function MostrarCamposExportacion(){
    if ($('#id_exportacion').is(':checked')){
        $('.exportacion_t').show();
        $('.exportacion').show()
        if($('#id_tipo_exportacion').val() == '01'){
            $('.exportacionp').show();
            $('.exportacions').hide();
        }else{
            $('.exportacions').show();
            $('.exportacionp').hide();
        }
    }else{
        $('.exportacion_t').hide();
        $('.exportacion').hide();
        $('.exportacionp').hide();
        $('.exportacions').hide();
    }
}

function MostrarCamposExportacion2(){
    $('.exportacion_t').show();
    $('.exportacion').show();
    if($('#id_tipo_exportacion').val() == '01'){
        $('.exportacionp').show();
        $('.exportacions').hide();
    }else
    {
        $('.exportacions').show();
        $('.exportacionp').hide();
    }
}
		

function ProveedorDesconocido(){
    if ($('#id_proveedor_desconocido').is(':checked')){
        $('#trpersona').addClass('hide');
        personafield.reset();
    }else{
        $('#trpersona').removeClass('hide');
    }

}

function recalcularValoresIVA(){
    setearLabelIva();
    var valores = $('#productos').find('input[id$="-cantidad"]');
    for(var i=0;i<valores.length;i++) {
        calcularSubtotalProducto($(valores[i]));
    }
    var valores = $('#cuentas').find('input[id$="-cantidad"]');
    for(var i=0;i<valores.length;i++) {
        calcularSubtotalCuenta($(valores[i]));
    }
    setarPorcentajeProductos();
    setarPorcentajeCuentas();
}



		
function set_establecimiento()
{

}


function consultar_secuencia()
{
    var cambiar_secuencia = true;
    var tipoDocumento = $("#id_tipo_documento").val();
    var establecimiento = $("#id_establecimiento").val();
    var puntoEmision = $("#id_punto_emision").val();
    //puntoEmision = puntoEmision.replace(/\_/g,'');
    if(puntoEmision == '___'){cambiar_secuencia = false;}
    if(puntoEmision == '' || puntoEmision == 'NaN')
    {
        $("#id_punto_emision").val("001");
        puntoEmision = 1;
    }
    if (numero_documento!=null){
        establec = numero_documento.substr(0,3);
        punto_em = numero_documento.substr(4,3);
        if (establecimiento==establec && parseInt(puntoEmision)==parseInt(punto_em)){
            cambiar_secuencia = false;
            $("#id_numero_documento").val(numero_documento);
        }
    }
    if(cambiar_secuencia){
        var datos = {'establecimiento' :establecimiento, 'puntoEmision' : parseInt(puntoEmision), 'tipoDocumento' : tipoDocumento};
        $.ajax({
            url: "/sistema/registro/documento/secuencia/",
            type: "POST",
            async: true,
            data: datos,
            beforeSend:function(){},
            error:function()
            {
                showMessage('Cargar Secuencia', 'Ha existido un inconveniente al tratar de cargar');
            },
            success: function(data){
                $("#id_numero_documento").val(data["numero_documento"]);
            },
            complete: function(){}
        });
    }
}

function consultar_secuencia_retencion()
{
    var tipoRet = $("#id_tipo_retencion").val();
    if(tipoRet == 'E'){
        var cambiar_secuencia_ret = true;
        var tipoDocumento = $("#id_tipo_documento").val();
        var establecimientoRetencion = $("#id_establecimiento_retencion").val();
        var puntoEmisionRetencion = $("#id_punto_emision_retencion").val();
        puntoEmisionRetencion = puntoEmisionRetencion.replace(/\_/g,'');
        if(puntoEmisionRetencion == '' || puntoEmisionRetencion == 'NaN' || parseInt(puntoEmisionRetencion)==0)
        {
            $("#id_punto_emision_retencion").val("1");
            puntoEmisionRetencion = 1;
        }
        if (numero_retencion!='' && tipo_retencion_data=='E'){
            establec = numero_retencion.substr(0,3);
            punto_em = numero_retencion.substr(4,3);
            if (establecimientoRetencion==establec && parseInt(puntoEmisionRetencion)==parseInt(punto_em)){
                cambiar_secuencia_ret = false;
                $("#id_numero_documento_retencion").val(numero_retencion);
            }
        }
        if(cambiar_secuencia_ret){
            var datos = {'establecimiento' :establecimientoRetencion, 'puntoEmision' : puntoEmisionRetencion, 'tipoDocumento' : tipoDocumento};
            $.ajax({
                url: "/sistema/registro/documento/secuencia/",
                type: "POST",
                async: true,
                data: datos,
                beforeSend:function(){},
                error:function()
                {
                    alert('Ha existido un inconveniente al tratar de cargar ');
                },
                success: function(data){
                    $("#id_numero_documento_retencion").val(data["numero_retencion"]);
                },
                complete: function(){}
            });
        }
    }

}

		
function mostrarAdjuntos(url) {
    $('#dlgAdjuntos').modal();
    $('#dlgAdjuntos .modal-body').prepend('<div class="indicator show"><span class="spinner spinner16"></span></div>');
    var documento_id=null;
    if ($('#id_id').length){
        var documento_id=$('#id_id').val();
    }else{
        if ($('#id_documento_id').length){
            var documento_id=$('#id_documento_id').val();
        }else{
            documento_id=null;
        }
    }

    if (documento_id!=null && documento_id!=''){
        $.ajax({
            url: urlprefix + "/registro/documento/administrar_adjuntos/"+documento_id,
            type: "GET",
            async: true,
            data: {},
            beforeSend:function(){
            },
            error:function()
            {
            },
            success: function(data){
                $('#dlgAdjuntos .modal-body').html(data);
            },
            complete: function(){
            }
        });
    }else{
        $('#dlgAdjuntos .modal-body').html("El documento no se ha guardado, por favor guardar antes de subir adjuntos");
    }
    //$('#dlgAdjuntos').modal();
    /*$('#dlgAdjuntos').dialog('open');*/
}
function mostrarDescuento(url) {
    $('#dlgDcto').modal();
}
function AplicarDscto(){
    $('#dlgDcto').modal('hide');
    var valor = $('#porcentaje_descuento_masivo_producto').val();
    if(!isNaN(valor)){
        var valores = $('#productos').find('input[id$="-porcentaje_descuento"]');
        for(var i=0;i<valores.length;i++) {
            $(valores[i]).val(valor);
            calcularSubtotalProducto($(valores[i]));
        }
        if($("#id_tipo_documento").val() == 'PTO'){
            var valores = $('#productospre').find('input[id$="-porcentaje_descuento"]');
            for(var i=0;i<valores.length;i++) {
                $(valores[i]).val(valor);
                calcularSubtotalProducto($(valores[i]));
            }
        }
    }
}

		

function mostrarDescuentoCuenta(url) {
    $('#dlgDctoC').modal();
}
function AplicarDsctoC(){
    $('#dlgDctoC').modal('hide');
    var valor = $('#porcentaje_descuento_masivo_cuenta').val();
    if(!isNaN(valor)){
        var valores = $('#cuentas').find('input[id$="-porcentaje_descuento"]');
        for(var i=0;i<valores.length;i++) {
            $(valores[i]).val(valor);
            calcularSubtotalCuenta($(valores[i]));
        }
    }
}
function imprimirDocumento(url) {
    $('#dlgImprimir').show();
    $('#iframeApplet').attr('src', url);
    $('#dlgImprimir').dialog('open');
}
function mostrar_autorizacion(){
    $('#id_autorizacion').css("display","");
    $('#autorizacion_combo').css("display","none");
    $('#mostrar_autorizacion').css("display","none");
    if ($('#hay_combo_autorizacion').val() == "1")
        $('#mostrar_autorizacion_combo').css("display","");
}
function mostrar_autorizacion_retencion(){
    $('#id_autorizacion_retencion').css("display","");
    $('#label_retencion').css("display","");
    $('#autorizacion_retencion_combo').css("display","none");
    $('#mostrar_autorizacion_retencion').css("display","none");
    if ($('#hay_combo_autorizacion_retencion').val() == "1")
        $('#mostrar_autorizacion_retencion_combo').css("display","");
}
function mostrar_autorizacion_combo(){
    $('#id_autorizacion').css("display","none");
    $('#mostrar_autorizacion_combo').css("display","none");
    $('#autorizacion_combo').css("display","");
    $('#mostrar_autorizacion').css("display","");
}
function mostrar_autorizacion_retencion_combo(){
    $('#id_autorizacion_retencion').css("display","none");
    $('#label_retencion').css("display","none");
    $('#mostrar_autorizacion_retencion_combo').css("display","none");
    $('#autorizacion_retencion_combo').css("display","");
    $('#mostrar_autorizacion_retencion').css("display","");
}
function prepararAgrupar(){
    $('#es_agrupar').val('1');
    document.forms.docForm.action = "/sistema/registro/agrupar_documentos/";
    document.forms.docForm.submit();
    $('#es_agrupar').val('0');
    return false;
}
function duplicarDoc(){
    $('#duplicar').val('1');
    try{
        eliminarProdVacio();
        eliminarCtaVacio();
    }catch(err){
        console.log(err);
    }
    document.forms.docForm.target = "_blank";
    document.forms.docForm.action = "/sistema/registro/documento/registrar/";
    document.forms.docForm.submit();
    document.forms.docForm.target = "";
    document.forms.docForm.action = "";
    $('#duplicar').val('0');
}

function bloquear_presupuesto(){

    $("#id_fecha_emision").datepicker("destroy");
    $("#id_fecha_emision").attr("readonly","readonly");
    $("#id_vencimiento").attr("readonly","readonly");

    $("#id_referencia").attr("readonly","readonly");
    $("#id_actividad_id").attr("readonly","readonly");
    $("#id_adicional1").attr("readonly","readonly");
    $("#id_adicional2").attr("readonly","readonly");

    $('#id_vendedor_id option:not(:selected)').attr('disabled', true);
    //pidgey

    var persona = $("#persona_documento");
    var input_persona = $(persona).find("input[type$='text']");
    var boton_persona = $(persona).find("span[type$='button']");
    input_persona.attr("readonly","readonly");
    boton_persona.attr("disabled", "disabled");
    boton_persona.unbind( "click" );

    items = $("#productospre").find('input[id$="-producto_id"]');

    for(var i=0;i<items.length;i++) {
        var td = $(items[i]).closest('td');
        $(td).find('input[id$="-producto_id"]').attr("readonly", "readonly");
        $(td).find('input[class~="object-description"]').attr("readonly", "readonly");
        $(td).find("span[type$='button']").attr("disabled", "disabled");
        $(td).find("span[type$='button']").attr("disabled", "disabled");
        $(td).find("span[type$='button']").unbind("click");
    }

    nom = $("#productospre").find('textarea[id$="-nombre_manual"]');
    for(var i=0;i<nom.length;i++) {
        $(nom[i]).attr("readonly", "readonly");
    }

    cant = $("#productospre").find('input[id$="-cantidad"]');
    for(var i=0;i<cant.length;i++) {
        $(cant[i]).attr("readonly", "readonly");
    }

    desc = $("#productospre").find('input[id$="-porcentaje_descuento"]');
    for(var i=0;i<desc.length;i++) {
        $(desc[i]).attr("readonly", "readonly");
    }

    precio = $("#productospre").find('input[id$="-precio_venta_manual"]');
    for(var i=0;i<precio.length;i++) {
        $(precio[i]).attr("readonly", "readonly");
        var div = $(precio[i]).closest('div');
        $(div).find("button[type$='button']").attr("disabled", "disabled");
        $(div).find("button[type$='button']").unbind("click");
    }

    pvp = $("#productospre").find('select[id$="-precio_venta"]');
    for(var i=0;i<pvp.length;i++) {
        $(pvp[i]).find('option:not(:selected)').attr('disabled', true);
        $(pvp[i]).attr("readonly", "readonly");
    }

    /*for(var i=0;i<nom.length;i++) {
        var tdn = $(nom[i]).closest('td');
        $(tdn).find('textarea[id$="-nombre_manual"]').attr("readonly", "readonly");
    }*/
}

function habilitarNumDoc(){
    $("#id_numero_documento").attr("readonly", false);
}
function habilitarNumDocRet(){
    $("#id_numero_documento_retencion").attr("readonly", false);
}

function handleTipoDocumentoPorReembolso(){
    /* Funcion que maneja la visibilidad de los elementos con la clase
    *  .tipo_doc en base a que el tipo de documento sea a proveedor (PRO),
    *  de tipo Comprobante de venta emitido por reembolso  (REE), 
    *  y el tipo de retencion electronica (E).
    */
    try { 
        var tipoDocumento = document.getElementById('id_tipo_documento').value;
        var tipoPersona = document.getElementById('id_tipo_registro_documento').value;
        var tipoEmisionRetencion = document.getElementById('id_tipo_retencion').value;

        if (tipoDocumento == 'REE' && tipoPersona == "PRO" && tipoEmisionRetencion == 'E'){
            $('.tipo_doc').show();
        } else {
            $('.tipo_doc').hide();
        }
    } catch (e) {
        console.log("no se esta registrando un documento.");
        console.log(e);
    }
}

function completaSecuenciaNumeroDocumentoFisico(){
    var tipoDocu = $('#id_tipo_documento').val();
    var numDocu = $('#id_numero_documento').val();
    var partesNumDocu = numDocu.split('-');

    var cadenaSinSubguionNiguion = numDocu.replace(/_/g, '');
    cadenaSinSubguionNiguion = cadenaSinSubguionNiguion.replace(/-/g, '');

    try {
        if (cadenaSinSubguionNiguion.length > 6 && partesNumDocu.length > 2 ) {
            if (tipoDocu == 'FAC' || tipoDocu == 'LQC' || tipoDocu == 'NCT' || tipoDocu == 'LMU') {
                var longitudSecuenciaNumerica = 9;
                if (partesNumDocu[2].length < longitudSecuenciaNumerica || partesNumDocu[2].includes('_')) {
                    var terceraParte = partesNumDocu[2];
                    var terceraParteFormat = terceraParte.replace(/_/g, '');
                    var cantidadRelleno = longitudSecuenciaNumerica - terceraParteFormat.length;
                    var mascara = '';
                    for (x = 0; x < cantidadRelleno; x++) {
                        mascara = mascara + '0'
                    }
                    $('#id_numero_documento').val(partesNumDocu[0] + '-' + partesNumDocu[1] + '-' + mascara + terceraParteFormat);
                }
            }
        }
    }catch (e) {

    }
}

function completaSecuenciaNumeroDocumentoRetencionFisico(){
    var numDocu = $('#id_numero_documento_retencion').val();
    var partesNumDocu = numDocu.split('-');

    var cadenaSinSubguionNiguion = numDocu.replace(/_/g, '');
    cadenaSinSubguionNiguion = cadenaSinSubguionNiguion.replace(/-/g, '');

    try {
        if (cadenaSinSubguionNiguion.length > 6 && partesNumDocu.length > 2) {
            var longitudSecuenciaNumerica = 9;
            if (partesNumDocu[2].length < longitudSecuenciaNumerica || partesNumDocu[2].includes('_')) {
                var terceraParte = partesNumDocu[2];
                var terceraParteFormat = terceraParte.replace(/_/g, '');
                var cantidadRelleno = longitudSecuenciaNumerica - terceraParteFormat.length;
                var mascara = '';
                for (x = 0; x < cantidadRelleno; x++) {
                    mascara = mascara + '0'
                }
                $('#id_numero_documento_retencion').val(partesNumDocu[0] + '-' + partesNumDocu[1] + '-' + mascara + terceraParteFormat);
            }
        }
    }catch(e){

    }
}

$('#id_tipo_documento').change(handleTipoDocumentoPorReembolso);
$('#id_tipo_registro_documento').change(handleTipoDocumentoPorReembolso);
$('#id_tipo_retencion').change(handleTipoDocumentoPorReembolso);

$(document).ready(function(){
    // seteando los listeners
    $('#id_tipo_documento').change(handleTipoDocumentoPorReembolso);
    $('#id_tipo_registro_documento').change(handleTipoDocumentoPorReembolso);
    $('#id_tipo_retencion').change(handleTipoDocumentoPorReembolso);
    // para la primera carga
    handleTipoDocumentoPorReembolso();
    $('#id_numero_documento').focusout(function () {
        completaSecuenciaNumeroDocumentoFisico();
    });

    $('#id_numero_documento_retencion').focusout(function () {
        completaSecuenciaNumeroDocumentoRetencionFisico();
    });
});
