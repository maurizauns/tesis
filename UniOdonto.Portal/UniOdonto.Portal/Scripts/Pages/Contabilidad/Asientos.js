function Asiento(data) {
    this.MasterDetail(data);
}

copyPrototype(Asiento, MasterDetail);

Asiento.prototype.puedeEliminar = function () {
    if (this.detalles.length == 2) {
        showMessage('Eliminar detalle', 'No se eliminarÃ¡ el detalle porque el asiento debe tener como mÃ­nimo 2 elementos');
        return false;
    }
    return true;
}

function DetalleAsiento(tr) {
    /* Clase que representa el detalle de un asiento contable	*/
    this.tr = tr; // almacena la fila que representa a un detalle
    this.inputCodCuenta = $(this.tr).find('input.object-codigo');
    this.cuentafield = new ObjectField($(this.tr).find('input.object-hidden[id$="cuenta_id"]'));
    this.cuentafield.onSetObj = function (obj) {
        $(tr).find('input[id$="-hidden_data_cuenta_id"]').val(JSON.stringify(obj));
        /*
		Ticket #97335
		Bloquear centro de costo para cuentas de activo, 
		pasivo y patrimonio
		*/
        /* let centrocostoObligatorio = $('#centrocostoObligatorio').val();
		if (centrocostoObligatorio != 1) {
			let centroCostoInputEl = $(tr).find('input[data_id$="centro_costo_id"]');
			let centroCostoHiddenEl = $(tr).find('input.object-hidden[id$="centro_costo_id"]');
			let centroCostoSpanBtn = $(tr).find('input[data_id$="centro_costo_id"]').next();
			if (obj.codigo[0] == "1" || 
				obj.codigo[0] == "2" ||
				obj.codigo[0] == "3") {
				centroCostoInputEl.attr("disabled", "disabled");
				centroCostoInputEl.attr("readonly", "readonly");
				centroCostoInputEl.val('')
				centroCostoHiddenEl.val('')
				centroCostoSpanBtn.attr("disabled", "disabled");
				centroCostoSpanBtn.css("pointer-events", "none");
			} else {
				centroCostoInputEl.removeAttr("disabled");
				centroCostoInputEl.removeAttr("readonly");
				centroCostoSpanBtn.removeAttr("disabled");
				centroCostoSpanBtn.css("pointer-events", "auto");
			}
		} */
    }
    this.centrocostofield = new ObjectField($(this.tr).find('input.object-hidden[id$="centro_costo_id"]'));
    this.proyectofield = new ObjectField($(this.tr).find('input.object-hidden[id$="proyecto_id"]'));
}

DetalleAsiento.sonIguales = function (detalle1, detalle2) {
    /* FunciÃ³n utilizada para verificar si dos objetos tipos DetalleAsiento 
	son iguales. */
    var input1 = $(detalle1).find('input[type=hidden]').get(0);
    var input2 = $(detalle2).find('input[type=hidden]').get(0);
    return (input1.id == input2.id);
}