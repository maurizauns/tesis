function MarcaCallback(data) {
    $('#Id').val(data.Id);
    $('#Codigo').val(data.Codigo);
    $('#Descripcion').val(data.Descripcion);
}

function Marca(data) {
    this.setAttributes(data);
}

Marca.prototype.setAttributes = function (data) {
    this.Id = data['Id'];
    this.codigo = data['Codigo'];
    this.Descripcion = data['Descripcion'];
};

Marca.getById = function (id, async, callback, oThis) {
    if (async == undefined) async = true;
    var marca = null;
    $.ajax({
        type: "GET",
        url: urlprefix + "/Marca/GetMarca?Id=" + id,
        dataType: "json",
        async: async,
        success: function (data, textStatus) {
            marca = new Marca(data);
            if (async) {
                if (oThis) {
                    callback.call(oThis, marca);
                }
                else {
                    callback(marca);
                }
            }
        },
        error: function () {
            showMessage('Error', 'Ocurrio un error al intentar cargar los datos de la marca, por favor intentelo nuevamente');
        }
    });
    if (!async) {
        return marca;
    }
};