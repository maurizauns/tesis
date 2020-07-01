var movimiento = null;
var temporal = ''
var temporal_cheque = ''
function handleSelectTipoRegistroMovimiento() {
    var html_combo = '';
    if ($('#TipoMovimiento').val() == 'ING') {
        if (tipo == 'D')
            html_combo += "<option value = 'D' selected = ''>Depósito</option>";
        else
            html_combo += "<option value = 'D'>Depósito</option>";
        if (tipo == 'N')
            html_combo += "<option value = 'N' selected = ''>Transferencia/NC</option>";
        else
            html_combo += "<option value = 'N'>Transferencia/NC</option>";
    } else {
        if (tipo == 'C')
            html_combo += "<option value = 'C' selected = ''>Cheque</option>";
        else
            html_combo += "<option value = 'C'>Cheque</option>";
        if (tipo == 'T')
            html_combo += "<option value = 'T' selected = ''>Transferencia/ND</option>";
        else
            html_combo += "<option value = 'T'>Transferencia/ND</option>";
    }
    $('#SubTipoMovimiento').html(html_combo);
    handleSelectTipoMovimiento();
}

function handleSelectTipoMovimiento() {
    if ($('#SubTipoMovimiento').val() == 'C') {
        $(".campo_cheque").show();
        $(".numero_comprobante").hide();
    } else {
        $(".campo_cheque").hide();
        $(".numero_comprobante").show();
    }
}

function calcularTotal(clase) {
    var total = 0, valor;
    $.each($('#tdetalle .' + clase + ':not(input[id^="id_template-"])'), function () {
        valor = $(this).val();
        if (isNumber(valor)) {
            $(this).css('color', 'black');
            valor = parseFloat(valor);
            total = total + valor;
        }
        else {
            $(this).css('color', 'red');
        }
    });
    $('#tftotales .' + clase).html('$' + total.toFixed(2));
}

function getNumeroCheque() {
    var cuenta_id = '', movimiento_id = '', data = {};
    cuenta_id = $('#MisBancosId').val();
    movimiento_id = $('#Id').val();
    if (cuenta_id && ($('#NumeroCheque').val() == '' || $('#NumeroCheque').val() == temporal_cheque)) {
        data['Id'] = cuenta_id;
        data['transaccion_id'] = movimiento_id;
        data['tipo_transaccion'] = 'M';
        $.ajax({
            type: "GET",
            url: urlprefix + "/MisBancos/GetNumeroCheque/",
            data: data,
            dataType: "json",
            async: true,
            success: function (data) {
                var numero_cheque = data.numero;
                $('#NumeroCheque').val(numero_cheque);
                temporal_cheque = numero_cheque;
            }
        });
    }
}

$(function () {
    //$('#tabs').tabs();
    handleSelectTipoRegistroMovimiento();
    handleSelectTipoMovimiento();
    calcularTotal("valor-monto");
    personafield = new ObjectField($('#PersonasId'));
    urlpersonafield = personafield['dlgUrl'];
    //personafield.dlgUrl = urlpersonafield + '?tipopersona=CLIPRO';
    personafield.onSetObj = function () {
        if ($('#PagueseOrden').val() == '' || $('#PagueseOrden').val() == temporal) {
            //nombre_persona = $($('#campo_persona')).find('input[data_id="id_persona_id"]').val();
            nombre_persona = personafield.obj.razon_social;
            $('#PagueseOrden').val(nombre_persona);
        }
        //temporal = $($('#campo_persona')).find('input[data_id="id_persona_id"]').val();
        temporal = nombre_persona;
    };

    cuenta_bancaria_field = new ObjectField($('#MisBancosId'));
    cuenta_bancaria_field.onSetObj = function () { getNumeroCheque(); };
    temporal_cheque = $('#NumeroCheque').val();
    movimiento = new Movimiento({
        'templateDetalle': $('#dtemplate'),
        'tableDetalle': $('#tdetalle'),
        'prefixDetalle': 'template',
        'funcCompDetalle': DetalleMovimiento.sonIguales,
        'klassDetalle': DetalleMovimiento
    });

    $("#dlgImprimir").dialog({
        bgiframe: true,
        title: "Imprimir cheque",
        autoOpen: false,
        height: 240,
        width: 420,
        resizable: false,
        modal: true
    });
    $('#dlgImprimir').dialog('option', 'buttons', {
        'Cerrar': function () {
            $(this).dialog('close');
        }
    });
    $('#banco').bind('change', function () {
        $('#id_formato').val($("#banco").val());
    });
    if ($('#id_formato').val() == "") {
        $('#id_formato').val("1")
    }

    $.each({

        '#Anulado': false

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
});

function imprimirCheque(url) {
    $('#dlgImprimir').show();
    $('#iframeApplet').attr('src', url);
    $('#dlgImprimir').dialog('open');
}

function registrarMovimiento() {
    document.forms.chequeForm.submit();
    $('#guardar-mov').attr("href", "javascript:;");
}

function duplicarMov() {
    $('#duplicar').val('1');
    document.forms.chequeForm.target = "_blank";
    document.forms.chequeForm.action = "/sistema/banco/movimiento/registrar/";
    document.forms.chequeForm.submit();
    document.forms.chequeForm.target = "";
    document.forms.chequeForm.action = "";
    $('#duplicar').val('0');
}


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
                    var url = "/MovimientoBancos"
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
