var deposito = null;
var ajax = null;
var habilitarEgresosCaja = false;

var cajaField = null;
var posField = null;
var carga_inicial = true;
var cajaurl = null;

$(function () {
    var cuentafield = new ObjectField($('#trcuenta').find('input.object-hidden'));

    if (!carga_inicial) {
        $("#tdetalle_transaccion").find('input[type=checkbox]').change(calcularTotalDeposito);
        calcularTotalDeposito();
    }

    $('#FechaCorte').change(function () {
        cajaFieldLimpiar();
        getDepositos();
    });
});

function handleSelectCaja() {
    cajaFieldLimpiar();
    getDepositos();
}

function cajaFieldLimpiar() {
    if (cajaField == null) {
        return;
    }
    $(cajaField.el).val("");
    $(cajaField.elDescription).val("");
}

function imagenCargandoMostrar() {
    $("#tdetalle_transaccion").html("");
    var imagen = '<img src="/Content/Images/busy.gif">';
    $("#transacciones").append('<div align="center" class="div_cargando" style="width:auto; heigth:auto;">' + imagen + '</div>')
}

function imagenCargandoMostrarEgreso() {
    $("#tdetalle_egreso").html("");
    var imagen = '<img src="/Content/Images/busy.gif">';
    $("#egresos").append('<div align="center" class="div_cargandoegreso" style="width:auto; heigth:auto;">' + imagen + '</div>')
}

function getDepositos() {
    if (!carga_inicial) {
        carga_inicial = true;
        return;
    }

    if (ajax != null) ajax.abort();
    $(".div_cargando").remove();
    $(".div_cargandoegreso").remove();

    var fecha = moment($("#FechaCorte").val(), 'DD/MM/YYYY').format();
    var cierre_caja = null;
    var pos = null;
    if ((fecha == null || fecha == '') && (cierre_caja == null || cierre_caja == '')) return;
    ajax = $.ajax({
        url: "/Depositos/GetTransacciones/",
        type: "POST",
        async: true,
        data: {
            "cargar_transacciones": 1,
            'fecha_corte': fecha,
            'filtro_caja': $("#PlanCuentasCajaId").val(),
            'cierre_caja': cierre_caja,
            'pos': pos
        },
        beforeSend: imagenCargandoMostrar,
        error: function (jqXHR, textStatus, errorThrown) {
            if (textStatus != "abort") alert("Ha existido un inconveniente al cargar los depósitos.");
        },
        success: function (data) {
            $("#tdetalle_transaccion").html(data);
            $("#tdetalle_transaccion").find('input[type=checkbox]').change(calcularTotalDeposito);
            calcularTotalDeposito();
        },
        complete: function () {
            $(".div_cargando").remove();
            ajax = null;
        }
    });
}
function calcularTotalDeposito() {
    /* Calcula el total del depósito dependiendo de las transacciones
    seleccionadas */
    var total = 0.00, prefix;
    $('.chk_dep_trans').each(function () {
        if (this.checked) {
            prefix = $(this).attr('name')
            prefix = prefix.substring(0, prefix.search(/-/));
            total = total + parseFloat($('#' + prefix + '-total').val());
        }
    }
    );

    if (habilitarEgresosCaja) {
        var totalEgreso = 0;
        $("#tdetalle_egreso").find(".totalegreso").each(function () {
            totalEgreso = totalEgreso + parseFloat($(this).val());
        });
        $('#td-totalegresos').html('$ ' + totalEgreso.toFixed(2));
        $('#td-totalcobros').html('$ ' + total.toFixed(2));
        $('#td-total').html('$ ' + (total - totalEgreso).toFixed(2));
    }
    else {
        $('#td-total').html('$ ' + total.toFixed(2));
    }
}

function setChecked(estado) {
    $('#tdetalle_transaccion').find(':checkbox').each(function () {
        $(this).prop("checked", estado);
    });
    calcularTotalDeposito();
}

$(function () {
    $('#customcheckbox-tar').change(function () {
        if ($(this).is(':checked')) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    });
    $('#FechaCorte').attr('readonly', 'true');
});


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
                    var url = "/Depositos"
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