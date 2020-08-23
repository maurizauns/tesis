var vma = {};
let listaF = [
    { name: "Diabetes", id: "Diabetes" },
    { name: "Hipertensión", id: "Hipertensión" },
    { name: "Cáncer", id: "Cáncer" },
    { name: "Enf Neurológica", id: "EnfNeurológica" },
    { name: "Enf Cardiológica", id: "EnfCardiológica" },
    { name: "Enf Gastrointestinal", id: "EnfGastrointestinal" },
    { name: "Enf Infecciosas", id: "EnfInfecciosas" },
    { name: "Enf Tiroidea", id: "EnfTiroidea" },
    { name: "Enf Respiratoria", id: "EnfRespiratoria" },
    { name: "Enf Genitourinaria", id: "EnfGenitourinaria" },
    { name: "Enf Nefrológica", id: "EnfNefrológica" },
    { name: "Enf Inmunológica", id: "EnfInmunológica" },
    { name: "Enf Hematológica", id: "EnfHematológica" },
    { name: "Enf Endocrino y Metabólica", id: "EnfEndocrinoMetabólica" },
    { name: "Enf Traumática", id: "EnfTraumática" },
    { name: "Enf Catastrófica", id: "EnfCatastrófica" },
    { name: "Discapacidad", id: "Discapacidad" }
];

let listaP = [
    { name: "Diabetes", id: "Diabetes" },
    { name: "Hipertensión", id: "Hipertensión" },
    { name: "Cáncer", id: "Cáncer" },
    { name: "Enf Neurológica", id: "EnfNeurológica" },
    { name: "Enf Cardiológica", id: "EnfCardiológica" },
    { name: "Enf Gastrointestinal", id: "EnfGastrointestinal" },
    { name: "Enf Infecciosas", id: "EnfInfecciosas" },
    { name: "Enf Tiroidea", id: "EnfTiroidea" },
    { name: "Enf Respiratoria", id: "EnfRespiratoria" },
    { name: "Enf Genitourinaria", id: "EnfGenitourinaria" },
    { name: "Enf Nefrológica", id: "EnfNefrológica" },
    { name: "Enf Inmunológica", id: "EnfInmunológica" },
    { name: "Enf Hematológica", id: "EnfHematológica" },
    { name: "Enf Endocrino y Metabólica", id: "EnfEndocrinoMetabólica" },
    { name: "Enf Traumática", id: "EnfTraumática" },
    { name: "Enf Catastrófica", id: "EnfCatastrófica" },
    { name: "Discapacidad", id: "Discapacidad" }
];

let listaA = [
    { name: "Fuma", id: "Fuma" },
    { name: "Toma Alcohol", id: "TomaAlcohol" },
    { name: "Drogas", id: "Drogas" },
    { name: "Micción", id: "Micción" },
    { name: "Deposición", id: "Deposición" },
    { name: "Alimentación", id: "Alimentación" },
    { name: "Sedentarismo", id: "Sedentarismo" },
    { name: "Actividad Física", id: "ActividadFísica" },
    { name: "Sueño", id: "Sueño" },
];

function KnockoutAntecedentes() {
    vma.detalleFamiliares = ko.observableArray(listaF);
    vma.detallePersonales = ko.observableArray(listaP);
    vma.detalleHabitos = ko.observableArray(listaA);

    ko.cleanNode($("#contenidoHistoria")[0]);
    ko.applyBindings(vma, $("#contenidoHistoria")[0]);
}
KnockoutAntecedentes();

for (var i = 0; i < listaF.length; i++) {
    $('#' + listaF[i].id).prop("checked", false);
}

for (var i = 0; i < listaP.length; i++) {
    $('#personales_' + listaP[i].id).prop("checked", false);
}


for (var i = 0; i < listaA.length; i++) {
    $('#habitos_' + listaA[i].id).prop("checked", false);
}

$.each({
    '#SinPatologiaFamiliares': false,
    '#SinPatologiaPersonales': false,
}, function (key, value) {
    $(key).bind('click', function () { showFieldWhenValue(key, value); });
    showFieldWhenValue(key, value);
});
function showFieldWhenValue(checkboxSelector, fieldSelector) {
    if ($(checkboxSelector).is(':checked')) {
        $(checkboxSelector).val(true);
        $('.inputSinFamiliares').prop("checked", false);
        $('.inputSinFamiliares').prop("disabled", "disabled");
    }
    else {
        $(checkboxSelector).val(false);
        $('.inputSinFamiliares').removeAttr("disabled");
    }
}

if ($("#SinPatologiaFamiliares").is(':checked')) {
    $('.inputSinFamiliares').prop("checked", false);
    $('.inputSinFamiliares').prop("disabled", "disabled");
} else {
    $('.inputSinFamiliares').removeAttr("disabled");
}

if (obj !== '') {
    for (var i = 0; i < listaF.length; i++) {
        $('#' + listaF[i].id).prop("checked", obj[i].value);
    }
}

if (objP !== '') {
    for (var i = 0; i < listaP.length; i++) {
        $('#personales_' + listaP[i].id).prop("checked", objP[i].value);
    }
}

if (objH !== '') {
    for (var i = 0; i < listaA.length; i++) {
        $('#habitos_' + listaA[i].id).prop("checked", objH[i].value);
    }
}

function guardar() {

    var $form = $("form.frmPersonas"),
        data = getCrudFields($form),
        url = $form.attr('action');
    var listaFalimiares = new Array();
    var listaPersonales = new Array();
    var listaHabitos = new Array();

    for (var i = 0; i < listaF.length; i++) {
        var listaData = { name: listaF[i].name, value: $("#" + listaF[i].id).is(':checked') ? true : false };
        listaFalimiares.push(listaData);
    }

    for (var i = 0; i < listaP.length; i++) {
        var listaData = { name: listaP[i].name, value: $("#personales_" + listaP[i].id).is(':checked') ? true : false };
        listaPersonales.push(listaData);
    }

    for (var i = 0; i < listaA.length; i++) {
        var listaData = { name: listaA[i].name, value: $("#habitos_" + listaA[i].id).is(':checked') ? true : false };
        listaHabitos.push(listaData);
    }

    var detalleFamiliares = { name: "DetalleFamiliares", value: JSON.stringify(listaFalimiares) };
    var detallePersonales = { name: "DetallePersonales", value: JSON.stringify(listaPersonales) };
    var detallehabitos = { name: "Habitos", value: JSON.stringify(listaHabitos) };
    data.push(detalleFamiliares);
    data.push(detallePersonales);
    data.push(detallehabitos);
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
                    vmh.Antecedentes();
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
    return false;
}