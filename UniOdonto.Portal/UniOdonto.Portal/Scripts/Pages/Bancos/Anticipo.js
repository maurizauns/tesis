function Anticipo(data) {
    this.MasterDetail(data);
}

copyPrototype(Anticipo, MasterDetail);

Anticipo.prototype.puedeEliminar = function () {
    return true;
}

function DetalleAnticipo(tr) {
    /* Clase que representa el detalle de un movimiento	*/
    this.tr = tr; // almacena la fila que representa a un detalle
    this.inputCodCuenta = $(this.tr).find('input.object-codigo');
    this.cuentafield = new ObjectField($(this.tr).find('input.object-hidden[id$="cuenta_id"]'));
    this.centrocostofield = new ObjectField($(this.tr).find('input.object-hidden[id$="centro_costo_id"]'));
    this.proyectofield = new ObjectField($(this.tr).find('input.object-hidden[id$="proyecto_id"]'));
}

DetalleAnticipo.sonIguales = function (detalle1, detalle2) {
    /* FunciÃ³n utilizada para verificar si dos objetos tipos DetalleMovimiento son iguales. */
    var input1 = $(detalle1).find('input[type=hidden]').get(0);
    var input2 = $(detalle2).find('input[type=hidden]').get(0);
    return (input1.id == input2.id);
}