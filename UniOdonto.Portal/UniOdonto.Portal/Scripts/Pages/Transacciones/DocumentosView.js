$(function () {
   
    decimales = getNumeroDecimales();
    $("#NumeroDocumento").mask("999-999-9?99999999");

    $("#Autorizacion").mask("999?9999999999999999999999999999999999999999999999");
    $("#AutorizacionRetencion").mask("999?9999999999999999999999999999999999999999999999");

    personafield = new ObjectField($('#PersonasId'), true);

    safe_url_personafield = personafield['dlgUrl'];



    $('#Vencimiento').bind('keyup', handleSelectVencimiento);

    $('#Vencimiento').trigger("keyup");

    $.each({

        '#Notificar': false,
        '#SinMovimiento': false,
        '#IvaManual': false,

    }, function (key, value) {

        $(key).bind('click', function () { showFieldWhenValue(key, value); });
        showFieldWhenValue(key, value);

    });

    function showFieldWhenValue(checkboxSelector, fieldSelector) {

        if ($(checkboxSelector).is(':checked')) {
            $(checkboxSelector).val(true);
        }
        else {
            $(checkboxSelector).val(false);
        }
    }

    //cambiarTamanio($('#Autorizacion'));

    persona_retfield = new ObjectField($('#id_persona_retencion'), true);

    $('#TipoRegistro').bind('change', function () {
        var tiporeg = $('#TipoRegistro').val();
        if (bool_cambio == 0) {
            bool_cambio = 1;
        }
        else {
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
            $('.descuento-ice input[type=text]').each(function (key, value) {
                var prefix;
                prefix = getPrefix($(value).attr('id'));
                if ((prefix != 'id_producto_template') && (prefix.indexOf('id_producto_') == 0)) {
                    calcularSubtotalProducto(value);
                }
            });


            $('#trrecepcionmercaderia').hide();
        } else {
            $('.td-gasto').css('display', 'table-cell');
            $('.vendedor').hide();


            $('.precio-compra').show();
            $('.unidades').show();
            $('.label-unidad').hide();
            $('.precio-venta').hide();
            $('.descuento-ice').show();


            $('#trrecepcionmercaderia').show();
        }
        // Se muestra / esconden los campos de serie
        $('.seriado').not('.label-unidad').each(function (key, value) {
            if ((tiporeg == 'CLI' && $(value).hasClass('serie-venta')) ||
                (tiporeg != 'CLI' && $(value).hasClass('serie-compra'))) {
                $(value).show();
            }
            else {
                $(value).hide();
            }
        });

        personafield['dlgUrl'] = safe_url_personafield + '?tipopersona=' + this.value;

        handleSelectTipoDocumento();
        getNumeroAutorizacion();
        getNumeroAutorizacionRetencion();
        handleTipoRegistroTipoDocumento();
        $($('.doc_reemb_prov')[0]).trigger('keyup');
        calcularTotalIBPNRProductos();
        validarSecuenciaDna();
        
        if (es_documento_electronico) {
            $(".div_reembolso_gasto").hide();
            var tipo_documento_proveedor = ['LQC'];
            var tipo_documento_cliente = ['FAC', 'NDT', 'NCT', 'REE'];

            if (tiporeg == 'CLI') {
                $('#TipoDocumento').find("option[value='LQC']").hide();
                $('#TipoDocumento').find("option[value='FAC']").show();
                $('#TipoDocumento').find("option[value='NDT']").show();
                $('#TipoDocumento').find("option[value='NCT']").show();
                $('#TipoDocumento').find("option[value='REE']").show();
                $('#TipoDocumento').val("FAC");
            } else {
                $('#TipoDocumento').find("option[value='LQC']").show();
                $('#TipoDocumento').find("option[value='FAC']").hide();
                $('#TipoDocumento').find("option[value='NDT']").hide();
                $('#TipoDocumento').find("option[value='NCT']").hide();
                $('#TipoDocumento').find("option[value='REE']").hide();
                $('#TipoDocumento').val("LQC");
            }
            consultar_secuencia();
            consultar_secuencia_retencion();
        }
    });

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
    boton.css('padding', '4');

    div_btn.css('position', 'relative');
    div_btn.css('float', 'right');

    $("#cuentas").find('input[class~="object-description"]').hide();
    boton = $("#cuentas").find('span[class~="btn-default"]');
    div_btn = boton.closest("div");
    boton.removeClass('input-group-addon');
    boton.css('padding', '4');

    div_btn.css('position', 'relative');
    div_btn.css('float', 'right');

    retIrfield.onSetObj = function (obj) {
        var retirid = obj['id'];
        var retirnombre = obj['codigo'];
        div = $("#productos");
        var rets = $(div).find('input[id$="-tipo_retencion_ir_id"]');
        $(producto.detalles).each(function () {
            this.tiporetirfield.setObj(obj);
        });
    };
    retIvafield.onSetObj = function (obj) {
        $(producto.detalles).each(function () {
            this.tiporetivafield.setObj(obj);
        });
    };

    retIrcuentasfield.onSetObj = function (obj) {
        $(documento.detalles_cuentas.detalles).each(function () {
            this.tiporetirfield.setObj(obj);
        });
    };
    retIvacuentasfield.onSetObj = function (obj) {
        $(documento.detalles_cuentas.detalles).each(function () {
            this.tiporetivafield.setObj(obj);
        });
    };

    $('#TipoEmision').bind('change', function () { handleSelectTipoRetencion(true); });
    handleSelectTipoRetencion(false);
    //FIN RETENCIONES

    if ($('#BodegasId').is('*')) {
        bodegafield = new ObjectField($('#BodegasId'));
        safe_url_bodegafield = bodegafield['dlgUrl'];
        var tipoRegistro = $('#TipoRegistro').val();
        ;
    }



    personafield.onSetObj = function (obj) {

        tipo_documento = $("#TipoDocumento").val();

        if (obj && obj.aplicar_cupo) {
            if (tipo_documento != 'PTO') {
                $('#id_vencimiento').val(obj.dias_credito);
            } else {

            }
        }

        if (obj) {
            actualizarDetallesProductosPVPXPersona(obj['es_pvp_default_manual']);

            artesanal = obj['artesanal'];
            exterior = obj['exterior'];


            id = obj['id'];

            //Comentado MAURICIo
            //$.ajax({
            //    url: urlprefix + "/persona/consultar_trans/" + id + "/",

            //    type: "GET",
            //    async: true,
            //    data: { 'test': '1' },
            //    beforeSend: function () {
            //    },
            //    error: function (data) {
            //        //console.log("error");
            //    },
            //    success: function (data) {
            //        respuesta = data['respuesta'];

            //        if (respuesta == '1') {

            //            $('#persona_transportista').removeClass('hide');
            //        }
            //        else {
            //            $('#persona_transportista').addClass('hide');
            //        }

            //    },
            //    complete: function () {

            //    }
            //});//fin ajax

        } else {
            artesanal = false;
            exterior = false;
        }
        getNumeroAutorizacion(); setearIVA(); setearIVA_no_autorizados(); calcularTotal();

        if (obj) { porcentaje_descuento = obj['descuento']; }

        if (obj) { setearVendedor(obj); }

        //pvp por defecto
        //
        //if (obj && obj['pvp_default']) {
        //    $('#id_pvp_default').val(obj['pvp_default']);  //Asignamos el valor por defecto de la personas a este Id
        //    
        //    if (!cotizacion_rel && !prefactura_rel && !ordencompraventa_rel) {
        //        var valores = $('.label-unidad');
        //        for (var i = 1; i < valores.length; i++) {
        //            celda = valores[i];

        //            producto.eliminarDetalles(celda);

        //        }
        //    }

        //} else {
        //    $('#id_pvp_default').val('');
        //}



        //cargarDetalleRetencionProveedor();  comentado  Mauricio


    };

    producto = new MasterDetail({
        'templateDetalle': $('#dtemplate_producto'),
        'tableDetalle': $('#tdetalle_producto'),
        'prefixDetalle': 'template',
        'funcCompDetalle': DetalleProductoForm.sonIguales,
        'klassDetalle': DetalleProductoForm
    });

    producto.agregarDetalle();

    $('#IvaManual').bind('click', AplicaIva12);
    AplicaIva12();

    $('#TipoDocumento').bind('change', generarRetencionesIR);

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

    pagos = new MasterDetail({
        'templateDetalle': $('#dtemplate_pago'),
        'tableDetalle': $('#tdetalle_pago'),
        'prefixDetalle': 'template',
        'funcCompDetalle': DetallePagoDocumento.sonIguales,
        'klassDetalle': DetallePagoDocumento
    });

    documento = new DocumentoForm(data_detalle_cuentas, data_detalle_retenciones, data_detalle_retenciones_iva);

    $('#id_monto_pagado_ir').bind('keyup', generarRetencionesIR);

    $("#tabs_retenciones").click(function () {
        generarRetencionesIVA();
        generarRetencionesIR();

    });
    verificarReembolsoGasto();


    $("#EstablecimientoRetencion").change(function () {
        consultar_secuencia_retencion();
    });

    $("#PuntoEmisionRetencion").keyup(function () {
        consultar_secuencia_retencion();
    });

    $("#TipoEmision").change(function () {
        consultar_secuencia_retencion();

    });



    documentoField = new ObjectField($('#DocumentosRelacionadoId'));
    urldocumento = documentoField['dlgUrl'];
    documentoField.onButtonClick = function () {
        var personaid, tiporeg;
        personaid = $('#PersonasId').val();
        tiporeg = $('#TipoRegistro').val();
        tipo_documento = $('#TipoDocumento').val();
        if (personaid) {
            documentoField.dlgUrl = urldocumento + '?personasId=' + personaid + '&tipo_registro=' + tiporeg + '&tipo_documento=' + tipo_documento + '&buscar_doc_relacionado=1';
            if ($('#TipoDocumento').val() == 'NCL') {
                documentoField.dlgUrl = documentoField.dlgUrl + '&solo_dna=1';
            } else if ($('#TipoDocumento').val() == 'NCT' || $('#TipoDocumento').val() == 'NDT') {
                documentoField.dlgUrl = documentoField.dlgUrl + '&excluir_cotizacion=1' + '&excluir_dna=1';
            }
            return true;
        } else {
            showMessage('Registrar Documento', 'Para seleccionar el documento debe seleccionar primero a la persona');
            return false;
        }
    };
    documentoField.onSetObj = function (obj) {
        if (!hay_error) {
            //var valores = $("#productos").find('.label-unidad');
            //for (var i = 1; i < valores.length; i++) {
            //    celda = valores[i];
            //    producto.eliminarDetalles(celda);
            //}
            //var valores = $('.label-cuenta');
            //for (var i = 1; i < valores.length; i++) {
            //    celda = valores[i];
            //    documento.detalles_cuentas.eliminarDetalles(celda);
            //}
            if ($('#TipoDocumento').val() == 'NCT' || $('#TipoDocumento').val() == 'NCL') {
                porcentaje_descuento = 0;
                if (obj) {
                    getDetallesDocumento(obj['id'], 'doc');
                }
            }
            // Agregar item de servicio en NC
            if (es_documento_electronico && obj['servicio'] > 0 && cuenta_servicio != null) {
                documento.detalles_cuentas.agregarDetalle();
                tr = documento.detalles_cuentas.getLastRow();
                dt = documento.detalles_cuentas.getDetalle(tr);
                var cta = Cuenta.getByIdForce(cuenta_servicio, false);
                $(tr).find('input[id$="-cantidad"]').val(1);
                $(tr).find('input[id$="-porcentaje_descuento"]').val();
                $(tr).find('select[id$="-porcentaje_iva"]').val('');
                $(tr).find('input[id$="-valor"]').val(obj['servicio']);
                $('#id_desactivar_servicio').selected(false);
                dt.cuentafield.setObj(cta);
            }
        }
        else { hay_error = false; console.log("aaaa"); }


        if (obj['vendedor']) {
            setearVendedorNC(obj);
        }

        if (obj['exportacion']) {
            $('#id_exportacion').selected(true);
            $('.check_exportacion').show();
            $('.exportacion').show();

            $('#id_puerto_embarque').val(obj['puerto_embarque']);
            $('#id_pais_origen').val(obj['pais_origen']);
            $('#id_puerto_destino').val(obj['puerto_destino']);
            $('#id_pais_destino').val(obj['pais_destino']);
            $('#id_doc_transporte').val(obj['doc_transporte']);
            $('#id_correlativo').val(obj['correlativo']);

        }
        actualizarIVA();
    };

    $("#TipoRegistro").trigger("change");
    $('#TipoDocumento').bind('change', handleSelectTipoDocumento);
    if (es_documento_electronico) {
        $("#Establecimiento").change(function () {
            consultar_secuencia();
        });

        $("#PuntoEmision").keyup(function () {
            consultar_secuencia();
        });

        $("#TipoDocumento").change(function () {
            consultar_secuencia();
        });

        consultar_secuencia();
        consultar_secuencia_retencion();
    }

    //Cargar pto de emision y estab por default

    var esta_ptoe_default = '001-001';
    if (esta_ptoe_default) {
        var esta_ptoe_default = esta_ptoe_default.split('-');
        establec = esta_ptoe_default[0];
        pto_emis = esta_ptoe_default[1];
        $('#Establecimiento').val(establec);
        $('#PuntoEmision').val(pto_emis);
    }

    if (!hay_error) {
        duplicar = "1";
    }


    if (!hay_error) {
        duplicar = "";

        if (duplicar != "1") {
            pagos.agregarDetalle();
        }
    }
    primera_carga = false;
    /* por revisar carga de autorizacion */
    getNumeroAutorizacion();

    crearSelectizeEmail();
});



function mostrarAdjuntos(url) {
    $('#dlgAdjuntos').modal();
    $('#dlgAdjuntos .modal-body').prepend('<div class="indicator show"><span class="spinner spinner16"></span></div>');
    var documento_id = null;

    if ($('#Id').length) {
        var documento_id = $('#Id').val();
    } else {
        if ($('#Id').length) {
            var documento_id = $('#Id').val();
        } else {
            documento_id = null;
        }
    }
    if (documento_id != null && documento_id != '') {
        $.ajax({
            url: urlprefix + "/registro/documento/administrar_adjuntos/" + documento_id,
            type: "GET",
            async: true,
            data: {},
            beforeSend: function () {
            },
            error: function () {
            },
            success: function (data) {
                $('#dlgAdjuntos .modal-body').html(data);
            },
            complete: function () {
            }
        });
    } else {
        $('#dlgAdjuntos .modal-body').html("El documento no se ha guardado, por favor guardar antes de subir adjuntos");
    }
}

function consultar_secuencia() {
    
    var cambiar_secuencia = true;
    var tipoDocumento = $("#TipoDocumento").val();
    var establecimiento = $("#Establecimiento").val();
    var puntoEmision = $("#PuntoEmision").val();
    //puntoEmision = puntoEmision.replace(/\_/g,'');
    if (puntoEmision == '___') { cambiar_secuencia = false; }
    if (puntoEmision == '' || puntoEmision == 'NaN') {
        $("#PuntoEmision").val("001");
        puntoEmision = 1;
    }
    if (numero_documento != null) {
        establec = numero_documento.substr(0, 3);
        punto_em = numero_documento.substr(4, 3);
        if (establecimiento == establec && parseInt(puntoEmision) == parseInt(punto_em)) {
            cambiar_secuencia = false;
            $("#NumeroDocumento").val(numero_documento);
        }
    }
    if (cambiar_secuencia) {
        var datos = { 'establecimiento': parseInt(establecimiento), 'puntoEmision': parseInt(puntoEmision), 'tipoDocumento': tipoDocumento };
        $.ajax({
            url: "/Documentos/GetDocumentosSecuencia/",
            type: "GET",
            async: true,
            data: datos,
            beforeSend: function () { },
            error: function () {
                showMessage('Cargar Secuencia', 'Ha existido un inconveniente al tratar de cargar');
            },
            success: function (data) {
                $("#NumeroDocumento").val(data["numero_documento"]);
            },
            complete: function () { }
        });
    }
}

function consultar_secuencia_retencion() {
    var tipoRet = $("#TipoEmision").val();
    if (tipoRet == 'E') {
        var cambiar_secuencia_ret = true;
        var tipoDocumento = $("#TipoDocumento").val();
        var establecimientoRetencion = $("#EstablecimientoRetencion").val();
        var puntoEmisionRetencion = $("#PuntoEmisionRetencion").val();
        puntoEmisionRetencion = puntoEmisionRetencion.replace(/\_/g, '');
        if (puntoEmisionRetencion == '' || puntoEmisionRetencion == 'NaN' || parseInt(puntoEmisionRetencion) == 0) {
            $("#PuntoEmisionRetencion").val("1");
            puntoEmisionRetencion = 1;
        }
        if (numero_retencion != '' && tipo_retencion_data == 'E') {
            establec = numero_retencion.substr(0, 3);
            punto_em = numero_retencion.substr(4, 3);
            if (establecimientoRetencion == establec && parseInt(puntoEmisionRetencion) == parseInt(punto_em)) {
                cambiar_secuencia_ret = false;
                $("#NumeroDocumentoRetencion").val(numero_retencion);
            }
        }
        if (cambiar_secuencia_ret) {
            
            var datos = { 'establecimiento': establecimientoRetencion, 'puntoEmision': puntoEmisionRetencion, 'tipoDocumento': tipoDocumento };
            $.ajax({
                url: "/Documentos/GetDocumentosSecuenciaRetencion/",
                type: "GET",
                async: true,
                data: datos,
                beforeSend: function () { },
                error: function () {
                    alert('Ha existido un inconveniente al tratar de cargar ');
                },
                success: function (data) {
                    $("#NumeroDocumentoRetencion").val(data["numero_documento_retencion"]);
                },
                complete: function () { }
            });
        }
    }

}

function habilitarNumDoc() {
    $("#NumeroDocumento").attr("readonly", false);
}
function habilitarNumDocRet() {
    $("#NumeroDocumentoRetencion").attr("readonly", false);
}

function bloquearCabeceraPrefactura() {

    $("#TipoDocumento").attr("disabled", "disabled");
    $("#NumeroDocumento").attr("readonly", true);
    var div_persona = $('#persona_documento .input-group');
    var input_persona = $(div_persona).find("input[type$='text']");
    var boton_persona = $(div_persona).find("span[type$='button']");
    $(input_persona).attr("readonly", "readonly", "disabled", "disabled");
    $(boton_persona).attr("disabled", "disabled");
    $(boton_persona).unbind("click");

}



function desbloquearCabeceraPrefactura() {

    $("#TipoDocumento").removeAttr("disabled");
    $("#NumeroDocumento").removeAttr("readonly");
    var div_persona = $('#persona_documento .input-group');
    var input_persona = $(div_persona).find("input[type$='text']");
    var boton_persona = $(div_persona).find("span[type$='button']");
    $(input_persona).removeAttr("readonly");
    $(input_persona).removeAttr("disabled");
    $(boton_persona).removeAttr("disabled");

}

function mostrarDescuento(url) {
    $('#dlgDcto').modal();
}

function AplicarDscto() {
    $('#dlgDcto').modal('hide');
    var valor = $('#porcentaje_descuento_masivo_producto').val();
    if (!isNaN(valor)) {
        var valores = $('#productos').find('input[id$="-porcentaje_descuento"]');
        for (var i = 0; i < valores.length; i++) {
            $(valores[i]).val(valor);
            calcularSubtotalProducto($(valores[i]));
        }
        if ($("#TipoDocumento").val() == 'PTO') {
            var valores = $('#productospre').find('input[id$="-porcentaje_descuento"]');
            for (var i = 0; i < valores.length; i++) {
                $(valores[i]).val(valor);
                calcularSubtotalProducto($(valores[i]));
            }
        }
    }
}
function dialogoEnvioProformaPDF() {
    $("#div_proformaPdf").show();
    $("#dlg_proformaPdf").modal({ backdrop: 'static', keyboard: false });
}

function crearSelectizeEmail() {
    $("#para").selectize({
        plugins: ['remove_button'],
        delimiter: ' ',
        persist: false,
        maxItems: 2,
        valueField: "email",
        labelField: "name",
        searchField: ["email"],
        options: [],
        render: {
            item: function (item, escape) {
                return "<div>" +
                (item.email ? "<small class=\"text-muted ml10\">" + escape(item.email) + "</small>" : "") +
                "</div>";
            },
            option: function (item, escape) {

                var label = item.email;
                return "<div>" +
                    "<span class=\"text-primary\">" + escape(label) + "</span>" +
                    "</div>";
            }
        },
        create: function (input) {
            if ((new RegExp("^" + REGEX_EMAIL + "$", "i")).test(input)) {
                return {
                    email: input
                };
            }
            var match = input.match(new RegExp("^([^<]*)\<" + REGEX_EMAIL + "\>$", "i"));
            if (match) {
                return {
                    email: match[2]
                };
            }
            return false;
        }
    });
}

function handleEnvioProforma() {
    if ($("#para").val() == "") {
        warning("Campo Para: es obligatorio");
        return false;
    }
    enviarProforma();
}

function enviarProforma() {
    $('#aceptar_enviar_proforma').attr("disabled", "disabled");
    $("#div_cargando").show();
    $("#dlg_proformaPdf .modal-body").append('<div id="div_cargando" style="display: none;" class="indicator show"><span class="spinner spinner1"></span>');
    
    var data = new FormData();
    data.append("id", $("#Id").val());
    data.append("de", $("#de").val());
    data.append("para", $("#para").val());
    data.append("asunto", $("#asunto").val());
    data.append("mensaje", $("#mensaje").val());

    $.ajax({
        url: urlEmail,
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (result) {
            //alert(result.respuesta);
            info(result.respuesta)
            //Se cierra el modal
            $("#div_proformaPdf").modal("hide");
            $("#dlg_proformaPdf").modal("hide");
            $('#aceptar_enviar_proforma').removeAttr("disabled", "disabled");
            $("#dlg_proformaPdf .modal-body #div_cargando").remove();
        },
        error: function () {
        }
    });
}

function bloquear_presupuesto() {

    $("#id_fecha_emision").datepicker("destroy");
    $("#id_fecha_emision").attr("readonly", "readonly");
    $("#id_vencimiento").attr("readonly", "readonly");

    $("#id_referencia").attr("readonly", "readonly");
    $("#id_actividad_id").attr("readonly", "readonly");
    $("#id_adicional1").attr("readonly", "readonly");
    $("#id_adicional2").attr("readonly", "readonly");

    $('#id_vendedor_id option:not(:selected)').attr('disabled', true);
    //pidgey

    var persona = $("#persona_documento");
    var input_persona = $(persona).find("input[type$='text']");
    var boton_persona = $(persona).find("span[type$='button']");
    input_persona.attr("readonly", "readonly");
    boton_persona.attr("disabled", "disabled");
    boton_persona.unbind("click");

    items = $("#productospre").find('input[id$="-producto_id"]');

    for (var i = 0; i < items.length; i++) {
        var td = $(items[i]).closest('td');
        $(td).find('input[id$="-producto_id"]').attr("readonly", "readonly");
        $(td).find('input[class~="object-description"]').attr("readonly", "readonly");
        $(td).find("span[type$='button']").attr("disabled", "disabled");
        $(td).find("span[type$='button']").attr("disabled", "disabled");
        $(td).find("span[type$='button']").unbind("click");
    }

    nom = $("#productospre").find('textarea[id$="-nombre_manual"]');
    for (var i = 0; i < nom.length; i++) {
        $(nom[i]).attr("readonly", "readonly");
    }

    cant = $("#productospre").find('input[id$="-cantidad"]');
    for (var i = 0; i < cant.length; i++) {
        $(cant[i]).attr("readonly", "readonly");
    }

    desc = $("#productospre").find('input[id$="-porcentaje_descuento"]');
    for (var i = 0; i < desc.length; i++) {
        $(desc[i]).attr("readonly", "readonly");
    }

    precio = $("#productospre").find('input[id$="-precio_venta_manual"]');
    for (var i = 0; i < precio.length; i++) {
        $(precio[i]).attr("readonly", "readonly");
        var div = $(precio[i]).closest('div');
        $(div).find("button[type$='button']").attr("disabled", "disabled");
        $(div).find("button[type$='button']").unbind("click");
    }

    pvp = $("#productospre").find('select[id$="-precio_venta"]');
    for (var i = 0; i < pvp.length; i++) {
        $(pvp[i]).find('option:not(:selected)').attr('disabled', true);
        $(pvp[i]).attr("readonly", "readonly");
    }

    /*for(var i=0;i<nom.length;i++) {
        var tdn = $(nom[i]).closest('td');
        $(tdn).find('textarea[id$="-nombre_manual"]').attr("readonly", "readonly");
    }*/
}

function handleTipoDocumentoPorReembolso() {
    try {
        var tipoDocumento = document.getElementById('TipoDocumento').value;
        var tipoPersona = document.getElementById('TipoRegistro').value;
        var tipoEmisionRetencion = document.getElementById('TipoEmision').value;

        if (tipoDocumento == 'REE' && tipoPersona == "PRO" && tipoEmisionRetencion == 'E') {
            $('.tipo_doc').show();
        } else {
            $('.tipo_doc').hide();
        }
    } catch (e) {
        console.log("no se esta registrando un documento.");
        console.log(e);
    }
}

function completaSecuenciaNumeroDocumentoFisico() {
    var tipoDocu = $('#TipoDocumento').val();
    var numDocu = $('#NumeroDocumento').val();
    var partesNumDocu = numDocu.split('-');

    var cadenaSinSubguionNiguion = numDocu.replace(/_/g, '');
    cadenaSinSubguionNiguion = cadenaSinSubguionNiguion.replace(/-/g, '');

    try {
        if (cadenaSinSubguionNiguion.length > 6 && partesNumDocu.length > 2) {
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
                    $('#NumeroDocumento').val(partesNumDocu[0] + '-' + partesNumDocu[1] + '-' + mascara + terceraParteFormat);
                }
            }
        }
    } catch (e) {

    }
}


function completaSecuenciaNumeroDocumentoRetencionFisico() {
    var numDocu = $('#NumeroDocumentoRetencion').val();
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
                $('#NumeroDocumentoRetencion').val(partesNumDocu[0] + '-' + partesNumDocu[1] + '-' + mascara + terceraParteFormat);
            }
        }
    } catch (e) {

    }
}

$('#TipoDocumento').change(handleTipoDocumentoPorReembolso);
$('#TipoRegistro').change(handleTipoDocumentoPorReembolso);
$('#TipoEmision').change(handleTipoDocumentoPorReembolso);

$(document).ready(function () {
    $("#NumeroDocumentoRetencion").mask("999-999-9?99999999");
    $("#AutorizacionRetencion").mask("999?9999999999999999999999999999999999999999999999");

    // seteando los listeners
    $('#TipoDocumento').change(handleTipoDocumentoPorReembolso);
    $('#TipoRegistro').change(handleTipoDocumentoPorReembolso);
    $('#TipoEmision').change(handleTipoDocumentoPorReembolso);
    // para la primera carga
    handleTipoDocumentoPorReembolso();
    $('#NumeroDocumento').focusout(function () {
        completaSecuenciaNumeroDocumentoFisico();
    });

    $('#NumeroDocumentoRetencion').focusout(function () {
        completaSecuenciaNumeroDocumentoRetencionFisico();
    });
});

function bloquear_lote(tr) {

}