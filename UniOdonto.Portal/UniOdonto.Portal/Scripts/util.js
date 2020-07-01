var isLoading = true;

$(function () {
    init();
});

function init() {
    preparedDate();
    validateNumber();
    datePickers();
}

$.ajaxSetup({
    cache: false
});

$(document).on("change", ".checkbox-true-false", function () {
    $(this).val($(this).prop("checked") ? true : false);
});

$(document).on("hidden.bs.modal", ".modal", function () {
    clearFormElem(".modal");
});

$(document).on("click", ".add-filter", function () {
    var option = $(this).closest('.row').find('select option:selected');
    var formid = $(this).data("formid");
    var value = $(option).val();
    if (value != '-1') {
        var model = {
            type: $(option).data('type'),
            description: $(option).text().trim(),
            name: value,
            url: $(option).data('url')
        }
        addFilter(formid, model);
    }
});

$(document).on('click', '.close-filter', function () {
    var value = $(this).data("value");
    var div = $(this).closest('div');
    var parentDiv = div.parent();

    $('.select-filter option[value=' + value + ']').show();
    resetFilter($(this).closest('form'));
    $(div).remove();

    if ($(parentDiv).find('.control-filter').length == 0) {
        $(parentDiv).find('.btn-filter').addClass('hide');
    }

    resizeAllGrids();
});

function addFilter(formid, model) {

    $('.btn-filter').removeClass('hide');
    var selector = '#' + formid + ' div:first';
    var html = createFilter(model);
    $(selector).prepend(html);
    preparedDate();

    resizeAllGrids();
}

function createFilter(filter) {
    var placeholder = filter.placeholder ? filter.placeholder : filter.description;
    var container = '<div class="form-group col-md-3 control-filter">';
    var label = '<label class="control-label" for="id' + filter.name + '">' + filter.description + '</label>';
    //var btnClose = '<button type="button" data-value="' + filter.name + '" class="close close-filter"><span aria-hidden="true">×</span><span class="sr-only">Cerrar</span></button>';
    var btnClose = '';
    var componen = '';
    var disabled = filter.defaultValue != null && filter.defaultValue.length > 0 ? ' disabled' : '';
    
    switch (filter.type) {
        case 1://textbox
            componen = '<input type="text" placeholder="' + placeholder + '" name="' + filter.name + '" id="id' + filter.name + '" class="form-control text-uppercase" value = "' + filter.defaultValue + '" ' + disabled + ' />';
            break;
        case 5://textbox
            componen = '<input class="object-hidden form-control" descfield="nombre" dlgtitle="Seleccionar ' + filter.Modelo + '" dlgurl="' + filter.Url + '" getobjectbydesc = "' + filter.Modelo + '.getByRuc", getobjectbyid = "' + filter.Modelo + '.getById" id="' + filter.name + '" name="' + filter.name + '" showquery="false" size="40" type="hidden" autocompletar="True"/>';
            setTimeout(
              function () {
                  Objectfield = new ObjectField($('#' + filter.name));
              }, 200);
            break;
        case 2://select
            componen = '<select name="' + filter.name + '" id="id' + filter.name + '" class="form-control" ' + disabled + ' style="min-width: 100% !important;"><option value="">-- Seleccionar --</option></select>';
            loadSelect('id' + filter.name, filter.url, filter.defaultValue);
            break;
        case 3://date
            componen = '<div class=""><div class="input-group date" id="txtDate" data-date-format="dd/MM/yyy">' +
                '<input type="text" id="id' + filter.name + '" name="' + filter.name + '" readonly="readonly" class="form-control" />' +
                '<span class="input-group-addon"><i class="fa fa-calendar"></i></span></div></div>';
            break;
        case 4://date Range
            container = '<div class="form-group col-md-3 control-filter">' + btnClose +
                '<div class="row">' +
                '<div class="col-md-6">' +
                '<label class="control-label" for="idfrom' + filter.name + '">' + filter.description + ' - Desde</label>' +
                '<div data-date-format="dd/MM/yyyy" id="from" class="input-group date">' +
                '<input type="text" class="form-control" readonly="readonly" name="from' + filter.name + '" id="idfrom' + filter.name + '">' +
                '<span class="input-group-addon"><i class="fa fa-calendar text-primary"></i></span>' +
                '</div></div>' +
                '<div class="col-md-6">' +
                '<label class="control-label" for="idto' + filter.name + '">' + filter.description + ' - Hasta</label>' +
                '<div data-date-format="dd/MM/yyyy" id="to" class="input-group date">' +
                '<input type="text" class="form-control" readonly="readonly" id="idTo' + filter.name + '" name="to' + filter.name + '">' +
                '<span class="input-group-addon">' +
                '<span class="fa-calendar fa text-primary"></span>' +
                '</span></div></div></div></div>';
            return container;

        default:

    }


    $("#idNumeroDocumento").mask("999-999-9?99999999");
    return container + label + btnClose + componen + '</div>';
}

$(document).on("change", ".reloadChild", function () {
    var child = $(this).data('childid');
    var url = $(this).data('url');
    var value = $(this).val();
    loadSelect(child, url, value);

});

$(document).on("click", "a.delete:not(.disabled),li.delete:not(.disabled)", function (event, preventConfirm) {

    var $element = $(this),
        grids = $element.data("grid") ? $element.data("grid").split(' ') : undefined,
        url = $element.data('action'),
        id = $element.data('id'),
        callback = $element.data('callback');

    var cont = function (data) {
        if (grids) {
            for (var i = 0; i < grids.length; i++) {
                reloadGrid(grids[i], 1);
            }
        }

        callFn(callback, data);
    };

    confirm("Estás seguro de eliminar ?", function () {
        if (url) {
            $.ajax({
                type: "get",
                url: url,
                data: {
                    'id': id
                },
                success: function (d) {
                    if (d.success) {
                        success(d.message);
                        cont(d);
                    }
                },
                error: function (err) {
                    error(err);
                },
                dataType: 'json'
            });
        } else {
            cont(id);
        }
    });
    event.preventDefault();
    event.stopPropagation();
});

$(document).on("submit", "form.modal-Crud", function () {
    
    var $form = $(this),
        data = getCrudFields($form),
        grids = $form.data("grid") ? $form.data("grid").split(' ') : undefined,
        modal = $form.data("modal"),
        url = $form.attr('action'),
        callback = $form.data("callback");

    var cont = function () {
        if (grids && grids != '') {
            for (var i = 0; i < grids.length; i++) {
                reloadGrid(grids[i], 1);
            }
        }

        if (callback && callback != '') {
            callFn(callback, data);
        }

        if (modal && modal != '') {
            $('#' + modal).modal('hide');
        }
    };

    if (url && url != '') {
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            dataType: 'json',
            success: function (d) {
                if (d.success == true) {
                    success(d.message || "Grabado Correctamente !!");
                    //updateNotification();
                    //updateNotificationCount();
                    cont();
                } else {
                    error(d.message.length == 0 ? "Ocurrió un error. Por favor vuelva a interntarlo" : d.message);
                }
            },
            error: function (e) {
                error("Ocurrió un error. Por favor vuelva a interntarlo");
            },
        });
    } else {
        cont();
    }

    return false;
});

$(document).on("click", ".load-modal", function () {
    var $element = $(this),
        modal = $element.data("modal") || $element.closest("ul").data("modal"),
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

$(document).ajaxSend(function (e, response, options) {
    var preventLoading = false;
    if (!isLoading) {
        preventLoading = true;
        isLoading = true;
    } else {
        if (options.port) {

        } else if (options.url) {
            if (options.url.toString().indexOf("sidx") != -1) {
                preventLoading = true;
            }
        }
    }
    if (!preventLoading) {
        $("#loading-panel").show();
        $("#loading-panel").animate({ "right": "0px" }, "slow");
    }
});

$(document).ajaxComplete(function (event, xhr, options) {
    $("#loading-panel").animate({ "right": "-=300px" }, "slow", function () {
        $("#loading-panel").hide();
    });
    //if (xhr && xhr.responseJSON && xhr.responseJSON.success != undefined && !xhr.responseJSON.success) {
    //    var msg = xhr.responseJSON.message ? xhr.responseJSON.message : "Oops, it was an error, please try again";
    //    error(msg);
    //}
});

$(document).ajaxError(function (event, xhr, options, exception) {
    if (xhr.status === 0) {
        xhr.abort();
    } else {
        if (xhr.status !== 200) {
            error(xhr.status === 500 ? xhr.responseText : xhr.statusText);
        }
    }
});

function clearForm(id) {
    clearFormElem('#' + id);
}

function clearFormElem(elem) {
    $(elem).find('input, textarea, select').removeClass('input-validation-error').val('');
}

function validateNumber() {
    $(document).on("keypress", ".number,input[data-val-number]", function (event, elem) {
        if (!event.charCode) return true;
        var key = event.which;
        if (key >= 48 && key <= 57 // 0-9
            || key == 44 //,(colon)
            || key == 45 //-Minus
            || key == 46 //.(Numpad dot)
        ) {
            return true;
        }
        return false;
    });
}

function preparedDate() {
    $('.date-from,.date-to,.date,.calendar').datetimepicker({
        pickTime: false,
        language: 'es',
        icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down"
        }
    });
}

function datePickers() {
    var input = $("input.calendar");
    $(input).removeClass("calendar").wrap("<div class='input-group date' data-date-format='dd/MM/yyy'></div>");
    $(input).parent().append("<span class='input-group-addon'><i class='fa fa-calendar'></i></span>");

    preparedDate();
}

function callFn(fn, object) {
    if (typeof window[fn] === "function") {
        var func = window[fn];
        return func.call(name, object);
    }

    return null;
};

function getCrudFields(formId) {
    var form = $(formId);
    var arr = form.serializeArray({ checkboxesAsBools: true });
    //arr = $.grep(arr, function (n) {
    //    return (n.value.length > 0);
    //});

    return arr;
}

function error(message) {
    showNotification('error', message);
}
function warning(message) {
    showNotification('warning', message);
}
function info(message) {
    showNotification('info', message);
}
function success(message) {
    showNotification('success', message);
}

function showNotification(type, message) {
    var title, color, icon;
    if (type == 'warning') {
        title = 'Warning';
        color = '#C79121';
        icon = 'fa fa-warning';
    } else if (type == 'error') {
        title = 'Error';
        color = '#CD3C54';
        icon = 'fa fa-thumbs-down';
    } else if (type == 'success') {
        title = 'Success';
        color = '#437C6A';
        icon = 'fa fa-thumbs-up';
    } else {
        title = 'Info';
        color = '#547989';
        icon = 'fa fa-info-circle';
    }

    toastr[type](message);
}

function confirm(message, confirmCallback, cancelCallback, confirmButtonText, cancelButtonText) {
    confirmButtonText = confirmButtonText || "Aceptar";
    cancelButtonText = cancelButtonText || "Cancelar";
    var options = {
        animation: 400,
        buttons: {

            cancel: {
                text: cancelButtonText,
                className: "btn btn-danger btn-xs",
                action: function () {
                    Apprise("close");
                    if ($.isFunction(cancelCallback)) {
                        cancelCallback.call(this);
                    }
                }
            },
            confirm: {
                text: confirmButtonText,
                className: "btn btn-primary btn-xs",
                action: function () {
                    Apprise("close");
                    if ($.isFunction(confirmCallback)) {
                        confirmCallback.call(this);
                    }
                }
            },
        }
    };
    Apprise(message, options);
}

function loadSelect(id, url, filterId) {

    if (url) {
        $.ajax({
            type: "get",
            url: url,
            data: { id: filterId === '' ? '0' : filterId },
            success: function (d) {
                if (d.success) {

                    var select = $('#' + id);
                    var first = $(select).find('option').first();
                    $(select).html('');

                    var stringOptions = '';
                    for (var i = 0; i < d.values.length; i++) {
                        var item = d.values[i];

                        var selected = item.value == filterId ? ' selected' : '';

                        var option = '<option value="' + item.value + '" ' + selected + '>' + item.text + '</option>';
                        stringOptions += option;
                    }
                    $(select).append(first);
                    $(select).append(stringOptions);
                } else {
                    error("Error");
                }
            },
            error: function (err) {
                error(err);
            },
            dataType: 'json'
        });
    }
}


////****** SignalR*****////


//$('.notifications-menu').click(function (e) {
//    e.preventDefault();

//    var count = 0;
//    count = parseInt($('span.count').html()) || 0;
//    //only load notification if not already loaded
//    if (count > 0) {
//        updateNotification();
//    }
//    $('span.count', this).html('&nbsp;');

//});

//// hide notifications
//$('html').click(function () {
//    $('.noti-content').hide();
//})

//// update notification
//function updateNotification() {

//    $('#notiContent').empty();
//    $('#notiContent').append($('<li>Loading...</li>'));
//    $.ajax({
//        type: 'GET',
//        url: '/Productos/GetNotificationContacts',
//        success: function (response) {

//            $('#notiContent').empty();
//            if (response.length == 0) {
//                $('#notiContent').append($('<li>No data available</li>'));
//            }
//            $.each(response, function (index, value) {
//                $('#notiContent').append($('<li>Producto : ' + value.Descripcion + ' (' + value.Cantidad + ')</li>'));
//            });
//        },
//        error: function (error) {
//            console.log(error);
//        }
//    })

//}
//// update notification count
//function updateNotificationCount() {
//    var count = 0;
//    count = parseInt($('span.count').html()) || 0;
//    count++;
//    $('span.count').html(count);
//}
//// signalr js code for start hub and send receive notification
//var notificationHub = $.connection.notificationHub;
//$.connection.hub.start().done(function () {
//    console.log('Notification hub started');

//});
////signalr method for push server message to client
//try {
//    notificationHub.client.notify = function (message) {
//        updateNotificationCount();
//    }
//} catch (e) {

//}




function loadSelect2(id, url, data, selectedOption, onLoadFinish) {
    if (url) {
        $.ajax({
            type: "get",
            url: url,
            data: data,
            success: function (d) {
                if (d.success) {

                    var select = $(id);
                    $(select).html('');

                    var stringOptions = '';
                    for (var i = 0; i < d.values.length; i++) {
                        var item = d.values[i];

                        var selected = item.value == selectedOption ? ' selected' : '';

                        var option = '<option value="' + item.value + '" ' + selected + '>' + item.text + '</option>';
                        stringOptions += option;
                    }

                    $(select).append(stringOptions);

                } else {
                    error("Error");
                }
                if (onLoadFinish) {
                    onLoadFinish();
                }

            },
            error: function (err) {
                error(err);
                if (onLoadFinish) {
                    onLoadFinish();
                }
            },
            dataType: 'json'
        });
    }
}



function loadSelect3(id, url, data, selectedOption, onLoadFinish) {
    if (url) {
        $.ajax({
            type: "get",
            url: url,
            data: data,
            async: false,
            success: function (d) {
                if (d.success) {

                    var select = $(id);
                    $(select).html('');

                    var stringOptions = '';
                    for (var i = 0; i < d.values.length; i++) {
                        var item = d.values[i];

                        var selected = item.value == selectedOption ? ' selected' : '';

                        var option = '<option value="' + item.value + '" ' + selected + '>' + item.text + '</option>';
                        stringOptions += option;
                    }

                    $(select).append(stringOptions);

                } else {
                    error("Error");
                }
                if (onLoadFinish) {
                    onLoadFinish();
                }

            },
            error: function (err) {
                error(err);
                if (onLoadFinish) {
                    onLoadFinish();
                }
            },
            dataType: 'json'
        });
    }
}


// $(function() {	
// 	// Se crea dialogo para los mensajes	
// 	$("#dlgMsg").dialog({
// 		bgiframe: true,
// 		modal: true,
// 		autoOpen: false,
// 		resizable: false
// 	});	

// });

$.extend({
    getUrlVars: function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    }
});

function showMessage(titulo, msg) {
    /* Muestra un mensaje en un diálogo modal */
    bootbox.dialog({
        message: msg,
        title: titulo,
    });
}

/* Muestra un mensaje en un diálogo modal */
function showConfirm(titulo, msg, onAccept, onCancel) {
    bootbox.dialog({
        message: msg,
        title: titulo,
        className: '',
        buttons: {
            success: {
                label: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    if (onAccept) onAccept();

                }
            },

            danger: {
                label: 'Cancelar',
                className: 'btn-danger',
                callback: function () {
                    if (onCancel) onCancel();
                }
            },
            // main: {
            //   label: 'Primary',
            //   className: 'btn-primary',
            //   callback: function() {
            //     /** callback */
            //   }
            // }
        }
    });
}

function popup(href, nombre, width, height) {
    /* Abre un popup asegurandose que su nombre sea único */
    var nombre;
    var settings = 'height=' + height + ',';
    // config del popup
    settings += 'width=' + width + ',';
    settings += 'top=' + (screen.height - height) / 2 + ',';
    settings += 'left=' + (screen.width - width) / 2 + ',';
    settings += 'scrollbars=yes' + ',';
    settings += 'resizable=yes';
    nombre = (new Date()).getTime() + '_' + nombre; //le agrego al nombre un getTime() para asegurarme que sea único	
    nombre = nombre.replace(/-/, "_X_"); // internet no acepta nombres de ventanas que contengan - solo valores alfanumericos y _
    var w = window.open(href, nombre, settings);
    w.focus();
    return false;
}

function cloneTemplate(template, container, old_prefix, new_prefix) {
    /* Función de clonado de templates, recibe el template el contenedor a donde insertar el elemento clonado
	el prefijo del template a reeemplazar por new_prefix */
    var j, attrs, attr, fields;
    var newnode = template.clone();
    container.append(newnode);
    fields = newnode.find('input, select, label, a, tr, textarea, tbody, div, span, td');
    attrs = ['id', 'name', 'for', 'object', 'parent', 'grupo'];
    fields.each(function (i) {
        for (j = 0; j < attrs.length; j++) {
            attr = this.getAttribute(attrs[j]);
            if (attr) {
                this.setAttribute(attrs[j], attr.replace(old_prefix, new_prefix));
            }
        }
    });
    newnode.removeAttr("id");
    newnode.removeAttr("style");
    newnode.removeAttr("class");
    return newnode;
}

function isDigit(c) {
    return ((c >= "0") && (c <= "9"));
}

function copyPrototype(descendant, parent) {
    var sConstructor = parent.toString();
    var aMatch = sConstructor.match(/\s*function (.*)\(/);
    if (aMatch != null) { descendant.prototype[aMatch[1]] = parent; }
    for (var m in parent.prototype) {
        descendant.prototype[m] = parent.prototype[m];
    }
}

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

if (!Array.indexOf) {
    Array.prototype.indexOf = function (obj) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == obj) {
                return i;
            }
        }
        return -1;
    }
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function getPrefix(s) {
    return s.substring(0, s.search(/-/));
}

