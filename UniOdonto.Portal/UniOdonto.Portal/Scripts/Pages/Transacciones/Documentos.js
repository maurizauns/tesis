
var porcentaje_iva_actual = 12;
var valor_iva = "12.00";
//var label_iva = "12%";
//var primera_carga = true;
//var exterior = false;
//var bandi = false;
////var es_documento_electronico = false;
//var habilitar_secuencia_dna = false;
//var cotizacion_rel = false;
//var prefactura_rel = false;
//var ordencompraventa_rel = false;
//var cargado = false;
//var artesanal = false;
//var numero_documento = null;
//var producto = null;
//var bool_cambio = 0;
//var porcent_ret = {};
//var porcent_retiva = {};
//var safe_url_personafield = null;
//var documento = null;
//var hay_error = false;
//var numero_documento = null;
//var documentoField = null;



$(document).on("submit", "form.frmDocumentos", function () {
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
                    var url = "/Documentos"
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



function SeleccionarPrecio(precio, id) {
    id_precio = "#id_" + id.substr(8) + "-precio_venta_manual";
    $(id_precio).val(parseFloat(precio));
    calcularSubtotalProducto($(id_precio));
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

function cambiarTamanio(caller) {
    autorizacion = $(caller).val();
    autorizacion = autorizacion.replace(/_/g, '');
    $(caller).attr('padding-lef', '5px');
    $(caller).attr('padding-right', '5px');
    if (autorizacion.length > 10) {
        $(caller).attr('size', 40);
        $(caller).parent().removeClass('col-md-2');
        $(caller).parent().removeClass('col-md-3');
        $(caller).parent().addClass('col-md-5');
    }
    else {
        $(caller).attr('size', 12);
        $(caller).parent().removeClass('col-md-3');
        $(caller).parent().removeClass('col-md-5');
        $(caller).parent().addClass('col-md-2');
    }

}

function redondear(num) {
    var es_subtotal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    a = parseFloat(num);
    a = a.toFixed(6);
    var t = a + "";
    i = t.indexOf("."); //posicion del punto
    numero = parseFloat(t.substring(0, (i + 3)));
    segundo_digito = parseFloat(t.substring((i + 2), (i + 3)));
    tercer_digito = parseFloat(t.substring((i + 3), (i + 4)));
    otros_digitos = parseFloat(t.substring(i + 4));


    if ((tercer_digito > 5) || (tercer_digito == 5 && otros_digitos > 0) || (tercer_digito == 5 && otros_digitos == 0 && (segundo_digito % 2) != 0)) {
        numero = parseFloat(numero + 0.01);
        numero = numero.toFixed(decimales);
    }


    return (numero);
}

function handleSelectVencimiento() {
    var vencimiento = $('#Vencimiento').val();
    if (vencimiento <= 0) {
        $('.lblnotificarvencimiento').css('display', 'none');
        if ($('#Notificar').prop('checked')) {
            $('#Notificar').click()
        }
    } else {
        $('.lblnotificarvencimiento').css('display', 'inline');
    }
}

function calcularTotalIBPNRProductos() {
    var total = 0;

    if (total == 0)
        total = '0.00';
    $('#id_ibpnr').val(total);
}

function generarProductoAdicional() {
    var agregar_detalle_producto = true;
    var prods = $('input[id$="-producto_id"]');
    for (var i = 1; i < prods.length; i++) {
        valor = prods[i].value;
        if (!valor || valor == '') agregar_detalle_producto = false;
    }
    return agregar_detalle_producto;

}

DetalleProductoForm.sonIguales = function (detalle1, detalle2) {
    var input1 = $(detalle1).find('input[type=hidden]').get(0);
    var input2 = $(detalle2).find('input[type=hidden]').get(0);
    return (input1.id == input2.id);
};

DetalleCuenta.sonIguales = function (detalle1, detalle2) {
    var input1 = $(detalle1).find('input[type=hidden]').get(0);
    var input2 = $(detalle2).find('input[type=hidden]').get(0);
    return (input1.id == input2.id);
};

DetalleRetencion.sonIguales = function (detalle1, detalle2) {
    var input1 = $(detalle1).find('input[type=hidden]').get(0);
    var input2 = $(detalle2).find('input[type=hidden]').get(0);
    return (input1.id == input2.id);
};

DetalleRetencionIVA.sonIguales = function (detalle1, detalle2) {
    var input1 = $(detalle1).find('input[type=hidden]').get(0);
    var input2 = $(detalle2).find('input[type=hidden]').get(0);
    return (input1.id == input2.id);
};

function DetalleProductoForm(tr, firstLoad) {
    var primera_carga = false;

    if (firstLoad) { primera_carga = true; }

    var urproducto;

    this.tr = tr;

    this.centro_costo = new ObjectField($(this.tr).find('input.object-hidden[id$="centro_costo_id"]'));

    this.proyecto_id = new ObjectField($(this.tr).find('input.object-hidden[id$="proyecto_id"]'));

    this.tiporetirfield = new ObjectField($(this.tr).find('input.object-hidden[id$="tipo_retencion_ir_id"]'));

    $(this.tr).find('input[id$="-edicion"]').datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true });

    this.centro_costo.onSetObj = function (obj) {

        $(tr).find('input[id$="-hidden_data_centro_costo"]').val(JSON.stringify(obj));

    };

    if (this.centro_costo.obj != null) {

        this.centro_costo.setObj(this.centro_costo.obj);

    }

    this.tiporetirfield.onSetObj = function (obj) {

        var elements = $(tr).find('input[id$="-base_cero"], input[id$="-base_gravable"], input[id$="-base_no_gravable"]');

        if (obj) {

            porcent_ret[obj.codigo] = parseFloat(obj.porcentaje);

            elements.addClass('base-retencion');

            elements.attr('codigoret', obj.codigo);

        }
        else {

            elements.removeClass('base-retencion');

            elements.removeAttr('codigoret');

        }
    };

    this.tiporetivafield = new ObjectField($(this.tr).find('input.object-hidden[id$="tipo_retencion_iva_id"]'));

    this.tiporetivafield.onSetObj = function (obj) {

        var elements = $(tr).find('input[id$="-base_gravable"], input[id$="-ice"]');

        if (obj) {

            porcent_retiva[obj.codigo] = parseFloat(obj.porcentaje);

            elements.addClass('base-retencion-iva');

            elements.attr('codigoretiva', obj.codigo);

        }
        else {

            elements.removeClass('base-retencion-iva');

            elements.removeAttr('codigoretiva');

        }
    };

    //Lote Field
    this.lotefield = new ObjectField($(tr).find('input.object-hidden[id$="lotefield"]'));

    urllote = this.lotefield.dlgUrl;

    this.lotefield.onButtonClick = function () {
        tipo_documento = $('#TipoDocumento').val();
        tipo_registro_documento = $('#TipoRegistro').val();
        fecha = moment($('#FechaEmision').val(), 'DD/MM/YYYY').format();
        idproducto = $(tr).find('input.object-hidden[id$="producto_id"]').val();
        var bodega = null;
        bodega = $('#BodegasId').val();
        if (bodega != null) { this.dlgUrl = urllote + '?producto_id=' + idproducto + '&fecha=' + fecha + '&bodega_id=' + bodega; }
        else { this.dlgUrl = urllote + '?producto_id=' + idproducto + '&fecha=' + st; }
        return true;
    };

    this.lotefield.onSetObj = function (obj) {
        if (obj) {

            $(tr).find('input[id$="-fecha_expiracion"]').val(this.extraSelectParams[0]);

            $(tr).find('input[id$="-lote"]').val(this.extraSelectParams[1]);

        }
    };
    //Fin Lotes

    this.productofield = new ObjectField($(this.tr).find('input.object-hidden[id$="producto_id"]'));
    urlproducto = this.productofield.dlgUrl;
    this.productofield.onButtonClick = function () {
        cargado = true;
        sin_movimiento = $('#id_sin_movimiento').is(':checked');
        // se cambia la url para setear productos para la compra o venta
        if (($('#TipoRegistro').val() == 'CLI' && $('#TipoDocumento').val() != 'NCT')) {
            if (sin_movimiento == true) {
                this.dlgUrl = urlproducto + '?solo_venta=1&solo_activos=1';
            } else {
                this.dlgUrl = urlproducto + '?solo_venta=1&solo_activos=1&mostrar_serie=1&sin_serie=1&novendidos=1';
            }
            if ($('#TipoDocumento').val() == 'COT' || $('#TipoDocumento').val() == 'OCV') { this.dlgUrl = urlproducto + '?solo_venta=1&solo_activos=1'; }
        }
        else if ($('#TipoRegistro').val() == 'PRO' && $('#TipoDocumento').val() == 'NCT') {
            if (sin_movimiento == true) {
                this.dlgUrl = urlproducto + '?solo_compra=1&solo_activos=1';
            } else {
                this.dlgUrl = urlproducto + '?solo_compra=1&solo_activos=1&mostrar_serie=1&novendidos=1';
            }
            if ($('#TipoDocumento').val() == 'COT') { this.dlgUrl = urlproducto + '?solo_compra=1&solo_activos=1'; }
        }
        else if ($('#TipoRegistro').val() == 'PRO' && $('#TipoDocumento').val() != 'NCT') {
            this.dlgUrl = urlproducto + '?solo_compra=1&solo_activos=1';
            if ($('#TipoDocumento').val() == 'COT') { this.dlgUrl = urlproducto + '?solo_compra=1&solo_activos=1'; }
        }
        else {
            this.dlgUrl = urlproducto + '?solo_compra=1&solo_activos=1';
            if (($('#TipoRegistro').val() == 'CLI' && $('#TipoDocumento').val() == 'NCT')) {
                this.dlgUrl = urlproducto + '?solo_venta=1&solo_activos=1';
            }
        }
        return true;
    };
    /*SE SETEA PRODUCTO EN DOCUMENTO*/
    this.productofield.onSetObj = function (obj) {

        if (obj) {
            calcularTotalIBPNRProductos();
            var id_bien = $(tr).find('input[id$="bien_id"]').val();
            if ($('#TipoDocumento').val() == 'OCV' && obj['porcentaje_descuento'] && !$('#Id').val()) {
                $(tr).find('input[id$="-porcentaje_descuento"]').val(obj['porcentaje_descuento']);
            }


            if ($('#TipoRegistro').val() == 'CLI' && (!firstLoad || !$('#Id').val())) {
                if (porcentaje_descuento && !isNaN(porcentaje_descuento) && porcentaje_descuento > 0)
                    $(tr).find('input[id$="-porcentaje_descuento"]').val(porcentaje_descuento);
            }

            if (generarProductoAdicional() && !firstLoad) producto.agregarDetalle();

            /*
			cantidad = $(tr).find('input[id$="-cantidad"]').val();
			body = $('#tdetalle_proyecto');
			body.append("<tr><td>"+cantidad+"</td><td>"+ obj['nombre'] +"</td></tr>");
			*/
            $(tr).find('input[id$="-hidden_data_producto"]').val(JSON.stringify(obj));
            //inicio para porcentaje de servicio

            var el_serv = $(tr).find('input[id$="-hidden_porcentaje_servicio"]');
            if (el_serv.length > 0) {
                if (obj && obj['porcentaje_servicio']) {
                    if (obj['porcentaje_servicio'] && (obj['porcentaje_servicio'] == 'true' || obj['porcentaje_servicio'] == true)) {
                        el_serv[0].value = '1';
                        $(el_serv[0]).next().removeClass('hide');
                    } else {
                        el_serv[0].value = '0';
                    }
                } else {
                    var el_serv = $(tr).find('input[id$="-hidden_porcentaje_servicio"]');
                    if (typeof el_serv[0] != 'undefined') {
                        el_serv[0].value = 0;
                        $(el_serv[0]).next().addClass('hide');
                    }
                }
            }
            //fin para porcentaje de servicio

            var elements = $(tr).find('input[id$="-producto_id"]');
            if (obj) {
                //porcent_retiva[obj.codigo] = parseFloat(obj.porcentaje);
                elements.addClass('item-proyecto');
            }
            else {
                elements.removeClass('item-proyecto');
            }

            var elprecio = $(tr).find('select[id$="-precio_venta"]');
            var launidad = $(tr).find('select[id$="-unidad"]');
            var hiddenPrecioVenta = $(tr).find('input[id$="-hidden_precio_venta"]');
            var hiddenUnidad = $(tr).find('input[id$="-hidden_unidad"]');
            var hiddenPrecioVendido = $(tr).find('input[id$="-hidden_precio_vendido"]');
            var hiddenPorcentajeIVA = $(tr).find('input[id$="-hidden_porcentaje_iva_producto"]');
            var options = '', units = '', valorPrecioVenta = null; valorUnidad = null;

            if (!firstLoad || !$('#Id').val()) {
                if (obj && obj['porcentaje_iva'] && !isNaN(obj['porcentaje_iva']) && obj['porcentaje_iva'] > 0) {
                    $(tr).find('input[id$="-porcentaje_iva"]').val(porcentaje_iva_actual);
                } else {
                    if (obj !== null)
                        $(tr).find('input[id$="-porcentaje_iva"]').val(obj['porcentaje_iva']);
                }


                $(tr).find('input[id$="-porcentaje_ice"]').val(obj['porcentaje_ice']);
                if (obj['valor_ice']) {
                    $(tr).find('input[id$="-valor_ice"]').val(obj['valor_ice']);
                    $(tr).find('input[id$="-ice"]').val(obj['valor_ice']);

                }

                var fecha, persona_id, tipo_doc, data = {};
                persona_id = $('#PersonasId').val();
                tipo_doc = $('#TipoRegistro').val();
                var tipoDocumento = $('#TipoDocumento').val();


                // se setea el tipo de retención
                if (!firstLoad) {
                    $(tr).find('input[id$="-tipo_retencion_ir_id"]').val(obj['tipo_retencion_ir_id']);
                    $($(this.el).parent().next().next().next().find('.object-description')[0]).val(obj['tipo_retencion_ir_desc']);
                }
            }
            // manejo de código de retención
            if ($(tr).find('input[id$="-tipo_retencion_ir_id"]').val() && obj['porcentaje_retencion'] && obj['codigo_retencion']) {
                var elements = $(tr).find('input[id$="-base_cero"], input[id$="-base_gravable"], input[id$="-base_no_gravable"]');
                porcent_ret[obj['codigo_retencion']] = parseFloat(obj['porcentaje_retencion']);
                elements.addClass('base-retencion');
                elements.attr('codigoret', obj['codigo_retencion']);
            }
            $(tr).find('div[id$="-labelunidad"]').html(obj['unidadDescripcion']);
            if (hiddenPrecioVenta.val() && $('#TipoRegistro').val() == 'CLI') {
                valorPrecioVenta = parseFloat(hiddenPrecioVendido.val());
            }

            if (hiddenUnidad.val() && $('#TipoRegistro').val() == 'PRO') {
                valorUnidad = "" + hiddenUnidad.val();

            }
            // se setea la serie de venta seleccionada
            //if (($('#TipoRegistro').val() == 'CLI' && $('#TipoDocumento').val() != 'NCT' && this.extraSelectParams) || ($('#TipoRegistro').val() == 'PRO' && $('#TipoDocumento').val() == 'NCT' && this.extraSelectParams)) {
            sin_movimiento = $('#id_sin_movimiento').is(':checked');
            if (sin_movimiento != true) { sin_movimiento = false; }
            if (!sin_movimiento && (($('#TipoRegistro').val() == 'CLI' && $('#TipoDocumento').val() != 'NCT' && obj['maneja_serie']) || ($('#TipoRegistro').val() == 'PRO' && $('#TipoDocumento').val() == 'NCT' && obj['maneja_serie']))) {

                if (this.extraSelectParams && this.extraSelectParams != '') {
                    $(tr).find('input[id$="-serie_venta"]').val(this.extraSelectParams);
                    $(tr).find('input[id$="-serie_venta"]').attr("readonly", true);
                }
                // else{
                // 	if(!primera_carga){
                // 		$(tr).find('input[id$="-serie_venta"]').val("");
                // 		$(tr).find('input[id$="-serie_venta"]').attr("readonly", false);
                // 	}					
                // }
            } else {
                /*$(tr).find('input[id$="-serie_venta"]').val(null);*/
            }
            // si es seriado se esconde el campo cantidad, por defecto 1
            if (!sin_movimiento && (obj['maneja_serie'] && $('#TipoDocumento').val() != 'COT' && $('#TipoDocumento').val() != 'OCV' && (!$('#id_importacion').val() || $('#id_importacion').val() == ''))) {
                $(tr).find('input[id$="-hidden_maneja_serie"]').val('1');
                $(tr).find('div[id$="-fieldcantidad"]').hide();
                $(tr).find('div[id$="-labelcantidad"]').show();
                $(tr).find('input[id$="-cantidad"]').val(1);
                $(tr).find('.serie-venta, .serie-compra').addClass('seriado');
                $(tr).find('.label-unidad').addClass('seriado');
                if (($('#TipoRegistro').val() == 'CLI' && $('#TipoDocumento').val() != 'NCT') || ($('#TipoRegistro').val() == 'PRO' && $('#TipoDocumento').val() == 'NCT')) {
                    $(tr).find('.serie-venta').show();
                    $(tr).find('.serie-compra').hide();
                    if ($('#TipoDocumento').val() == 'COT') {
                        $(tr).find('div.serie-venta.seriado').addClass('hide');
                    }
                }
                else {
                    $(tr).find('.serie-venta').hide();
                    $(tr).find('.serie-compra').show();
                    if ($("#id_importacion").val() && $("#id_importacion").val() != '') {
                        $(tr).find('.serie-compra').hide();
                    }
                }
                if ($('#TipoDocumento').val() == 'COT') {

                }
            }
            else {
                $(tr).find('div[id$="-fieldcantidad"]').show();
                $(tr).find('div[id$="-labelcantidad"]').hide();
                $(tr).find('input[id$="-hidden_maneja_serie"]').val('0');
                $(tr).find('.serie-compra, .serie-venta').hide();
                $(tr).find('.serie-venta, .serie-compra').removeClass('seriado');
                $(tr).find('.label-unidad').removeClass('seriado');
            }

            var producto_id = obj['id'];
            if (obj['maneja_nombremanual']) {
                $(tr).find('.nombre-manual').show();
                if ($('#TipoDocumento').val() == 'NCT' && !$('#Id').val()) {
                    if ($('#DocumentosRelacionadoId').val()) {
                        var documento = $('#DocumentosRelacionadoId').val();
                        if (id_bien) {
                            res = get_nombremanual(producto_id, documento, id_bien);
                            if (res) {
                                $(tr).find('textarea[id$="-nombre_manual"]').val(res['nombre_manual']);
                            }
                        }
                    }
                }

            }

            if (obj['maneja_edicion']) {
                $(tr).find('input.date').datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true });
                $(tr).find('.edicion').show();
            } else {
                $(tr).find('.edicion').hide();
            }
            if (obj['maneja_partida_lote'] && (($('#TipoRegistro').val() == 'PRO' && $('#TipoDocumento').val() != 'NCT') || ($('#TipoRegistro').val() == 'CLI' && $('#TipoDocumento').val() == 'NCT'))) {
                $(tr).find('.partida_lote').show();
            } else {
                $(tr).find('.partida_lote').hide();
            }
            if (obj['maneja_color']) {
                $(tr).find('.color').show();
            } else {
                $(tr).find('.color').hide();
            }
            //Costo maximo
            if (obj && obj['costo_maximo']) {
                tipo_registro_documento = $('#TipoRegistro').val();
                if (tipo_registro_documento == 'PRO' && !firstLoad) { $(tr).find('input[id$="-precio_compra"]').val(obj['costo_maximo']); }
            }

            //Manejo de lotes
            if (obj && obj['maneja_lote']) {
                tipo_documento = $('#TipoDocumento').val();
                tipo_registro_documento = $('#TipoRegistro').val();
                bodega_id = $('#BodegasId').val();
                //$(tr).find('input.fecha_exp').datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true });
                preparedDate();
                $(tr).find('input[id$="-maneja_lote"]').val(1);
                if (obj['maneja_fechaexp']) {
                    $(tr).find('input[id$="-maneja_fechaexp"]').val(1);
                }

                if ((tipo_registro_documento == 'CLI' && tipo_documento != 'NCT' && tipo_documento != 'NCL')
					|| (tipo_registro_documento == 'PRO' && tipo_documento == 'NCT' && tipo_documento == 'NCL')) {
                    $(tr).find('.lote_ingreso').hide();
                    $(tr).find('.lote_egreso').show();
                    fecha_documento = moment($('#FechaEmision').val(), 'DD/MM/YYYY').format();
                    //fecha_documento = $('#FechaEmision').val();
                    //fecha_documento_cadena = ('' + fecha_documento).split('/');
                    //fdt = fecha_documento_cadena[2] + '-' + fecha_documento_cadena[1] + '-' + fecha_documento_cadena[0];
                    if ($('#TipoDocumento').val() != 'COT' && $('#TipoDocumento').val() != 'OCV' && !tiene_produccion_cofina) {
                        if (bodega_id && bodega_id != '' && fecha_documento && fecha_documento != '') {
                            if (!firstLoad && !obj['es_doc_relacionado']) { SetearUltimoLote(obj['id'], bodega_id, fecha_documento, tr, this); }
                        }
                    }
                } else if (tipo_registro_documento == 'CLI' && tipo_documento == 'NCT') { //permite que en notas de crédito de clientes se agreguen nuevos lotes
                    $(tr).find('.lote_ingreso').show();
                    if ($(tr).find('input[id$="-maneja_fechaexp"]').val() != 1) {
                        $(tr).find('.lote_ingreso .fechaexp').hide();
                    }
                    $(tr).find('.lote_egreso').hide();
                } else if ((tipo_registro_documento == 'PRO' && tipo_documento != 'NCT' && tipo_documento != 'NCL')
						|| (tipo_registro_documento == 'CLI' && tipo_documento == 'NCT' && tipo_documento == 'NCL')) {
                    $(tr).find('.lote_ingreso').show();
                    if (!obj['maneja_fechaexp']) {
                        $(tr).find('.lote_ingreso .fechaexp').hide();
                    }
                    $(tr).find('.lote_egreso').hide();
                }


                if ($('#TipoDocumento').val() == 'COT' || $('#TipoDocumento').val() == 'OCV' || tiene_produccion_cofina) {
                    $(tr).find('.lote_ingreso').hide();
                    $(tr).find('.lote_egreso').hide();
                    $(tr).find('input[id$="-maneja_lote"]').val(0);
                    $(tr).find('input[id$="-maneja_fechaexp"]').val(0);
                }

                if ($("#id_importacion").val() && $("#id_importacion").val() != '') {
                    $(tr).find('.lote_ingreso').hide();
                    $(tr).find('.lote_egreso').hide();
                    $(tr).find('input[id$="-maneja_lote"]').val(0);
                    $(tr).find('input[id$="-maneja_fechaexp"]').val(0);
                }

            } else {
                $(tr).find('.lote_ingreso').hide();
                $(tr).find('.lote_egreso').hide();
                $(tr).find('input[id$="-maneja_lote"]').val(0);
                $(tr).find('input[id$="-maneja_fechaexp"]').val(0);
            }

            var maneja_pvpmanual_per = false;
            if ($('#persona_maneja_pvpmanual').val() == '1')
                maneja_pvpmanual_per = true;

            // pvp_default
            if (obj['PvpManual'] || maneja_pvpmanual_per) {
                $(tr).find('span[id$="precio_venta"]').hide();
                $(tr).find('span[id$="precio_venta_manual"]').show();
                $(tr).find('input[id$="-hidden_maneja_pvpmanual"]').val('1');
            } else {
                $(tr).find('span[id$="precio_venta_manual"]').hide();
                $(tr).find('span[id$="precio_venta"]').show();
                $(tr).find('input[id$="-hidden_maneja_pvpmanual"]').val('0');
            }
            if ($("#Id").val() == '' || !firstLoad) {
                if (obj['porcentaje_iva'] && !isNaN(obj['porcentaje_iva']) && obj['porcentaje_iva'] > 0) {
                    $(tr).find('input[id$="-hidden_porcentaje_iva_producto"]').val(porcentaje_iva_actual);
                } else {
                    $(tr).find('input[id$="-hidden_porcentaje_iva_producto"]').val(obj['porcentaje_iva']);
                }
            }
            //$(tr).find('input[id$="-hidden_porcentaje_iva_producto"]').val('0');
            // se setean los precios de venta
            elprecio.empty();
            launidad.empty();
            precio_cambio = false;

            price_0 = 0;
            price_iva = 0;
            price_no = 0;
            price_ice = 0;

            $.each(['unidadDescripcion'], function (index, value) {
                var unidad;
                if (obj[value]) {
                    unidad = "" + obj[value];
                    units = units + '<option value="' + unidad + '">' + unidad + '</option>';
                }
            });
            launidad.html(units);
            precios = [];

            $.each(['Pvp1', 'Pvp2', 'Pvp3', 'Pvp_distribuidor'], function (index, value) {
                var valPrecio;
                var int_valor_iva = parseInt(valor_iva);
                if (obj[value]) {
                    valPrecio = parseFloat(obj[value]);
                    //options = options + '<option value=\''+ valPrecio + '\' basecero=\''+ obj[value + '_basecero'] + '\' baseiva=\'' + obj[value + '_baseiva'] + '\' basenoiva=\'' + obj[value + '_basenoiva'] + '\' ice=\'' + obj[value + '_ice'] + '\'>'+ valPrecio +'</option>';

                    price_0 = parseFloat(obj[value + '_basecero']);
                    price_iva = parseFloat(obj[value + '_baseiva']);
                    price_no = parseFloat(obj[value + '_basenoiva']);
                    price_ice = parseFloat(obj[value + '_ice']);

                    var precio_establecido = 0;

                    if (price_0 != 0) { precio_establecido = price_0; }
                    else if (price_iva != 0) { precio_establecido = price_iva; }
                    else if (price_no != 0) { precio_establecido = price_no; }

                    if ($("#Id").val() != '' && firstLoad && obj['tipo_producto'] != 'COM') {
                        iva_guardado = $(tr).find('input[id$="-hidden_porcentaje_iva_producto"]').val();
                        if (iva_guardado == '' || !iva_guardado) {
                            price_0 = 0;
                            price_iva = 0;
                            price_no = precio_establecido;
                        }
                        else if (iva_guardado == 0) {
                            price_0 = precio_establecido;
                            price_iva = 0;
                            price_no = 0;
                        }
                        else if (iva_guardado > 0) {
                            price_0 = 0;
                            price_iva = precio_establecido;
                            price_no = 0;
                        }
                    }
                    selected = '';
                    if ($('#PersonasId').val() && $('#id_pvp_default').val() && (!obj['PvpManual'] || !maneja_pvpmanual_per)) {
                        if (value == $('#id_pvp_default').val() || valPrecio == valorPrecioVenta) {
                            selected = 'selected="selected"';
                            options = options + '<option ' + selected + ' value=\'' + valPrecio + '\' basecero=\'' + price_0 + '\' baseiva=\'' + price_iva + '\' basenoiva=\'' + price_no + '\' ice=\'' + obj[value + '_ice'] + '\'>' + valPrecio + '</option>';
                        }
                    } else {
                        options = options + '<option ' + selected + ' value=\'' + valPrecio + '\' basecero=\'' + price_0 + '\' baseiva=\'' + price_iva + '\' basenoiva=\'' + price_no + '\' ice=\'' + obj[value + '_ice'] + '\'>' + valPrecio + '</option>';
                    }
                    if (valPrecio == valorPrecioVenta) {
                        precio_cambio = true;
                    }
                    precios.push(valPrecio);
                }
            });
            if (price_0 != 0) { price_0 = valorPrecioVenta; }
            else {
                if (price_iva != 0) { price_iva = valorPrecioVenta; }
                else {
                    if (price_no != 0) { price_no = valorPrecioVenta; }
                }
            }

            if (!cargado) {
                var es_cotizacion = location.search.split('cotizacion_rel=')[1] != null;
                if (precio_cambio == false && $('#TipoRegistro').val() == 'CLI' && valorPrecioVenta != null /*&& !(isNaN(valorPrecioVenta)) /*&& ($('#Id').val() || es_cotizacion)*/) {
                    options = options + '<option value=\'' + valorPrecioVenta + '\' basecero=\'' + price_0 + '\' baseiva=\'' + price_iva + '\' basenoiva=\'' + price_no + '\' ice=\'' + price_ice + '\'>' + valorPrecioVenta + '</option>';
                }

            }

            group = $(tr).find('div[id*="precios-producto"]');
            group_id = "'" + $(group).attr('id') + "'";
            list = $(group).find('ul');
            list.empty();
            $(precios).each(function () {
                precio = "'" + this + "'";
                li = '<li><a style="text-align: right;" href="javascript:SeleccionarPrecio(' + precio + ',' + group_id + ')">' + this + '</a></li>';
                list.append(li);
            });

            elprecio.html(options);
            if (valorPrecioVenta) {
                opciones_item = [];
                valores = $(elprecio).find('option');
                for (i = 0; i < valores.length; i++) {
                    opciones_item.push($(valores[i]).val());
                }

                if (opciones_item.indexOf(valorPrecioVenta) === -1) {
                    elprecio.val(valorPrecioVenta);
                }
            }

            if (valorUnidad) {
                launidad.val(valorUnidad);
            }

            calcularSubtotalProducto(elprecio);
            if (!firstLoad) {
                setearIVA_no_autorizados();
            }
            //calcularTotal();
            productos_cargando -= 1;
            if (primera_carga) { primera_carga = false; }

        }
    };
    if (this.productofield.obj != null) {
        this.productofield.setObj(this.productofield.obj);
    }

    //Color Field
    this.colorfield = new ObjectField($(this.tr).find('input.object-hidden[id$="color_id"]'));
    urlcolor = this.colorfield.dlgUrl;
    this.colorfield.onButtonClick = function () {
        tipo_doc = $('#TipoRegistro').val();
        fecha = $('#FechaEmision').val();
        bodega = $('#BodegasId').val();
        idproducto = $(tr).find('input.object-hidden[id$="producto_id"]').val();
        //Fecha
        var fec = new Date(fecha);
        var yyyy = fec.getFullYear().toString();
        var mm = (fec.getMonth() + 1).toString();
        var dd = fec.getDate().toString();
        st = yyyy + '-' + (dd[1] ? dd : "0" + dd[0]) + '-' + (mm[1] ? mm : "0" + mm[0]);

        fecha_cadena = ('' + fecha).split('/');
        st = fecha_cadena[2] + '-' + fecha_cadena[1] + '-' + fecha_cadena[0];
        //Fin Fecha
        if (tipo_doc == 'CLI') {
            this.dlgUrl = urlcolor + '?producto_id=' + idproducto + '&fecha=' + st + '&bodega_id=' + bodega;
        } else {
            this.dlgUrl = urlcolor + '?producto_id=' + idproducto + '&fecha=' + st + '&bodega_id=' + bodega + '&mostrar_cero=' + 1;
        }
        return true;
    };
}



function calcularSubtotalProducto(caller) {
    var tr = $(caller).closest('tr');
    var cantidad = parseFloat($(tr).find('input[id$="-cantidad"]').val());
    var porcentajeIVA = parseInt($(tr).find('input[id$="-porcentaje_iva"]').val());

    var tipoDocumento = $('#TipoDocumento').val();
    if ((tipoDocumento == 'DNA' || tipoDocumento == 'NAI' || tipoDocumento == 'NCL')) {
        porcentajeIVA = null;
        $(tr).find('input[id$="-porcentaje_iva"]').val("");
    }
    else {
        if ((exterior && $('#TipoRegistro').val() == 'CLI') || (tipoDocumento == '02') || (artesanal && $('#TipoRegistro').val() == 'PRO')) {
            porcentajeIVA = 0;
            $(tr).find('input[id$="-porcentaje_iva"]').val(0);
        } else {

            var porcentajeIVAproducto = parseInt($(tr).find('input[id$="-hidden_porcentaje_iva_producto"]').val());
            porcentajeIVA = porcentajeIVAproducto;
            if (!isNaN(porcentajeIVA)) {
                $(tr).find('input[id$="-porcentaje_iva"]').val(porcentajeIVAproducto);
            } else {
                $(tr).find('input[id$="-porcentaje_iva"]').val("");
            }

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

    if ($('#persona_maneja_pvpmanual').val() == '1')
        maneja_pvpmanual_per = true;
    if ($('#TipoRegistro').val() == 'CLI') {

        if (hidden_maneja_pvpmanual == "1" || maneja_pvpmanual_per)
            precio = parseFloat($(tr).find('input[id$="-precio_venta_manual"]').val());
        else
            precio = parseFloat($(tr).find('select[id$="-precio_venta"]').val());

        if (tipoDocumento == 'NCL') {
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
            descuento = parseFloat(redondear(descuento, es_subtotal = true));
            subtotal = subtotal - descuento;
            subtotal = parseFloat(redondear(subtotal, es_subtotal = true));
        }
    }
    if (descuento && descuento > 0) {
        $(tr).find('input[id$="-descuento"]').val(redondear(descuento, es_subtotal = true));
    } else {
        $(tr).find('input[id$="-descuento"]').val("0.00");
    }
    $(tr).find('input[id$="-ice"]').val(0);
    $(tr).find('input[id$="-base_cero"]').val(0);
    $(tr).find('input[id$="-base_gravable"]').val(0);
    $(tr).find('input[id$="-base_no_gravable"]').val(0);
    if (subtotal && subtotal > 0) {
        $(tr).find('input[id$="-subtotal"]').val(redondear(subtotal, es_subtotal = true));
        if ($('#TipoRegistro').val() == 'CLI') {

            if (hidden_maneja_pvpmanual == "1" || maneja_pvpmanual_per) {
                if (tipoDocumento == 'DNA' || tipoDocumento == 'NAI' || tipoDocumento == 'NCL') {
                    $(tr).find('input[id$="-base_cero"]').val(0.00);
                    $(tr).find('input[id$="-base_gravable"]').val(0.00);
                    $(tr).find('input[id$="-base_no_gravable"]').val(redondear(subtotal, es_subtotal = true));
                } else {
                    if (exterior || (tipoDocumento == '02')) {
                        $(tr).find('input[id$="-base_cero"]').val(redondear(subtotal, es_subtotal = true));
                        $(tr).find('input[id$="-base_gravable"]').val(0.00);
                        $(tr).find('input[id$="-base_no_gravable"]').val(0.00);
                    } else {
                        var porcentajeIVA = parseInt($(tr).find('input[id$="-hidden_porcentaje_iva_producto"]').val());
                        if (porcentajeIVA == 0) {
                            $(tr).find('input[id$="-base_cero"]').val(redondear(subtotal, es_subtotal = true));
                            $(tr).find('input[id$="-base_gravable"]').val(0.00);
                            $(tr).find('input[id$="-base_no_gravable"]').val(0.00);
                        }
                        else if (porcentajeIVA > 0) {
                            $(tr).find('input[id$="-base_cero"]').val(0.00);
                            $(tr).find('input[id$="-base_gravable"]').val(redondear(subtotal, es_subtotal = true));
                            $(tr).find('input[id$="-base_no_gravable"]').val(0.00);
                        }
                        else {
                            $(tr).find('input[id$="-base_cero"]').val(0.00);
                            $(tr).find('input[id$="-base_gravable"]').val(0.00);
                            $(tr).find('input[id$="-base_no_gravable"]').val(redondear(subtotal, es_subtotal = true));
                        }

                    }

                    if (porcentajeICE) {
                        $(tr).find('input[id$="-ice"]').val(redondear((subtotal_ice * (porcentajeICE / 100.00))));
                    } else {
                        if (valorICE) {
                            $(tr).find('input[id$="-ice"]').val(redondear((cantidad * valorICE)));
                        }
                        else {
                            $(tr).find('input[id$="-ice"]').val(0.00);
                        }
                    }
                }
            } else {
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
                if (tipoDocumento == 'DNA' || tipoDocumento == 'NAI' || tipoDocumento == 'NCL') {
                    if (tipoDocumento == 'NCL') {
                        $(tr).find('input[id$="-base_cero"]').val(0.00);
                    } else {
                        if (porcentajeIVA == null && parseFloat($(optprecio).attr('base0')) != 0) {
                            $(tr).find('input[id$="-base_cero"]').val(0.00);
                        } else {
                            $(tr).find('input[id$="-base_cero"]').val(redondear(baseprecio, es_subtotal = true));
                        }
                    }
                } else {
                    //$(tr).find('input[id$="-base_cero"]').val(redondear(baseprecio));

                    if (exterior || (tipoDocumento == '02')) {
                        if (porcentajeIVA == 0 && parseFloat($(optprecio).attr('basecero')) == 0 && parseFloat($(optprecio).attr('baseiva')) != 0) {
                            baseprecio = parseFloat($(optprecio).attr('baseiva')) * cantidad;
                            if (porcentajeDesc && porcentajeDesc > 0 && porcentajeDesc <= 100) {
                                dcto = baseprecio * (porcentajeDesc / 100);
                                dcto = parseFloat(redondear(dcto));
                                baseprecio = baseprecio - dcto;
                            }
                            $(tr).find('input[id$="-base_cero"]').val(redondear(baseprecio, es_subtotal = true));
                        } else if (porcentajeIVA == 0 && parseFloat($(optprecio).attr('basecero')) == 0 && parseFloat($(optprecio).attr('basenoiva')) != 0) {
                            baseprecio = parseFloat($(optprecio).attr('basenoiva')) * cantidad;
                            if (porcentajeDesc && porcentajeDesc > 0 && porcentajeDesc <= 100) {
                                dcto = baseprecio * (porcentajeDesc / 100);
                                dcto = parseFloat(redondear(dcto));
                                baseprecio = baseprecio - dcto;
                            }
                            $(tr).find('input[id$="-base_cero"]').val(redondear(baseprecio, es_subtotal = true));
                        } else {
                            baseprecio = parseFloat($(optprecio).attr('basecero')) * cantidad;
                            if (porcentajeDesc && porcentajeDesc > 0 && porcentajeDesc <= 100) {
                                dcto = baseprecio * (porcentajeDesc / 100);
                                dcto = parseFloat(redondear(dcto));
                                baseprecio = baseprecio - dcto;
                            }
                            $(tr).find('input[id$="-base_cero"]').val(redondear(baseprecio, es_subtotal = true));

                        }
                    } else {
                        $(tr).find('input[id$="-base_cero"]').val(redondear(baseprecio, es_subtotal = true));
                    }
                }
                //$(tr).find('input[id$="-base_cero"]').val(redondear(baseprecio));

                // base gravable
                baseprecio = parseFloat($(optprecio).attr('baseiva')) * cantidad;
                if (porcentajeDesc && porcentajeDesc > 0 && porcentajeDesc <= 100) {
                    dcto = baseprecio * (porcentajeDesc / 100);
                    dcto = parseFloat(redondear(dcto));
                    baseprecio = baseprecio - dcto;
                }
                f = $('#tipo_persona').val();
                if (tipoDocumento == '02' || tipoDocumento == 'DNA' || tipoDocumento == 'NCL' || tipoDocumento == 'NAI' || exterior) {
                    if (tipoDocumento == 'NCL') {
                        porcentajeIVA = null;
                    }
                    if ((porcentajeIVA == null || porcentajeIVA == 0) && parseFloat($(optprecio).attr('baseiva')) != 0) {
                        $(tr).find('input[id$="-base_gravable"]').val(0.00);
                    } else {
                        $(tr).find('input[id$="-base_gravable"]').val(redondear(baseprecio, es_subtotal = true));
                    }
                } else {
                    $(tr).find('input[id$="-base_gravable"]').val(redondear(baseprecio, es_subtotal = true));
                }


                // base no gravable
                if (tipoDocumento == 'DNA' || tipoDocumento == 'NCL' || tipoDocumento == 'NAI') {
                    if (porcentajeIVA == null && parseFloat($(optprecio).attr('basenoiva')) == 0 && parseFloat($(optprecio).attr('baseiva')) != 0) {
                        baseprecio = parseFloat($(optprecio).attr('baseiva')) * cantidad;
                        if (porcentajeDesc && porcentajeDesc > 0 && porcentajeDesc <= 100) {
                            dcto = baseprecio * (porcentajeDesc / 100);
                            dcto = parseFloat(redondear(dcto));
                            baseprecio = baseprecio - dcto;
                        }
                        $(tr).find('input[id$="-base_no_gravable"]').val(redondear(baseprecio, es_subtotal = true));
                    } else if (porcentajeIVA == null && parseFloat($(optprecio).attr('basenoiva')) == 0 && parseFloat($(optprecio).attr('basecero')) != 0) {
                        baseprecio = parseFloat($(optprecio).attr('basecero')) * cantidad;
                        if (porcentajeDesc && porcentajeDesc > 0 && porcentajeDesc <= 100) {
                            dcto = baseprecio * (porcentajeDesc / 100);
                            dcto = parseFloat(redondear(dcto));
                            baseprecio = baseprecio - dcto;
                        }
                        $(tr).find('input[id$="-base_no_gravable"]').val(redondear(baseprecio, es_subtotal = true));
                    } else {
                        baseprecio = parseFloat($(optprecio).attr('basenoiva')) * cantidad;
                        if (porcentajeDesc && porcentajeDesc > 0 && porcentajeDesc <= 100) {
                            dcto = baseprecio * (porcentajeDesc / 100);
                            dcto = parseFloat(redondear(dcto));
                            baseprecio = baseprecio - dcto;
                        }
                        $(tr).find('input[id$="-base_no_gravable"]').val(redondear(baseprecio, es_subtotal = true));

                    }
                } else {

                    //Si es exterior se va a porcentaje 0
                    if (exterior || (tipoDocumento == '02')) {
                        $(tr).find('input[id$="-base_no_gravable"]').val(0.00);
                    } else {
                        baseprecio = parseFloat($(optprecio).attr('basenoiva')) * cantidad;
                        if (porcentajeDesc && porcentajeDesc > 0 && porcentajeDesc <= 100) {
                            dcto = baseprecio * (porcentajeDesc / 100);
                            dcto = parseFloat(redondear(dcto));
                            baseprecio = baseprecio - dcto;
                        }
                        $(tr).find('input[id$="-base_no_gravable"]').val(redondear(baseprecio, es_subtotal = true));
                    }
                }
                // ice
                baseice = parseFloat($(optprecio).attr('ice')) * cantidad;
                //if (porcentajeDesc && porcentajeDesc > 0 && porcentajeDesc <= 100) {
                //	baseice = baseice - (baseice * (porcentajeDesc / 100));
                //}
                $(tr).find('input[id$="-ice"]').val(redondear(baseice));
            }

        }
        else {
            if (porcentajeIVA == 0) {
                $(tr).find('input[id$="-base_cero"]').val(redondear(subtotal, es_subtotal = true));
            }
            else if (porcentajeIVA > 0) {
                $(tr).find('input[id$="-base_gravable"]').val(redondear(subtotal, es_subtotal = true));
            }
            else {
                $(tr).find('input[id$="-base_no_gravable"]').val(redondear(subtotal, es_subtotal = true));
            }

            if (porcentajeICE) {
                $(tr).find('input[id$="-ice"]').val(redondear((subtotal_ice * (porcentajeICE / 100.00))));
            } else {
                if (valorICE) {
                    $(tr).find('input[id$="-ice"]').val(redondear((cantidad * valorICE)));
                }
                else {
                    $(tr).find('input[id$="-ice"]').val(0.00);
                }
            }
            if (exterior) { }
        }

    }
    else {
        $(tr).find('input[id$="-subtotal"]').val("0.00");
        if (porcentajeICE) {
            $(tr).find('input[id$="-ice"]').val(redondear((subtotal_ice * (porcentajeICE / 100.00))));
        } else {
            if (valorICE) {
                $(tr).find('input[id$="-ice"]').val(redondear((cantidad * valorICE)));
            }
            else {
                $(tr).find('input[id$="-ice"]').val(0.00);
            }
        }
    }

    if (hidden_maneja_pvpmanual == "1" || maneja_pvpmanual_per) {
        if ($(tr).find('input[id$="-precio_venta_manual"]').val()) {
            $(tr).find('input[id$="-hidden_precio_venta"]').val($(tr).find('input[id$="-precio_venta_manual"]').val());
        }
    } else {
        if ($(tr).find('select[id$="-precio_venta"]').val()) {
            $(tr).find('input[id$="-hidden_precio_venta"]').val($(tr).find('select[id$="-precio_venta"]').val());
        }
    }
    calcularTotal();

    if ($(tr).find('select[id$="-unidad"]').val()) {
        $(tr).find('input[id$="-hidden_unidad"]').val($(tr).find('select[id$="-unidad"]').val());
    }
    if ((artesanal && $('#TipoRegistro').val() == 'PRO')) {
        var por_iva = $(tr).find('input[id$="-porcentaje_iva"]');
        por_iva.val(0);
    }
    if ((exterior && $('#TipoRegistro').val() == 'CLI')) {
        var por_iva = $(tr).find('input[id$="-porcentaje_iva"]');
        por_iva.val(0);
    }




}

function actualizarDetallesProductosPVPXPersona(es_pvp_default_manual) {
    $('#persona_maneja_pvpmanual').val('0');
    if (es_pvp_default_manual)
        $('#persona_maneja_pvpmanual').val('1');

    var detalles_productos = $('#tdetalle_producto').find('input[id$="-producto_id"]');
    $.each(detalles_productos, function (k, v) {
        if (k != 0) {
            var tr = $(v).closest("tr");
            if (producto) {
                dt = producto.getDetalle(tr);
                var producto_id = $(v).closest("tr").find("input[id$=-producto_id]").val();
                if (producto_id > 0) {
                    var productoObj = Producto.getByIdSy('' + producto_id, false);
                    dt.productofield.setObj(productoObj);
                }
            }
        }
    });
}


function getNumeroAutorizacion() {

    var fecha, persona_id, tipo_doc, data = {};
    fecha = moment($('#FechaEmision').val(), 'DD/MM/YYYY').format();
    persona_id = $('#PersonasId').val();
    tipo_doc = $('#TipoRegistro').val();
    if (fecha && tipo_doc) {
        data['fecha'] = fecha;
        if (persona_id) {
            data['PersonasId'] = persona_id;
        }
        $.ajax({
            type: "GET",
            url: urlprefix + "/Personas/GetAutorizacion/",
            data: data,
            dataType: "json",
            async: true,
            success: function (data, textStatus) {
                var arr_aut_empresa = data['empresaAutorizacionesFacDTO'];
                var arr_autret_empresa = data['empresaAutorizacionesRetDTO'];
                var arr_aut_persona = data['personasAutorizacionesFacDTO'];
                var arr_autret_persona = data['personasAutorizacionesRetDTO'];
                var html_combo_aut_empresa = '';
                var html_combo_autret_empresa = '';
                var html_combo_aut_persona = '';
                var html_combo_autret_persona = '';
                if (arr_aut_empresa.length >= 1) {
                    for (i = 0; i < arr_aut_empresa.length; i++) {
                        html_combo_aut_empresa += "<option value = " + arr_aut_empresa[i].Autorizacion + " selected='' >" + arr_aut_empresa[i].Autorizacion + "</option>";
                    }
                }
                if (arr_autret_empresa.length >= 1) {
                    for (i = 0; i < arr_autret_empresa.length; i++) {
                        html_combo_autret_empresa += "<option value = " + arr_autret_empresa[i].Autorizacion + " selected='' >" + arr_autret_empresa[i].Autorizacion + "</option>";
                    }
                }
                if (arr_aut_persona.length >= 1) {
                    for (i = 0; i < arr_aut_persona.length; i++) {
                        html_combo_aut_persona += "<option value = " + arr_aut_persona[i].Autorizacion + " selected='' >" + arr_aut_persona[i].Autorizacion + "</option>";
                    }
                }
                if (arr_autret_persona.length >= 1) {
                    for (i = 0; i < arr_autret_persona.length; i++) {
                        html_combo_autret_persona += "<option value = " + arr_autret_persona[i].Autorizacion + " selected='' >" + arr_autret_persona[i].Autorizacion + "</option>";
                    }
                }
                var autDoc = '', autRet = '', combo_autDoc = '', combo_autRet = '';
                if (tipo_doc == 'CLI') {
                    if (!es_documento_electronico) {
                        autDoc = arr_aut_empresa.length >= 1 ? arr_aut_empresa[0].Autorizacion : '';
                    }
                    combo_autDoc = html_combo_aut_empresa;
                    autDocAnt = arr_aut_persona.length >= 1 ? arr_aut_persona[0].Autorizacion : '';
                    autRet = arr_autret_persona.length >= 1 ? arr_autret_persona[0].Autorizacion : '';
                    combo_autRet = html_combo_autret_persona;
                    autRetAnt = arr_autret_empresa.length >= 1 ? arr_autret_empresa[0].Autorizacion : '';
                } else if (tipo_doc == 'PRO') {
                    autDoc = arr_aut_persona.length >= 1 ? arr_aut_persona[0].Autorizacion : '';
                    combo_autDoc = html_combo_aut_persona;
                    autRet = arr_autret_empresa.length >= 1 ? arr_autret_empresa[0].Autorizacion : '';
                    combo_autRet = html_combo_autret_empresa;
                    autDocAnt = arr_aut_empresa.length >= 1 ? arr_aut_empresa[0].Autorizacion : '';
                    autRetAnt = arr_autret_persona.length >= 1 ? arr_autret_persona[0].Autorizacion : '';
                }

                if ($('#Autorizacion').val() == autDocAnt)
                    $('#Autorizacion').val('');
                if ($('#AutorizacionRetencion').val() == autRetAnt)
                    $('#AutorizacionRetencion').val('');

                //AUTORIZACIÓN DEL DOCUMENTO
                $('#autorizacion_combo').html(combo_autDoc);
                if (!$('#Autorizacion').val()) {
                    if (combo_autDoc) {
                        $('#hay_combo_autorizacion').val("1");
                        $('#Autorizacion').css("display", "none");
                        $('#mostrar_autorizacion_combo').css("display", "none");
                        $('#autorizacion_combo').css("display", "");
                        $('#mostrar_autorizacion').css("display", "");
                    }
                    else {
                        $('#Autorizacion').val(autDoc);
                        $('#hay_combo_autorizacion').val("0");
                        $('#Autorizacion').css("display", "");
                        $('#mostrar_autorizacion_combo').css("display", "none");
                        $('#autorizacion_combo').css("display", "none");
                        $('#mostrar_autorizacion').css("display", "none");
                    }
                } else { //EDICION DE LA AUTORIZACION
                    $('#Autorizacion').css("display", "");
                    $('#autorizacion_combo').css("display", "none");
                    $('#mostrar_autorizacion').css("display", "none");
                    if (combo_autDoc) {
                        $('#hay_combo_autorizacion').val("1");
                        $('#mostrar_autorizacion_combo').css("display", "");
                    } else {
                        $('#hay_combo_autorizacion').val("0");
                        $('#mostrar_autorizacion_combo').css("display", "none");
                    }
                }

                cambiarTamanio($('#Autorizacion'));


                //Para Retencion MAURICIO
                //cambiarTamanio($('#id_autorizacion_retencion'));


            }
        });
    }
}


function setearIVA() {
    var fecha, persona_id, tipo_doc, data = {};
    fecha = $('#FechaEmision').val();
    persona_id = $('#PersonasId').val();
    tipo_doc = $('#TipoRegistro').val();
    var tipoDocumento = $('#TipoDocumento').val();

    if (persona_id) {
        var tipo = artesanal;
        var tipo2 = exterior;
        if (tipo || tipo2) {
            var f;
            if (tipo && tipo_doc == 'PRO') {
                $('#tipo_persona').val("ARTESANAL");
                f = $('#tipo_persona').val();
                var valores = $('.val-iva');
                if (tipo_doc == 'PRO') {
                    for (var i = 0; i < valores.length; i++) {
                        valores[i].value = 0;
                        //calcularSubtotalProducto(valores[i]);
                    }
                }
            }
            if (tipo2 && tipo_doc == 'CLI') {
                $('#tipo_persona').val("EXTERIOR");
                f = $('#tipo_persona').val();
                var valores = $('.val-iva');
                if (tipo_doc == 'CLI') {
                    for (var i = 0; i < valores.length; i++) {
                        valores[i].value = 0;
                        //calcularSubtotalProducto(valores[i]);
                    }
                }
            }

            var valores = $('.val-iva');
            for (var i = 0; i < valores.length; i++) {
                calcularSubtotalProducto(valores[i]);
            }

        } else {

            var valores = $('.label-unidad');
            for (var i = 1; i < valores.length; i++) {
                celda = valores[i];
                f = $('#tipo_persona').val();
                if (f != "NONE") {
                    producto.eliminarDetalles(celda);
                }
            }
            calcularTotal();
            if (f == "ARTESANAL") { $('#tipo_persona').val("NO ARTESANAL"); }
            if (f == "EXTERIOR") { $('#tipo_persona').val("NO EXTERIOR"); }
        }
    }
}

function setearIVA_no_autorizados() {
    var fecha, persona_id, tipo_doc, data = {};
    fecha = $('#FechaEmision').val();
    persona_id = $('#PersonasId').val();
    tipo_doc = $('#TipoRegistro').val();
    var tipoDocumento = $('#TipoDocumento').val();

    //NUEVO
    if (tipoDocumento == '02' || tipoDocumento == 'DNA' || tipoDocumento == 'NAI' || tipoDocumento == 'NCL') {
        var valores = $('.val-iva');
        for (var i = 0; i < valores.length; i++) {
            valores[i].value = "";
            calcularSubtotalProducto(valores[i]);
        }
    } else {
        var valores = $('.val-iva');
        for (var i = 0; i < valores.length; i++) {

            tr = $(valores[i]).closest('tr');
            iva_prod = $(tr).find('input[id$="-hidden_porcentaje_iva_producto"]').val();
            valores[i].value = iva_prod;

            calcularSubtotalProducto(valores[i]);
        }

        calcularTotal();
    }

}

function calcularTotal() {

    var subtotal = 0.00, subtotal_iva = 0.00, subtotal_0 = 0.00, baseIVA = 0.00, descuento = 0.00, ice_0 = 0.00, ice_iva = 0.00;
    var comision_iva = 0.00;
    var ice_gravabe = 0;
    var valores = $('.val-subtotal'), valor;
    for (var i = 0; i < valores.length; i++) {
        valor = parseFloat(valores[i].value);
        if (valor > 0 && !isNaN(valor)) {
            subtotal = subtotal + valor;
        }
    }
    //if ($('#TipoRegistro').val() == 'CLI') {
    valores = $("#cuentas").find('.val-ice');
    for (var i = 0; i < valores.length; i++) {
        tr = $(valores[i]).closest('tr');
        var porcentajeIVA = parseInt($(tr).find('select[id$="-porcentaje_iva"]').val());
        valor = parseFloat(valores[i].value);
        if (valor > 0 && !isNaN(valor)) {
            if (porcentajeIVA > 0) {
                ice_iva = ice_iva + valor;
            }
            else {
                ice_0 = ice_0 + valor;
            }
        }
    }

    valores = $("#productos").find('.val-ice');
    for (var i = 0; i < valores.length; i++) {
        tr = $(valores[i]).closest('tr');
        var porcentajeIVA = parseInt($(tr).find('input[id$="-porcentaje_iva"]').val());
        valor = parseFloat(valores[i].value);
        if (valor > 0 && !isNaN(valor)) {
            if (porcentajeIVA > 0) {
                ice_iva = ice_iva + valor;
            }
            else {
                ice_0 = ice_0 + valor;
            }
        }
    }
    //}


    valores = $('.val-gravable');
    for (var i = 0; i < valores.length; i++) {
        valor = parseFloat(valores[i].value);
        if (valor > 0 && !isNaN(valor)) {
            baseIVA = baseIVA + valor;
            subtotal_iva = subtotal_iva + valor;
        }
    }
    subtotal_0 = subtotal - subtotal_iva;
    valores = $('.val-descuento');
    for (var i = 0; i < valores.length; i++) {
        valor = parseFloat(valores[i].value);
        if (valor > 0 && !isNaN(valor)) {
            descuento = descuento + valor;
        }
    }



    $('#SubtotalIva').val(subtotal_iva.toFixed(decimales));
    $('#Subtotal0').val(subtotal_0.toFixed(decimales));
    $('#id_descuento').val(descuento.toFixed(decimales));

    //$('#Iva').val(redondear((baseIVA + ice) * porcentaje_iva_actual/100));
    $('#Iva').val(roundToTwo(redondear((baseIVA + ice_iva) * porcentaje_iva_actual / 100)));

    $('#id_iva_gasto').val(redondear((baseIVA + ice_iva) * porcentaje_iva_actual / 100));
    handleSelectEnviarIVAGasto();
    $('#id_ice').val(redondear(ice_iva + ice_0));

    ivard = roundToTwo(redondear((baseIVA + ice_iva) * porcentaje_iva_actual / 100));
    ivard = parseFloat(ivard);
    ibpnr = 0;

    // $('#Total').val(redondear(subtotal + redondear((baseIVA * porcentaje_iva_actual/100) + ice)));
    $('#Total').val((subtotal + ivard + ice_0 + ice_iva + ibpnr).toFixed(decimales));
    // Para total de la deuda - Configuración Pagos Cuotas

    $('#id_total_deuda').val((subtotal + ivard + ice_0 + ice_iva).toFixed(decimales));

    // Campos de gasolinera




    /*Forma de pago con total de factura*/
    n_tr = $('#tdetalle_pago tr').length;
    if (n_tr == 2) {
        tr = $('#tdetalle_pago tr')[1];
        $(tr).find("input[id*='-valor']").val($('#Total').val());
    }


    calcularTotalIBPNRProductos();
    calcularCantidadItemsDocumento();

}

function handleSelectEnviarIVAGasto() {
    var iva_gasto = $('#id_iva_gasto').val();
    var tipoRegistro = $('#TipoRegistro').val();
    var tipoDocumento = $('#TipoDocumento').val();
    if ((tipoRegistro == 'PRO' && tipoDocumento == '02') || (tipoRegistro == 'PRO' && tipoDocumento == 'CVE')) { //Condicion para enviar IVA al gasto de Notas de Venta
        $('#lblenviarivagasto').css('display', 'inline');
        $('#lblenviarivactabs').css('display', 'inline');
    } else {
        if ((isNaN(iva_gasto) || iva_gasto <= 0)) {
            $('#lblenviarivagasto').css('display', 'none');
            $('#lblenviarivactabs').css('display', 'none');
        } else {
            $('#lblenviarivagasto').css('display', 'inline');
            $('#lblenviarivactabs').css('display', 'inline');
        }
    }
}

function calcularCantidadItemsDocumento() {

    var cantidad = 0;



}

function setearVendedor(obj) {
    var vendedorid = obj['vendedor_id'];
    $('#id_vendedor_id').val(vendedorid);
}

function cargarDetalleRetencionProveedor() {
    var tipo_doc = $("#TipoRegistro").val();
    var persona_id = $("#PersonasId").val();

    try {
        var num_detalles_ctas_doc = $("#tdetalle_cuenta > tr").length - 1;
        tr = documento.detalles_cuentas.getLastRow();
        dt = documento.detalles_cuentas.getDetalle(tr);
        if (num_detalles_ctas_doc == 1 && tipo_doc == 'PRO' && persona_id != '') {

            var parametros = { 'Id': persona_id };
            var url_view = urlprefix + "/Personas/GetCuentasProveedor/";
            $.ajax({
                url: url_view,
                type: "GET",
                async: true,
                data: parametros,
                success: function (data) {
                    var respuesta = parseInt(data.respuesta);
                    if (respuesta == 1) {
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

        } else {


            if ($.urlParam('cotizacion_rel') === null) {
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
    catch (err) {
        console.info('.-.');
    }

}

function handleSelectTipoRetencion(generarIR) {
    /* Seteo si se muestra o no el campo de autorizacion de retencion  */
    var tipoRegistro = $('#TipoRegistro').val();
    var tipoDocumento = $('#TipoDocumento').val();
    var tipoEmisionRetencion = $('#TipoEmision').val();
    if (generarIR) { generarRetencionesIR(); }

    if (tipoRegistro == 'PRO' && (tipoDocumento == 'FAC' || tipoDocumento == 'NDT' || tipoDocumento == 'NVE' || tipoDocumento == 'LQC' || tipoDocumento == 'LMU' || tipoDocumento == 'TMR' || tipoDocumento == 'BEP' || tipoDocumento == "CPA" || tipoDocumento == 'EIE' || tipoDocumento == 'EIF' || tipoDocumento == 'REE' || tipoDocumento == 'EXP' || tipoDocumento == 'PEA')) {
        if (tipoEmisionRetencion == 'E') {
            /*Cargar estab y pto emision por defecto*/

            var esta_ptoe_default = null;//'001-001';
            if (esta_ptoe_default) {
                esta_ptoe_default = esta_ptoe_default.split('-');
                establec = esta_ptoe_default[0];
                pto_emis = esta_ptoe_default[1];
                $('#EstablecimientoRetencion').val(establec);
                $('#PuntoEmisionRetencion').val(pto_emis);
            }

            /* fin cargar default */
            $('.ingreso_retencion').hide();
            if (!tiene_retencion) {
                $('#label_retencion').hide();
                $('#AutorizacionRetencion').val('');
                $('#AutorizacionRetencion').hide();
            }
            $('.retencion_electronica').show();
            $('.retencion_fisica').hide();
            $("#NumeroDocumentoRetencion").unmask();
            $('#NumeroDocumentoRetencion').attr('readonly', true);
            $('.retencion_fisica').find("input[name='anulado_retencion']").attr('id', '');
            $('.retencion_electronica').find("input[name='anulado_retencion']").attr('id', 'id_anulado_retencion');
        } else {
            $('.ingreso_retencion').show();
            $('#label_retencion').show();
            $('#AutorizacionRetencion').show();
            $('.retencion_electronica').hide();
            $('.retencion_fisica').show();
            $('#NumeroDocumentoRetencion').attr('readonly', false);
            $("#NumeroDocumentoRetencion").mask("999-999-9?99999999");
            $('.retencion_fisica').find("input[name='anulado_retencion']").attr('id', 'id_anulado_retencion');
            $('.retencion_electronica').find("input[name='anulado_retencion']").attr('id', '');
        }
    }

}


function handleSelectTipoDocumento() {
    if (!es_documento_electronico) {
        //console.log('select tipo doc');
        var tipo_d = $('#TipoDocumento').val();
        personafield['dlgUrl'] = personafield['dlgUrl'] + '&tipodocumento=' + tipo_d;
        personafield['dlgUrl'] = personafield['dlgUrl'].replace("&manejabloq=1", "");


        //$('#id_persona_id').val("");
        /* Seteo el tab a cuenta x cobrar ó cuenta x cobrar dependiendo del tipo de registro y
        tipo de documento seleccionado  */
        var tipoRegistro = $('#TipoRegistro').val();
        var tipoDocumento = $('#TipoDocumento').val();
        /*cargar estab y pto emision por defecto*/


        verificarReembolsoGasto(tipoRegistro, tipoDocumento);


        //Validacion de mostrar subir adjunto
        if (tipoRegistro == 'PRO') {


            //Mostrar boton para subir archivo adjunto
            $('.subirAdjunto').show();


            //Ocultar tab de formas de pago
            $('#tabs_pagos').hide();
            //$('#pagos').hide();


            if (tipoDocumento == 'PEA') {
                $('#CodigoSustento').find("option[value='08']").hide();
            } else if (tipoDocumento == 'CVE') {
                $('#CodigoSustento').find("option[value='08']").hide();
                $('#CodigoSustento').find("option[value='02']").hide();
                $('#CodigoSustento').find("option[value='07']").hide();
            } else {
                $('#CodigoSustento').find("option[value='08']").show();
                $('#CodigoSustento').find("option[value='02']").show();
                $('#CodigoSustento').find("option[value='07']").show();
            }

            if (tipoDocumento == 'FAC' || tipoDocumento == 'NVE' || tipoDocumento == 'NCT' || tipoDocumento == 'NDT') {
                $('#CodigoSustento').find("option[value='14']").show();
            } else {
                $('#CodigoSustento').find("option[value='14']").hide();
            }

        } else {
            $('.subirAdjunto').hide();

            //Mostrar tab de formas de pago
            $('#tabs_pagos').show();
        }



        if (tipoRegistro == 'PRO' && (tipoDocumento == 'FAC' || tipoDocumento == 'NDT' || tipoDocumento == 'NVE' || tipoDocumento == 'LQC' || tipoDocumento == 'LMU' || tipoDocumento == 'TMR' || tipoDocumento == 'BEP' || tipoDocumento == 'CPA' || tipoDocumento == 'PEA' || tipoDocumento == 'EIE' || tipoDocumento == 'EIF' || tipoDocumento == 'REE' || tipoDocumento == 'EXP')) {
            $('.tipo_emision_retencion').show();
        } else {
            $('.tipo_emision_retencion').hide();
        }


        //Esconder las pestañas de productos, retencion y proyectos para DAC
        if (tipoDocumento == "REE") {
            $('#tabs_documentos').show();
            $('#contenedor_totales_reembolso').show();
            if (tipoRegistro == 'PRO') {
                $('#contenedor_documentos_cliente').hide();
                $('#contenedor_documentos_proveedor').show();
            } else {
                $('#contenedor_documentos_proveedor').hide();
                $('#contenedor_documentos_cliente').show();
            }
        } else {
            $('#tabs_documentos').hide();
            $('#contenedor_totales_reembolso').hide();
            //$('#documentos').hide();
            if (bandi == true) {
                $("#tabs").tabs("option", "active", 0);
            }
            bandi = true;
        }

        if (tipoDocumento == 'DAC' || tipoDocumento == 'CUO') {
            $('#tabs_productos').hide();
            $('#tabs_proyectos').hide();
            $('#tabs_retenciones').hide();
            $('#productos').hide();
            $('#proyectos').hide();
            $('#retenciones').hide();
            $('#cuentas').show();
            $("#tabs").tabs("option", "active", 1);
        } else {
            $('#tabs_productos').show();

            $('#tabs_retenciones').show();
        }



        if (tipoRegistro == 'CLI') {
            $("#TipoDocumento").find("option[value='DAU']").hide();
        } else {
            $("#TipoDocumento").find("option[value='DAU']").show();
        }
        //Cosas para IVA Gasto
        if (tipoRegistro == 'PRO' && (tipoDocumento == 'FAC' || tipoDocumento == 'LQC' || tipoDocumento == 'TMR' || tipoDocumento == 'BEP' || tipoDocumento == 'CPA' || tipoDocumento == 'EIE' || tipoDocumento == 'LMU' || tipoDocumento == 'NDT' || tipoDocumento == 'NCT' || tipoDocumento == "NCL" || tipoDocumento == 'PEA' || tipoDocumento == 'NVE' || tipoDocumento == 'EIF' || tipoDocumento == 'REE' || tipoDocumento == 'CVE')) {
            $('.iva_gasto').css('display', '');
            $('.td-iva-doc').css('display', 'none');
        } else {
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
        if (tipoRegistro == 'PRO' && (tipoDocumento == 'NVE' || tipoDocumento == 'EIF' || tipoDocumento == 'IMP' || tipoDocumento == 'DNA' || tipoDocumento == 'NCL' || tipoDocumento == 'NAI' || tipoDocumento == 'DAU' || tipoDocumento == 'DAC' || tipoDocumento == 'CUO' || tipoDocumento == 'CVE')) {
            $('.td-iva-nuevo').css('display', 'none');
        } else {
            $('.td-iva-nuevo').css('display', 'table-cell');
        }




        /* Verifico según el tipo de documento si se debe mostrar el campo autorizacion */
        if (es_documento_electronico) {
            $("#NumeroDocumento").mask("999-999-9?99999999");
            $("#PuntoEmision").mask("999");
            $('#trautorizacion').css('display', 'none');
            $('#Autorizacion').css("display", "none");

            $('#mostrar_autorizacion_combo').css("display", "none");
            $('#autorizacion_combo').css("display", "none");
            $('#mostrar_autorizacion').css("display", "none");
        }
        else {
            if (tipoDocumento == 'FAC' || tipoDocumento == "TMR" || tipoDocumento == "BEP" || tipoDocumento == "CPA" || tipoDocumento == 'EIE' || tipoDocumento == 'NVE' || tipoDocumento == 'NDT' || tipoDocumento == 'NCT' || tipoDocumento == 'RET' || tipoDocumento == 'LQC' || tipoDocumento == 'TMR' || tipoDocumento == 'EIF' || tipoDocumento == 'LMU' || tipoDocumento == 'PEA' || tipoDocumento == 'REE' || tipoDocumento == 'EXP' || tipoDocumento == 'CVE') {
                $("#NumeroDocumento").mask("999-999-9?99999999");
                $('#trautorizacion').css('display', 'inline');
                $("#Autorizacion").mask("999?9999999999999999999999999999999999999999999999");
            } else {
                $("#NumeroDocumento").unmask();
                $('#trautorizacion').css('display', 'none');
            }
        }
        setearIVA_no_autorizados();
        //handleTipoRegistroTipoDocumento();

        /*if (tipoDocumento == 'OCV' || tipoDocumento == 'PRE' || tipoDocumento == 'COT'){
                $('#tabs_pagos').empty();
                $('#pagos').empty();
        }*/

        if (tipoDocumento == 'PTO') {
            $('#tabs_pagos').empty();
            $('#pagos').empty();
            $('#trentregar').addClass("hide");
            $('#trcuenta').addClass("hide");
            //$('#trordencompraventa').addClass("hide");
            //pidgey
        }





        //Cosas para Cotizacion RENTING N.2


        if (tipoDocumento == 'FAC' || tipoDocumento == 'PRE') {
            $('.info-hoteleria').show();
        } else {
            $('.info-hoteleria').hide();
        }

        actualizarIVA();

        if (tipoDocumento != 'NCT') {
            $('.aplica_iva_12').show();
        } else {
            $('.aplica_iva_12').hide();
        }

        validarSecuenciaDna();

        if (tipoDocumento == 'PRE' || tipoDocumento == 'COT' || tipoDocumento == 'OCV' || tipoDocumento == 'PTO') {
            $('#tabs_activosfijos').hide();
            $('#tabs_cuotas').hide();
            $('#tabs_retenciones').hide();
            $('#xml_proveedor').remove();
            $('.es_proforma').remove();

        }

        if (tipoDocumento == 'PTO') {
            $("#trreferencia").hide();
            $("#tricetotal").hide();
            $("#panelpresupuesto").show();
        } else {
            $("#trreferencia").show();
            $("#tricetotal").show();
            $("#panelpresupuesto").hide();
        }



        if (tipoDocumento == 'DNA') {
            $("#trreserva").show();
        } else {
            $("#trreserva").hide();
        }

        handleTipoRegistroTipoDocumento(); //Al final para evitar conflictos

    } else {
        //console.log('select tipo doc');
        var tipo_d = $('#TipoDocumento').val();
        personafield['dlgUrl'] = personafield['dlgUrl'] + '&tipodocumento=' + tipo_d;
        personafield['dlgUrl'] = personafield['dlgUrl'].replace("&manejabloq=1", "");


        //$('#PersonasId').val("");
        /* Seteo el tab a cuenta x cobrar ó cuenta x cobrar dependiendo del tipo de registro y
        tipo de documento seleccionado  */
        var tipoRegistro = $('#TipoRegistro').val();
        var tipoDocumento = $('#TipoDocumento').val();
        /*cargar estab y pto emision por defecto*/

        if (tipoDocumento == 'FAC') { esta_ptoe_default = '001-001'; }
        if (tipoDocumento == 'NCT') { esta_ptoe_default = '001-001'; }
        if (tipoDocumento == 'NDT') { esta_ptoe_default = '001-001'; }
        if (esta_ptoe_default) {
            var esta_ptoe_default = esta_ptoe_default.split('-');
            establec = esta_ptoe_default[0];
            pto_emis = esta_ptoe_default[1];
            $('#Establecimiento').val(establec);
            $('#PuntoEmision').val(pto_emis);
        }

        verificarReembolsoGasto(tipoRegistro, tipoDocumento);


        //Validacion de mostrar subir adjunto
        if (tipoRegistro == 'PRO') {


            //Mostrar boton para subir archivo adjunto
            $('.subirAdjunto').show();


            //Ocultar tab de formas de pago
            $('#tabs_pagos').hide();
            //$('#pagos').hide();
        } else {
            //Ocultar boton para subir archivo adjunto


            $('.subirAdjunto').hide();


            //Mostrar tab de formas de pago
            $('#tabs_pagos').show();
            //$('#pagos').show();
        }


        if (tipoRegistro == 'PRO' && (tipoDocumento == 'FAC' || tipoDocumento == 'NDT' || tipoDocumento == 'NVE' || tipoDocumento == 'LQC' || tipoDocumento == 'LMU' || tipoDocumento == 'TMR' || tipoDocumento == 'BEP' || tipoDocumento == 'CPA' || tipoDocumento == 'PEA' || tipoDocumento == 'EIE' || tipoDocumento == 'EIF' || tipoDocumento == 'REE' || tipoDocumento == 'EXP')) {
            $('.tipo_emision_retencion').show();
        } else {
            $('.tipo_emision_retencion').hide();
        }


        //Esconder las pestañas de productos, retencion y proyectos para DAC
        if (tipoDocumento == "REE") {
            $('#tabs_documentos').show();
            $('#contenedor_totales_reembolso').show();
            if (tipoRegistro == 'PRO') {
                $('#contenedor_documentos_cliente').hide();
                $('#contenedor_documentos_proveedor').show();
            } else {
                $('#contenedor_documentos_proveedor').hide();
                $('#contenedor_documentos_cliente').show();
            }
        } else {
            $('#tabs_documentos').hide();
            $('#contenedor_totales_reembolso').hide();
            //$('#documentos').hide();
            if (bandi == true) {
                $("#tabs").tabs("option", "active", 0);
            }
            bandi = true;
        }

        if (tipoDocumento == 'DAC' || tipoDocumento == 'CUO') {
            $('#tabs_productos').hide();
            $('#tabs_proyectos').hide();
            $('#tabs_retenciones').hide();
            $('#productos').hide();
            $('#proyectos').hide();
            $('#retenciones').hide();
            $('#cuentas').show();
            $("#tabs").tabs("option", "active", 1);
        } else {
            $('#tabs_productos').show();

            $('#tabs_retenciones').show();
        }



        if (tipoRegistro == 'CLI') {
            $("#TipoDocumento").find("option[value='DAU']").hide();
        } else {
            $("#TipoDocumento").find("option[value='DAU']").show();
        }
        //Cosas para IVA Gasto
        if (tipoRegistro == 'PRO' && (tipoDocumento == 'FAC' || tipoDocumento == 'LQC' || tipoDocumento == 'TMR' || tipoDocumento == 'BEP' || tipoDocumento == 'CPA' || tipoDocumento == 'EIE' || tipoDocumento == 'LMU' || tipoDocumento == 'NDT' || tipoDocumento == 'NCT' || tipoDocumento == "NCL" || tipoDocumento == 'PEA' || tipoDocumento == 'NVE' || tipoDocumento == 'EIF' || tipoDocumento == 'REE' || tipoDocumento == 'CVE')) {
            $('.iva_gasto').css('display', '');
            $('.td-iva-doc').css('display', 'none');
        } else {
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
        if (tipoRegistro == 'PRO' && (tipoDocumento == 'NVE' || tipoDocumento == 'EIF' || tipoDocumento == 'IMP' || tipoDocumento == 'DNA' || tipoDocumento == 'NCL' || tipoDocumento == 'NAI' || tipoDocumento == 'DAU' || tipoDocumento == 'DAC' || tipoDocumento == 'CUO' || tipoDocumento == 'CVE')) {
            $('.td-iva-nuevo').css('display', 'none');
        } else {
            $('.td-iva-nuevo').css('display', 'table-cell');
        }



        /* Verifico según el tipo de documento si se debe mostrar el campo autorizacion */

        if (es_documento_electronico) {
            $("#NumeroDocumento").mask("999-999-9?99999999");
            $("#PuntoEmision").mask("999");
            $('#trautorizacion').css('display', 'none');
            $('#Autorizacion').css("display", "none");
            $('#FechaEmision').datepicker('option', 'minDate', 0);
            $('#mostrar_autorizacion_combo').css("display", "none");
            $('#autorizacion_combo').css("display", "none");
            $('#mostrar_autorizacion').css("display", "none");
        }
        else {
            if (tipoDocumento == 'FAC' || tipoDocumento == "TMR" || tipoDocumento == "BEP" || tipoDocumento == "CPA" || tipoDocumento == 'EIE' || tipoDocumento == 'NVE' || tipoDocumento == 'NDT' || tipoDocumento == 'NCT' || tipoDocumento == 'RET' || tipoDocumento == 'LQC' || tipoDocumento == 'TMR' || tipoDocumento == 'EIF' || tipoDocumento == 'LMU' || tipoDocumento == 'PEA' || tipoDocumento == 'REE' || tipoDocumento == 'EXP' || tipoDocumento == 'CVE') {
                $("#NumeroDocumento").mask("999-999-9?99999999");
                $('#trautorizacion').css('display', 'inline');
                $("#Autorizacion").mask("999?9999999999999999999999999999999999999999999999");
            } else {
                $("#NumeroDocumento").unmask();
                $('#trautorizacion').css('display', 'none');
            }
        }
        setearIVA_no_autorizados();
        //handleTipoRegistroTipoDocumento();

        /*if (tipoDocumento == 'OCV' || tipoDocumento == 'PRE' || tipoDocumento == 'COT'){
                $('#tabs_pagos').empty();
                $('#pagos').empty();
        }*/

        if (tipoDocumento == 'PTO') {
            $('#tabs_pagos').empty();
            $('#pagos').empty();
            $('#trentregar').addClass("hide");
            $('#trcuenta').addClass("hide");
            //$('#trordencompraventa').addClass("hide");
            //pidgey
        }





        //Cosas para Cotizacion RENTING N.2


        if (tipoDocumento == 'FAC' || tipoDocumento == 'PRE') {
            $('.info-hoteleria').show();
        } else {
            $('.info-hoteleria').hide();
        }

        actualizarIVA();

        if (tipoDocumento != 'NCT') {
            $('.aplica_iva_12').show();
        } else {
            $('.aplica_iva_12').hide();
        }

        validarSecuenciaDna();

        if (tipoDocumento == 'PRE' || tipoDocumento == 'COT' || tipoDocumento == 'OCV' || tipoDocumento == 'PTO') {
            $('#tabs_activosfijos').hide();
            $('#tabs_cuotas').hide();
            $('#tabs_retenciones').hide();
            $('#xml_proveedor').remove();
            $('.es_proforma').remove();
        }

        if (tipoDocumento == 'PTO') {
            $("#trreferencia").hide();
            $("#tricetotal").hide();
            $("#panelpresupuesto").show();
        } else {
            $("#trreferencia").show();
            $("#tricetotal").show();
            $("#panelpresupuesto").hide();
        }



        handleTipoRegistroTipoDocumento();

    }
}

function verificarReembolsoGasto(registro, documento) {
    if (registro == null) registro = $('#TipoRegistro').val();
    if (documento == null) documento = $('#TipoDocumento').val();
    if (!es_documento_electronico) {
        if (registro == "PRO" && (documento == "FAC" || documento == "NDT" || documento == "NCT" || documento == "NCL" || documento == "PEA" || documento == "LQC" || documento == "LMU" || documento == "TMR" || documento == "BEP" || documento == "CPA" || documento == "EIE" || documento == "EIF" || documento == "NVE" || documento == "REE")) $(".div_reembolso_gasto").show();
        else $(".div_reembolso_gasto").hide();
    }
}
//Porcentaje IVA
function actualizarIVA() {
    if ($('#IvaManual').is(':checked')) {
        porcentaje_iva_actual = $('#id_porcentaje_iva').val();

        var valores = $('#productos').find('input[id$="-cantidad"]');
        for (var i = 0; i < valores.length; i++) {
            calcularSubtotalProducto($(valores[i]));
        }
        var valores = $('#cuentas').find('input[id$="-cantidad"]');
        for (var i = 0; i < valores.length; i++) {
            calcularSubtotalCuenta($(valores[i]));
        }

        setarPorcentajeProductos();
        setarPorcentajeCuentas();
        $('.label-iva').html(porcentaje_iva_actual + '%');
    } else {
        fecha_emision = $('#FechaEmision').val();

        tipo_documento = $('#TipoDocumento').val();
        tipo_registro_documento = $('#TipoRegistro').val();
        documento_relacionado = $('#DocumentosRelacionadoId').val();
        //Fecha
        fecha_cadena = ('' + fecha_emision).split('/');
        fecha = fecha_cadena[2] + '-' + fecha_cadena[1] + '-' + fecha_cadena[0];

        mostrarAplicaIva();
        if (tipo_documento == 'NCT' && documento_relacionado && documento_relacionado != '') {
            url = "/sistema/registro/documento/get_porcentaje_iva/" + documento_relacionado;
        } else {
            if (tipo_documento == 'REE' && tipo_registro_documento == 'CLI') {
                url = "/sistema/contabilidad/impuesto_iva_fecha?fecha=" + fecha;
                documentos_reembolso = $("#documentos");

                /*var valores = $(documentos_reembolso).find('input[id$="-documento_id"]'), valor;
                for(var i=1;i<2;i++) {
                    valor = parseFloat(valores[i].value);
                    url = "/sistema/registro/documento/get_porcentaje_iva/" +  valores[i].value;
                }*/
            } else {
                url = "/sistema/contabilidad/impuesto_iva_fecha?fecha=" + fecha;
            }
        }
        //console.log(url);

        //Comentado MAURICIO
        //$.ajax({
        //    url: url,
        //    type: "GET",
        //    async: true,
        //    data: "",
        //    beforeSend: function () {
        //    },
        //    error: function () {

        //    },
        //    success: function (data) {
        //        porcentaje = parseFloat(data['obj']['porcentaje']);
        //        porcentaje_iva_actual = porcentaje;
        //        $('#id_porcentaje_iva').val(porcentaje_iva_actual);
        //        $('#id_porcentaje_iva').prop('selected', 'selected');
        //    },
        //    complete: function () {
        //        setearLabelIva();
        //        var valores = $('#productos').find('input[id$="-cantidad"]');
        //        for (var i = 0; i < valores.length; i++) {
        //            calcularSubtotalProducto($(valores[i]));
        //        }
        //        var valores = $('#cuentas').find('input[id$="-cantidad"]');
        //        for (var i = 0; i < valores.length; i++) {
        //            calcularSubtotalCuenta($(valores[i]));
        //        }
        //        setarPorcentajeProductos();
        //        setarPorcentajeCuentas();
        //    }

        //});
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

function mostrarAplicaIva() {
    fecha_emision = $('#FechaEmision').val();
    fecha_cadena = ('' + fecha_emision).split('/');
    data_fecha_emision = new Date(fecha_cadena[2], fecha_cadena[1] - 1, fecha_cadena[0]);
    fecha_tope = new Date(2016, 06 - 1, 01);
    tipoDocumento = $('#TipoDocumento').val();

    if (data_fecha_emision >= fecha_tope && tipoDocumento != 'NCT') {
        $('.aplica_iva_12').show();
    } else {
        $('.aplica_iva_12').hide();
    }
}


function validarSecuenciaDna() {
    if (es_documento_electronico || !habilitar_secuencia_dna) {
        return;
    }

    var tipodocumento = $('#TipoDocumento').val();
    var tipoRegistro = $('#TipoRegistro').val();
    if (tipodocumento == "DNA" && tipoRegistro == "CLI") {
        $("#NumeroDocumento").prop("readonly", "true");
        if (documento_nuevo || tipo_documento_guardado != 'DNA') {
            $.get("/sistema/registro/documento/secuencia/", { "tipo": "DNA" })
            .done(function (data) {
                $("#NumeroDocumento").val(data.numero_documento);
            });
        }
        else {
            $("#NumeroDocumento").val(numero_documentoactual);
        }
    }
    else {
        //$("#NumeroDocumento").val("");
        $("#NumeroDocumento").removeAttr("readonly");
    }
}


function handleTipoRegistroTipoDocumento() {
    //console.log('handle tipo registro y docu');
    var tipoRegistro = $('#TipoRegistro').val();
    var tipoDocumento = $('#TipoDocumento').val();
    if ((tipoRegistro == 'CLI' && tipoDocumento == 'COT') || tipoDocumento == 'PRE' || tipoDocumento == 'OCV' || tipoDocumento == 'PTO') {
        $('.trnumdoc').hide();

        if (tipoDocumento == 'PRE' || tipoDocumento == 'FAC') {
            $('.info-hoteleria').show();
        } else {
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
    if (tipoDocumento != 'OCV') {
        $('.valida_monto').addClass('hide');
    }





    if (tipoRegistro == 'PRO') {

        $('#div_sin_movimiento').show();
        $('#xml_proveedor').show();
        $('#xml_retencion').hide();
        $('.group_xml_proveedor').addClass('input-group');
        $('.group_xml_retencion').removeClass('input-group');


    } else {

        $('#div_sin_movimiento').hide();

        $('#xml_proveedor').hide();
        $('#xml_retencion').show();
        $('.group_xml_proveedor').removeClass('input-group');
        $('.group_xml_retencion').addClass('input-group');
        $('.info-hoteleria').show();


    }

    if (tipoRegistro == 'PRO' && tipoDocumento != 'COT' && tipoDocumento != 'PRE' && tipoDocumento != 'OCV') {
        $('.pago-caja-chica').show();
    } else {
        $('.pago-caja-chica').hide();
    }






    if (tipoRegistro == 'CLI') {
        bodegafield['dlgUrl'] = safe_url_bodegafield + '?excluir_transito=1';
    }
    else {
        bodegafield['dlgUrl'] = safe_url_bodegafield;
    }




    if (tipoDocumento == 'OCV') {
        $("#trordencompraventa").addClass('hide');
        if (tipoRegistro == 'PRO') {
            $('.proveedordesconocido').show();
        } else {
            $('#id_proveedor_desconocido').attr('checked', false);
            $('.proveedordesconocido').hide();
        }
        ProveedorDesconocido();
    } else {
        $("#trordencompraventa").removeClass('hide');
    }

    //Lote

    handleTipoLotes(tipoRegistro, tipoDocumento);


}


function handleTipoLotes(tipo_registro, tipo) {
    var valores = $('input[id$="-producto_id"]');
    //console.log('Tipo Registro: '+ tipo_registro_documento+' Tipo Doc: '+tipo_documento +' valores: '+valores.length);
    //console.log('-----------------------');
    for (var i = 1; i < valores.length; i++) {
        //console.log('val: '+ $(valores[i]).val());

        if ($(valores[i]).val()) {
            tr = $(valores[i]).closest("tr");
            if ($(tr).find('input[id$="-maneja_lote"]').val() == 1) {
                if ((tipo_registro_documento == 'PRO' && tipo_documento != 'NCT' && tipo_documento != 'NCL')
                    || (tipo_registro_documento == 'CLI' && tipo_documento == 'NCT' && tipo_documento == 'NCL')) {
                    //console.log('if');
                    $(tr).find('.lote_ingreso').show();
                    if ($(tr).find('input[id$="-maneja_fechaexp"]').val() != 1) {
                        $(tr).find('.lote_ingreso .fechaexp').hide();
                    }
                    $(tr).find('.lote_egreso').hide();
                } else if ((tipo_registro_documento == 'CLI' && tipo_documento != 'NCT' && tipo_documento != 'NCL')
                    || (tipo_registro_documento == 'PRO' && tipo_documento == 'NCT' && tipo_documento == 'NCL')) {
                    //console.log('else if');
                    $(tr).find('.lote_ingreso').hide();
                    $(tr).find('.lote_egreso').show();
                } else if (tipo_registro_documento == 'CLI' && tipo_documento == 'NCT') { //permite que en notas de crédito de clientes se agreguen lotes
                    //console.log('else if: cliente - nct');
                    $(tr).find('.lote_ingreso').show();
                    if ($(tr).find('input[id$="-maneja_fechaexp"]').val() != 1) {
                        $(tr).find('.lote_ingreso .fechaexp').hide();
                    }
                    $(tr).find('.lote_egreso').hide();
                }
                else {
                    $(tr).find('.lote_ingreso').show();
                    if ($(tr).find('input[id$="-maneja_fechaexp"]').val() != 1) {
                        $(tr).find('.lote_ingreso .fechaexp').hide();
                    }
                    $(tr).find('.lote_egreso').show();
                }
            }
        }
    }
}


function getNumeroAutorizacionRetencion() {
    var fecha, persona_id, tipo_doc, data = {};
    fecha = moment($('#FechaEmision').val(), 'DD/MM/YYYY').format();
    var fecha_retencion = moment($('#FechaEmisionRetencion').val(), 'DD/MM/YYYY').format();
    persona_id = $('#PersonasId').val();
    tipo_doc = $('#TipoRegistro').val();
    if (fecha_retencion && tipo_doc) {
        data['Fecha'] = fecha;
        data['tipo_doc'] = tipo_doc;
        if (persona_id) {
            data['PersonasId'] = persona_id;
        }
        if (fecha_retencion) {
            data['con_fecha_retencion'] = '1';
            data['Fecha'] = fecha_retencion;
        }
        $.ajax({
            type: "GET",
            url: urlprefix + "/Personas/GetAutorizacion/",
            data: data,
            dataType: "json",
            async: true,
            success: function (data, textStatus) {
                var arr_aut_empresa = data['empresaAutorizacionesFacDTO'];
                var arr_autret_empresa = data['empresaAutorizacionesRetDTO'];
                var arr_aut_persona = data['personasAutorizacionesFacDTO'];
                var arr_autret_persona = data['personasAutorizacionesRetDTO'];
                var html_combo_aut_empresa = '';
                var html_combo_autret_empresa = '';
                var html_combo_aut_persona = '';
                var html_combo_autret_persona = '';
                if (arr_aut_empresa.length >= 1) {
                    for (i = 0; i < arr_aut_empresa.length; i++) {
                        html_combo_aut_empresa += "<option value = " + arr_aut_empresa[i].Autorizacion + " selected='' >" + arr_aut_empresa[i].Autorizacion + "</option>";
                    }
                }
                if (arr_autret_empresa.length >= 1) {
                    for (i = 0; i < arr_autret_empresa.length; i++) {
                        html_combo_autret_empresa += "<option value = " + arr_autret_empresa[i].Autorizacion + " selected='' >" + arr_autret_empresa[i].Autorizacion + "</option>";
                    }
                }
                if (arr_aut_persona.length >= 1) {
                    for (i = 0; i < arr_aut_persona.length; i++) {
                        html_combo_aut_persona += "<option value = " + arr_aut_persona[i].Autorizacion + " selected='' >" + arr_aut_persona[i].Autorizacion + "</option>";
                    }
                }
                if (arr_autret_persona.length >= 1) {
                    for (i = 0; i < arr_autret_persona.length; i++) {
                        html_combo_autret_persona += "<option value = " + arr_autret_persona[i].Autorizacion + " selected='' >" + arr_autret_persona[i].Autorizacion + "</option>";
                    }
                }
                var autDoc = '', autRet = '', combo_autDoc = '', combo_autRet = '';
                if (tipo_doc == 'CLI') {
                    autDoc = arr_aut_empresa.length >= 1 ? arr_aut_empresa[0].Autorizacion : '';
                    combo_autDoc = html_combo_aut_empresa;
                    autRet = arr_autret_persona.length >= 1 ? arr_autret_persona[0].Autorizacion : '';
                    combo_autRet = html_combo_autret_persona;
                    autDocAnt = arr_aut_persona.length >= 1 ? arr_aut_persona[0].Autorizacion : '';
                    autRetAnt = arr_autret_empresa.length >= 1 ? arr_autret_empresa[0].Autorizacion : '';
                } else if (tipo_doc == 'PRO') {
                    autDoc = arr_aut_persona.length >= 1 ? arr_aut_persona[0].Autorizacion : '';
                    combo_autDoc = html_combo_aut_persona;
                    autRet = arr_autret_empresa.length >= 1 ? arr_autret_empresa[0].Autorizacion : '';
                    combo_autRet = html_combo_autret_empresa;
                    autDocAnt = arr_aut_empresa.length >= 1 ? arr_aut_empresa[0].Autorizacion : '';
                    autRetAnt = arr_autret_persona.length >= 1 ? arr_autret_persona[0].Autorizacion : '';
                }

                if ($('#Autorizacion').val() == autDocAnt)
                    $('#Autorizacion').val('');
                if ($('#AutorizacionRetencion').val() == autRetAnt)
                    $('#AutorizacionRetencion').val('');

                //AUTORIZACIÓN DEL DOCUMENTO
                $('#autorizacion_combo').html(combo_autDoc);
                if (!$('#Autorizacion').val()) {
                    if (combo_autDoc) {
                        $('#hay_combo_autorizacion').val("1");
                        $('#Autorizacion').css("display", "none");
                        $('#mostrar_autorizacion_combo').css("display", "none");
                        $('#autorizacion_combo').css("display", "");
                        $('#mostrar_autorizacion').css("display", "");
                    }
                    else {
                        $('#Autorizacion').val(autDoc);
                        $('#hay_combo_autorizacion').val("0");
                        $('#Autorizacion').css("display", "");
                        $('#mostrar_autorizacion_combo').css("display", "none");
                        $('#autorizacion_combo').css("display", "none");
                        $('#mostrar_autorizacion').css("display", "none");
                    }
                } else { //EDICION DE LA AUTORIZACION
                    $('#Autorizacion').css("display", "");
                    $('#autorizacion_combo').css("display", "none");
                    $('#mostrar_autorizacion').css("display", "none");
                    if (combo_autDoc) {
                        $('#hay_combo_autorizacion').val("1");
                        $('#mostrar_autorizacion_combo').css("display", "");
                    } else {
                        $('#hay_combo_autorizacion').val("0");
                        $('#mostrar_autorizacion_combo').css("display", "none");
                    }
                }
                //AUTORIZACION DE LA RETENCIÓN
                $('#autorizacion_retencion_combo').html(combo_autRet);
                auto = $('#AutorizacionRetencion').val();
                if (auto != "") {
                    if (combo_autRet) {
                        $('#hay_combo_autorizacion_retencion').val("1");
                        $('#AutorizacionRetencion').css("display", "none");
                        $('#label_retencion').css("display", "none");
                        $('#mostrar_autorizacion_retencion_combo').css("display", "none");
                        $('#autorizacion_retencion_combo').css("display", "");
                        $('#mostrar_autorizacion_retencion').css("display", "");
                    }
                    else if ($('#TipoEmision').val() != 'E') {
                        $('#AutorizacionRetencion').val(autRet);
                        $('#hay_combo_autorizacion_retencion').val("0");
                        $('#AutorizacionRetencion').css("display", "");
                        $('#label_retencion').css("display", "");
                        $('#mostrar_autorizacion_retencion_combo').css("display", "none");
                        $('#autorizacion_retencion_combo').css("display", "none");
                        $('#mostrar_autorizacion_retencion').css("display", "none");
                    }
                } else { //EDICION DE LA AUTORIZACION
                    $('#AutorizacionRetencion').css("display", "");
                    $('#label_retencion').css("display", "");
                    $('#autorizacion_retencion_combo').css("display", "none");
                    $('#mostrar_autorizacion_retencion').css("display", "none");
                    if (combo_autRet) {
                        $('#hay_combo_autorizacion_retencion').val("1");
                        $('#mostrar_autorizacion_retencion_combo').css("display", "");
                    } else {
                        $('#hay_combo_autorizacion_retencion').val("0");
                        $('#mostrar_autorizacion_retencion_combo').css("display", "none");
                    }
                }

                cambiarTamanio($('#Autorizacion'));
                cambiarTamanio($('#AutorizacionRetencion'));

            }
        });
    }
}

function setearLabelIva() {
    var valores = $('.label-iva');
    for (var i = 0; i < valores.length; i++) {
        $(valores[i]).html(porcentaje_iva_actual + '%');
    }
}

function setarPorcentajeProductos() {


    porcentaje_iva_actual = $('#id_porcentaje_iva').val();
    ////waaaaa



    var valores = $('#productos').find('input[id$="-porcentaje_iva"]');
    for (var i = 0; i < valores.length; i++) {
        if ($(valores[i]).val() && !isNaN($(valores[i]).val()) && $(valores[i]).val() > 0) {
            $(valores[i]).val(porcentaje_iva_actual);
        }
    }

    var valores_producto = $('#productos').find('input[id$="-hidden_porcentaje_iva_producto"]');
    for (var j = 0; j < valores_producto.length; j++) {

        if ($(valores_producto[j]).val() && !isNaN($(valores_producto[j]).val()) && $(valores_producto[j]).val() > 0) {
            $(valores_producto[j]).val(porcentaje_iva_actual);
        }
    }

}

function setarPorcentajeCuentas() {

    var valores = $('#cuentas').find('select[id$="-porcentaje_iva"]');
    for (var i = 0; i < valores.length; i++) {
        opciones = $(valores[i]).find('option');

        var seleccionado = $(valores[i]).find('option:selected');

        for (j = 0; j < opciones.length; j++) {
            if (!isNaN($(opciones[j]).val()) && $(opciones[j]).val() > 0) {
                $(opciones[j]).hide();
            }
            if (!isNaN($(opciones[j]).val()) && $(opciones[j]).val() == $('#id_porcentaje_iva').val()) {
                $(opciones[j]).show();
            }
        }

        for (j = 0; j < opciones.length; j++) {
            porcentaje = $(opciones[j]).val();
            if (porcentaje && !isNaN(porcentaje) && porcentaje > 0) {

                /*if(porcentaje == porcentaje_iva_actual){
                    $(opciones[j]).hide();
                }else{
                    $(opciones[j]).hide();
                }*/
                ///akiiiiii

                //$('.porcentajes_iva_detalle').hide();

                if ($(seleccionado).val() && !isNaN($(seleccionado).val()) && $(seleccionado).val() > 0) {
                    if (porcentaje == porcentaje_iva_actual) {
                        $(opciones[j]).prop('selected', 'selected');
                    } else {
                        $(opciones[j]).removeProp('selected');
                    }
                }
            }
        }
    } setarPorcentajeActivos();
}

function setarPorcentajeActivos() {
    var valores = $('#activos').find('select[id$="-porcentaje_iva"]');
    for (var i = 0; i < valores.length; i++) {
        opciones = $(valores[i]).find('option');

        var seleccionado = $(valores[i]).find('option:selected');
        for (j = 0; j < opciones.length; j++) {

            porcentaje = $(opciones[j]).val();
            if (porcentaje && !isNaN(porcentaje) && porcentaje > 0) {
                if (porcentaje == porcentaje_iva_actual) {
                    $(opciones[j]).show();
                } else {
                    $(opciones[j]).hide();
                }
                if ($(seleccionado).val() && !isNaN($(seleccionado).val()) && $(seleccionado).val() > 0) {
                    if (porcentaje == porcentaje_iva_actual) {
                        $(opciones[j]).attr('selected', 'selected');
                    }
                }
            }
        }
    }
}

function mostrar_autorizacion() {
    $('#Autorizacion').css("display", "");
    $('#autorizacion_combo').css("display", "none");
    $('#mostrar_autorizacion').css("display", "none");
    if ($('#hay_combo_autorizacion').val() == "1")
        $('#mostrar_autorizacion_combo').css("display", "");
}

function mostrar_autorizacion_retencion() {
    $('#AutorizacionRetencion').css("display", "");
    $('#label_retencion').css("display", "");
    $('#autorizacion_retencion_combo').css("display", "none");
    $('#mostrar_autorizacion_retencion').css("display", "none");
    if ($('#hay_combo_autorizacion_retencion').val() == "1")
        $('#mostrar_autorizacion_retencion_combo').css("display", "");
}

function mostrar_autorizacion_combo() {
    $('#Autorizacion').css("display", "none");
    $('#mostrar_autorizacion_combo').css("display", "none");
    $('#autorizacion_combo').css("display", "");
    $('#mostrar_autorizacion').css("display", "");
}

function mostrar_autorizacion_retencion_combo() {
    $('#AutorizacionRetencion').css("display", "none");
    $('#label_retencion').css("display", "none");
    $('#mostrar_autorizacion_retencion_combo').css("display", "none");
    $('#autorizacion_retencion_combo').css("display", "");
    $('#mostrar_autorizacion_retencion').css("display", "");
}

function AplicaIva12() {

    if ($('#IvaManual').is(':checked')) {
        cargarComboIva();
        set_valor_porcentaje();
        porcentaje_iva_actual = $('#id_porcentaje_iva').val();

        $('.aplica_porcentaje_iva').show();
        $('.label-iva').html(porcentaje_iva_actual + '%');

        //actualizarIVA();
        recalcularValoresIVA();

    } else {
        $('.aplica_porcentaje_iva').hide();
        actualizarIVA();
        recalcularValoresIVA();
    }

}

function recalcularValoresIVA() {
    setearLabelIva();
    var valores = $('#productos').find('input[id$="-cantidad"]');
    for (var i = 0; i < valores.length; i++) {
        calcularSubtotalProducto($(valores[i]));
    }
    var valores = $('#cuentas').find('input[id$="-cantidad"]');
    for (var i = 0; i < valores.length; i++) {
        calcularSubtotalCuenta($(valores[i]));
    }
    setarPorcentajeProductos();
    setarPorcentajeCuentas();
}

function cargarComboIva() {
    //fecha_emision = $('#FechaEmision').val();
    //fecha_cadena = ('' + fecha_emision).split('/');
    //fecha = fecha_cadena[2] + '-' + fecha_cadena[1] + '-' + fecha_cadena[0];

    //url = "/sistema/contabilidad/get_porcentajes_iva?fecha=" + fecha;
    //$.ajax({
    //    url: url,
    //    type: "GET",
    //    async: false,
    //    data: "",
    //    beforeSend: function () {
    //    },
    //    error: function () {

    //    },
    //    success: function (data) {
    //        combo_porcentajes_iva = $('#id_porcentaje_iva');
    //        porcentajes = '';

    //        iva_a_la_fecha = data.iva_a_la_fecha;
    //        $.each(data.porcentajes_iva, function (index, value) {
    //            porcentaje = "" + value;
    //            if (iva_a_la_fecha == value) {
    //                hidden_control = ' hidden ';
    //            } else {
    //                hidden_control = '';
    //            }
    //            porcentajes = porcentajes + '<option ' + hidden_control + ' value="' + porcentaje + '">' + porcentaje + '</option>';
    //        });
    //        combo_porcentajes_iva.html(porcentajes);
    //    },
    //    complete: function () {

    //    }

    //});
}

function set_valor_porcentaje() {
    seleccionables = $('#id_porcentaje_iva option:not([hidden])');
    if (primera_carga) {

        setear_primero_en_seleccionables(seleccionables);

    } else {
        setear_primero_en_seleccionables(seleccionables);
    }
}

function setear_primero_en_seleccionables(seleccionables) {
    for (i = 0; i < seleccionables.length; i++) {
        $('#id_porcentaje_iva').val(seleccionables[i].value);
    }
}

function DetalleCuenta(tr, firstLoad) {
    /* Clase que representa el detalle de una Cuenta */
    this.tr = tr; // almacena la fila que representa a un detalle
    this.cuentafield = new ObjectField($(this.tr).find('input.object-hidden[id$="cuenta_id"]'));
    this.proyectofield = new ObjectField($(this.tr).find('input.object-hidden[id$="proyecto_id"]'));
    this.cuentafield.onSetObj = function (obj) {
        if ($('#TipoRegistro').val() == 'CLI' && (!firstLoad || !$('#id_id').val())) {
            if (porcentaje_descuento)
                $(tr).find('input[id$="-porcentaje_descuento"]').val(porcentaje_descuento);
        }
        var elements = $(tr).find('input[id$="-cuenta_id"]');
        if (obj) {
            elements.addClass('item-proyecto');
            elements.addClass('gasto-amortizado');
        }
        else {
            elements.removeClass('item-proyecto');
            elements.removeClass('gasto-amortizado');
        }
        //if(generarCuentaAdicional() && !firstLoad) documento.detalles_cuentas.agregarDetalle();// inconsitencia del proyecto en masivo
        $(tr).find('input[id$="-hidden_data_cuenta_id"]').val(JSON.stringify(obj));
    };
    if (this.cuentafield.obj != null) {
        this.cuentafield.setObj(this.cuentafield.obj);
    }
    this.centrocostofield = new ObjectField($(this.tr).find('input.object-hidden[id$="centro_costo_id"]'));
    this.centrocostofield.onSetObj = function (obj) {
        $(tr).find('input[id$="-hidden_data_centro_costo_id"]').val(JSON.stringify(obj));
    };
    this.tiporetirfield = new ObjectField($(this.tr).find('input.object-hidden[id$="tipo_retencion_ir_id"]'));
    this.tiporetirfield.onSetObj = function (obj) {
        var elements = $(tr).find('input[id$="-base_cero"], input[id$="-base_gravable"], input[id$="-base_no_gravable"]');
        if (obj) {
            porcent_ret[obj.codigo] = parseFloat(obj.porcentaje);
            elements.addClass('base-retencion');
            elements.attr('codigoret', obj.codigo);
        }
        else {
            elements.removeClass('base-retencion');
            elements.removeAttr('codigoret');
        }
    };
    this.tiporetivafield = new ObjectField($(this.tr).find('input.object-hidden[id$="tipo_retencion_iva_id"]'));
    this.tiporetivafield.onSetObj = function (obj) {
        var elements = $(tr).find('input[id$="-base_gravable"], input[id$="-ice"]');
        if (obj) {
            porcent_retiva[obj.codigo] = parseFloat(obj.porcentaje);
            elements.addClass('base-retencion-iva');
            elements.attr('codigoretiva', obj.codigo);
        }
        else {
            elements.removeClass('base-retencion-iva');
            elements.removeAttr('codigoretiva');
        }
    };
    calcularSubtotalCuenta($(tr).find('input[id$="-cantidad"]'));
    calcularTotal();
}

function calcularSubtotalCuenta(caller) {
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
            descuento = redondear(subtotal * (porcentajeDesc / 100.00));
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
        $(tr).find('input[id$="-subtotal"]').val(redondear(subtotal, es_subtotal = true));
        if (porcentajeIVA == 0) {
            $(tr).find('input[id$="-base_cero"]').val(redondear(subtotal, es_subtotal = true));
            $(tr).find('input[id$="-base_gravable"]').val(0);
            $(tr).find('input[id$="-base_no_gravable"]').val(0);
            if (porcentajeICE) {
                $(tr).find('input[id$="-ice"]').val(redondear((subtotal_ice * (porcentajeICE / 100.00))));
            }
        }
        else if (porcentajeIVA > 0) {
            $(tr).find('input[id$="-base_gravable"]').val(redondear(subtotal, es_subtotal = true));
            $(tr).find('input[id$="-base_cero"]').val(0);
            $(tr).find('input[id$="-base_no_gravable"]').val(0);
            if (porcentajeICE) {
                $(tr).find('input[id$="-ice"]').val(redondear((subtotal_ice * (porcentajeICE / 100.00))));
            }
        }
        else {
            $(tr).find('input[id$="-base_no_gravable"]').val(redondear(subtotal, es_subtotal = true));
            $(tr).find('input[id$="-base_gravable"]').val(0);
            $(tr).find('input[id$="-base_cero"]').val(0);
            if (porcentajeICE) {
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
        if (!isNaN(subtotal_ice) && subtotal_ice && subtotal_ice > 0 && porcentajeICE) {
            $(tr).find('input[id$="-ice"]').val(redondear((subtotal_ice * (porcentajeICE / 100.00))));
        }
    }
    calcularTotal();
}

function DocumentoForm(data_cuentas, data_retenciones, data_retenciones_iva) {
    this.setAttributes(data_cuentas, data_retenciones, data_retenciones_iva);
}

DocumentoForm.prototype.setAttributes = function (data_cuentas, data_retenciones, data_retenciones_iva) {
    this.detalles_cuentas = new MasterDetail(data_cuentas);
    if (data_retenciones) {
        this.detalles_retenciones = new MasterDetail(data_retenciones);
    }
    if (data_retenciones_iva) {
        this.detalles_retenciones_iva = new MasterDetail(data_retenciones_iva);
    }
};

function DetalleRetencion(tr) {
    this.tr = tr;
    this.cuentafield = new ObjectField($(this.tr).find('input.object-hidden'));
    $(this.tr).find('input.date').datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true });
}

function DetalleRetencionIVA(tr) {
    this.tr = tr;
    this.cuentafield = new ObjectField($(this.tr).find('input.object-hidden'));
    $(this.tr).find('input.date').datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true });
}


function generarRetencionesIVA() {
    var rets = {}, data = {};
    var trs = '', tr, base, porcentaje, valor;
    tipo_doc = $('#TipoRegistro').val();
    $('.base-retencion-iva').each(function (key, value) {
        var codigo = $(value).attr('codigoretiva'), valor = 0.00;
        if (!rets[codigo]) {
            rets[codigo] = 0.00;
        }
        valor = parseFloat($(value).val());
        if (valor > 0 && !isNaN(valor)) {
            rets[codigo] = rets[codigo] + valor;
        }
    });
    $.each(rets, function (key, value) {
        tr_nuevo = false;
        porcentaje = parseFloat(porcent_retiva[key]);
        if (trs == '') {
            trs = 'tr.ret-iva-' + key;
        }
        else {
            trs = trs + ',' + 'tr.ret-iva-' + key;
        }
        tr = $('tr.ret-iva-' + key);
        if (tr.length <= 0) {
            documento.detalles_retenciones_iva.agregarDetalle();
            tr = documento.detalles_retenciones_iva.getLastRow();
            $(tr).addClass('ret-iva-' + key);
            tr_nuevo = true;
        }
        $(tr).find('input[id$="-tipo"]').val('IV');
        $(tr).find('input[id$="-codigo_sri"]').val(key);
        base = parseFloat(rets[key]) * (porcentaje_iva_actual / 100.00);
        base = redondear(base); //
        $(tr).find('input[id$="-base"]').val(base);
        $(tr).find('input[id$="-porcentaje"]').val(porcentaje.toFixed(2));
        valor = base * (porcentaje / 100.00);
        $(tr).find('input[id$="-valor"]').val(redondear(valor));
        //CAMBIOS HECHOS PARA SETEAR UNA CUENTA
        if (tr_nuevo == true) {
            data['tipo_doc'] = tipo_doc;
            data['codigoSri'] = key;
            $.ajax({
                type: "GET",
                url: urlprefix + "/PlanCuentas/GetRetencionesSri/",
                data: data,
                dataType: "json",
                async: true,
                success: function (data, textStatus) {
                    tr = $('tr.ret-iva-' + key);
                    if (data['Id'] && data['Descripcion']) {
                        var retencion_id = data['Id'];
                        var retencion_nombre = data['Descripcion'];
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
function generarRetencionesIR() {
    var rets = {}, data = {};
    var trs = '', tr, base, porcentaje, valor;
    tipo_doc = $('#TipoRegistro').val();
    $('.base-retencion').each(function (key, value) {
        var codigo = $(value).attr('codigoret'), valor = 0.00;
        if (!rets[codigo]) {
            rets[codigo] = 0.00;
        }
        valor = parseFloat($(value).val());
        if (valor > 0 && !isNaN(valor)) {
            rets[codigo] = rets[codigo] + valor;
        }
    });
    $.each(rets, function (key, value) {
        tr_nuevo = false;
        porcentaje = parseFloat(porcent_ret[key]);
        tipoEmisionRetencion = $('#TipoEmision').val();
        if ((porcentaje >= 0) || (tipoEmisionRetencion == 'E')) {
            if (trs == '') {
                trs = 'tr.ret-' + key;
            }
            else {
                trs = trs + ',' + 'tr.ret-' + key;
            }
            tr = $('tr.ret-' + key);
            if (tr.length <= 0) {
                documento.detalles_retenciones.agregarDetalle();
                tr = documento.detalles_retenciones.getLastRow();
                $(tr).addClass('ret-' + key);
                tr_nuevo = true;
            }
            $(tr).find('input[id$="-tipo"]').val('IR');
            $(tr).find('input[id$="-codigo_sri"]').val(key);

            base = parseFloat(rets[key]);
            t_doc = $('#TipoDocumento').val();
            if (t_doc == "EXP" && key == 327) {
                monto_ir = $('#id_monto_pagado_ir').val();
                if (monto_ir == "") {
                    monto_ir = 0;
                } else {
                    monto_ir = parseFloat(monto_ir);
                }

                base = base + monto_ir;
                $('#expensas_campos_utilidades').show();
            } else {
                $('#expensas_campos_utilidades').hide();
                $('#id_anio_utilidades').val('');
                $('#id_monto_pagado_ir').val('');
            }
            $(tr).find('input[id$="-base"]').val(base.toFixed(2));

            //CAMBIOS HECHOS PARA SETEAR EL PORCENTAJE DE UNA RETENCION
            data['codigoSri'] = key;
            $.ajax({
                type: "GET",
                url: urlprefix + "/PlanCuentas/GetRetencionesSri/",
                data: data,
                dataType: "json",
                async: false,
                success: function (data, textStatus) {

                    var es_porcentaje_variable = data['es_porcentaje_variable'];
                    //if (es_porcentaje_variable == true) {M
                    //$(tr).find('input[id$="-porcentaje"]').removeAttr('readonly');M
                    //$(tr).find('input[id$="-porcentaje"]').val(7);
                    // } else {M
                    $(tr).find('input[id$="-porcentaje"]').attr('readonly', 'true');
                    $(tr).find('input[id$="-porcentaje"]').val(porcentaje.toFixed(2));
                    valor = base * (porcentaje / 100.00);
                    $(tr).find('input[id$="-valor"]').val(redondear(valor));
                    //}M
                }
            });
            //CAMBIOS HECHOS PARA SETEAR UNA CUENTA
            if (tr_nuevo == true) {

                data['tipo_doc'] = tipo_doc;
                data['codigoSri'] = key;
                $.ajax({
                    type: "GET",
                    url: urlprefix + "/PlanCuentas/GetRetencionesSri/",
                    data: data,
                    dataType: "json",
                    async: true,
                    success: function (data, textStatus) {

                        var tr = $('tr.ret-' + key);
                        if (data['Id'] && data['Descripcion']) {
                            var retencion_id = data['Id'];
                            var retencion_nombre = data['Descripcion'];
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


//forma de pago
function DetallePagoDocumento(tr) {
    /* Clase que representa el detalle de un pago */
    /*var valor = 0;
	if($('#tdetalle_pago tr').size()==2){
		valor = $('#id_total').val();
	}
	$(tr).find('input[id$="-valor"]').val(valor);*/
    this.tr = tr; // almacena la fila que representa a un detalle

    if ($("#Id").val() != null && $("#Id").val() != "") {
        var hiddenFormaPago = $(tr).find('input[id$="-hidden_formas_pagos"]');
        var FormaPago = $(tr).find('select[id$="-forma_pago"]');
        FormaPago.val(hiddenFormaPago.val());

        var hiddenUnidad = $(tr).find('input[id$="-hidden_unidad"]');
        var Unidad = $(tr).find('select[id$="-unidad"]');
        Unidad.val(hiddenUnidad.val());
    }

}

DetallePagoDocumento.sonIguales = function (detalle1, detalle2) {
    var input1 = $(detalle1).find('input').get(0);
    var input2 = $(detalle2).find('input').get(0);
    return (input1.id == input2.id);
};


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
                    respuesta = data['respuesta'];
                    if (respuesta == 'ok') {
                        if (documento) {
                            $('#Autorizacion').val(data['autorizacion']);
                            $('#id_numero_documento').val(data['documento']);
                            $('#id_fecha_emision').val(data['fecha']);
                            $("input[data_id='id_persona_id']").val(data['persona_nombre']);
                            $('#id_persona_id').val(data['persona_id']);
                            handleFechaEmision();
                        } else {
                            $('#AutorizacionRetencion').val(data['autorizacion']);
                            $('#NumeroDocumentoRetencion').val(data['retencion']);
                            $('#FechaEmisionRetencion').val(data['fecha']);
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

function Documento(data) {
    this.setAttributes(data);
}

Documento.prototype.setAttributes = function (data) {
    this.Id = data['Id'];
    this.empresa = data['empresa'];
    this.codigo = data['Codigo'];
    this.numeroDocumento = data['NumeroDocumento'];
    this.nombreAutocomplete = data['NombreAutocomplete'];
    this.tipo_registro_documento = data['TipoRegistro'];
    this.vendedor = data['vendedor'];
    this.tipo_documento = data['TipoDocumento'];
    this.tipo_transaccion = (data['TipoRegistro'] == 'CLI' ? 'C' : 'P'); // data['tipo_transaccion'];
    this.numero_documento = data['numero_documento'];
    this.estado = data['EstadoDocumento'];
    this.fecha_emision = data['FechaEmision'];
    this.persona = data['persona'];
    this.persona_nombre_comercial = data['persona_nombre_comercial'];
    this.doctor = data['doctor'];
    this.agencia = data['agencia'];
    //this.prefacturado = data['prefacturado'];
    this.descripcion = data['descripcion'];
    this.total = data['Total'];
    this.saldo = data['Saldo'];
    this.subtotal_iva = data['subtotal_iva'];
    this.subtotal_0 = data['subtotal_0'];
    this.saldo_anticipo = data['saldo_anticipo'];
    this.iva = data['iva'];
    this.exportacion = data['exportacion'];
    this.bodega = data['bodega'];
    this.bodega_id = data['bodega_id'];
    this.bodega_desc = data['bodega_desc'];
    this.servicio = data['servicio'];
    if (this.exportacion) {
        this.puerto_embarque = data['puerto_embarque'];
        this.puerto_destino = data['puerto_destino'];
        this.pais_origen = data['pais_origen'];
        this.pais_destino = data['pais_destino'];
        this.correlativo = data['correlativo'];
        this.doc_transporte = data['doc_transporte'];
    }
};

Documento.getById = function (id, async, callback, oThis) {
    if (async == undefined) async = true;
    var documento = null;
    $.ajax({
        type: "GET",
        url: urlprefix + "/Documentos/GetDocumentos?Id=" + id,
        dataType: "json",
        async: async,
        success: function (data, textStatus) {
            if (data.data == null) {
                return;
            }
            documento = new Documento(data.data);
            if (async) {
                if (oThis) {
                    callback.call(oThis, documento);
                }
                else {
                    callback(documento);
                }
            }
        },
        error: function () {
            showMessage('Error', 'Ocurrió un error al intentar cargar el documento, por favor inténtelo nuevamente');
        }
    });
    if (!async) {
        return documento;
    }
};

function SetearUltimoLote(producto_id, bodega_id, fecha, tr, elemento) {
    $.ajax({
        type: "GET",
        url: urlprefix + "/ProductoLotes/GetLote" + "?ProductoId=" + producto_id + "&BodegaId=" + bodega_id + "&Fecha=" + fecha,
        data: { 'format': 'json' },
        dataType: "json",
        async: true,
        success: function (data, textStatus) {
            
            var lote = null;
            lote = new Lote(data.Lotes);
            //Setear El Lote Manualmente (No funka setObj)
            //$(tr).find('input[id$="-lotefield"]').attr("disabled", "disabled");
            $(tr).find('input[id$="-lotefield"]').val(1);

            var div = $(tr).find('input[id$="-lotefield"]').closest("div");
            //$(div).find('.object-description').val(lote['lote'] + ' - exp: ' + lote['fecha_expiracion']);
            $(div).find('.object-description').val(lote['descripcion']);

            $(tr).find('input[id$="-lote"]').val(lote['lote']);
            $(tr).find('input[id$="-fecha_expiracion"]').val(lote['fecha_expiracion']);


            //            var div_lote = $(tr).find('div[class$="lote_egreso"]');
            //            var input_lote = $(div_lote).find("input[type$='text']");
            //            var boton_lote = $(div_lote).find("span[type$='button']");
            //            $(input_lote).attr("readonly","readonly", "disabled", "disabled");
            //            $(boton_lote).attr("disabled", "disabled");
            //            $(boton_lote).unbind( "click" );
            bloquear_lote(tr);

        },
        error: function () {
            return null;
        }
    });
}
