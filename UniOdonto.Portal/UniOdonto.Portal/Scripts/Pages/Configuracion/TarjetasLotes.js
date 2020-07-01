function TarjetasLotes(data) {
    this.setAttributes(data);
}

TarjetasLotes.prototype.setAttributes = function (data) {
    this.id = data['Id'];
    this.nombre = data['Codigo'];
    this.Descripcion = data['Descripcion'];
}

TarjetasLotes.getById = function (id, async, callback, oThis) {
    $.ajax({
        type: "GET",
        url: urlprefix + "/TarjetaCreditoLotes/GetTarjetasLotes?Id=" + id,
        dataType: "json",
        async: true,
        success: function (data, textStatus) {
            var cantones = new TarjetasLotes(data);
            if (oThis) {
                callback.call(oThis, cantones);
            }
            else {
                callback(cantones);
            }
        },
        error: function () {
            showMessage('Error', 'Ocurrio un error al intentar cargar las Tarjetas Lotes, por favor intentelo nuevamente');
        }
    });
}