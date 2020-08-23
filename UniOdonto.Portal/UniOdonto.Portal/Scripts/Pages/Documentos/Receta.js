var vmc = {};
$(document).ready(function () {
    function KnockoutConsulta(data) {
        vmc = ko.mapping.fromJS(data);

        vmc.IsNew = ko.observable(true);
        vmc.IsEmpty = ko.observable(true);


        vmc.Id = ko.observable();
        vmc.PersonasId = ko.observable();
        vmc.ProximaCita = ko.observable();
        vmc.Diagnostico = ko.observable();
        vmc.Recomendaciones = ko.observable();
        vmc.Fecha = ko.observable();
        vmc.Indicaciones = ko.observable();
        vmc.Ciudad = ko.observable();

        if (vmc.consultasDto().length > 0) {
            vmc.Id(vmc.consultasDto()[0].Id());
            vmc.PersonasId(vmc.consultasDto()[0].PersonasId());
            vmc.ProximaCita(vmc.consultasDto()[0].ProximaCita());
            vmc.Diagnostico(vmc.consultasDto()[0].Diagnostico());
            vmc.Recomendaciones(vmc.consultasDto()[0].Recomendaciones());
            vmc.Fecha(vmc.consultasDto()[0].Fecha());
            vmc.Indicaciones(vmc.consultasDto()[0].Indicaciones());
            vmc.Ciudad(vmc.consultasDto()[0].Ciudad());
            vmc.IsNew(false);
            vmc.IsEmpty(false);
            vmh.ajuste();
        }

        vmc.Print = function () {
            window.open("/Receta/Print?id=" + vmc.Id(), '_blank');
        }

        vmc.Guardar = function () {
            var $form = $("form.frmConsultas"),
                data = getCrudFields($form),
                url = $form.attr('action');

            if (url && url != '') {
                $.ajax({
                    type: "POST",
                    url: url,
                    data: data,
                    dataType: 'json',
                    beforeSend: function () {
                        $('#dlgmsgcuenta').modal();
                    },
                    success: function (d) {
                        if (d.success == true) {
                            success(d.message || "Grabado Correctamente !!");
                            $("#contenidoHistoria").load("/Receta/Receta");
                            $("#contenidoHistoria").show();
                            vmc = {};
                        } else {
                            error(d.message.length == 0 ? "Ocurrió un error. Por favor vuelva a interntarlo" : d.message);
                        }
                    },
                    complete: function () {
                        $('#dlgmsgcuenta').modal('hide');
                    },
                    error: function (e) {
                        $('#dlgmsgcuenta').modal('hide');
                        error("Ocurrió un error. Por favor vuelva a interntarlo");
                    },
                });
            }
        }

        vmc.Editar = function () {
            vmc.IsNew(true);
            vmh.ajuste();
        }

        vmc.Cancelar = function () {
            $("#contenidoHistoria").load("/Receta/Receta");
            $("#contenidoHistoria").show();
        }

        vmc.Nuevo = function () {
            vmc.IsEmpty(false);
            vmc.IsNew(true);

            vmc.Id("00000000-0000-0000-0000-000000000000");
            vmc.PersonasId(PersonaID);
            vmc.ProximaCita(moment().format("DD-MM-YYYY"));
            vmc.Diagnostico("");
            vmc.Recomendaciones("");
            vmc.Fecha(moment().format("DD-MM-YYYY"));
            vmc.Indicaciones("");
            vmc.Ciudad("");

            vmh.ajuste();
        }

        vmc.View = function (a) {

            vmc.Id(a.Id());
            vmc.PersonasId(a.PersonasId());
            vmc.ProximaCita(a.ProximaCita);
            vmc.Diagnostico(a.Diagnostico);
            vmc.Recomendaciones(a.Recomendaciones);
            vmc.Fecha(a.Fecha);
            vmc.Indicaciones(a.Indicaciones);
            vmc.Ciudad(a.Ciudad);
            vmh.ajuste();
        }


        ko.cleanNode($("#contenidoHistoria")[0]);
        ko.applyBindings(vmc, $("#contenidoHistoria")[0]);
    }
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "/Receta/GetData?id=" + PersonaID,
        success: KnockoutConsulta
    });
});
