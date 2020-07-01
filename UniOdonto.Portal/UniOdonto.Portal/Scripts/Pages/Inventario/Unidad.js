function UnidadCallback(data) {
    $('#Id').val(data.Id);
    $('#Codigo').val(data.Codigo);
    $('#Descripcion').val(data.Descripcion);
}

function Unidad(data) {
    this.setAttributes(data);
}

Unidad.prototype.setAttributes = function (data)
{
    this.Id = data['Id'];
    this.codigo = data['Codigo'];
    this.Descripcion = data['Descripcion'];
};

Unidad.getById = function (id, async, callback, oThis) {
    if (async == undefined) async = true;
    var unidad = null;
    $.ajax({
        type: "GET",
        url: urlprefix + "/Unidad/GetUnidad?Id=" + id,
        dataType: "json",
        async: async,
        success: function (data, textStatus) {
            unidad = new Unidad(data);
            if (async) {
                if (oThis) {
                    callback.call(oThis, unidad);
                }
                else {
                    callback(unidad);
                }
            }
        },
        error: function () {
            showMessage('Error', 'Ocurrio un error al intentar cargar los datos de la unidad, por favor intentelo nuevamente');
        }
    });
    if (!async) {
        return unidad;
    }
};