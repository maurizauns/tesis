var detalle_retenciones;
var detalle_retenciones_iva;
var porcent_ret = {};
var porcent_retiva = {};
var cuentafield = null;
var urlcuenta = null;
var impuesto_iva = 12.00;
var primera_carga = true;


function toFixed(number, n) {
    var k = Math.pow(10, n);
    return (Math.round(number * k) / k);
}

function handleSelectTipo() {
    cuentafield.reset();

    var tipo = $('#TipoDocumentosId').val();

    var mask = "999-999-9?99999999";

    if (tipo == 'FAC') {

        $(".campo_facturacomision").show();

        $(".comisiones").hide();

        $(".campo_liqfactura").show();

        $("#NumeroDocumento").mask(mask);

        $("#label_comision").text("Cuenta Comisión:");

        $(".centro_costo").show();

        $('.aplica_iva_12').hide();

    } else if (tipo == 'FCO') {

        $(".comisiones").show();

        $(".campo_liqfactura").show();

        $(".campo_facturacomision").hide();

        $("#NumeroDocumento").mask(mask);

        $("#label_comision").text("Cuenta Comisión:");

        $(".centro_costo").show();

        $('.aplica_iva_12').show();

    } else {

        $(".comisiones").hide();

        $(".campo_facturacomision").show();

        $(".campo_liqfactura").hide();

        $("#NumeroDocumento").unmask(mask);

        $(".val-comisioniva").val(0.00);

        $("#label_comision").text("Comisión por liquidar:");

        $(".centro_costo").show();

        $('.aplica_iva_12').hide();
    }
}

function handleFechaLiquidacion() {
    fecha_cadena = $('#FechaEmision').val().split('/');
    fecha = fecha_cadena[2] + '-' + fecha_cadena[1] + '-' + fecha_cadena[0];

    cargarComboIva();
    set_valor_porcentaje();

    impuesto_iva_obj = ImpuestoIVA.getByFecha(fecha);
    impuesto_iva = parseInt(impuesto_iva_obj.porcentaje);
}

function generarRetencionesIR() {
    var rets = {}, data = {};
    var trs = '', tr, base, porcentaje, valor;
    tipo_doc = 'CLI';
    $('.base-retencion').each(function (key, value) {
        var codigo = $(value).attr('codigoret'), num_recap = $(value).attr('numrecapir'), valor = 0.00;
        var codigo_nuevo = codigo + '-' + num_recap
        if (!rets[codigo_nuevo]) {
            rets[codigo_nuevo] = 0.00;
        }
        valor = parseFloat($(value).val());
        if (valor > 0 && !isNaN(valor)) {
            rets[codigo_nuevo] = rets[codigo_nuevo] + valor;
        }
    });
    $.each(rets, function (key, value) {
        codigo_ret = key.substring(0, key.indexOf("-"));
        num_recap = key.substring(key.indexOf("-") + 1);
        tr_nuevo = false;
        porcentaje = parseFloat(porcent_ret[codigo_ret]);
        if (porcentaje > 0) {
            if (trs == '') {
                trs = 'tr.ret-' + key;
            }
            else {
                trs = trs + ',' + 'tr.ret-' + key;
            }
            tr = $('tr.ret-' + key);
            if (tr.length <= 0) {
                detalle_retenciones.agregarDetalle();
                tr = detalle_retenciones.getLastRow();
                $(tr).addClass('ret-' + key);
                tr_nuevo = true;
            }
            $(tr).find('input[id$="-tipo"]').val('IR');
            $(tr).find('input[id$="-codigo_sri"]').val(codigo_ret);
            $(tr).find('input[id$="-num_recap"]').val(num_recap);
            base = parseFloat(rets[key]);
            $(tr).find('input[id$="-base"]').val(toFixed(base, 2));
            $(tr).find('input[id$="-porcentaje"]').val(toFixed(porcentaje, 2));
            valor = base * (porcentaje / 100.00);
            $(tr).find('input[id$="-valor"]').val(toFixed(valor, 2));
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
    tipo_doc = 'CLI';
    $('.base-retencion-iva').each(function (key, value) {
        var codigo = $(value).attr('codigoretiva'), num_recap = $(value).attr('numrecapiva'), valor = 0.00;
        var codigo_nuevo = codigo + '-' + num_recap
        valor = parseFloat($(value).val());
        if (valor > 0) {
            if (!rets[codigo_nuevo]) {
                rets[codigo_nuevo] = 0.00;
            }
            if (valor > 0 && !isNaN(valor)) {
                rets[codigo_nuevo] = rets[codigo_nuevo] + valor;
            }
        }
    });
    $.each(rets, function (key, value) {
        codigo_ret = key.substring(0, key.indexOf("-"));
        num_recap = key.substring(key.indexOf("-") + 1);
        tr_nuevo = false;
        porcentaje = parseFloat(porcent_retiva[codigo_ret]);
        if (trs == '') {
            trs = 'tr.ret-iva-' + key;
        }
        else {
            trs = trs + ',' + 'tr.ret-iva-' + key;
        }
        tr = $('tr.ret-iva-' + key);
        if (tr.length <= 0) {
            detalle_retenciones_iva.agregarDetalle();
            tr = detalle_retenciones_iva.getLastRow();
            $(tr).addClass('ret-iva-' + key);
            tr_nuevo = true;
        }
        $(tr).find('input[id$="-tipo"]').val('IV');
        $(tr).find('input[id$="-codigo_sri"]').val(codigo_ret);
        $(tr).find('input[id$="-num_recap"]').val(num_recap);
        base = parseFloat(rets[key]);
        $(tr).find('input[id$="-base"]').val(toFixed(base, 2));
        $(tr).find('input[id$="-porcentaje"]').val(toFixed(porcentaje, 2));
        valor = base * (porcentaje / 100.00);
        $(tr).find('input[id$="-valor"]').val(toFixed(valor, 2));
    });
    if (trs) {
        trs = '#dtemplate_retencion_iva, ' + trs;
    }
    else {
        trs = '#dtemplate_retencion_iva';
    }
    $('#tdetalle_retencion_iva>tr').not(trs).remove();
}


function calcularComisionIVA(elem) {
    debugger
    var comision = $(elem).val();
    fecha_cadena = $('#FechaEmision').val().split('/');// al parecer no se usa
    fecha = fecha_cadena[2] + '-' + fecha_cadena[1] + '-' + fecha_cadena[0];//al parecer no se usa
    //var impuesto_iva = ImpuestoIVA.getByFecha(fecha).porcentaje / 100;
    if ($('#id_aplica_iva_12').is(':checked')) {
        impuesto_a_considerar = $('#id_porcentaje_iva').val();
    } else {
        impuesto_a_considerar = impuesto_iva;
    }
    $('#Iva').val(toFixed((comision * (impuesto_a_considerar / 100)), 2));
}


function calcularIVAFila(comision_fija) {
    var comision = comision_fija;
    fecha_cadena = $('#FechaEmision').val().split('/');
    fecha = fecha_cadena[2] + '-' + fecha_cadena[1] + '-' + fecha_cadena[0];
    var impuesto_iva = ImpuestoIVA.getByFecha(fecha).porcentaje;
    valoriva = toFixed((comision * (impuesto_iva / 100)), 2);
    return (valoriva);
}

function calcularValorAPagar(elem, key) {
    var prefix;
    if (key != undefined) {
        prefix = key;
        str = '#id_lote_' + prefix;
    } else {
        prefix = elem.id.substring(0, elem.id.indexOf("-"));
        str = '#' + prefix;
    }
    var deposito = parseFloat($(str + '-deposito').val());
    var comision = parseFloat($(str + '-comision').val());
    var tipo = $('#TipoDocumentosId').val();
    //$(str + '-comision_iva').val(calcularIVAFila(comision));
    var comision_iva = parseFloat($(str + '-comision_iva').val());
    //if(comision != 0 && tipo === "FAC"){
    //	$(str + '-comision_iva').val(calcularIVAFila(comision));
    //}
    var retencionIR = 0.00, retencionIVA = 0.00;

    //Retencion IR
    var element_ir = $(str + '-base_ret_ir');
    var codigo_ir = $(element_ir).attr('codigoret');
    if (codigo_ir != undefined) {
        var base_ir = parseFloat($(str + '-base_ret_ir').val());
        var porcentaje_ir = parseFloat(porcent_ret[codigo_ir]);
        var retencionIR = toFixed((base_ir * (porcentaje_ir / 100.00)), 2);
    }

    //Retencion IVA
    var element_iva = $(str + '-base_ret_iva');
    var codigo_iva = $(element_iva).attr('codigoretiva');
    if (codigo_iva != undefined) {
        var base_iva = parseFloat($(str + '-base_ret_iva').val());
        var porcentaje_iva = parseFloat(porcent_retiva[codigo_iva]);
        var retencionIVA = toFixed((base_iva * (porcentaje_iva / 100.00)), 2);
    }
    if (isNaN(retencionIR)) {
        retencionIR = 0.00
    }
    if (isNaN(retencionIVA)) {
        retencionIVA = 0.00
    }
    if (isNaN(comision_iva)) {
        comision_iva = 0.00
    }
    $(str + '-a_pagar').val(toFixed((deposito - comision - comision_iva - retencionIVA - retencionIR), 2));
    calcularTotalAPagar();
}

function calcularTotalAPagar() {
    var a_pagar = 0, valor;
    var comision_fija = parseFloat($('#ValorNoDeducible').val());

    $.each($('.val-apagar'), function () {
        valor = $(this).val();
        if (isNumber(valor)) {
            valor = parseFloat(valor);
            a_pagar = a_pagar + valor;
        }
    });
    if (isNumber(comision_fija)) {
        a_pagar = a_pagar - comision_fija
    }

    $('#valor-monto').html('$' + toFixed(a_pagar, 2));
}


function mostrarAplicaIva() {
    fecha_emision = $('#FechaEmision').val();
    fecha_cadena = ('' + fecha_emision).split('/');
    data_fecha_emision = new Date(fecha_cadena[2], fecha_cadena[1] - 1, fecha_cadena[0]);
    fecha_tope = new Date(2016, 06 - 1, 01);

    if (data_fecha_emision >= fecha_tope && $('#TipoDocumentosId').val() == 'FCO') {
        $('.aplica_iva_12').show();
    } else {
        $('.aplica_iva_12').hide();
    }
}

function cargarComboIva() {
    fecha_emision = $('#FechaEmision').val();
    fecha_cadena = ('' + fecha_emision).split('/');
    fecha = fecha_cadena[2] + '-' + fecha_cadena[1] + '-' + fecha_cadena[0];

    url = "/Contabilidad/GetPorcentajesIva?Fecha=" + fecha;
    $.ajax({
        url: url,
        type: "GET",
        async: false,
        data: "",
        beforeSend: function () {
        },
        error: function () {

        },
        success: function (data) {
            combo_porcentajes_iva = $('#id_porcentaje_iva');
            porcentajes = '';

            iva_a_la_fecha = data.actual;
            $.each(data.lista, function (index, value) {
                debugger
                porcentaje = "" + value.Porcentaje;
                if (iva_a_la_fecha == value.Porcentaje) {
                    hidden_control = ' hidden ';
                } else {
                    hidden_control = '';
                }
                porcentajes = porcentajes + '<option ' + hidden_control + ' value="' + porcentaje + '">' + porcentaje + '</option>';
            });
            combo_porcentajes_iva.html(porcentajes);

            //$(combo_porcentajes_iva).prop('selectedIndex', 0);
        },
        complete: function () {

        }

    });
}

function AplicaIva12() {

    //id_aplica_iva_12
    if ($('#id_aplica_iva_12').is(':checked')) {
        cargarComboIva();
        set_valor_porcentaje();

        //handleFechaLiquidacion();
        $('.aplica_porcentaje_iva').show();
        $('label[name=label_iva]').text("Comisión " + $('#id_porcentaje_iva').val() + '%' + ":");
    } else {
        //set_valor_porcentaje();
        set_valor_porcentaje();
        $('.aplica_porcentaje_iva').hide();
        handleFechaLiquidacion();
        $('label[name=label_iva]').text("Comisión " + impuesto_iva + '%' + ":");
    }
    calcularComisionIVA($('#Comision12'));
}

function actualizarIVA() {

}

function existe_valor_en_seleccionables(seleccionables, valor) {
    for (i = 0; i < seleccionables.length; i++) {
        if (seleccionables[i].value == valor) {
            return true;
        }
    }
    return false;
}


function setear_primero_en_seleccionables(seleccionables) {
    for (i = 0; i < seleccionables.length; i++) {
        $('#id_porcentaje_iva').val(seleccionables[i].value);
    }
}

function set_valor_porcentaje() {
    seleccionables = $('#id_porcentaje_iva option:not([hidden])');

    if (primera_carga) {

        setear_primero_en_seleccionables(seleccionables);

    } else {
        setear_primero_en_seleccionables(seleccionables);
    }
}

function handleTipoDocumento() {
    var tipo_doc = $("#TipoDocumentosId").val();
    if (tipo_doc == "FAC" || tipo_doc == "FCO")
        $("#xml_proveedor").removeClass('hide');
    else
        $("#xml_proveedor").removeClass('hide').addClass('hide');
}

function cargarXML(documento) {
    type = "text/xml";
    /* documento: 1:factura, 0:retencion*/
    if (documento) { f = $("#file_xml_proveedor")[0].files[0]; }
    else { f = $("#file_xml_retencion")[0].files[0]; }
    if (f.type == type) {
        var reader = new FileReader();
        reader.onload = function (event) {
            data = event.target.result;
            data = data.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
            var datos = { 'xml': data, 'documento': documento };
            $.ajax({
                url: "/sistema/registro/documento/cargar_datos_xml/",
                type: "POST",
                async: true,
                data: datos,
                beforeSend: function () { },
                error: function (data) {
                    showMessage('Error Carga de XML', 'Ha existido un inconveniente al tratar de cargar XML');
                },
                success: function (data) {
                    debugger
                    respuesta = data['respuesta'];
                    if (respuesta == 'ok') {
                        if (documento) {
                            $('#id_autorizacion').val(data['autorizacion']);
                            $('#id_numero_documento').val(data['documento']);
                            $('#FechaEmision').val(data['fecha']);
                            $("input[data_id='PersonasId']").val(data['persona_nombre']);
                            $('#PersonasId').val(data['persona_id']);
                            $('#Comision12').val(data['totalSinImpuesto']);
                            //handleFechaEmision();
                        }

                    } else {
                        showMessage('Error Carga de XML', data['mensaje']);
                    }

                },
                complete: function () { }
            });
        };
        reader.readAsText(f);
    } else {
        showMessage('Error Carga de XML', "Solo se permite carga de archivos con formato XML.");
    }
}

function llenarRegistros(campo) {
    switch (campo) {
        case 'num_retencion':
            $('#detalle_retenciones input.numero-retencion').val('999-999-999999999');
            break;
        case 'autorizacion':
            $('#detalle_retenciones input.autorizacion-retencion').val('9999999999999999999999999999999999999999999999999');
            break;
    }
}

$(function () {

    $('#FechaEmision').datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true });
    $('#FechaEmision').change(AplicaIva12);
    $('#id_fecha_emision_retencion').datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true });
    //$("#id_numero_documento").mask("999-999-9?99999999");
    $("#Autorizacion").mask("999?9999999999999999999999999999999999999999999999");
    $("#id_numero_documento_retencion").mask("999-999-9?99999999");
    $("#id_autorizacion_retencion").mask("999?9999999999999999999999999999999999");
    new ObjectField($('#PersonasId'));
    new ObjectField($('#PlanCuentasBancosId'));
    new ObjectField($('#PlanCuentasComisionLiquidarId'));
    new ObjectField($('#CentroCostosId'));
    cuentafield = new ObjectField($('#PlanCuentasComisionId'));
    urlcuenta = cuentafield['dlgUrl'];


    //SELECCION GRUPAL RETENCIONES

    retIrfield = new ObjectField($('#id_tipo_retencion_ir_id'));
    retIvafield = new ObjectField($('#id_tipo_retencion_iva_id'));
    cuentaField = new ObjectField($('#id_tipo_cuenta_id'));

    $("#detalle_lotes").find('input[class~="object-description"]').hide();
    boton = $("#detalle_lotes").find('span[class~="btn-default"]');
    div_btn = boton.closest("div");
    boton.removeClass('input-group-addon');
    boton.css('padding', '4');

    div_btn.css('position', 'relative');
    div_btn.css('float', 'right');


    cuentaField.onSetObj = function (obj) {
        var retirid = obj['id'];
        var retirnombre = obj['cuenta'];
        div = $("#lotes");
        var rets = $(div).find('input[id$="-cuenta_id"]');
        $(detalle_lotes.detalles).each(function () {
            this.cuentafield.setObj(obj);
        });
    };



    retIrfield.onSetObj = function (obj) {
        var retirid = obj['id'];
        var retirnombre = obj['codigo'];
        div = $("#lotes");
        var rets = $(div).find('input[id$="-tipo_retencion_ir_id"]');
        $(detalle_lotes.detalles).each(function () {
            this.tiporetirfield.setObj(obj);
        });
    };
    retIvafield.onSetObj = function (obj) {
        $(detalle_lotes.detalles).each(function () {
            this.tiporetivafield.setObj(obj);
        });
    };


    $('#id_tipo_retencion').bind('change', function () { handleSelectTipoRetencion(true); });
    //FIN RETENCIONES

    cuentafield.onButtonClick = function () {
        var tipo = $('#TipoDocumentosId').val();
        if (tipo == 'FAC' || tipo == 'FCO')
            tipocuenta = 'COSTOGASTO';
        else
            tipocuenta = 'ACTIVOGASTO';
        cuentafield.dlgUrl = urlcuenta + '?tipo=' + tipocuenta;
        return true;
    };

    $('#tabs a[href="#retenciones"]').click(function (e) {
        e.preventDefault();
        generarRetencionesIVA();
        generarRetencionesIR();
    });

    // Se manejan las retenciones IR
    detalle_lotes = new MasterDetail({
        'templateDetalle': $('#dtemplate_lote'),
        'tableDetalle': $('#tdetalle_lote'),
        'prefixDetalle': 'template',
        'funcCompDetalle': DetalleLiquidacion.sonIguales,
        'klassDetalle': DetalleLiquidacion
    });

    // Se manejan las retenciones IR
    detalle_retenciones = new MasterDetail({
        'templateDetalle': $('#dtemplate_retencion'),
        'tableDetalle': $('#tdetalle_retencion'),
        'prefixDetalle': 'template',
        'funcCompDetalle': DetalleRetencion.sonIguales,
        'klassDetalle': DetalleRetencion
    });
    // Se manejan las retenciones IVA.
    detalle_retenciones_iva = new MasterDetail({
        'templateDetalle': $('#dtemplate_retencion_iva'),
        'tableDetalle': $('#tdetalle_retencion_iva'),
        'prefixDetalle': 'template',
        'funcCompDetalle': DetalleRetencionIVA.sonIguales,
        'klassDetalle': DetalleRetencionIVA
    });
    handleSelectTipo();

    //cargarComboIva();
    mostrarAplicaIva();
    $('#id_aplica_iva_12').bind('click', AplicaIva12);
    //$('#id_porcentaje_iva').bind('change',actualizarIVA);
    AplicaIva12();
    //nucleooooooo

    primera_carga = false;

    $('#btn_guardar_lqt').one('click', guardar);

    handleTipoDocumento();
    $('#TipoDocumentosId').change(handleTipoDocumento);

});

$(document).on("submit", "form.frmDocumentos", function () {
    generarRetencionesIVA();
    generarRetencionesIR();
    var $form = $(this),
        data = getCrudFields($form),
        url = $form.attr('action');

    if (url && url != '') {
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            dataType: 'json',
            beforeSend: function () {
                $('#dlgmsgcuenta').modal();
            },
            success: function (d) {
                if (d.success == true) {
                    success(d.message || "Grabado Correctamente !!");
                    var url = "/TarjetaCreditos"
                    window.location.href = url;
                } else {
                    error(d.message.length == 0 ? "Ocurrió un error. Por favor vuelva a interntarlo" : d.message);
                }
            },
            complete: function () {
                $('#dlgmsgcuenta').modal('hide');
            },
            error: function (e) {
                $('#dlgmsgcuenta').modal('hide');
                error("Ocurrió un error. Por favor vuelva a interntarlo");
            },
        });
    }
    return false;
});
