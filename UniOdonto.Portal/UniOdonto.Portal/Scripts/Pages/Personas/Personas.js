var REGEX_EMAIL = "([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@" +
                 "(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)";
var urlCantones;
$(function () {
    
    new ObjectField($('#PlanCuentasEsClienteId'));
    new ObjectField($('#PlanCuentasEsProveedorId'));
    new ObjectField($('#PlanCuentasEsAccionistaId'));
    new ObjectField($('#CuentaRecurrenteId'));
    new ObjectField($('#RetencionesIRId'));
    new ObjectField($('#RetencionesIVAId'));

    $.each({
        '#EsCliente': '#collapseOne',
        '#EsProveedor': '#collapseTwo',
        '#EsEmpleado': '#collapseThree',
        '#EsAccionista': '#collapseFour'
    }, function (key, value) {
        $(key).bind('click', function () { showFieldWhenChecked(key, value); });
        showFieldWhenChecked(key, value);
    });
    function showFieldWhenChecked(checkboxSelector, fieldSelector) {
        if ($(checkboxSelector).is(':checked')) {
            $(fieldSelector).addClass('in')
            $(checkboxSelector).val(true);
            //$(fieldSelector).show();
        }
        else {
            $(fieldSelector).removeClass('in')
            $(checkboxSelector).val(false);
            //$(fieldSelector).hide();
        }
    }

    $.each({
        '#ContribuyenteEspecial': false,
        '#Extranjero': false,
        '#ParaExportacion': false,
        '#CupoCredito': false,
        '#CiaRelacionada': false,
        '#Artesano': false,
        '#EsVendedor': false,
        '#PvpManual': false,
        '#Discapacidad': false,
        '#AcumulaDecimos': false,
        '#ExtensionConyugal': false,
    }, function (key, value) {
        $(key).bind('click', function () { showFieldWhenValue(key, value); });
        showFieldWhenValue(key, value);
    });
    function showFieldWhenValue(checkboxSelector, fieldSelector) {
        if ($(checkboxSelector).is(':checked')) {
            $(checkboxSelector).val(true);
        }
        else {
            $(checkboxSelector).val(false);
        }
    }

    $('#CupoCredito').is(':checked') ? $('.CupoCredito').removeClass("hide") : $('.CupoCredito').addClass("hide");

    crearSelectizeEmail();
    llenarSelectEmail();

   

   

    //Agregar detalle fechas
    $("#agregar_fechas_ministeriolab").click(function (e) {
        e.preventDefault();
        agregarFechas(fechas_entrada_salida_ministeriolab, "M");
    })
    var cantonId = $("#CantonesId").val();
    $("#ProvinciasId").change(function () {
        
        var provinciasId = $("#ProvinciasId").val();
        loadSelect2("#CantonesId", urlCantones, { id: provinciasId });
        if (documento_nuevo == "False") {
           
           $('#CantonesId option[value=' + cantonId + "]").prop('selected', true);
        }
    });
    //
        $("#ProvinciasId").trigger("change");
    
});



function personasCallback(data) {
    $('#Id').val(data.Id);
    $('#Ruc').val(data.Ruc);
    $('#Cedula').val(data.Cedula);
    $('#PrimerNombre').val(data.PrimerNombre);
    
    $('#ReferenciaArcBan').val(data.ReferenciaArcBan);
    $('#SegundoApellido').val(data.SegundoApellido);
    $('#NombreComercial').val(data.NombreComercial);
    $('#CiaRelacionada').val(data.CiaRelacionada);
    $('#PrimerApellido').val(data.PrimerApellido);
    $('#SegundoNombre').val(data.SegundoNombre);
    $('#NumeroCueBan').val(data.NumeroCueBan);
    $('#SaldoIniPro').val(data.SaldoIniPro);
    $('#SaldoIniCli').val(data.SaldoIniCli);
    $('#Artesano').val(data.Artesano);
    $('#Telefonos').val(data.Telefonos);
    $('#Direccion').val(data.Direccion);
    $('#Email').val(data.Email);
    $('#Descuento').val(data.Descuento);
    $('#Monto').val(data.Monto);
    $('#Dias').val(data.Dias);

    $('#CiaRelacionada').val(data.CiaRelacionada).prop("checked", data.CiaRelacionada);
    $('#Artesano').val(data.Artesano).prop("checked", data.Artesano);
    $('#ContribuyenteEspecial').prop("checked", data.ContribuyenteEspecial);
    $('#ContribuyenteEspecial').val(data.ContribuyenteEspecial);
    $('#ParaExportacion').prop("checked", data.ParaExportacion);
    $('#ParaExportacion').val(data.ParaExportacion);
    $('#CupoCredito').prop("checked", data.CupoCredito);
    $('#CupoCredito').val(data.CupoCredito);
    $('#EsProveedor').prop("checked", data.EsProveedor);
    $('#EsProveedor').val(data.EsProveedor);
    $('#EsEmpleado').prop("checked", data.EsEmpleado);
    $('#EsEmpleado').val(data.EsEmpleado);
    $('#Extranjero').prop("checked", data.Extranjero);
    $('#Extranjero').val(data.Extranjero);
    $('#EsCliente').prop("checked", data.EsCliente);
    $('#EsCliente').val(data.EsCliente);
    $('#EsVendedor').prop("checked", data.EsVendedor);
    $('#EsVendedor').val(data.EsVendedor);
    $('#EsAccionista').prop("checked", data.EsAccionista);
    $('#EsAccionista').val(data.EsAccionista);
    

    $('#TipoCuentaBancariaId option[value=' + data.TipoCuentaBancariaId + "]").prop('selected', true);
    $('#TipoIdentificacion option[value=' + data.TipoIdentificacion + "]").prop('selected', true);
    $('#TipoClienteId option[value=' + data.TipoClienteId + "]").prop('selected', true);
    $('#BancosId option[value=' + data.BancosId + "]").prop('selected', true);
    

    $('#EsCliente').is(':checked') ? $('#collapseOne').addClass('in') : $('#collapseOne').removeClass('in');
    $('#EsProveedor').is(':checked') ? $('#collapseTwo').addClass('in') : $('#collapseTwo').removeClass('in');
    $('#EsEmpleado').is(':checked') ? $('#collapseThree').addClass('in') : $('#collapseThree').removeClass('in');
    $('#EsAccionista').is(':checked') ? $('#collapseFour').addClass('in') : $('#collapseFour').removeClass('in');
    $('#CupoCredito').is(':checked') ? $('.CupoCredito').removeClass("hide") : $('.CupoCredito').addClass("hide");

    CargarActualClientes(data.PlanCuentasEsClienteId);
    $('#PlanCuentasEsClienteId').val(data.PlanCuentasEsClienteId);
    CargarActualProveedor(data.PlanCuentasEsProveedorId);
    $('#PlanCuentasEsProveedorId').val(data.PlanCuentasEsProveedorId);
    CargarActualAccionistas(data.PlanCuentasEsAccionistaId);
    $('#PlanCuentasEsAccionistaId').val(data.PlanCuentasEsAccionistaId);
}


$('#EsCliente').on('change', function () {
    $(this).is(':checked') ? $('#collapseOne').addClass('in') : $('#collapseOne').removeClass('in');
    $(this).is(':checked') ? $('#EsCliente').val(true) : $('#EsCliente').val(false);
});

$('#EsProveedor').on('change', function () {
    $(this).is(':checked') ? $('#collapseTwo').addClass('in') : $('#collapseTwo').removeClass('in');
    $(this).is(':checked') ? $('#EsProveedor').val(true) : $('#EsProveedor').val(false);
});

$('#EsEmpleado').on('change', function () {
    $(this).is(':checked') ? $('#collapseThree').addClass('in') : $('#collapseThree').removeClass('in');
    $(this).is(':checked') ? $('#EsEmpleado').val(true) : $('#EsEmpleado').val(false);
});

$('#EsAccionista').on('change', function () {
    $(this).is(':checked') ? $('#collapseFour').addClass('in') : $('#collapseFour').removeClass('in');
    $(this).is(':checked') ? $('#EsAccionista').val(true) : $('#EsAccionista').val(false);
});

$('#ContribuyenteEspecial').on('click', function () {
    $(this).is(':checked') ? $('#ContribuyenteEspecial').val(true) : $('#ContribuyenteEspecial').val(false);
});

$('#Extranjero').on('click', function () {
    $(this).is(':checked') ? $('#Extranjero').val(true) : $('#Extranjero').val(false);
});

$('#ParaExportacion').on('click', function () {
    $(this).is(':checked') ? $('#ParaExportacion').val(true) : $('#ParaExportacion').val(false);
});

$('#CiaRelacionada').on('click', function () {
    $(this).is(':checked') ? $('#CiaRelacionada').val(true) : $('#CiaRelacionada').val(false);
});

$('#Artesano').on('click', function () {
    $(this).is(':checked') ? $('#Artesano').val(true) : $('#Artesano').val(false);
});

$('#EsVendedor').on('click', function () {
    $(this).is(':checked') ? $('#EsVendedor').val(true) : $('#EsVendedor').val(false);
});

$('#CupoCredito').on('click', function () {
    $(this).is(':checked') ? $('#CupoCredito').val(true) : $('#CupoCredito').val(false);
    $(this).is(':checked') ? $('.CupoCredito').removeClass("hide") : $('.CupoCredito').addClass("hide");
});

$('#btnNuevo').on('click', function () {
    $('#ContribuyenteEspecial').prop("checked", false);
    $('#Extranjero').prop("checked", false);
    $('#EsCliente').prop("checked", false);
    $('#ParaExportacion').prop("checked", false);
    $('#CupoCredito').prop("checked", false);
    $('#EsProveedor').prop("checked", false);
    $('#CiaRelacionada').prop("checked", false);
    $('#Artesano').prop("checked", false);
    $('#EsEmpleado').prop("checked", false);
    $('#EsAccionista').prop("checked", false);
    $('#EsVendedor').prop("checked", false);
    $('#collapseOne').removeClass('in');
    $('#collapseTwo').removeClass('in');
    $('#collapseThree').removeClass('in');
    $('.CupoCredito').addClass("hide");
});


function Personas(data) {
    this.setAttributes(data);
}

Personas.prototype.setAttributes = function (data) {
    this.Id = data['Id'];
    this.ruc = data['Identificacion'];
    this.nombre_comercial = data['NombreCompleto'];
    this.razon_social = data['NombreCompleto'];
    this.Descripcion = data['Descripcion'];
    this.nombre = data['NombreCompleto'];
    this.telefonos = data['Telefonos'];
    this.direccion = data['Direccion'];
    this.tipoIdentificacion = data['TipoIdentificacion'];
    if (this.tipoIdentificacion != null) {
        this.tipoId = this.tipoIdentificacion['Id'];
        this.tipo = this.tipoIdentificacion['Descripcion'];
        this.tipocodigo = this.tipoIdentificacion['Codigo'];
    } else {
        this.tipoId = "";
        this.tipo = "";
        this.tipocodigo = "";
    }
    this.es_cliente = data['EsCliente'];
    this.es_proveedor = data['EsProveedor'];
    this.es_empleado = data['EsEmpleado'];
    this.tipo_contrato = data['EsAccionista'];
    this.aplicar_cupo = data['CupoCredito'];
    this.cupo_credito = data['Monto'];
    this.dias_credito = data['Dias'];
    this.artesanal = data['Artesano'];
    this.exterior = data['Extranjero'];
    this.pvp_default = data['PvpDefecto'];
    this.es_pvp_default_manual = data['PvpManual'];
}

Personas.getById = function (id, async, callback, oThis) {
    $.ajax({
        type: "GET",
        url: urlprefix + "/Personas/GetPersonas?Id=" + id,
        dataType: "json",
        async: true,
        success: function (data, textStatus) {
            var persona = new Personas(data);
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


Personas.getByIdAgenda = function (id, async, callback, oThis) {
    if (async == undefined) async = true;
    var persona = null;
    $.ajax({
        type: "GET",
        url: urlprefix + "/Personas/GetPersonas?Id=" + id,
        dataType: "json",
        async: async,
        success: function (data, textStatus) {
            persona = new Personas(data);
            if (async) {
                if (oThis) {
                    callback.call(oThis, persona);
                }
                else {
                    callback(persona);
                }
            }
        },
        error: function () {
            showMessage('Error', 'Ocurrio un error al intentar cargar los datos de la persona, por favor intentelo nuevamente');
        }
    });
    if (typeof promises_js !== 'undefined') {
        promises_js.push(a);
    }
    if (!async) {
        return persona;
    }
}

Personas.getByRuc = function (ruc, async, callback, oThis) {
    if (async == undefined) async = true;
    var persona = null;
    $.ajax({
        type: "GET",
        url: urlprefix + "/Personas/GetPersonasIdentificacion?Id=" + ruc,
        data: { 'query': ruc },
        dataType: "json",
        async: async,
        success: function (data, textStatus) {
            var persona = null;
            if (data) {
                persona = new Personas(data);
            }
            if (async) {
                if (oThis) {
                    callback.call(oThis, persona);
                }
                else {
                    callback(persona);
                }
            }
        },
        error: function () {
            showMessage('Error', 'Ocurrió un error al intentar cargar los datos de la persona, por favor inténtelo nuevamente');
        }
    });
    if (!async) {
        return persona;
    }
}


$(document).on('click', '.panel-heading span.clickable', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel .bancos').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    } else {
        $this.parents('.panel .bancos').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
    }
})

$(document).on('click', '.panel-heading span.rolEmpresa', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel .rol').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    } else {
        $this.parents('.panel .rol').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
    }
})

$(document).on("submit", "form.frmPersonas", function () {
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
                    success(d.message || "Grabado Correctamente !!");
                    var url = "/Personas"
                    window.location.href = url;
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


function crearSelectizeEmail() {
    $("#Email").selectize({
        plugins: ['remove_button'],
        delimiter: ' ',
        persist: false,
        maxItems: 4,
        valueField: "email",
        labelField: "name",
        searchField: ["email"],
        options: [],
        render: {
            item: function (item, escape) {
                    return "<div>" +
                    (item.email ? "<small class=\"text-muted ml10\">" + escape(item.email) + "</small>" : "") +
                    "</div>";
            },
            option: function (item, escape) {

                var label = item.email;
                return "<div>" +
                    "<span class=\"text-primary\">" + escape(label) + "</span>" +
                    "</div>";
            }
        },
        create: function (input) {
            if ((new RegExp("^" + REGEX_EMAIL + "$", "i")).test(input)) {
                return {
                    email: input
                };
            }
            var match = input.match(new RegExp("^([^<]*)\<" + REGEX_EMAIL + "\>$", "i"));
            if (match) {
                return {
                    email: match[2]
                };
            }
            return false;
        }
    });
}

function llenarSelectEmail() {
    var id = $('#id_id').val();
    var email_personas;

    if (id) {
        email_personas = $('#id_email').val();
        var nom = email_personas.split(",");
        var selectize = $("#Email")[0].selectize;
        selectize.clear();
        selectize.clearOptions();
        selectize.renderCache = {};

        for (var i in nom) {
            var email_item = nom[i];
            //<!--console.log(email_item);-->
            selectize.addOption({
                email: email_item
            });

        }
        selectize.refreshOptions(true);
        selectize.setValue(nom);

    }

}

function agregarFechas(objeto_maestro_detalle, tipo) {
    
    objeto_maestro_detalle.agregarDetalle();
    var tr = objeto_maestro_detalle.getLastRow();
    var fecha_entrada_nuevo = $(tr).find('input[id$="-fecha_entrada"]');
    var fecha_salida_nuevo = $(tr).find('input[id$="-fecha_salida"]');
    var tipo_nuevo = $(tr).find('input[id$="-tipo"]');

    fecha_entrada_nuevo.removeClass('hasDatepicker').datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true });
    fecha_salida_nuevo.removeClass('hasDatepicker').datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true });

    var str_id_fecha = fecha_entrada_nuevo[0].id
    arr_id_fecha = str_id_fecha.split("-");
    var str_id_detalle_p1 = arr_id_fecha[0];
    var arr_id_detalle_p1 = str_id_detalle_p1.split('_');
    fecha_entrada_nuevo.datepicker('option', 'onSelect', function () {
        if (fecha_salida_nuevo.datepicker('getDate') != null) {
            var fecha_salida_sel = $.datepicker.formatDate("yy-mm-dd", fecha_salida_nuevo.datepicker('getDate'));
            var fecha_entrada_sel = $.datepicker.formatDate("yy-mm-dd", fecha_entrada_nuevo.datepicker('getDate'));

            if (fecha_entrada_sel >= fecha_salida_sel) {
                if (arr_id_detalle_p1[1] == 'entradasalidaempresa')
                    $("#msj_error_fechas_empresa").removeClass("hide");
                if (arr_id_detalle_p1[1] == 'entradasalidaiess')
                    $("#msj_error_fechas_iess").removeClass("hide");
                if (arr_id_detalle_p1[1] == 'entradasalidaministeriolab')
                    $("#msj_error_fechas_min").removeClass("hide");
            } else {

                if (arr_id_detalle_p1[1] == 'entradasalidaempresa') {
                    if (!$("#msj_error_fechas_empresa").hasClass("hide"))
                        $("#msj_error_fechas_empresa").addClass("hide");
                } else if (arr_id_detalle_p1[1] == 'entradasalidaiess') {
                    if (!$("#msj_error_fechas_iess").hasClass("hide"))
                        $("#msj_error_fechas_iess").addClass("hide");
                } else if (arr_id_detalle_p1[1] == 'entradasalidaministeriolab') {
                    if (!$("#msj_error_fechas_min").hasClass("hide"))
                        $("#msj_error_fechas_min").addClass("hide");
                }
            }
        }
    });


    fecha_salida_nuevo.datepicker('option', 'onSelect', function () {
  
        if (fecha_entrada_nuevo.datepicker('getDate') != null) {
            var fecha_salida_sel = $.datepicker.formatDate("yy-mm-dd", fecha_salida_nuevo.datepicker('getDate'));
            var fecha_entrada_sel = $.datepicker.formatDate("yy-mm-dd", fecha_entrada_nuevo.datepicker('getDate'));

            if (fecha_entrada_sel >= fecha_salida_sel) {
                if (arr_id_detalle_p1[1] == 'entradasalidaempresa')
                    $("#msj_error_fechas_empresa").removeClass("hide");
                if (arr_id_detalle_p1[1] == 'entradasalidaiess')
                    $("#msj_error_fechas_iess").removeClass("hide");
                if (arr_id_detalle_p1[1] == 'entradasalidaministeriolab')
                    $("#msj_error_fechas_min").removeClass("hide");
            } else {

                if (arr_id_detalle_p1[1] == 'entradasalidaempresa') {
                    if (!$("#msj_error_fechas_empresa").hasClass("hide"))
                        $("#msj_error_fechas_empresa").addClass("hide");
                } else if (arr_id_detalle_p1[1] == 'entradasalidaiess') {
                    if (!$("#msj_error_fechas_iess").hasClass("hide"))
                        $("#msj_error_fechas_iess").addClass("hide");
                } else if (arr_id_detalle_p1[1] == 'entradasalidaministeriolab') {
                    if (!$("#msj_error_fechas_min").hasClass("hide"))
                        $("#msj_error_fechas_min").addClass("hide");
                }
            }
        }
    });

    tipo_nuevo.val(tipo);
}

function validarDocumento() {
     numero = document.getElementById('Identificacion').value;
     var tipoIdentificacion = $('#TipoIdentificacionId option:selected').text();
    if (tipoIdentificacion != 'Ruc' && tipoIdentificacion != 'Cédula') {
         $("#Identificacion").removeClass("form-control-warning is-invalid");
         return;
     }
    /* alert(numero); */
    var suma = 0;
    var residuo = 0;
    var pri = false;
    var pub = false;
    var nat = false;
    var numeroProvincias = 22;
    var modulo = 11;

    /* Verifico que el campo no contenga letras */
    var ok = 1;
    for (i = 0; i < numero.length && ok == 1 ; i++) {
        var n = parseInt(numero.charAt(i));
        if (isNaN(n)) ok = 0;
    }
    if (ok == 0) {
        info("No puede ingresar caracteres en el número");
        //$("#GuardarId").hide();
        $("#Identificacion").addClass("form-control-warning is-invalid");
        return false;
    }

    if (numero.length < 10) {
        info('El número ingresado no es válido');
        //$("#GuardarId").hide();
        $("#Identificacion").addClass("form-control-warning is-invalid");
        return false;
    }

    /* Los primeros dos digitos corresponden al codigo de la provincia */
    provincia = numero.substr(0, 2);
    if (provincia < 1 || provincia > numeroProvincias) {
        info('El código de la provincia (dos primeros dígitos) es inválido');
        //$("#GuardarId").hide();
        $("#Identificacion").addClass("form-control-warning is-invalid");
        return false;
    }
    /* Aqui almacenamos los digitos de la cedula en variables. */
    d1 = numero.substr(0, 1);
    d2 = numero.substr(1, 1);
    d3 = numero.substr(2, 1);
    d4 = numero.substr(3, 1);
    d5 = numero.substr(4, 1);
    d6 = numero.substr(5, 1);
    d7 = numero.substr(6, 1);
    d8 = numero.substr(7, 1);
    d9 = numero.substr(8, 1);
    d10 = numero.substr(9, 1);

    /* El tercer digito es: */
    /* 9 para sociedades privadas y extranjeros   */
    /* 6 para sociedades publicas */
    /* menor que 6 (0,1,2,3,4,5) para personas naturales */
    if (d3 == 7 || d3 == 8) {
        info('El tercer dígito ingresado es inválido');
        //$("#GuardarId").hide();
        $("#Identificacion").addClass("form-control-warning is-invalid");
        return false;
    }

    /* Solo para personas naturales (modulo 10) */
    if (d3 < 6) {
        nat = true;
        p1 = d1 * 2; if (p1 >= 10) p1 -= 9;
        p2 = d2 * 1; if (p2 >= 10) p2 -= 9;
        p3 = d3 * 2; if (p3 >= 10) p3 -= 9;
        p4 = d4 * 1; if (p4 >= 10) p4 -= 9;
        p5 = d5 * 2; if (p5 >= 10) p5 -= 9;
        p6 = d6 * 1; if (p6 >= 10) p6 -= 9;
        p7 = d7 * 2; if (p7 >= 10) p7 -= 9;
        p8 = d8 * 1; if (p8 >= 10) p8 -= 9;
        p9 = d9 * 2; if (p9 >= 10) p9 -= 9;
        modulo = 10;
    }
        /* Solo para sociedades publicas (modulo 11) */
        /* Aqui el digito verficador esta en la posicion 9, en las otras 2 en la pos. 10 */
    else if (d3 == 6) {
        pub = true;
        p1 = d1 * 3;
        p2 = d2 * 2;
        p3 = d3 * 7;
        p4 = d4 * 6;
        p5 = d5 * 5;
        p6 = d6 * 4;
        p7 = d7 * 3;
        p8 = d8 * 2;
        p9 = 0;
    }

        /* Solo para entidades privadas (modulo 11) */
    else if (d3 == 9) {
        pri = true;
        p1 = d1 * 4;
        p2 = d2 * 3;
        p3 = d3 * 2;
        p4 = d4 * 7;
        p5 = d5 * 6;
        p6 = d6 * 5;
        p7 = d7 * 4;
        p8 = d8 * 3;
        p9 = d9 * 2;
    }

    suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
    residuo = suma % modulo;
    /* Si residuo=0, dig.ver.=0, caso contrario 10 - residuo*/
    digitoVerificador = residuo == 0 ? 0 : modulo - residuo;
    /* ahora comparamos el elemento de la posicion 10 con el dig. ver.*/
    if (pub == true) {
        if (digitoVerificador != d9) {
            info('El ruc de la empresa del sector público es incorrecto.');
            return false;
        }
        /* El ruc de las empresas del sector publico terminan con 0001*/
        if (numero.substr(9, 4) != '0001') {
            info('El ruc de la empresa del sector público debe terminar con 0001');
            //$("#GuardarId").hide();
            $("#Identificacion").addClass("form-control-warning is-invalid");
            return false;

        }
    }
    else if (pri == true) {
        if (digitoVerificador != d10) {
            info('El ruc de la empresa del sector privado es incorrecto.');
            //$("#GuardarId").hide();
            $("#Identificacion").addClass("form-control-warning is-invalid");
            return false;
        }
        if (numero.substr(10, 3) != '001') {
            info('El ruc de la empresa del sector privado debe terminar con 001');
            //$("#GuardarId").hide();
            $("#Identificacion").addClass("form-control-warning is-invalid");
            return false;
        }
    }
    else if (nat == true) {
        if (digitoVerificador != d10) {
            info('El número de cédula de la persona natural es incorrecto.');
            //$("#GuardarId").hide();
            $("#Identificacion").addClass("form-control-warning is-invalid");
            return false;
        }
        if (numero.length > 10 && numero.substr(10, 3) != '001') {
            info('El ruc de la persona natural debe terminar con 001');
            //$("#GuardarId").hide();
            $("#Identificacion").addClass("form-control-warning is-invalid");
            return false;
        }
    }
    if (tipoIdentificacion == 'RUC') {
        if (numero.length != 13) {
            info('El número ingresado no es válido en la opcion Ruc');
            $("#Identificacion").addClass("form-control-warning is-invalid");
            return false;
        }
    }
    if (tipoIdentificacion == 'CEDULA') {
        if (numero.length != 10) {
            info('El número ingresado no es válido en la opcion Cedula');
            $("#Identificacion").addClass("form-control-warning is-invalid");
            return false;
        }
    }
    $("#GuardarId").show();
    $("#Identificacion").removeClass("form-control-warning is-invalid");
    return true;
}

Personas.getObjDesc = function () {
    return this.obj.nombre;
}