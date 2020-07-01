var transaccion = null;
var trancuentas = null;
var trananticipos = null;
var documentofield = null;
var modificado = false;

$(function () {

    $('body').on('click', 'a.btn_detalle_copiar_saldo', function () {
        var tr = $(this).closest('tr');
        var anticipo_saldo = $(tr).find('.anticipo_saldo').html();
        var valor_pago = $(tr).find('input[id$="-valor_pago"]');
        if (parseFloat(anticipo_saldo) >= 0) {
            valor_pago.val(anticipo_saldo);
        }
    });

    var personafield = new ObjectField($('#trpersona').find('input.object-hidden'));

    personafield.onSetObj = function (obj) {
        debugger
        if (obj) {
            $("#detalle_anticipos .anticipo_persona").find("input[id$='-persona']").val(obj['id'])
            $("#detalle_anticipos .anticipo_persona").find('input[class~="object-description"]').val(obj['nombre_comercial'])
        }
    };

    documentofield = new ObjectField($('#DocumentosId'));

    var urldocumento = documentofield.dlgUrl;

    documentofield.onButtonClick = function () {
        var personaid = $('#PersonasId').val();
        if (personaid) {
            documentofield.dlgUrl = urldocumento + '?personasId=' + personaid + '&excluir_cotizacion=1&excluir_prefactura=1&incluir_dac=1'; //estado=P &
            return true;
        } else {
            showMessage('Cruce de documentos', 'Debe seleccionar a la persona');
            return false;
        }
    };

    documentofield.elDescription.bind('selected', function () {
        var obj = documentofield.obj;
        
        if (obj) {
            if (obj.tipo_documento == "DAC") {
                $('#docsaldo').html(obj.saldo_anticipo);
            } else {
                $('#docsaldo').html(obj.saldo);
            }
            if (obj.tipo_transaccion == 'C') {
                $('#tipotran').html('Cobro');
                $('#TipoTransaccionesId').val('Cobro');
                $('#forma_pago_sri').hide();
            } else {
                $('#tipotran').html('Pago');
                $('#TipoTransaccionesId').val('Pago');
                $('#forma_pago_sri').show();
            }
        } else {
            $('#tipotran').val('');
            $('#docsaldo').html('');
        }
    });
    // Se crea detalle de documentos
    transaccion = new TransaccionForm({
        'templateDetalle': $('#dtemplate_documento'),
        'tableDetalle': $('#tdetalle_documento'),
        'prefixDetalle': 'template',
        'funcCompDetalle': DetalleDocumento.sonIguales,
        'klassDetalle': DetalleDocumento
    });

    // Se crea detalle los anticipos	
    trananticipos = new MasterDetail({
        'templateDetalle': $('#dtemplate_anticipo'),
        'tableDetalle': $('#tdetalle_anticipo'),
        'prefixDetalle': 'template',
        'funcCompDetalle': DetalleAnticipo.sonIguales,
        'klassDetalle': DetalleAnticipo
    });

    // detalles de las cuentas
    trancuentas = new MasterDetail({
        'templateDetalle': $('#dtemplate_cuentas'),
        'tableDetalle': $('#tdetalle_cuentas'),
        'prefixDetalle': 'template',
        'funcCompDetalle': DetalleCuenta.sonIguales,
        'klassDetalle': DetalleCuenta
    });

    //Anticipos - Persona
    fields_persona_anticipos = $('#tdetalle_anticipo').find('input[id$="-persona"]');
    fields_persona_anticipos.each(function (index) {
        if (index != 0) {
            anticipo_personafield = new ObjectField($(this));
            ////////////////////////////// 
            var tr = $(this).closest("tr");
            var el_input_persona = $(tr).find("input[id$='-persona']");
            dtanticipo = trananticipos.getDetalle(tr);
            var urlanticipo = dtanticipo.anticipoField.dlgUrl;

            dtanticipo.anticipoField.onButtonClick = function () {
                var personaid_cabecera = $('#PersonasId').val();
                var pesonaid_detalle = el_input_persona.val();
                if (personaid_cabecera != '' && pesonaid_detalle == '') {
                    dtanticipo.anticipoField.dlgUrl = urlanticipo + '?personasId=' + personaid_cabecera + '&tipo_transaccion=P';
                    return true;
                } else if (personaid_cabecera != '' && pesonaid_detalle != '') {
                    dtanticipo.anticipoField.dlgUrl = urlanticipo + '?personasId=' + pesonaid_detalle + '&tipo_transaccion=P';
                    return true;
                } else {
                    showMessage('Cruce de documentos', 'Debe seleccionar a la persona en la cabecera ');
                    return false;
                }
            };
            /////////////////////////
        }
    });

    $('#btn_agregar_det_anticipo').click(function () {
        trananticipos.agregarDetalle();
        var tr = trananticipos.getLastRow();
        var el_input_persona = $(tr).find("input[id$='-persona']");
        anticipo_personafield = new ObjectField(el_input_persona);
        dtanticipo = trananticipos.getDetalle(tr);
        var urlanticipo = dtanticipo.anticipoField.dlgUrl;

        dtanticipo.anticipoField.onButtonClick = function () {
            var personaid_cabecera = $('#PersonasId').val();
            var pesonaid_detalle = el_input_persona.val();

            if (personaid_cabecera != '' && pesonaid_detalle == '') {
                dtanticipo.anticipoField.dlgUrl = urlanticipo + '?personasId=' + personaid_cabecera + '&tipo_transaccion=P';
                return true;
            } else if (personaid_cabecera != '' && pesonaid_detalle != '') {
                dtanticipo.anticipoField.dlgUrl = urlanticipo + '?personasId=' + pesonaid_detalle + '&tipo_transaccion=P';
                return true;
            } else {
                showMessage('Cruce de documentos', 'Debe seleccionar a la persona en la cabecera ');
                return false;
            }
        };
        //astro
        anticipo_personafield.onSetObj = function () {
            $(tr).find("input[id$='-anticipo_id']").val('');
            $(tr).find('td.anticipo_anticipo input[class~="object-description"]').val('');
        };

    });
});

$(document).on("submit", "form.frmCruceDocumentos", function () {
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
                    var url = "/CruceDocumentos"
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
