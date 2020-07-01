var cuentafield = null;
var transaccion = null;
var urlcuenta = null;
var temporal = '';

var urlProvincias;
var urlCiudades;

$(function () {
    new ObjectField($('#MisBancosId'));
    new ObjectField($('#TarjetasLotesId'));
    
    $.each({
        '#Anulado': false,
        '#Efectivo': false,
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

    personafield = new ObjectField($('#trpersona').find('input.object-hidden'));


    personafield.onSetObj = function () {
        var fecha, persona_id, tipo_transaccion, data = {};
        fecha = $('#FechaEmision').val();
        fecha = moment(fecha, 'DD/MM/YYYY').format();
        tipo_transaccion = $('#TipoTransaccionesId option:selected').html();
        persona_id = $('#PersonasId').val();
        if (fecha && tipo_transaccion && persona_id) {
            data['Fecha'] = fecha;
            data['TipoTransaccion'] = tipo_transaccion;
            data['Id'] = persona_id;
            $.ajax({
                type: "GET",
                url: urlprefix + "/Personas/GetSaldo/",
                data: data,
                dataType: "json",
                async: true,
                success: function (data, textStatus) {
                    var mensaje = data['mensaje'];
                    $('#mensaje').html(mensaje);
                }
            });
        }
        //LLenado del campo Paguese a la orden de:
        if ($('#PagueseOrden').val() == '' || $('#PagueseOrden').val() == temporal) {
            //nombre_persona = $($('#campo_persona')).find('input[class~="object-description"]').val();
            nombre_persona = personafield.obj.razon_social;
            $('#PagueseOrden').val(nombre_persona);
        }
        temporal = nombre_persona;
        temporal = personafield.obj.razon_social;
    };

    cuentafield = new ObjectField($('#trcuenta').find('input.object-hidden'))

    urlcuenta = cuentafield['dlgUrl'];
    cuentafield.onButtonClick = function () {
        var tipocuenta, tipotran;
        var tipoTransaccion = $('#TipoTransaccionesId option:selected').text();
        tipotran = $('#FormaPagoCobroId option:selected').text().toUpperCase();
       
        if (tipotran == 'TARJETA DE CRÉDITO') {
            tipotran = 'TC'
        }

        if ((tipotran == 'CHEQUE' || tipotran == 'TRANSF') && (tipoTransaccion == 'Pago')) {
            tipocuenta = 'Banco';
        }
        else if (tipotran == 'CAJA CHICA') {
            tipocuenta = 'Caja Chica';
        }
        else if ((tipotran == 'CAJA' || tipotran == 'CHEQUE') && tipoTransaccion == 'Cobro') {
            tipocuenta = 'Caja';
        }
        else if (tipotran == 'TC') {
            if ($('#TipoTransaccionesId option:selected').text() == 'Cobro') {
                tipocuenta = 'CCTC';
            }
            else {
                tipocuenta = 'CPTC';
            }
        } else if (tipotran == 'ELEC') {
            tipocuenta = 'ELECTRONICO';
        }
        cuentafield.dlgUrl = urlcuenta + '?tipocuenta=' + tipocuenta;
        return true;
    };

    transaccion = new TransaccionForm({
        'templateDetalle': $('#dtemplate_documento'),
        'tableDetalle': $('#tdetalle_documento'),
        'prefixDetalle': 'template',
        'funcCompDetalle': DetalleDocumento.sonIguales,
        'klassDetalle': DetalleDocumento
    });
    $('#TipoTransaccionesId').bind('change', handleSelectTipoTransaccion);
   
    //$("#TipoTransaccionesId").trigger("change");
    $('#FormaPagoCobroId').bind('change', handleSelectTipoCobroPago);
    $('#Efectivo').bind('change', esEfectivo);
    handleSelectTipoTransaccion();
    $('body').on('click', 'a.btn_detalle_copiar_saldo', function () {
        var tr = $(this).closest('tr');
        var doc_saldo = $(tr).find('.documento_saldo').html();
        var valor_pago = $(tr).find('input[id$="-valor_pago"]');
        if (parseFloat(doc_saldo) >= 0) {
            valor_pago.val(doc_saldo);
            calcularTotal();
        }
    });
});

$(document).on("change", "#TipoTransaccionesId", function () {
    var paisId = $(this).val();
    loadSelect3("#FormaPagoCobroId", urlProvincias, { id: paisId }, "", function () {
        var provinciaId = $("#FormaPagoCobroId").val();
        loadSelect3("#TipoFormaPagoCobroId", urlCiudades, { id: provinciaId });
        handleSelectTipoCobroPago();
    });
    //$('#Codigo').val("");
    //$('#PersonasId').val("");
});


$(document).on("change", "#FormaPagoCobroId", function () {
    var provinciaId = $(this).val();
    loadSelect2("#TipoFormaPagoCobroId", urlCiudades, { id: provinciaId });
});

function handleSelectTipoCobroPago() {
    var tipotran;
    var tipotransaccion;
    cuentafield.reset();
    es_cruce = es_crucex();

    if ($('#TipoTransaccionesId option:selected').html() == 'Cobro') {
        tipotran = $('#FormaPagoCobroId option:selected').html();
    }
    else if ($('#TipoTransaccionesId option:selected').html() == 'Pago') {
        tipotran = $('#FormaPagoCobroId option:selected').html();
    }
    tipotran = tipotran.toUpperCase().trim();
    tipotransaccion = $('#TipoTransaccionesId option:selected').html();
    
    if (es_cruce == false) {
        if (tipotransaccion == 'Pago' && tipotran == 'DINERO ELCTRÓNICO') {
            $('div.pagueseOrden').hide();
            $('div.cuentaAfectada').hide();
            $('div.anulado').hide();
            $('div.tipoFormaPagoCobro').hide();
            $('div.misBancos').hide();
            $('div.numeroDocumento').show();
            $('div.numeroCheque').hide();
            $('div.fechaCheque').hide();
            $('div.tarjetasLotes').hide();
        } else if (tipotransaccion == 'Pago' && tipotran == 'TARJETA DE CRÉDITO') {
            $('div.pagueseOrden').hide();
            $('div.cuentaAfectada').show();
            $('div.anulado').hide();
            $('div.tipoFormaPagoCobro').show();
            $('div.misBancos').hide();
            $('div.numeroDocumento').show();
            $('div.numeroCheque').hide();
            $('div.fechaCheque').hide();
            $('div.tarjetasLotes').hide();
        } else if (tipotransaccion == 'Pago' && tipotran == 'CAJA CHICA') {
            $('div.pagueseOrden').hide();
            $('div.cuentaAfectada').show();
            $('div.anulado').hide();
            $('div.tipoFormaPagoCobro').hide();
            $('div.misBancos').hide();
            $('div.numeroDocumento').hide();
            $('div.numeroCheque').hide();
            $('div.fechaCheque').hide();
            $('div.tarjetasLotes').hide();
        } else if (tipotransaccion == 'Pago' && tipotran == 'TRANSFERENCIA') {
            $('div.pagueseOrden').hide();
            $('div.cuentaAfectada').hide();
            $('div.anulado').hide();
            $('div.tipoFormaPagoCobro').show();
            $('div.misBancos').show();
            $('div.numeroDocumento').show();
            $('div.numeroCheque').hide();
            $('div.fechaCheque').hide();
            $('div.tarjetasLotes').hide();
        } else if (tipotransaccion == 'Pago' && tipotran == 'CHEQUE') {
            $('div.pagueseOrden').show();
            $('div.cuentaAfectada').hide();
            $('div.anulado').show();
            $('div.tipoFormaPagoCobro').show();
            $('div.misBancos').show();
            $('div.numeroDocumento').hide();
            $('div.numeroCheque').show();
            $('div.fechaCheque').show();
            $('div.tarjetasLotes').hide();
        } else if (tipotransaccion == 'Cobro' && tipotran == 'DINERO ELCTRÓNICO') {
            $('div.pagueseOrden').hide();
            $('div.cuentaAfectada').show();
            $('div.anulado').hide();
            $('div.tipoFormaPagoCobro').hide();
            $('div.misBancos').hide();
            $('div.numeroDocumento').show();
            $('div.numeroCheque').hide();
            $('div.fechaCheque').hide();
            $('div.tarjetasLotes').hide();
        } else if (tipotransaccion == 'Cobro' && tipotran == 'TARJETA DE CRÉDITO') {
            $('div.pagueseOrden').hide();
            $('div.cuentaAfectada').show();
            $('div.anulado').hide();
            $('div.tipoFormaPagoCobro').hide();
            $('div.misBancos').hide();
            $('div.numeroDocumento').show();
            $('div.numeroCheque').hide();
            $('div.fechaCheque').hide();
            $('div.tarjetasLotes').show();
        } else if (tipotransaccion == 'Cobro' && tipotran == 'TRANSFERENCIA') {
            $('div.pagueseOrden').hide();
            $('div.cuentaAfectada').hide();
            $('div.anulado').hide();
            $('div.tipoFormaPagoCobro').hide();
            $('div.misBancos').show();
            $('div.numeroDocumento').show();
            $('div.numeroCheque').hide();
            $('div.fechaCheque').hide();
            $('div.tarjetasLotes').hide();
        } else if (tipotransaccion == 'Cobro' && tipotran == 'CHEQUE') {
            $('div.pagueseOrden').hide();
            $('div.cuentaAfectada').show();
            $('div.anulado').hide();
            $('div.tipoFormaPagoCobro').hide();
            $('div.misBancos').hide();
            $('div.numeroDocumento').hide();
            $('div.numeroCheque').show();
            $('div.fechaCheque').show();
            $('div.tarjetasLotes').hide();
        } else {
            $('div.pagueseOrden').hide();
            $('div.cuentaAfectada').show();
            $('div.anulado').hide();
            $('div.tipoFormaPagoCobro').hide();
            $('div.misBancos').hide();
            $('div.numeroDocumento').show();
            $('div.numeroCheque').hide();
            $('div.fechaCheque').hide();
            $('div.tarjetasLotes').hide();
        }

        if (tipotran == 'CAJA') {
            $('#tag_efectivo').show();
            $('#Efectivo').show();
            $('.es_efectivo').show();
        } else {
            $('#tag_efectivo').hide();
            $('#Efectivo').hide();
            $('.es_efectivo').hide();
        }
        //Campos para que aparezca la Cuenta Contable
        var tipotran = $('#TipoTransaccionesId option:selected').html();
        var formacobropago;
        if ($('#TipoTransaccionesId option:selected').html() == 'Cobro')
            formacobropago = $('#FormaPagoCobroId option:selected').html().toUpperCase().trim();
        else
            formacobropago = $('#FormaPagoCobroId option:selected').html().toUpperCase().trim();
        if ((tipotran == 'Cobro' && formacobropago == 'TRANSFERENCIA') || (tipotran == 'Pago' && formacobropago == 'CHEQUE') || (tipotran == 'Pago' && formacobropago == 'TRANSFERENCIA')) {
            $('#trcuentabancaria').show();
            $('#trcuenta').hide();
        } else {
            $('#trcuentabancaria').hide();
            $('#trcuenta').show();
        }


        $('.info-cruce').hide();
        $('.info-transaccion').show();
    } else {
        $('.no-info-cruce').hide();
        $('.info-cruce').show();
    }
}

function es_crucex() {
    return ($('#TipoTransaccionesId option:selected').html() == 'R');
    if (es_cruce == 'True') {
        return true;
    } else {
        return false;
    }
}

$(document).on("submit", "form.frmCobrosPagos", function () {
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
                    var url = "/Transacciones";
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

function esEfectivo() {
    if ($('#Efectivo').is(":checked")) {
        if ($('#NumeroDocumento').val() == '') {
            $('#NumeroDocumento').val('EFECTIVO');
        }
    } else {
        if ($('#NumeroDocumento').val() == 'EFECTIVO') {
            $('#NumeroDocumento').val('');
        }
    }
}

function calcularTotal(e) {
    var total = 0;
    var valores = $('input[id$="-valor_pago"]'), valor;
    for (var i = 0; i < valores.length; i++) {
        valor = parseFloat(valores[i].value);
        if (valor > 0 && !isNaN(valor)) {
            total = total + valor;
        }
    }
    $('.total-final').html(total.toFixed(2));
    $('.total-documentos').show();
}

function handleSelectTipoTransaccion() {
    var tipotran = $('#TipoTransaccionesId option:selected').text();
    cuentafield.reset();
    safe_url_personafield = personafield['dlgUrl'];
    if (tipotran == 'Cobro') {
        personafield['dlgUrl'] = urlprefix + '/Personas/ListaPersonas/' + '?tipopersona=' + 'CLI';

        $('#tab_documentos').trigger('click');
        $('#trtipocobro').show();
        $('#trtipopago').hide();
        //$('.info-cruce').hide();
        //$('.no-info-cruce').show();
    } else if (tipotran == 'Pago') {
        personafield['dlgUrl'] = urlprefix + '/Personas/ListaPersonas/' + '?tipopersona=' + 'PRO';

        $('#tab_documentos').trigger('click');
        $('#trtipocobro').hide();
        $('#trtipopago').show();
        //$('.info-cruce').hide();
        //$('.no-info-cruce').show();
    } else if (tipotran == 'R') {
        $('#trtipocobro').hide();
        $('#trtipopago').hide();
        //$('.no-info-cruce').hide();
        //$('.info-cruce').show();
    }

    var paisId = $("#TipoTransaccionesId").val();
    var tipoFormaId = $("#FormaPagoCobroId").val();
    var tipoFormaPagoId = $("#TipoFormaPagoCobroId").val();
    loadSelect3("#FormaPagoCobroId", urlProvincias, { id: paisId }, tipoFormaId, function () {
        var provinciaId = $("#FormaPagoCobroId").val();
        loadSelect3("#TipoFormaPagoCobroId", urlCiudades, { id: provinciaId },tipoFormaPagoId);
    });
    handleSelectTipoCobroPago();

  
}