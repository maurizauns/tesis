var urlProvincias;

$(document).ready(function () {

    $("#TipoTransaccionesId").change(function () {
        var paisId = $("#TipoTransaccionesId").val();
        loadSelect2("#FormaPagoCobroId", urlProvincias, { id: paisId });
    });

});


function TipoFormaPagoCobroCallback(data) {
    $('#Id').val(data.Id);
    $('#Codigo').val(data.Codigo);
    $('#Descripcion').val(data.Descripcion);
    $('#TipoTransaccionesId option[value=' + data.TipoTransaccionesId + "]").prop('selected', true);
    loadSelect2("#FormaPagoCobroId", urlProvincias, { id: data.TipoTransaccionesId }, data.FormaPagoCobroId);
}