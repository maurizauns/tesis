function getCuentaRetencionIR() {

    data = {};
    td = $('.cuenta_retencion_ir');
    $('#PlanCuentasIrId').val('');
    $(td).find('input[class~="object-description"]').val('');
    //SETEAR UNA CUENTA CONTABLE
    data['tipo_doc'] = 'PRO';
    td = $('.codigo_retencion_ir');
    data['codigoSri'] = $(td).find('input[class~="object-description"]').val();
    $.ajax({
        type: "GET",
        url: urlprefix + "/Contabilidad/GetCuentaRetencionIrTC/",
        data: data,
        dataType: "json",
        async: true,
        success: function (data, textStatus) {
            debugger
            td = $('.cuenta_retencion_ir');
            if (data['Id'] && data['Descripcion']) {
                var retencion_id = data['Id'];
                var retencion_nombre = data['Descripcion'];
                $('#PlanCuentasIrId').val(retencion_id);
                $(td).find('input[class~="object-description"]').val(retencion_nombre);
            }
        }
    });
}

function getCuentaRetencionIVA() {
    debugger
    data = {};
    td = $('.cuenta_retencion_iva');
    $('#PlanCuentasIvaId').val('');
    $(td).find('input[class~="object-description"]').val('');
    //SETEAR UNA CUENTA CONTABLE
    data['tipo_doc'] = 'PRO';
    td = $('.codigo_retencion_iva');
    data['codigoSri'] = $(td).find('input[class~="object-description"]').val();
    $.ajax({
        type: "GET",
        url: urlprefix + "/Contabilidad/GetCuentaRetencionIvaTC/",
        data: data,
        dataType: "json",
        async: true,
        success: function (data, textStatus) {
            debugger
            td = $('.cuenta_retencion_iva');
            if (data['Id'] && data['Descripcion']) {
                var retencion_id = data['Id'];
                var retencion_nombre = data['Descripcion'];
                $('#PlanCuentasIvaId').val(retencion_id);
                $(td).find('input[class~="object-description"]').val(retencion_nombre);
            }
        }
    });
}

$(function () {
    tipo_retencion_ir = new ObjectField($('#RetencionesIrId'));
    tipo_retencion_ir.onSetObj = function () {
        getCuentaRetencionIR();
    };
    new ObjectField($('#PlanCuentasIrId'));

    tipo_retencion_iva = new ObjectField($('#RetencionesIvaId'));
    tipo_retencion_iva.onSetObj = function () {
        getCuentaRetencionIVA();
    };
    new ObjectField($('#PlanCuentasIvaId'));
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
                    var url = "/TarjetaCreditoComercio"
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
