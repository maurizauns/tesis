$(function () {
    new ObjectField($('#PlanCuentasId'));
    new ObjectField($('#CantonesId'));

    $.each({
        '#FormatoCobro': false,
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

    secuencias = new MasterDetail({
        'templateDetalle': $('#dtemplate_secuencia'),
        'tableDetalle': $('#tdetalle_secuencia'),
        'prefixDetalle': 'template',
        'funcCompDetalle': SecuenciaChequeForm.sonIguales,
        'klassDetalle': SecuenciaChequeForm
    });
});

$(document).on("submit", "form.frmMisBancos", function () {
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

function bodegasCallback(data) {
    $('#Id').val(data.Id);
    $('#Codigo').val(data.Codigo);
    $('#Descripcion').val(data.Descripcion);
    $('#Direccion').val(data.Direccion);
    $('#Responsable').val(data.Responsable);
    $('#CentroCostosId option[value=' + data.CentroCostosId + "]").prop('selected', true);
    tinyMCE.activeEditor.setContent(data.Observaciones);
}

