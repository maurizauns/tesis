var vmc = {};
$(document).ready(function () {
    function KnockoutConsulta(data) {
        vmc = ko.mapping.fromJS(data);

        vmc.IsNew = ko.observable(true);
        vmc.IsEmpty = ko.observable(true);

        vmc.Fecha = ko.observable();
        vmc.Id = ko.observable();
        vmc.PersonasId = ko.observable();
        vmc.Fc = ko.observable();
        vmc.Fr = ko.observable();
        vmc.So2 = ko.observable();
        vmc.Ta = ko.observable();
        vmc.Temp = ko.observable();
        vmc.Peso = ko.observable();
        vmc.Talla = ko.observable();
        vmc.Motivo = ko.observable();
        vmc.Diagnostico = ko.observable();
        vmc.Plan = ko.observable();

        if (vmc.consultasDto().length > 0) {
            vmc.Id(vmc.consultasDto()[0].Id());
            vmc.PersonasId(vmc.consultasDto()[0].PersonasId());
            vmc.Fecha(vmc.consultasDto()[0].Fecha());
            vmc.Fc(vmc.consultasDto()[0].Fc());
            vmc.Fr(vmc.consultasDto()[0].Fr());
            vmc.So2(vmc.consultasDto()[0].So2());
            vmc.Ta(vmc.consultasDto()[0].Ta());
            vmc.Temp(vmc.consultasDto()[0].Temp());
            vmc.Peso(vmc.consultasDto()[0].Peso());
            vmc.Talla(vmc.consultasDto()[0].Talla());
            vmc.Motivo(vmc.consultasDto()[0].Motivo());
            vmc.Diagnostico(vmc.consultasDto()[0].Diagnostico());
            vmc.Plan(vmc.consultasDto()[0].Plan());
            vmc.IsNew(false);
            vmc.IsEmpty(false);
            vmh.ajuste();
        }

        vmc.Print = function () {
            window.open("/Consultas/Print?id=" + vmc.Id(), '_blank');
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
                            $("#contenidoHistoria").load("/Consultas/Consultas");
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
            $("#contenidoHistoria").load("/Consultas/Consultas");
            $("#contenidoHistoria").show();
        }


        vmc.Nuevo = function () {
            vmc.IsEmpty(false);
            vmc.IsNew(true);
            vmc.Id("00000000-0000-0000-0000-000000000000");
            vmc.PersonasId(PersonaID);
            vmc.Fecha(moment().format("DD-MM-YYYY"));
            vmc.Fc("");
            vmc.Fr("");
            vmc.So2("");
            vmc.Ta("");
            vmc.Temp("");
            vmc.Peso("");
            vmc.Talla("");
            vmc.Motivo("");
            vmc.Diagnostico("");
            vmc.Plan("");
            vmh.ajuste();
        }
        
        vmc.View = function (a) {
            vmc.Id(a.Id());
            vmc.PersonasId(a.PersonasId());
            vmc.Fecha(a.Fecha());
            vmc.Fc(a.Fc());
            vmc.Fr(a.Fr());
            vmc.So2(a.So2());
            vmc.Ta(a.Ta());
            vmc.Temp(a.Temp());
            vmc.Peso(a.Peso());
            vmc.Talla(a.Talla());
            vmc.Motivo(a.Motivo());
            vmc.Diagnostico(a.Diagnostico());
            vmc.Plan(a.Plan());
            vmh.ajuste();
            //vmc.DoctorID(a.DoctorID());
            //vmc.Alcance(a.Alcance());
            //vmFormCon.Fecha(moment(a.Fecha()).format("DD/MM/YYYY"));
            //vmFormCon.FechaCreacion(moment(a.FechaCreacion()).format("DD/MM/YYYY"));

        }

        

        ko.cleanNode($("#contenidoHistoria")[0]);
        ko.applyBindings(vmc, $("#contenidoHistoria")[0]);
    }
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "/Consultas/GetData?id=" + PersonaID,
        success: KnockoutConsulta
    });
});
