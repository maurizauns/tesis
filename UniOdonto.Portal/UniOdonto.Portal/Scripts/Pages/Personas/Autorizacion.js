function AutorizacionForm(tr) {
    this.tr = tr;
    var hiddentipoDocumento = $(tr).find('input[id$="-hidden_precio_venta"]');
    var tipoDocumento = $(tr).find('select[id$="-tipo_documento"]');
    tipoDocumento.val(hiddentipoDocumento.val());
    preparedDate();
}

AutorizacionForm.sonIguales = function (detalle1, detalle2) {
    var input1 = $(detalle1).find('input').get(0);
    var input2 = $(detalle2).find('input').get(0);
    return (input1.id == input2.id);
}

$(function () {
    autorizaciones = new MasterDetail({
        'templateDetalle': $('#dtemplate_autorizacion'),
        'tableDetalle': $('#tdetalle_autorizacion'),
        'prefixDetalle': 'template',
        'funcCompDetalle': AutorizacionForm.sonIguales,
        'klassDetalle': AutorizacionForm
    });
});