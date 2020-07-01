function bodegasCallback(data) {
    $('#Id').val(data.Id);
    $('#Codigo').val(data.Codigo);
    $('#Descripcion').val(data.Descripcion);
    $('#Direccion').val(data.Direccion);
    $('#Responsable').val(data.Responsable);
    $('#CentroCostosId option[value=' + data.CentroCostosId + "]").prop('selected', true);
    tinyMCE.activeEditor.setContent(data.Observaciones);
}

function Bodegas(data) {
    this.setAttributes(data);
}

Bodegas.prototype.setAttributes = function (data) {
    this.Id = data['Id'];
    this.Descripcion = data['Descripcion'];
    this.nombre = data['Descripcion'];
}

Bodegas.getById = function (id, async, callback, oThis) {
    $.ajax({
        type: "GET",
        url: urlprefix + "/Bodegas/GetBodegas?Id=" + id,
        dataType: "json",
        async: true,
        success: function (data, textStatus) {
            var ciudad = new Bodegas(data);
            if (oThis) {
                callback.call(oThis, ciudad);
            }
            else {
                callback(ciudad);
            }
        },
        error: function () {
            showMessage('Error', 'Ocurrio un error al intentar cargar la ciudad, por favor intentelo nuevamente');
        }
    });
}