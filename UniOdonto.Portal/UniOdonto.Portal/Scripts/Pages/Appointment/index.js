var vma = {};
var urlprefix = "";
$(document).ready(function () {
    function Knockout(data) {
        vma.Data = ko.mapping.fromJS(data);
        vma.Agendas = ko.observableArray([]);
        vma.bussinesHr = ko.observableArray([]);
        vma.RestriccionHorario = ko.observable(true);
        vma.Agendas(data);

        vma.AgendaID = ko.observable();
        vma.UsuarioID = ko.observable();

        vma.slotDuration = ko.observable("00:15:00");
        vma.scheduleStart = ko.observable("06:00:00");
        vma.scheduleEnd = ko.observable("24:00:00");

        vma.ViewShedule = function (data) {
            vma.CalendarLoad(data);
        };

        ko.applyBindings(vma, $("#divAppointment")[0]);
        vma.LoadFullCalendar();
    }
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: '/Appointment/GetAgendas',
        success: Knockout
    });
})

vma.LoadFullCalendar = function () {
    $('#calendarAppointment').fullCalendar({

        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        height: 720,
        timezone: 'local',
        defaultView: 'agendaWeek',
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        allDayText: 'Dia Completo',
        buttonText: {
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Dia'
        },
        minTime: vma.scheduleStart(),
        maxTime: vma.scheduleEnd(),
        businessHours: vma.bussinesHr(),
        editable: true,
        allDaySlot: false,
        lazyFetching: false,
        selectable: true,
        selectConstraint: 'businessHours',
        eventConstraint: 'businessHours',
        select: function (date) {
            now = moment().format();

            if (date.format() >= now) {
                var date_ = date.format('DD-MM-YYYY');
                var time = date.format('HH:mm');
                open_help_box(date, date_, time);
                // ShowEventPopup(date, date_, time);
            }
        },
        slotDuration: vma.slotDuration(),
        slotEventOverlap: false,
        eventClick: function (calEvent, jsEvent, view) {
            //
            var AppointmentID = calEvent.id;
            ShowFucnPopup(AppointmentID);

        },
        //eventDrop: function (event, delta, revertFunc) {
        //    var newdate_ = event.start.format('DD-MM-YYYY');
        //    var newtime = event.start.format('HH:mm');

        //    $('#DragModal').modal({
        //        show: true,
        //        keyboard: false,
        //        backdrop: 'static'
        //    });

        //    var $cancel = $('#btnChangeNo');
        //    $cancel.unbind('click');
        //    $cancel.click(function () {
        //        revertFunc();
        //        $('#DragModal').modal('hide');
        //    });

        //    var $update = $('#btnChangeSi');
        //    $update.unbind('click');
        //    $update.click(function () {
        //        var totalevents = checkOverlap(event);
        //        $('#DragModal').modal('hide');
        //        if (totalevents > 0 && vma.RestriccionHorario() === true) {
        //            revertFunc();
        //            ModalMsg("Ya existe un Evento o Cita con la misma fecha y hora", "text-danger")

        //            $('#DIVmodal').modal('show');
        //        } else {
        //            swal({
        //                title: '¿Desea enviar correo electrónico?',
        //                text: "Se enviará una notificación al paciente",
        //                type: 'warning',
        //                showCancelButton: true,
        //                confirmButtonColor: '#3085d6',
        //                cancelButtonColor: '#d33',
        //                confirmButtonText: 'Si, enviar',
        //                cancelButtonText: 'No enviar',
        //                confirmButtonClass: 'btn btn-success',
        //                cancelButtonClass: 'btn btn-danger',
        //                buttonsStyling: false,
        //                reverseButtons: true
        //            }).then((result) => {
        //                if (result) {
        //                    UpdateEvent(event.id, newdate_, newtime, true);

        //                    swal(
        //                        'Se ha modificado la cita o evento con exito!',
        //                        '',
        //                        'success'
        //                    )
        //                }
        //            }).catch((result) => {
        //                if (result) {
        //                    UpdateEvent(event.id, newdate_, newtime, false);
        //                    swal(
        //                        'Se ha modificado la cita o evento con exito!',
        //                        '',
        //                        'success'
        //                    )
        //                }
        //            })
        //        }
        //    });
        //},
    });
};

vma.CalendarLoad = function (Data) {
    vma.bussinesHr([]);
    vma.slotDuration("00:" + Data.DuracionCita.Descripcion + ":00");
    vma.scheduleStart(Data.AgendaUsuario[0].Inicio);
    vma.scheduleEnd(Data.AgendaUsuario[0].Fin);

    vma.AgendaID(Data.Id);
    vma.UsuarioID(Data.PropietarioId);
    $.ajax({
        url: '/Appointment/GetSchedule',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        data: {
            PropietarioId: Data.PropietarioId,
            AgendaId: Data.Id
        },
        success: function (result) {
            foreach(result, function (i) {
                var horario = new bussinessObj({ start: i.HoraInicio, end: i.HoraFin, dow: i.Dia });
                vma.bussinesHr.push(horario);
            });

            $('#calendarAppointment').fullCalendar('destroy');

            vma.LoadFullCalendar();

            $('#calendarAppointment').fullCalendar("addEventSource", '/Appointment/GetClinicEvents?PropietarioId=' + Data.PropietarioId + "&AgendaId=" + Data.Id);

            //vma.ClinicaIDSelected(Data.ClinicID);


            //$("#ClinicaName").html(Data.Name);
            //$("#DoctorName").html(Data.DocName);

            //$("#Titulo").show('true');

        },
        error: function (data, textStatus, jqXHR) {
            alert(data);
        }
    });
};

function foreach(array, action) {
    for (var i = 0; i < array.length; i++)
        action(array[i]);
}

function bussinessObj(data) {
    var self = this;
    self.start = data.start;
    self.end = data.end;
    self.dow = [data.dow];
};

function open_help_box(date, date_, time) {
    //var frame = document.getElementById("help_content");

    //box_support = bootbox.dialog({
    //    className: 'custom_contifico_bootbox help-center',
    //    message: frame.innerHTML,
    //    src: "/Reportes/VentasMensuales/",
    //    title: 'Cita Médica',
    //});
    //$(".support_message").each(function () {
    //    $(this).text('');
    //});
    $('#dlgCuenta').modal();
    $('#newAppointDate').html(date_);
    $('#newAppointTime').html(time);
    $('#AgendasId').val(vma.AgendaID());
    $('#UsuarioId').val(vma.UsuarioID());
    $('#AppointmentDate').val(date_ + " " + time);
    $("#divEdit").removeClass("show").addClass("hide");
    $("#idTitle").html("Nueva Cita");
}

var tipoCuenta = null;
tipoCuenta = new ObjectField({
    'el': $('#PersonasId'),
    'getObjectById': Personas.getById,
    'getObjectByDesc': Personas.getByCodigo,
    'getObjDesc': Personas.getObjDesc,
    'dlgTitle': 'Seleccionar Paciente',
    'autocompletar': 'True',
    'dlgUrl': "/Personas/ListaPersonas/"
});

$("#btnGuardar").click(function () {
    $("form.frmNewAgenda").submit();
});

$(document).on("submit", "form.frmNewAgenda", function () {
    var $form = $(this),
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
                    $('#calendarAppointment').fullCalendar('destroy');
                    vma.LoadFullCalendar();
                    $('#calendarAppointment').fullCalendar("addEventSource", '/Appointment/GetClinicEvents?PropietarioId=' + vma.UsuarioID() + "&AgendaId=" + vma.AgendaID());
                    document.forms.frmNewAgenda.reset();
                    $('#dlgCuenta').modal('hide');
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
});

function ShowFucnPopup(AppointmentID) {
    $.ajax({
        url: '/Appointment/GetEntity',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        data: {
            id: AppointmentID
        },
        success: function (result) {
            let date = moment(result.AppointmentDate, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
            $('#dlgCuenta').modal();
            $('#newAppointDate').html(moment(date).format("DD/MM/YYYY"));  
            $('#newAppointTime').html(moment(date).format("HH:mm"));
            $('#AgendasId').val(result.AgendasId);
            $('#UsuarioId').val(result.UsuarioId);
            $('#AppointmentDate').val(result.AppointmentDate + " " + result.AppointmentDate);
            var personaAgenda = Personas.getByIdAgenda(result.PersonasId, false);
            tipoCuenta.setObj(personaAgenda);
            $('#AppointmentLenght').val(result.AppointmentLenght);
            $('#TipoCitaId').val(result.TipoCitaId);
            $('#EstadoCitaId').val(result.EstadoCitaId);
            $("#btnConsultar").attr("href", "/Historia/Index/" + result.Id);
            $("#divEdit").removeClass("hide").addClass("show");
            $("#idTitle").html("Detalle de Cita");
        },
        error: function (data, textStatus, jqXHR) {
            alert(data);
        }
    });
    return false;
}