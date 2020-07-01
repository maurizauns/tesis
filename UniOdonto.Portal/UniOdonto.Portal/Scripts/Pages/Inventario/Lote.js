function Lote(data) {
    this.setAttributes(data);
}

Lote.prototype.setAttributes = function (data) {
    this.id = data['Id'];
    this.lote = data['Lote'];
    this.descripcion = data['Descripcion'];
    this.fecha_expiracion = data['FechaExp'];
    this.fecha_expedicion = data['FechaIngreso'];
};

Lote.getById = function (id, async, callback, oThis) {
    if (async == undefined) async = true;
    var referencia = null;

    lote = new Lote({ 'Id': 1, 'Lote': id });
    console.log(lote);
    //lote = new Lote(data['obj']);
    if (async) {
        if (oThis) {
            callback.call(oThis, lote);
        }
        else {
            callback(lote);
        }
    }

    if (!async) {
        return lote;
    }
};

Lote.getObjDesc = function () {
    /* FunciÃ³n invocada para obtener la descripciÃ³n del objeto relacionado al Field */
    return this.obj.lote;
};

Lote.getObjId = function () {
    /* FunciÃ³n invocada para obtener el id del objeto relacionado al Field */
    return this.obj.id;
};