function EjercicioContableCallback(data) {
    $('#Id').val(data.Id);
    $('#Codigo').val(data.Codigo);
    $('#Descripcion').val(data.Descripcion);
    $('#FechaInicio').val(data.FechaInicio);
    $('#FechaFin').val(data.FechaFin);
    $('#CierreMensual').val(data.CierreMensual);
    $('#CierreMensual').prop("checked", data.CierreMensual);
    $('#EmpresaId').val(data.EmpresaId);
    
}

$(function () {
    $.each({
        '#CierreMensual': false,
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

$(document).on("submit", "form.frmPersonas", function () {
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
                    $('#CierreMensual').prop("checked", false);
                    $('#CierreMensual').val(false);
                    success(d.message || "Grabado Correctamente !!");
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

function nuevo() {
    $('#CierreMensual').prop("checked", false);
    $('#CierreMensual').val(false);
}