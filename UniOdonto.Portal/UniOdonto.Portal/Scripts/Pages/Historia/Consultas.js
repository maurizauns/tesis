var vmc = {};
$(document).ready(function () {
    function KnockoutConsulta(data) {
        vmc = ko.mapping.fromJS(data);
        ko.cleanNode($("#contenidoHistoria")[0]);
        ko.applyBindings(vmc, $("#contenidoHistoria")[0]);
    }
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "/Consultas/GetData?id=" + PersonaID,
        success: KnockoutConsulta
    });
})

$(document).on("submit", "form.frmConsultas", function () {
    $("#PersonasId").val(PersonaID);
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
                    var url = "/Historia/Index?id=" + PersonaID
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