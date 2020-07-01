

$(function () {
    var cuentafield = new ObjectField($('#PlanCuentasId'));
    cuentafield.onSetObj = getTransacciones;
    $('#FechaEmision').change(getTransacciones);
    $('input[type=checkbox]').change(calcularSaldo);
    $('#check-all').on('click', function (e) {
        var is_check = $(this).prop('checked');
        if (is_check) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    });
});

function getMovimientoIndex(id) {
    if (id) {
        return parseInt(id.substring(11, id.indexOf('-')));
    }
    return 0;
}

function registrarConciliacion(val) {
    document.forms.conForm.submit();
    $('#guardar').attr("href", "javascript:;");
}

function getTransacciones() {
    if ($('#FechaEmision').val() && $('#PlanCuentasId').val() && ($('#FechaEmision').val() != fechaCorte || $('#PlanCuentasId').val() != banco)) {
        // Se eliminan los datos de la tabla de movimientos
        $('#tdetalle tr').not('#dtemplate').remove();
        var fecha = moment($("#FechaEmision").val(), 'DD/MM/YYYY').format();
        // se obtienen los nuevos datos
        $.getJSON('/Conciliaciones/GetMovimientosPendientes/?banco_id=' + $('#PlanCuentasId').val() + '&fecha_corte=' + fecha, function (data) {
            var i, tr, cssclass;
            fechaCorte = $('#FechaEmision').val();
            banco = $('#PlanCuentasId').val();
            $.each(data, function (key, val) {
                debugger;
                tr = cloneTemplate($('#dtemplate'), $('#tdetalle'), 'template', key);
                if (key % 2 == 0) {
                    tr.addClass('even');
                } else {
                    tr.addClass('odd');
                }
                if (key == 0) {
                    $('#detalle_' + key + '-detalle').html("<b>Saldo Inicial:</b>");
                    $('#detalle_' + key + '-monto').html('$' + parseFloat(val.Monto).toFixed(2));
                    $('#id_detalle_0-seleccionar, #id_detalle_0-movimiento_id').remove();
                    $(tr).find('.checkbox').remove();
                    saldoInicial = parseFloat(val.Monto);
                    total = saldoInicial;
                    $('#SaldoInicial').val(saldoInicial.toFixed(2));
                    $('#SaldoFinal').val(saldoInicial.toFixed(2));
                }
                else {
                    $('#id_detalle_' + key + '-movimiento_id').val(val.Id);
                    $('#id_detalle_' + key + '-modulo').val(val.Modulo);
                    $('#detalle_' + key + '-fecha').html(val.Fecha);
                    $('#detalle_' + key + '-detalle').html(val.Detalle);
                    $('#detalle_' + key + '-referencia').html(val.Referencia);
                    // $('#detalle_' + key + '-tipo').html('(' + val[7] + ') ' + val[5]);
                    var simbol = '';
                    if (val.Tipo == '+') {
                        simbol = "<i class='fa fa-plus text-success'></i>  ";
                    }
                    else {
                        simbol = "<i class='fa fa-minus text-danger'></i>  ";
                    }

                    $('#detalle_' + key + '-tipo').html(simbol + val.TipoMovimiento);
                    $('#detalle_' + key + '-monto').html('$' + parseFloat(val.Monto).toFixed(2));
                    if (val.Tipo == '+') {
                        total = total + parseFloat(val.Monto);
                    }
                    else {
                        total = total - parseFloat(val.Monto);
                    }
                }
            });
            $('#Total').val(total.toFixed(2));
            if ($("#tdetalle tr:last").hasClass('even')) {
                cssclass = 'odd';
            } else {
                cssclass = 'even';
            }
            i = getMovimientoIndex($("#tdetalle tr:last").find('input[type=checkbox]').attr('id')) + 1;
            tr = cloneTemplate($('#dtemplate'), $('#tdetalle'), 'template', i);
            tr.addClass(cssclass);
            $('#detalle_' + i + '-detalle').html("<b>Saldo Final:</b>");
            $('#detalle_' + i + '-monto').html('$' + parseFloat(saldoInicial).toFixed(2));
            $('#id_detalle_' + i + '-seleccionar, #id_detalle_' + i + '-movimiento_id').remove();
            $(tr).find('.checkbox').remove();
            $('input[type=checkbox]').change(calcularSaldo);
        });
        $('[data-toggle="tooltip"]').tooltip();
    }
}

function calcularSaldo() {
    debugger
    //var saldo = parseFloat($("#tdetalle tr:last").find('td[id*=monto]').html().substring(1).replace(',', ''));
    var re = /[()$,]/g;

    var saldo = parseFloat($("#tdetalle tr:last").find('td[id*=monto]').html().replace(re, ''));
    var id = getMovimientoIndex(this.id);
    if (!isNaN(id)) {
        var monto = parseFloat($('#detalle_' + id + '-monto').html().substring(1).replace(',', ''));
        if ($('#detalle_' + id + '-tipo').html().indexOf('fa-minus') > 0) {
            if (this.checked) {
                monto = monto * -1;
            }
        } else {
            if (!this.checked) {
                monto = monto * -1;
            }
        }

        saldo = saldo + monto;
        if (isNaN(saldo)) {
            saldo = 0;
        }
        $("#tdetalle tr:last").find('td[id*=monto]').html('$' + saldo.toFixed(2));
        $('#SaldoFinal').val(saldo.toFixed(2));
    }
}

function setChecked(checked) {
    debugger
    $('input[type=checkbox]').prop('checked', checked);
    if (checked) {
        $("#tdetalle tr:last").find('td[id*=monto]').html('$' + total.toFixed(2));
        $('#SaldoFinal').val(total.toFixed(2));
    } else {
        $("#tdetalle tr:last").find('td[id*=monto]').html('$' + saldoInicial.toFixed(2));
        $('#SaldoFinal').val(saldoInicial.toFixed(2));
    }
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
                    var url = "/Conciliaciones";
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