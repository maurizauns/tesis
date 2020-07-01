function ImpuestoIVA(data, th) {
    this.setAttributes(data);
    if (th) {
        return this;
    }
}

ImpuestoIVA.prototype.setAttributes = function (data) {
    /* Setea los atributos de la cuenta contenidos en el diccionario data */
    this.id = data['Id'];
    this.codigo = data['Codigo'];
    this.descripcion = data['Descripcion'];
    this.porcentaje = data['Porcentaje'];
    this.fecha_inicio = data['FechaInicio'];
    this.fecha_fin = data['FechaFin'];
};

ImpuestoIVA.getById = function (id, async, callback, oThis) {
    debugger
    $.ajax({
        type: "GET",
        url: urlprefix + "/Contabilidad/GetImpuestoIva/" + id + "/",
        dataType: "json",
        async: true,
        success: function (data, textStatus) {
            var impuesto = new ImpuestoIVA(data['obj']);
            if (oThis) {
                callback.call(oThis, impuesto);
            }
            else {
                callback(impuesto);
            }
        },
        error: function () {
            showMessage('Error', 'OcurriÃ³ un error al intentar cargar el impuesto iva, por favor intÃ©ntelo nuevamente');
        }
    });
};

ImpuestoIVA.getByFecha = function (fecha) {
    debugger
    var impuesto = null;
    $.ajax({
        type: "GET",
        url: urlprefix + "/Contabilidad/GetImpuestoIvaFecha/",
        dataType: "json",
        data: { 'fecha': fecha },
        async: false,
        success: function (data, textStatus) {
            debugger
            impuesto = new ImpuestoIVA(data, true);
        },
        error: function () {
            showMessage('Error', 'OcurriÃ³ un error al intentar cargar el impuesto iva, por favor intÃ©ntelo nuevamente');
        }
    });
    return impuesto;
};