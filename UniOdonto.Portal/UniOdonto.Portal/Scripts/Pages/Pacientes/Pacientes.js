function Pacientes(data) {
    this.setAttributes(data);
}

Pacientes.prototype.setAttributes = function (data) {
    this.Id = data['Id'];
}

Pacientes.getById = function (id, async, callback, oThis) {
    $.ajax({
        type: "GET",
        url: urlprefix + "/Personas/GetPersonas?Id=" + id,
        dataType: "json",
        async: true,
        success: function (data, textStatus) {
            var persona = new Pacientes(data);
            if (oThis) {
                callback.call(oThis, persona);
            }
            else {
                callback(persona);
            }
        },
        error: function () {
            showMessage('Error', 'Ocurrio un error al intentar cargar la persona, por favor intentelo nuevamente');
        }
    });
}