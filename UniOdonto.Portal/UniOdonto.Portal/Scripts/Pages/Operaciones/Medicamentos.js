function medicamentosCallback(data) {
    $('#Id').val(data.Id);
    $('#Generico').val(data.Codigo);
    $('#Comercial').val(data.Codigo);
    $('#Dosis').val(data.Codigo);
    $('#Presentacion').val(data.Codigo);
    $('#Cantidad').val(data.Descripcion);
    $('#Indicaciones').val(data.Descripcion);
    //$('#Nombre').val(data.Nombre);
    //$('#DuracionCitaId option[value=' + data.DuracionCitaId + "]").prop('selected', true);
}