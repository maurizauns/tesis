function provinciaCallback(data) {
    $('#Id').val(data.Id);
    $('#Codigo').val(data.Codigo);
    $('#Descripcion').val(data.Descripcion);
    $('#BackgroundColor').val(data.BackgroundColor);
    $('#Color').val(data.Color);

    $("#BackgroundColor").trigger("change");
    $("#Color").trigger("change");
    
    $('#SubTipoIdentificacionId option[value=' + data.SubTipoIdentificacionId + "]").prop('selected', true);
}

$('#color').colorpicker({});
$('#cp2').colorpicker();
$('#cp2c').colorpicker();