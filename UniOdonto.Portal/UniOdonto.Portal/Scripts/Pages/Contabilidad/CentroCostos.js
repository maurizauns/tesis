function CentroCostosCallback(data) {
    $('#Id').val(data.Id);
    $('#Codigo').val(data.Codigo);
    $('#Descripcion').val(data.Descripcion);
}


function CentroCostos(data) {
    this.setAttributes(data);
}

CentroCostos.prototype.setAttributes = function (data) {
    this.id = data['Id'];
    this.Descripcion = data['Descripcion'];
}

CentroCostos.getById = function (id, async, callback, oThis) {
    $.ajax({
        type: "GET",
        url: urlprefix + "/CentroCostos/GetCentroCostos?Id=" + id,
        dataType: "json",
        async: true,
        success: function (data, textStatus) {
            var ciudad = new CentroCostos(data);
            if (oThis) {
                callback.call(oThis, ciudad);
            }
            else {
                callback(ciudad);
            }
        },
        error: function () {
            showMessage('Error', 'Ocurrio un error al intentar cargar el Centro de Costos, por favor intentelo nuevamente');
        }
    });
}