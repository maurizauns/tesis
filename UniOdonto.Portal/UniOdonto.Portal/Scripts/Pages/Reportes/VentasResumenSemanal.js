$(function () {
    new ObjectField($('#ProductosId'));
});


function cambiarPagina(pagina) {
    $('#pagina_id').val(pagina);
    $('#excel_id').val('');
    $('#pdf_id').val('');
    document.forms.reporteForm.target = "";
    document.forms.reporteForm.submit();
    $('#btn-consultar').attr("href", "javascript:;");
    return false;
}