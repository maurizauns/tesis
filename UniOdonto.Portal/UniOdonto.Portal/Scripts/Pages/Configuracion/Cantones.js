function Cantones(data) {
    this.setAttributes(data);
}

Cantones.prototype.setAttributes = function (data) {
    this.id = data['Id'];
    this.Descripcion = data['Descripcion'];
}

Cantones.getById = function (id, async, callback, oThis) {
    $.ajax({
        type: "GET",
        url: urlprefix + "/Cantones/GetCantones?Id=" + id,
        dataType: "json",
        async: true,
        success: function (data, textStatus) {
            var cantones = new Cantones(data);
            if (oThis) {
                callback.call(oThis, cantones);
            }
            else {
                callback(cantones);
            }
        },
        error: function () {
            showMessage('Error', 'Ocurrio un error al intentar cargar el Cantones, por favor intentelo nuevamente');
        }
    });
}