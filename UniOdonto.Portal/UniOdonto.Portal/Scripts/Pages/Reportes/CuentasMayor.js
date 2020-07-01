$(function () {
    new ObjectField($('#cuenta_id'));
    new ObjectField($('#centro_costo_id'));
});

function cambiarPagina(pagina) {
    $('#pagina_id').val(pagina);
    $('#excel_id').val('');
    $('#pdf_id').val('');
    document.forms.docForm.target = "";
    document.forms.docForm.submit();
    $('#btn-consultar').attr("href", "javascript:;");
    return false;
}