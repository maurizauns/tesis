function TipoCuenta(data) {
    /* Clase que representa a un tipo de cuenta */
    this.setAttributes(data);
}

TipoCuenta.prototype.setAttributes = function (data) {
    /* Setea los atributos de la cuenta contenidos en el diccionario data */
    this.id = data['Id'];
    this.codigo = data['Codigo'];
    this.nombre = data['Descripcion'];
}

TipoCuenta.getById = function (id, async, callback, oThis) {
    /* Obtiene los datos de un tipo de cuenta contable por el Id. */
    var tipocuenta = null;
    $.ajax({
        type: "GET",
        url: urlprefix + "/TipoCuentas/GetTipoCuentas?Id=" + id,
        //url: urlprefix + "/contabilidad/cuenta/tipo/" + id + "/",
        dataType: "json",
        async: true,
        success: function (data, textStatus) {
            tipocuenta = new TipoCuenta(data);
            if (oThis) {
                callback.call(oThis, tipocuenta);
            }
            else {
                callback(tipocuenta);
            }
        },
        error: function () {
            showMessage('Error', 'OcurriÃ³ un error al intentar cargar los datos del tipo de cuenta, por favor intÃ©ntelo nuevamente');
        }
    });
}

TipoCuenta.getByCodigo = function (codigo, async, callback, oThis) {
    /* Obtiene los datos de un tipo de cuenta contable por el el cÃ³digo o el nombre. */
    var tipocuenta = null;
    $.ajax({
        type: "GET",
        url: urlprefix + "/contabilidad/cuenta/tipo/buscar/",
        data: { 'query': codigo },
        dataType: "json",
        async: true,
        success: function (data, textStatus) {
            var tipocuenta = null;
            if (data['obj']) {
                tipocuenta = new TipoCuenta(data['obj']);
            }
            if (oThis) {
                callback.call(oThis, tipocuenta);
            }
            else {
                callback(tipocuenta);
            }
        },
        error: function () {
            showMessage('Error', 'OcurriÃ³ un error al intentar cargar los datos del tipo de cuenta, por favor intÃ©ntelo nuevamente');
        }
    });
}

TipoCuenta.getObjDesc = function () {
    /* FunciÃ³n invocada para obtener la descripciÃ³n del objeto relacionado al Field */
    return this.obj.nombre;
}