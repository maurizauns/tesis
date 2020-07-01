var Dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

function agendasCallback(data) {
    $('#Id').val(data.Id);
    $('#Codigo').val(data.Codigo);
    $('#Descripcion').val(data.Descripcion);
    $('#Nombre').val(data.Nombre);
    $('#DuracionCitaId option[value=' + data.DuracionCitaId + "]").prop('selected', true);
}


function horariosCallback(data) {
    cargarFormatoHora();
    //$('#Id').val(data.Id);
    //$('#Codigo').val(data.Codigo);
    //$('#Descripcion').val(data.Descripcion);
    //$('#Nombre').val(data.Nombre);
    //$('#DuracionCitaId option[value=' + data.DuracionCitaId + "]").prop('selected', true);
    for (var i = 0; i < data.Horarios.length; i++) {
        $("#tablaHorarios").append(
            '<tr>' +
            '<td>' + Dias[data.Horarios[i].Dia]+ '</td>' +
            '<td>' + data.Horarios[i].HoraInicio + '</td>' +
            '<td>' + data.Horarios[i].HoraFin + '</td> ' +
            '<td> <a href="#" class="removeSchedule">X</a></td>' +
            '</tr>'
        );
    }
    $('.removeSchedule').off().click(function (e) {
        $(this).parent('td').parent('tr').remove();
    });
}


$(document).on("click", ".load-modalOther", function () {

    var $element = $(this),
        modal = "horario-modal",
        url = $element.data('action'),
        id = $element.data('id'),
        hiddenId = $element.data('hidden'),
        callback = $element.data('callback'),
        viewUrl = $element.data('viewurl');

    if (hiddenId) {
        $("#" + hiddenId).val(id);
    }

    var data = { 'id': id };
    var dataType = "json";
    if (viewUrl) {
        data = "";
        dataType = "html";
    }

    if (url) {
        $.ajax({
            type: "get",
            url: url,
            data: data,
            dataType: dataType,
            success: function (d) {

                if (viewUrl) {
                    $('#' + modal).find(".modal-content").html(d);

                    if (hiddenId) {
                        $("#" + hiddenId).val(id);
                    }

                    jQuery.validator.unobtrusive.parse('#' + modal);
                    callFn(callback, id);
                } else {
                    callFn(callback, d);
                }
                debugger
                if (modal) {
                    $('#' + modal).modal('show');
                }
            },
            error: function () {
                error("Error");
            }
        });
    } else {
        if (modal) {
            $('#' + modal).modal('show');
        }

        callFn(callback, id);
    }

    return false;
});

function cargarFormatoHora() {
    $('#inicio').datetimepicker({
        format: 'HH:mm:ss'
    });

    $('#fin').datetimepicker({
        format: 'HH:mm:ss'
    });
}

function AgregarHorario() {
    $("#tablaHorarios").append(
        '<tr>' +
        '<td>' + $("#diaSchedule :selected").text() + '</td>' +
        '<td>' + $("#inicio").val() + '</td>' +
        '<td>' + $("#fin").val() + '</td> ' +
        '<td> <a href="#" class="removeSchedule">X</a></td>' +
        '</tr>'
    );
    $('.removeSchedule').off().click(function (e) {
        $(this).parent('td').parent('tr').remove();
    });
}