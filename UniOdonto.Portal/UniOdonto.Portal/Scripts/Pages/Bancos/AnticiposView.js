var anticipo = null;
var temporal = '';
var temporal_cheque = '';
var personafield = null;
var safe_url_personafield = null;
var bandera = '0';
function handleSelectTipoRegistroAnticipo() {
    var html_combo = '';
    if ($('#TipoMovimiento').val() == 'ING') {
        if ($('#SubTipoMovimiento').val() == 'D')
            html_combo += "<option value = 'D' selected = ''>Depósito</option>";
        else
            html_combo += "<option value = 'D'>Depósito</option>";
        if ($('#SubTipoMovimiento').val() == 'N')
            html_combo += "<option value = 'N' selected = ''>Transferencia/NC</option>";
        else
            html_combo += "<option value = 'N'>Transferencia/NC</option>";
    } else {
        if ($('#SubTipoMovimiento').val() == 'C')
            html_combo += "<option value = 'C' selected = ''>Cheque</option>";
        else
            html_combo += "<option value = 'C'>Cheque</option>";
        if ($('#SubTipoMovimiento').val() == 'T')
            html_combo += "<option value = 'T' selected = ''>Transferencia/ND</option>";
        else
            html_combo += "<option value = 'T'>Transferencia/ND</option>";
    }
    $('#SubTipoMovimiento').html(html_combo);
    handleSelectTipoMovimiento();
    //Traer la Cuenta Contable de Anticipo
    var cuenta_anticipo = $('#id_1-cuenta_id').val();

    if (cuenta_anticipo == '' || bandera == '1') {
        var tipo_registro_anticipo, data = {};
        tipo_registro_anticipo = $('#TipoMovimiento').val();
        if (tipo_registro_anticipo) {
            data['tipo_registro_anticipo'] = tipo_registro_anticipo;
            $.ajax({
                type: "GET",
                url: urlprefix + "/banco/cuenta_anticipo/",
                data: data,
                dataType: "json",
                async: true,
                success: function (data, textStatus) {
                    var td = $('td.cuenta-anticipo');
                    if (data['cuenta_id'] && data['cuenta_nombre']) {
                        var cuenta_id = data['cuenta_id'];
                        var cuenta_nombre = data['cuenta_nombre'];
                        $(td).find('input[id$="id_1-cuenta_id"]').val(cuenta_id);
                        $(td).find('input[class~="object-description"]').val(cuenta_nombre);
                        bandera = '1';
                    }
                }
            });
        }
    }
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

function getNumeroCheque() {
    var cuenta_id = '', anticipo_id = '', data = {};
    cuenta_id = $('#MisBancosId').val();
    anticipo_id = $('#id_id').val();
    if (cuenta_id && ($('#id_numero_cheque').val() == '' || $('#id_numero_cheque').val() == temporal_cheque)) {
        data['cuenta_id'] = cuenta_id;
        data['transaccion_id'] = anticipo_id;
        data['tipo_transaccion'] = 'A';
        $.ajax({
            type: "GET",
            url: urlprefix + "/banco/numero_cheque/",
            data: data,
            dataType: "json",
            async: true,
            success: function (data, textStatus) {
                var numero_cheque = data['numero-cheque'];
                $('#id_numero_cheque').val(numero_cheque);
                temporal_cheque = numero_cheque;
            }
        });
    }
}

$(function () {
    //$('#tabs').tabs();
    handleSelectTipoRegistroAnticipo();
    handleSelectTipoMovimiento();
    $('#id_fecha_emision').datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true });
    $('#id_fecha_cheque').datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true });
    $('#TipoMovimiento').bind('change', function () {
        personafield['dlgUrl'] = safe_url_personafield + '?tipopersona=' + this.value;
    });
    cuentaanticipofield = new ObjectField($('#id_cuenta_anticipo_id'));
    reservacionfield = new ObjectField($('#id_reservacion'));
    personafield = new ObjectField($('#PersonasId'));
    personafield.onSetObj = function () {
        if ($('#PagueseOrden').val() == '' || $('#PagueseOrden').val() == temporal) {
            nombre_persona = personafield.obj.razon_social;
            $('#PagueseOrden').val(nombre_persona);
        }
        temporal = personafield.obj.razon_social;
    };
    safe_url_personafield = personafield['dlgUrl'];
    $('#TipoMovimiento').bind('change', function () {
        personafield['dlgUrl'] = safe_url_personafield + '?tipopersona=' + this.value;
    });
    $("#TipoMovimiento").trigger("change");
    cuenta_bancaria_field = new ObjectField($('#MisBancosId'));
    cuenta_bancaria_field.onSetObj = function () { getNumeroCheque(); };
    anticipo = new Anticipo({
        'templateDetalle': $('#dtemplate'),
        'tableDetalle': $('#tdetalle'),
        'prefixDetalle': 'template',
        'funcCompDetalle': DetalleAnticipo.sonIguales,
        'klassDetalle': DetalleAnticipo
    });
    //temporal_cheque = $('#id_numero_cheque').val();
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
});

function imprimirCheque(url) {
    $('#dlgImprimir').show();
    $('#iframeApplet').attr('src', url);
    $('#dlgImprimir').dialog('open');
}

function registrarAnticipo() {
    document.forms.anticipoForm.submit();
    $('#guardar_anticipo').attr("href", "javascript:;");
}

function duplicarAnt() {
    $('#duplicar').val('1');
    document.forms.anticipoForm.target = "_blank";
    document.forms.anticipoForm.action = "/sistema/banco/anticipo/registrar/";
    document.forms.anticipoForm.submit();
    document.forms.anticipoForm.target = "";
    document.forms.anticipoForm.action = "";
    $('#duplicar').val('0');
}

$(document).on("submit", "form.frmAnticipo", function () {
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
                    var url = "/MovimientoBancos";
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