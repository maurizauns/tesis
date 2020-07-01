var carga_inicial = true;
var reposicion = null;
var temporal = '';
var temporal_cheque = '';
var ajax = null;

$(function () {
    personafield = new ObjectField($('#PersonasId'));
    personafield.onSetObj = function () {
        if ($('#PagueseOrden').val() == '' || $('#PagueseOrden').val() == temporal) {
            nombre_persona = personafield.obj.razon_social;
            $('#PagueseOrden').val(nombre_persona);
        }
        temporal = personafield.obj.razon_social;
    };
    cuenta_bancaria_field = new ObjectField($('#MisBancosId'));
    cuenta_caja_chica_field = new ObjectField($('#PlanCuentasCajaId'));
    cuenta_bancaria_field.onSetObj = function () { getNumeroCheque(); };

    $('#FechaCorte').change(function () {
        getTransacciones();
    });

    cuenta_caja_chica_field.onSetObj = function () {
        getTransacciones();
    };

    if (!carga_inicial) {
        $("#tdetalle_transaccion").find('input[type=checkbox]').change(calcularTotalReposicion);
        calcularTotalReposicion();
    }
});

function calcularTotalReposicion() {
    /* Calcula el total de la reposicion de caja chica dependiendo de las transacciones seleccionadas */
    var total = 0.00, prefix;
    $('.chk_rep_trans').each(function () {
        if (this.checked) {
            prefix = $(this).attr('name')
            prefix = prefix.substring(0, prefix.search(/-/));
            total = total + parseFloat($('#' + prefix + '-total').val());
        }
    }
    );
    $('#td-total').html('$ ' + total.toFixed(2));
}

function getNumeroCheque() {
    var cuenta_id = '', reposicion_id = '', data = {};
    cuenta_id = $('#MisBancosId').val();
    reposicion_id = $('#Id').val();
    if (cuenta_id && ($('#NumeroCheque').val() == '' || $('#NumeroCheque').val() == temporal_cheque)) {
        data['Id'] = cuenta_id;
        data['transaccion_id'] = reposicion_id;
        data['tipo_transaccion'] = 'R';
        $.ajax({
            type: "GET",
            url: urlprefix + "/MisBancos/GetNumeroCheque/",
            data: data,
            dataType: "json",
            async: true,
            success: function (data, textStatus) {
                var numero_cheque = data.numero;
                $('#NumeroCheque').val(numero_cheque);
                temporal_cheque = numero_cheque;
            }
        });
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

function setChecked(estado) {
    /* Setea el estado de todos los checkboxes a checked */
    $('#tdetalle_transaccion').find(':checkbox').each(function () {
        $(this).prop("checked", estado);
    });
    calcularTotalReposicion();
}

$(function () {

    handleSelectTipoMovimiento();
    $('#customcheckbox-tar').change(function () {
        if ($(this).is(':checked')) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    });
    $('#id_fecha_corte').attr('readonly', 'true');
});

function getTransacciones() {
    if ($('#FechaCorte').val() && $('#PlanCuentasCajaId').val()) {
        if (!carga_inicial) {
            carga_inicial = true;
            return;
        }

        if (ajax != null) ajax.abort();
        $(".div_cargando").remove();
        
        var fecha = moment($("#FechaCorte").val(), 'DD/MM/YYYY').format();
        var cuenta_caja_chica = $("#PlanCuentasCajaId").val();
        ajax = $.ajax({
            url: "/MovimientoBancoReposiciones/GetTransacciones/",
            type: "GET",
            async: true,
            data: { "cargar_transacciones": 1, 'fecha_corte': fecha, 'cuenta_caja_chica': cuenta_caja_chica },
            beforeSend: imagenCargandoMostrar,
            error: function (jqXHR, textStatus, errorThrown) {
                if (textStatus != "abort") alert("Ha existido un inconveniente al cargar las transacciones.");
            },
            success: function (data) {
                $("#tdetalle_transaccion").html(data);
                $("#tdetalle_transaccion").find('input[type=checkbox]').change(calcularTotalReposicion);
                calcularTotalReposicion();
            },
            complete: function () {
                $(".div_cargando").remove();
                ajax = null;
            }
        });
    }
}

function imagenCargandoMostrar() {
    $("#tdetalle_transaccion").html("");
    var imagen = '<img src="/Content/Images/busy.gif">';
    $("#transacciones").append('<div align="center" class="div_cargando" style="width:auto; heigth:auto;">' + imagen + '</div>');
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