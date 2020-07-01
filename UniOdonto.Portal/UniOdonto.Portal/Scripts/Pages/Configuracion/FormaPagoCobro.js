function FormaPagoCobroCallback(data) {
    $('#Id').val(data.Id);
    $('#Codigo').val(data.Codigo);
    $('#Descripcion').val(data.Descripcion);
    $('#TipoTransaccionesId option[value=' + data.TipoTransaccionesId + "]").prop('selected', true);
}