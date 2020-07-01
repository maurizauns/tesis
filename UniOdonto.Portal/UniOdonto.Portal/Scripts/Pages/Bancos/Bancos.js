function MisBancos(data) {
    this.setAttributes(data);
}

MisBancos.prototype.setAttributes = function (data) {
    this.id = data['Id'];
    this.nombre = data['Descripcion'];
}

MisBancos.getById = function (id, async, callback, oThis) {
    $.ajax({
        type: "GET",
        url: urlprefix + "/MisBancos/GetMisBancos?Id=" + id,
        dataType: "json",
        async: true,
        success: function (data, textStatus) {
            var ciudad = new MisBancos(data);
            if (oThis) {
                callback.call(oThis, ciudad);
            }
            else {
                callback(ciudad);
            }
        },
        error: function () {
            showMessage('Error', 'Ocurrio un error al intentar cargar el Banco, por favor intentelo nuevamente');
        }
    });
}