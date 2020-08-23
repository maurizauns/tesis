var vmf;

$(document).ready(function () {
    function KnockoutFiles(Uploads) {
        vmf = ko.mapping.fromJS(Uploads);

        vmf.Files = ko.observableArray();
        vmf.FileUploadUrl = ko.observable('/ArchivosAdjuntos/SaveArchivos');
        vmf.FileRemoveUrl = ko.observable('/ArchivosAdjuntos/RemoveArchivos');
        vmf.Descripcion = ko.observable();
        vmf.FilesC = ko.computed(function () {
            var result = [];
            foreach(vmf.Files(), function (o) {
                if (typeof o.xhr != "undefined") {
                    //console.log(o);
                    result.push({
                        FileId: JSON.parse(o.xhr.response).FileId
                    });
                }
            });
            return result;
        });

        vmf.Guardar = function () {
            $("#btnGuardar").attr('disabled', 'disabled');
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "/ArchivosAdjuntos/SaveArchivosAdjuntos",
                data: JSON.stringify({
                    PersonasId: PersonaID,
                    ArchivosAdjuntosDet: vmf.FilesC(),
                    Fecha: moment().format(),
                    Descripcion: vmf.Descripcion()
                }),
                success: function (Uploads) {
                    $("#contenidoHistoria").load("/ArchivosAdjuntos/ArchivosAdjuntos");
                    $("#contenidoHistoria").show();
                    $("#btnGuardar").removeAttr("disabled");
                }
            });
        };

        vmf.Ver = function (Data) {
            abrirEnPestana("/ArchivosAdjuntos/Archivos/" + Data.Id());
        };

        ko.cleanNode($("#contenidoHistoria")[0]);
        ko.applyBindings(vmf, $("#contenidoHistoria")[0]);
    }

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "/ArchivosAdjuntos/GetData?id=" + PersonaID,
        success: KnockoutFiles
    });
});

function abrirEnPestana(url) {
    var win = window.open(url, '_blank');
    win.focus();
}