
function panelCallback(data) {
    $('#Id').val(data.Id);
    $('#Nombre').val(data.Nombre);
    $('#Descripcion').val(data.Descripcion);
    $('#Estilo').val(data.Estilo);
    $('#Color').val(data.Color);
    tinyMCE.activeEditor.setContent(data.Texto);
}