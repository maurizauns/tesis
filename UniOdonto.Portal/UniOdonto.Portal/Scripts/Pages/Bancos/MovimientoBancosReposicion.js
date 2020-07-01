function Reposicion(data) {
    this.setAttributes(data);
}

Reposicion.prototype.setAttributes = function (data) {
    this.id = data['id'];
    this.empresa = data['empresa'];
    this.fecha_emision = data['fecha_emision'];
    this.cuenta_caja_chica = data['cuenta_caja_chica'];
    this.total = data['total'];
    this.tipo_movimiento = data['tipo_movimiento'];
    this.cuenta_bancaria = data['cuenta_bancaria'];
    this.numero_comprobante = data['numero_comprobante'];
    this.descripcion = data['descripcion'];
    this.persona = data['persona'];
    this.movimiento = data['movimiento'];
    this.nombre_persona = data['nombre_persona'];
    this.numero_cheque = data['numero_cheque'];
    this.fecha_cheque = data['fecha_cheque'];
    this.anulado = data['anulado'];
};

Reposicion.getById = function (id, async, callback, oThis) {

    if (async == undefined) async = true;
    var reposicion = null;
    $.ajax({
        type: "GET",
        url: urlprefix + "/banco/reposicion/json/" + id + "/",
        dataType: "json",
        async: async,
        success: function (data, textStatus) {
            reposicion = new Reposicion(data['obj']);
            if (async) {
                if (oThis) {
                    callback.call(oThis, reposicion);
                }
                else {
                    callback(reposicion);
                }
            }
        },
        error: function () {
            showMessage('Error', 'OcurriÃ³ un error al intentar cargar la Reposicion, por favor intÃ©ntelo nuevamente');
        }
    });
    if (!async) {
        return transaccion;
    }
}

function ReposicionForm(data_transacciones) {
    this.setAttributes(data_transacciones);
}

ReposicionForm.prototype.setAttributes = function (data_transacciones) {
    this.detalle_transacciones = new MasterDetail(data_transacciones);
}

function DetalleTransaccion(tr) {
    this.tr = tr;
    this.inputCodTransaccion = $(this.tr).find('input.object-codigo');
    var transaccionfield = new ObjectField($(this.tr).find('input.object-hidden'));
    transaccionfield.elDescription.bind('selected', function () {
        var persona = $(tr).find('td.transaccion_persona');
        var fecha_emision = $(tr).find('td.transaccion_fecha_emision');
        var valor = $(tr).find('td.transaccion_valor');
        if (transaccionfield.obj) {
            persona.html(transaccionfield.obj.persona.nombre_comercial);
            fecha_emision.html(transaccionfield.obj.fecha_emision);
            valor.html(transaccionfield.obj.total);
        } else {
            persona.html("");
            fecha_emision.html("");
            valor.html("");
        }
    });
    this.Transaccionfield = transaccionfield;
}


DetalleTransaccion.sonIguales = function (detalle1, detalle2) {
    var input1 = $(detalle1).find('input[type=hidden]').get(0);
    var input2 = $(detalle2).find('input[type=hidden]').get(0);
    return (input1.id == input2.id);
}

