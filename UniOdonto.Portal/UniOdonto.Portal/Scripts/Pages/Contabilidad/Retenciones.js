function retencionesCallback(data) {
    $('#Id').val(data.Id);
    $('#Codigo').val(data.Codigo);
    $('#Descripcion').val(data.Descripcion);
    $('#Porcentaje').val(data.Porcentaje);
    $('#TipoRetencion option[value=' + data.TipoRetencion + "]").prop('selected', true);
}

function Retencion(data) {
    this.setAttributes(data);
}

Retencion.prototype.setAttributes = function (data) {
    this.id = data['Id'];
    this.codigo = data['Codigo'];
    this.nombre = data['Descripcion'];
    this.tipo = data['TipoRetencion'];
    this.porcentaje = data['Porcentaje'];
};

Retencion.getById = function (id, async, callback, oThis) {
    if (async == undefined) async = true;
    var retencion = null;
    $.ajax({
        type: "GET",
        url: urlprefix + "/Retenciones/GetRetenciones?Id=" + id,
        dataType: "json",
        async: async,
        success: function (data, textStatus) {
            retencion = new Retencion(data);
            if (async) {
                if (oThis) {
                    callback.call(oThis, retencion);
                }
                else {
                    callback(retencion);
                }
            }
        },
        error: function () {
            showMessage('Error', 'Ocurrio un error al intentar cargar los datos de las retenciones, por favor intentelo nuevamente');
        }
    });
}
Retencion.getObjDesc = function () {
    return this.obj.nombre;
};

Retencion.getCodigoNombre = function () {
    return this.obj.codigo + " - " + this.obj.nombre;
};


