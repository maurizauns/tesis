var accion;
var formula, combo, formulaPos;
var productos_cargando = 1;
var producto_cargado = 1;
$(function () {


    decimales = getNumeroDecimales();
    categoria = new ObjectField($('#CategoriaProductosId'));
    new ObjectField($('#UnidadId'));
    new ObjectField($('#MarcaId'));
    cuentaIngresos = new ObjectField($('#PlanCuentasIngresosId'));
    cuentaActivos = new ObjectField($('#PlanCuentasActivosId'));
    cuentaInventario = new ObjectField($('#PlanCuentasInventariosId'));

    true;
    categoria.onSetObj = function (obj) {

        if (producto_cargado) {
            if (obj) {
                
                if (obj.TipoProducto == "SERV") {
                    $("#TipoProducto").val('SER').trigger('change');
                }

                if (obj.Ingresos == false && obj.Activos == false && obj.Inventarios == false) {
                    return;
                }
                
                if (obj.PlanCuentasIngresos) {
                    cuentaIngresos.setObj(obj.PlanCuentasIngresos);
                    $('#Ingresos').attr('checked', true);
                    $('#Ingresos').prop('checked', true);
                } else {
                    cuentaIngresos.setObj(null);
                    $('#Ingresos').attr('checked', false);
                    $('#Ingresos').prop('checked', false);
                }
                if (obj.PlanCuentasActivos) {
                    cuentaActivos.setObj(obj.PlanCuentasActivos);
                    $('#Activos').attr('checked', true);
                    $('#Activos').prop('checked', true);
                } else {
                    cuentaActivos.setObj(null);
                    $('#Activos').attr('checked', false);
                    $('#Activos').prop('checked', false);
                }
                if (obj.PlanCuentasInventarios) {
                    cuentaInventario.setObj(obj.PlanCuentasInventarios);
                    $('#Inventarios').attr('checked', true);
                    $('#Inventarios').prop('checked', true);
                } else {
                    cuentaInventario.setObj(null);
                    $('#Inventarios').attr('checked', false);
                    $('#Inventarios').prop('checked', false);
                }
            } else {
                cuentaIngresos.reset();
                $('#Ingresos').attr('checked', true);
                cuentaActivos.reset();
                $('#Activos').attr('checked', true);
                cuentaInventario.reset();
                $('#Inventarios').attr('checked', true);
                if ($("#TipoProducto").val() == 'SER') {
                    $("#TipoProducto").val('BIE').trigger('change');
                }
            }
        }
        producto_cargado = 1;
    };

    $.each({
        '#Ingresos': false,
        '#Activos': false,
        '#Inventarios': false,
        '#RegistroManual': false,
        '#PorcentajeServicio': false,
        '#PvpManual': false,
        '#ManejaLote': false,
        '#ManejaFechaExp': false
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

    $.each({
        '#Ingresos': '.DivIngresos',
        '#Activos': '.DivActivos',
        '#Inventarios': '.DivInventarios'
    }, function (key, value) {
        $(key).bind('click', function () { showFieldWhenChecked(key, value); });
        showFieldWhenChecked(key, value);
    });
    function showFieldWhenChecked(checkboxSelector, fieldSelector) {
        if ($(checkboxSelector).is(':checked')) {
            $(fieldSelector).removeClass("hide");
            $(checkboxSelector).val(true);
        }
        else {
            $(fieldSelector).addClass("hide");
            $(checkboxSelector).val(false);
        }
    }

    combo = new MasterDetail({
        'templateDetalle': $('#dtemplate_combo'),
        'tableDetalle': $('#tdetalle_combo'),
        'prefixDetalle': 'template',
        'funcCompDetalle': DetalleComboForm.sonIguales,
        'klassDetalle': DetalleComboForm
    });

    //Calculos de CompPVPCompuesto
    calcularCompPVPCompuesto(null, '1');
    calcularCompPVPCompuesto(null, '2');
    calcularCompPVPCompuesto(null, '3');
    calcularCompPVPCompuesto(null, 'dist');

    $('#SubTipoId').bind('change', function () {
        $('#id_inventariable').parent().show()
        if ($('#SubTipoId').val() == 'SIM') {
            $('#tabformula').hide();
            $('#panelCombo').hide();
            $('#tabproduccion').hide();
            $('#formulaProduccion').hide();
            $('#formulaCompuesto').hide();
            $('#tabdatosgenerales').show();
            $('#tabdatosgenerales').trigger('click');//por los nuevos tabs
            $('#generales').show();//por los nuevos tabs
            //$('#tabs').tabs("option", "active", 0);
            $('.tr-unidad').show();
            $('.fieldinventario').show();
            $('#fieldimportacion').show();
            $('#-tbunidad').show();

            $('.labelUnidad').show();
            $('.sim-unidad2').show();
            $('.sim-unidad3').show();
            $('.sim-unidad1').show();
            $('.sim-unidad4').show();
            $('.sim-unidad5').show();

            $('.fieldunidades').show();



            $('#div-checkbox-variantes').show();
        }
        else if ($('#SubTipoId').val() == 'CMB') {
            $('#panelCombo').show();
            hide_seccion_variantes();
        }
        else if ($('#SubTipoId').val() == 'COM') {
            $('#panelCombo').hide();
            hide_seccion_variantes();
        }
        else {
            $('#panelCombo').hide();
            hide_seccion_variantes();
        }
        handleShowCuentaCosto();
    });
    $("#SubTipoId").trigger("change");

    $("#ManejaLote").change(function () { handleManejaLote(); });
    $("#ManejaLote").trigger('change');
});

function handleShowCuentaCosto() {
    var label = $("label[for='id_para_compra']");
    var text = $('.datacompra').find('.recomendacion');
    if ($('#id_inventariable').is(':checked')) {
        $('.datainventario').show();
        label.html('&nbsp;Activo&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
        text.text('Cuenta de Activo');
    }
    else {
        $('.datainventario').hide();
        label.html('&nbsp;Costo&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
        text.text('Cuenta de Costos');
    }
}

function hide_seccion_variantes() {
    $('#div-checkbox-variantes').hide();
    $('#id_maneja_variantes').attr('checked', false);
    $('#tabvariantes').hide();
}

$('#RegistroManual').on('click', function () {
    $(this).is(':checked') ? $('#RegistroManual').val(true) : $('#RegistroManual').val(false);
});

$('#PorcentajeServicio').on('click', function () {
    $(this).is(':checked') ? $('#PorcentajeServicio').val(true) : $('#PorcentajeServicio').val(false);
});

$('#RegistroManual').on('click', function () {
    $(this).is(':checked') ? $('#RegistroManual').val(true) : $('#RegistroManual').val(false);
});

$('#Ingresos').on('click', function () {
    $(this).is(':checked') ? $('#Ingresos').val(true) : $('#Ingresos').val(false);
    $(this).is(':checked') ? $('.DivIngresos').removeClass("hide") : $('.DivIngresos').addClass("hide");
    $(this).is(':checked') ? '' : $('#PlanCuentasIngresosName, #PlanCuentasIngresosId').val('');
});

$('#Activos').on('click', function () {
    $(this).is(':checked') ? $('#Activos').val(true) : $('#Activos').val(false);
    $(this).is(':checked') ? $('.DivActivos').removeClass("hide") : $('.DivActivos').addClass("hide");
    $(this).is(':checked') ? '' : $('#PlanCuentasActivosName, #PlanCuentasActivosId').val('');
});

$('#Inventarios').on('click', function () {
    $(this).is(':checked') ? $('#Inventarios').val(true) : $('#Inventarios').val(false);
    $(this).is(':checked') ? $('.DivInventarios').removeClass("hide") : $('.DivInventarios').addClass("hide");
    $(this).is(':checked') ? '' : $('#PlanCuentasInventariosName, #PlanCuentasInventariosId').val('');
});


$('#form-Unidad').on('submit', saveUnidad);
function saveUnidad(event) {
    event.stopPropagation(); // Stop stuff happening
    event.preventDefault(); // Totally stop stuff happening
    var data = new FormData();
    data.append("Codigo", $("#Unidad_Codigo").val());
    data.append("Descripcion", $("#Unidad_Descripcion").val());
    $.ajax({
        url: "/Productos/SaveUnidad",
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (result) {
            console.debug(result);
            if (result.success) {
                init();
                success("Grabado Correctamente !!");
                $('#Unidad-modal').modal('toggle');
            } else {
                error(result.message);
            }
        },
        error: function () {
            error("Error al Guardar");
        }
    });
}

$('#form-Marca').on('submit', saveMarca);
function saveMarca(event) {
    event.stopPropagation(); // Stop stuff happening
    event.preventDefault(); // Totally stop stuff happening
    var data = new FormData();
    data.append("Codigo", $("#Marca_Codigo").val());
    data.append("Descripcion", $("#Marca_Descripcion").val());
    $.ajax({
        url: "/Productos/SaveMarca",
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (result) {
            console.debug(result);
            if (result.success) {
                init();
                success("Grabado Correctamente !!");
                $('#Marca-modal').modal('toggle');
            } else {
                error(result.message);
            }
        },
        error: function () {
            error("Error al Guardar");
        }
    });
}
$('#TipoProducto').bind('change', function () {
    if ($('#TipoProducto').val() == 'PRO') {
        $('.fieldinventario').show();
        // $('#fieldimportacion').show();
        $("#id_tipo_producto option[value='PRO']").show();
    }
    else {
        $('.fieldinventario').hide();
        // $('#fieldimportacion').hide();
        $("#id_tipo_producto option[value='PRO']").hide();
    }
});

$('#TipoProducto').bind('change', function () {
    if ($('#TipoProducto').val() === 'SER') {
        $('.subTipoClass').hide();
    } else {
        $('.subTipoClass').show();
        $("#SubTipoId").trigger("change");
    }
});

$("#TipoProducto").trigger("change");

$('#Ice').on('change', function () { handlerComboICE(); })

//Call handles
handlerComboICE();

function handlerComboICE() {
    var tipo_ice = $('#Ice').val();
    if (tipo_ice == 'PICE') {
        $('.porcentajeIce').show();
        $('.valorIce').hide();
    } else if (tipo_ice == 'VICE') {
        $('.porcentajeIce').hide();
        $('.valorIce').show();
    } else {
        $('.porcentajeIce').hide();
        $('.valorIce').hide();
    }
}

$(document).on("submit", "form.frmProductos", function () {
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

                    var url = "/Productos"
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



function DetalleComboForm(tr, firstLoad) {
    this.tr = tr; // almacena la fila que representa a un detalle
    this.productofield = new ObjectField($(this.tr).find('input.object-hidden[id$="producto_detalle_id"]'));
    this.cuentafield = new ObjectField($(this.tr).find('input.object-hidden[id$="cuenta_venta_id"]'));
    this.productofield.onSetObj = function (obj) {
        if (!firstLoad || !$('#Id').val()) {

            // se setea el control de cuenta de venta
            $(tr).find('input[id$="-cuenta_venta_id"]').val(obj['cuenta_venta_id']);
            $($(this.el).parent().next().find('.object-description')[0]).val(obj['cuenta_venta_desc']);
            // seteo de propiedades
            $(tr).find('input[id$="-porcentaje_iva"]').val(obj['porcentaje_iva']);
            $(tr).find('input[id$="-porcentaje_ice"]').val(obj['porcentaje_ice']);
            // seteo de pvps
            $(tr).find('input[id$="-pvp1"]').val(obj['Pvp1']);
            $(tr).find('input[id$="-pvp2"]').val(obj['Pvp2']);
            $(tr).find('input[id$="-pvp3"]').val(obj['Pvp3']);
            $(tr).find('input[id$="-pvp_distribuidor"]').val(obj['Pvp_distribuidor']);
            calcularCompPVPCompuesto(tr, '1');
            calcularCompPVPCompuesto(tr, '2');
            calcularCompPVPCompuesto(tr, '3');
            calcularCompPVPCompuesto(tr, 'dist');
        }
        $(tr).find('td[id$="-tdunidad"]').html(obj['unidad_desc']);

    };
};

DetalleComboForm.sonIguales = function (detalle1, detalle2) {
    var input1 = $(detalle1).find('input[type=hidden]').get(0);
    var input2 = $(detalle2).find('input[type=hidden]').get(0);
    return (input1.id == input2.id);
};

function calcularCompPVPCompuesto(caller, klass) {
    var pvps = $('input.pvp' + klass).not('input[id*="template"]');
    var total = 0.00, pvp, porcentajeIva, porcentajeIce, prefix;
    var base0 = 0.00, baseiva = 0.00, ice = 0.00, noObjeto = 0.00;
    for (var i = 0; i < pvps.length; i++) {
        prefix = getPrefix(pvps[i].id);
        porcentajeIva = parseInt($('#' + prefix + '-porcentaje_iva').val());
        porcentajeIce = parseFloat($('#' + prefix + '-porcentaje_ice').val());
        valorIce = parseFloat($('#' + prefix + '-valor_ice').val());
        pvp = parseFloat(pvps[i].value);
        if (pvp > 0 && !isNaN(pvp)) {
            total = total + pvp;
            if (porcentajeIva == '0') {
                base0 = base0 + pvp;
            }
            else if (porcentajeIva == '12.00') {
                baseiva = baseiva + pvp;
            }
            else {
                noObjeto = noObjeto + pvp;
            }
            if (porcentajeIce && porcentajeIce > 0) {
                ice = ice + (pvp * (porcentajeIce / 100.00));
            }
            if (valorIce && valorIce > 0) {
                ice = valorIce;
            }
        }
    }
    $('#td-0iva' + klass).html('$' + base0.toFixed(2));
    $('#td-iva' + klass).html('$' + baseiva.toFixed(2));
    $('#td-noiva' + klass).html('$' + noObjeto.toFixed(2));
    $('#td-ice' + klass).html('$' + ice.toFixed(2));
    $('#td-pvp' + klass).html('$' + total.toFixed(decimales));
}


function Producto(data) {
    this.setAttributes(data);
}

Producto.prototype.setAttributes = function (data) {
    this.Id = data['Id'];
    this.codigo = data['Codigo'];
    this.descField = data['Codigo'];
    this.nombre = data['Descripcion'];
    this.CategoriaProductosId = data['CategoriaProductosId'];
    this.CodigoAuxiliar = data['CodigoAuxiliar'];
    this.TipoProducto = data['TipoProducto'];
    this.ValorUnitario = data['ValorUnitario'];
    this.porcentaje_iva = data['Iva'];
    this.Ice = data['Ice'];
    this.porcentaje_ice = data['PorcentajeIce'];
    this.valor_ice = data['ValorIce'];
    this.StockMinimo = data['StockMinimo'];
    this.SubTipoId = data['SubTipoId'];
    this.UnidadId = data['UnidadId'];
    this.MarcaId = data['MarcaId'];
    this.Ingresos = data['Ingresos'];
    this.PlanCuentasIngresosId = data['PlanCuentasIngresosId'];
    this.Activos = data['Activos'];
    this.PlanCuentasActivosId = data['PlanCuentasActivosId'];
    this.Inventarios = data['Inventarios'];
    this.Pvp1 = data['Pvp1'];
    this.Pvp2 = data['Pvp2'];
    this.Pvp3 = data['Pvp3'];
    this.Pvp_distribuidor = data['Pvp_distribuidor'];

    // base 0 de los precios
    this.Pvp1_basecero = data['pvp1_basecero'];
    this.Pvp2_basecero = data['pvp2_basecero'];
    this.Pvp3_basecero = data['pvp3_basecero'];
    this.Pvp_distribuidor_basecero = data['pvp_distribuidor_basecero'];
    // base 12 de los precios
    this.Pvp1_baseiva = data['pvp1_baseiva'];
    this.Pvp2_baseiva = data['pvp2_baseiva'];
    this.Pvp3_baseiva = data['pvp3_baseiva'];
    this.Pvp_distribuidor_baseiva = data['pvp_distribuidor_baseiva'];
    // base no gravable de los precios
    this.Pvp1_basenoiva = data['pvp1_basenoiva'];
    this.Pvp2_basenoiva = data['pvp2_basenoiva'];
    this.Pvp3_basenoiva = data['pvp3_basenoiva'];
    this.Pvp_distribuidor_basenoiva = data['pvp_distribuidor_basenoiva'];
    // ice
    this.Pvp1_ice = 0;
    this.Pvp2_ice = 0;
    this.Pvp3_ice = 0;
    this.Pvp_distribuidor_ice = 0;
    // info de retención asociada al producto
    this.porcentaje_retencion = data['porcentaje_retencion'];
    this.maneja_nombremanual = data['RegistroManual'];
    this.PvpManual = data['PvpManual'];
    this.maneja_lote = data['ManejaLote'];
    this.maneja_fechaexp = data['ManejaFechaExp'];
    this.PlanCuentasInventariosId = data['PlanCuentasInventariosId'];
    this.unidad = data['Unidad'];
    if (this.unidad != null) {
        this.unidadId = this.unidad['Id'];
        this.unidadCodigo = this.unidad['Codigo'];
        this.unidadDescripcion = this.unidad['Descripcion'];
    } else {
        this.unidadId = '';
        this.unidadCodigo = '';
        this.unidadDescripcion = '';
    }

}

Producto.getById = function (id, async, callback, oThis) {
    if (this.make_ajax) {
        $.ajax({
            type: "GET",
            url: urlprefix + "/Productos/BuscarProductoDetalle?Id=" + id,
            data: { 'format': 'json' },
            dataType: "json",
            async: true,
            beforeSend: function () {
                productos_cargando += 1;
            },
            success: function (data, textStatus) {
                var producto = null;
                producto = new Producto(data);
                if (oThis) {
                    callback.call(oThis, producto);
                }
                else {
                    callback(producto);
                }
            },
            error: function () {
                showMessage('Error', 'Ocurrió un error al intentar cargar los datos del producto, por favor inténtelo nuevamente');
            }
        });
    }
    else {
        var productod = new Producto($.parseJSON(this.data));
        if (oThis) {
            callback.call(oThis, productod);
        }
        else {
            callback(productod);
        }
        productos_cargando += 1;
    }
    this.make_ajax = 1;
}

Producto.getByIdSy = function (id, async, callback, oThis) {
    if (async == undefined) async = true;
    var producto = null;
    /* Obtiene los datos de un producto por el Id. */
    $.ajax({
        type: "GET",
        url: urlprefix + "/Productos/BuscarProductoDetalle?Id=" + id,
        data: { 'format': 'json' },
        dataType: "json",
        async: async,
        success: function (data, textStatus) {
            producto = new Producto(data);
            if (async) {
                if (oThis) {
                    callback.call(oThis, producto);
                }
                else {
                    callback(producto);
                }
            }
        },
        error: function () {
            showMessage('Error', 'Ocurrió un error al intentar cargar los datos del producto, por favor inténtelo nuevamente');
        }
    });
    if (!async) {
        return producto;
    }
};


Producto.getObjDesc = function () {
    return this.obj.codigo + " - " + this.obj.nombre;
};

$(function () {
    if (accion == "editar") {
        $("#TipoProducto").attr("readonly", true);
        $("#SubTipoId").attr("readonly", true);
        // $("#UnidadId").prop("disabled", true);
        //id = $("#UnidadId").data('id');
        //var elemento = this;
        $("#" + $(this).attr("data_id")).prop("readonly", true);
        // $("#" + $("#UnidadId").attr("data_id")).prop("disabled", true);
    }
});

function handleManejaLote() {
    debugger
    checked = $("#ManejaLote").is(':checked');
    if (checked) {
        $(".fecha-exp").show();
    } else {
        $(".fecha-exp").hide();
    }
}