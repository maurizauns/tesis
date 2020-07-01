function IngresoSalidaForm(tr) {
    this.tr = tr;
    
    preparedDate();
	//$(this.tr).find('input.date').datepicker({ dateFormat: 'dd/mm/yy',changeMonth: true,changeYear: true}); 
}

IngresoSalidaForm.sonIguales = function(detalle1, detalle2) {
	var input1 = $(detalle1).find('input').get(0);
	var input2 = $(detalle2).find('input').get(0);
	return (input1.id == input2.id);
};


$(function () {
    fechas_entrada_salida_ministeriolab = new MasterDetail({
        'templateDetalle': $('#dtemplate_entradasalida_ministeriolab'),
        'tableDetalle': $('#tdetalle_entradasalida_ministeriolab'),
        'prefixDetalle': 'template',
        'funcCompDetalle': IngresoSalidaForm.sonIguales,
        'klassDetalle': IngresoSalidaForm
    });
});