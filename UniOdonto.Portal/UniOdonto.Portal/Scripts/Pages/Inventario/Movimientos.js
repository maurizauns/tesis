$(function () {
    $('#TipoMovimiento').bind('change', handleSelectTipo);
    $('#GeneraAsiCon').bind('click', mostrarCentrocosto);

    new ObjectField($('#BodegaDestinoId'));
    new ObjectField($('#BodegaOrigenId'));
    new ObjectField($('#CentroCostosId'));
    cuentafield = new ObjectField($('#PlanCuentasId'));
    safe_url_cuentafield = cuentafield['dlgUrl'];

    movimientofield = new ObjectField($('#id_movimiento_id'));
    movimientofield.onSetObj = function (obj) {

    };
    movimiento = new MasterDetail({
        'templateDetalle': $('#dtemplate_movimiento'),
        'tableDetalle': $('#tdetalle_movimiento'),
        'prefixDetalle': 'template',
        'funcCompDetalle': MovimientoForm.sonIguales,
        'klassDetalle': MovimientoForm
    });

    handleSelectTipo();
    movimiento.agregarDetalle();

    $("#boton_items_movimiento").click(function () {
        agregarDetalleItemMovimiento();
    });

    $("#btn_guardar_mov").click(function () {
        var id = $("#id_movimiento_id").val();
        getDetallesMovimiento(id);
        $('#dlgItemsMovimiento').modal('hide');
    });
});

$(document).on("submit", "form.frmMovimientos", function () {
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
                    var url = "/Movimientos";
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


function Movimiento(data) {
    this.setAttributes(data);
}

Movimiento.prototype.setAttributes = function (data) {
    this.id = data['Id'];
    this.fecha = data['FechaEmi'];
    this.codigo = data['Codigo'];
    this.nombre = data['Codigo'];
    this.descripcion = data['Descripcion'];
    this.tipo = data['TipoMovimiento'];
    this.bodega_origen = data['BodegaOrigenId'];
    this.bodega_destino = data['BodegaDestinoId'];
    this.desc = data['Codigo'];
};

Movimiento.getById = function (id, async, callback, oThis) {
    $.ajax({
        type: "GET",
        url: urlprefix + "/Movimientos/GetMovimientos?Id=" + id,
        data: { 'format': 'json' },
        dataType: "json",
        async: true,
        success: function (data, textStatus) {
            var movimiento = null;
            movimiento = new Movimiento(data);
            if (oThis) {
                callback.call(oThis, movimiento);
            }
            else {
                callback(movimiento);
            }
        },
        error: function () {
            showMessage('Error', 'Ocurrio un error al intentar cargar los datos del Movimiento, por favor intentelo nuevamente');
        }
    });
};

function MovimientoForm(tr, firstLoad) {
    this.tr = tr;
    this.productofield = new ObjectField($(this.tr).find('input.object-hidden[id$="producto_id"]'));
    $(this.tr).find('input[id$="-edicion"]').datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true });
    var urlproducto = this.productofield.dlgUrl;

    //Lotes
    this.lotefield = new ObjectField($(tr).find('input.object-hidden[id$="lotefield"]'));
    urllote = this.lotefield.dlgUrl;
    this.lotefield.onButtonClick = function () {
        tipo_mov = $('#TipoMovimiento').val();
        fecha = $('#FechaEmi').val();
        idproducto = $(tr).find('input.object-hidden[id$="producto_id"]').val();
        var bodega = null;
        bodega_origen = $('#id_bodega_origen_id').val();
        bodega_destino = $('#id_bodega_destino_id').val();
        if (tipo_mov == 'EGR' || tipo_mov == 'TRA') {
            bodega = bodega_origen;
        }
        if (tipo_mov == 'ING') {
            bodega = bodega_destino;
        }
        //Fecha
        var fec = new Date(fecha);
        var yyyy = fec.getFullYear().toString();
        var mm = (fec.getMonth() + 1).toString();
        var dd = fec.getDate().toString();
        st = yyyy + '-' + (dd[1] ? dd : "0" + dd[0]) + '-' + (mm[1] ? mm : "0" + mm[0]);

        fecha_cadena = ('' + fecha).split('/');
        st = fecha_cadena[2] + '-' + fecha_cadena[1] + '-' + fecha_cadena[0];
        //Fin Fecha
        if (tipo_mov == 'EGR' || tipo_mov == 'TRA') {
            if (bodega != null) { this.dlgUrl = urllote + '?producto_id=' + idproducto + '&fecha=' + st + '&bodega_id=' + bodega; }
            else { this.dlgUrl = urllote + '?producto_id=' + idproducto + '&fecha=' + st; }
        }
        return true;
    };
    this.lotefield.onSetObj = function (obj) {
        if (obj) {
            $(tr).find('input[id$="-fecha_expiracion"]').val(this.extraSelectParams[0]);
            $(tr).find('input[id$="-lote"]').val(this.extraSelectParams[1]);
        }
    };
    //Lote

    this.productofield.onButtonClick = function () {
        // se cambia la url para setear productos para la compra o venta
        if ($('#TipoMovimiento').val() == 'ING' || $('#TipoMovimiento').val() == 'AJU') {
            this.dlgUrl = urlproducto + '?solo_compra=1&solo_inventariable=1&excluir_combos=1&solo_activos=1';
        }
        else if ($('#TipoMovimiento').val() == 'EGR') {
            this.dlgUrl = urlproducto + '?solo_inventariable=1&excluir_combos=1&solo_activos=1&mostrar_serie=1&novendidos=1';
        }
        else if ($('#TipoMovimiento').val() == 'TRA') {
            this.dlgUrl = urlproducto + '?pagina=1&solo_inventariable=1&excluir_combos=1&solo_activos=1&mostrar_serie=1&novendidos=1';
        }
        else if ($('#TipoMovimiento').val() == 'TRT') {
            this.dlgUrl = urlproducto + '?pagina=1&solo_inventariable=1&excluir_combos=1&solo_activos=1&mostrar_serie=1&novendidos=1';
        }
        //if ($('#TipoMovimiento').val() != 'AJU') {
        //	this.dlgUrl = this.dlgUrl + '&mostrar_serie=1&solo_activos=1';
        //}
        return true;
    };

    this.productofield.onSetObj = function (obj) {
        var p = 0.00;
        var launidad = $(tr).find('select[id$="-unidad"]');
        var hiddenUnidad = $(tr).find('input[id$="-hidden_unidad"]');
        var units = ''; valorUnidad = null;
        if (obj && obj['unidadDescripcion']) {
            $(tr).find('div[id$="-labelunidad"]').html(obj['unidadDescripcion']);
        }
        data = {};
        var costo = 0.00;
        var fecha = $('#FechaEmi').val();

        if (obj) {
            if (generarProductoAdicional() && !firstLoad) {
                movimiento.agregarDetalle();
            }
        }

        var costo_data = null;
        if ($('#TipoMovimiento').val() != 'ING') {
            if (this.data) {
                costo_data = $.parseJSON(this.data).data_costo;
                if (costo_data) {
                    this.make_ajax = 0;
                }
                if (this.costo_cargado) {
                    this.make_ajax = 1;
                }
            }
        }
        if (this.make_ajax && $('#TipoMovimiento').val() != 'ING') {
            var fechaActual = moment(fecha, 'DD/MM/YYYY').format();
            $.ajax({
                type: "GET",
                url: urlprefix + "/Movimientos/Get_Costo?ProductoId=" + obj['id'] + '&Fecha=' + fechaActual,
                data: data,
                dataType: "json",
                async: false,
                success: function (data) {
                    cost = data['stock'];
                    costo_data = cost;
                    $(tr).find('div[id$="-labelcosto"]').html(cost);
                    if ($('#TipoMovimiento').val() == 'EGR') {
                        $(tr).find('input[id$="-precio"]').val(cost);
                    }
                }
            });
        } else {
            cost = costo_data;
            $(tr).find('div[id$="-labelcosto"]').html(cost);
            if ($('#TipoMovimiento').val() == 'EGR') {
                $(tr).find('input[id$="-precio"]').val(cost);
            }
        }
        this.costo_cargado = 1;
        obj['data_costo'] = costo_data;
        $(tr).find('input[id$="-hidden_data_producto"]').val(JSON.stringify(obj));
        //$(tr).find('div[id$="-labelcosto"]').html(costo);
        if (obj['maneja_serie']) {
            $(tr).find('div[id$="-fieldcantidad"]').hide();
            $(tr).find('div[id$="-labelcantidad"]').show();
            $(tr).find('input[id$="-cantidad"]').val(1);
            $(tr).find('.label-unidad').addClass('seriado');
            $(tr).find('div.serie').addClass('seriado');
            if ($('#TipoMovimiento').val() != 'AJU') {
                $(tr).find('.serie').show();
            }
            if ($('#TipoMovimiento').val() == 'ING') {
                $(tr).find('input[id$="-serie"]').removeAttr('readonly');
            }
            else {
                $(tr).find('input[id$="-serie"]').attr('readonly', 'yes');
            }
            if ($('#TipoMovimiento').val() != 'ING' && $('#TipoMovimiento').val() != 'AJU' && this.extraSelectParams) {
                $(tr).find('input[id$="-serie"]').val(this.extraSelectParams);
            }
        }
        else {
            $(tr).find('div[id$="-fieldcantidad"]').show();
            $(tr).find('div[id$="-labelcantidad"]').hide();
            $(tr).find('.label-unidad').removeClass('seriado');
            $(tr).find('.serie').hide();
            $(tr).find('div.serie').removeClass('seriado');
        }

        if (obj['maneja_edicion']) {
            $(tr).find('input.date').datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true });
            $(tr).find('.edicion').show();
        } else {
            $(tr).find('.edicion').hide();
        }
        if (obj['maneja_color']) {
            $(tr).find('.color').show();
        } else {
            $(tr).find('.color').hide();
        }
        //Manejo de lotes
        if (obj['maneja_lote']) {
            tipo_mov = $('#TipoMovimiento').val();
            $(tr).find('input.fecha_exp').datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true });
            $(tr).find('input[id$="-maneja_lote"]').val(1);
            bodega_id = $('#id_bodega_origen_id').val();
            if (tipo_mov == 'EGR' || tipo_mov == 'TRA' || tipo_mov == 'TRT') {

                $(tr).find('.lote_ingreso').hide();
                $(tr).find('.lote_egreso').show();
                fecha_movimiento = $('#FechaEmi').val();
                fecha_movimiento_cadena = ('' + fecha_movimiento).split('/');
                fdt = fecha_movimiento_cadena[2] + '-' + fecha_movimiento_cadena[1] + '-' + fecha_movimiento_cadena[0];
                if (bodega_id && bodega_id != '' && fdt && fdt != '') {
                    if (!firstLoad) { SetearUltimoLoteMov(obj['id'], bodega_id, fdt, tr, this); }
                }
            } else if (tipo_mov == 'ING') {
                $(tr).find('.lote_ingreso').show();
                $(tr).find('.lote_egreso').hide();
                if (!obj['maneja_fechaexp']) {
                    $(tr).find('.lote_ingreso .fechaexp').hide();
                }
            }
        } else {
            $(tr).find('.lote_ingreso').hide();
            $(tr).find('.lote_egreso').hide();
            $(tr).find('input[id$="-maneja_lote"]').val(0);
        }

        calcularSubtotal(tr);
        launidad.empty();

        
        $.each(['unidadDescripcion'], function (index, value) {
            var unidad;
            if (obj['unidad']) {
                units = units + '<option value="' + obj['unidadId'] + '">' + obj['unidadDescripcion'] + '</option>';
            }
        });
        launidad.html(units);

        $(launidad).change(function () {
            hiddenUnidad.val(launidad.val());
        });

        if (hiddenUnidad.val() && hiddenUnidad.val() != '' && ($('#TipoMovimiento').val() == 'ING' || $('#TipoMovimiento').val() == 'TRA')) {
            valorUnidad = "" + hiddenUnidad.val();
        }
        if (valorUnidad) {
            launidad.val(valorUnidad);
        }
    };
    //para la nueva forma de lupas
    if (this.productofield.obj != null) {
        this.productofield.setObj(this.productofield.obj);
    }

    //Colores
    this.colorfield = new ObjectField($(this.tr).find('input.object-hidden[id$="color_id"]'));
    urlcolor = this.colorfield.dlgUrl;
    this.colorfield.onButtonClick = function () {
        tipo_mov = $('#TipoMovimiento').val();
        fecha = $('#FechaEmi').val();
        idproducto = $(tr).find('input.object-hidden[id$="producto_id"]').val();
        var bodega = null;
        bodega_origen = $('#id_bodega_origen_id').val();
        bodega_destino = $('#id_bodega_destino_id').val();
        if (tipo_mov == 'EGR' || tipo_mov == 'TRA') {
            bodega = bodega_origen;
        }
        if (tipo_mov == 'ING') {
            bodega = bodega_destino;
        }
        //Fecha
        var fec = new Date(fecha);
        var yyyy = fec.getFullYear().toString();
        var mm = (fec.getMonth() + 1).toString();
        var dd = fec.getDate().toString();
        st = yyyy + '-' + (dd[1] ? dd : "0" + dd[0]) + '-' + (mm[1] ? mm : "0" + mm[0]);

        fecha_cadena = ('' + fecha).split('/');
        st = fecha_cadena[2] + '-' + fecha_cadena[1] + '-' + fecha_cadena[0];
        //Fin Fecha
        if (tipo_mov == 'EGR' || tipo_mov == 'TRA') {
            if (bodega != null) { this.dlgUrl = urlcolor + '?producto_id=' + idproducto + '&fecha=' + st + '&bodega_id=' + bodega; }
            else { this.dlgUrl = urlcolor + '?producto_id=' + idproducto + '&fecha=' + st; }
        } else {
            if (bodega != null) { this.dlgUrl = urlcolor + '?producto_id=' + idproducto + '&fecha=' + st + '&bodega_id=' + bodega + '&mostrar_cero=' + 1; }
            else { this.dlgUrl = urlcolor + '?producto_id=' + idproducto + '&fecha=' + st; }
        }
        return true;
    };
};

MovimientoForm.sonIguales = function (detalle1, detalle2) {
    var input1 = $(detalle1).find('input').get(0);
    var input2 = $(detalle2).find('input').get(0);
    return (input1.id == input2.id);
};

function handleSelectTipo() {
    var tipo = $('#TipoMovimiento').val();
    if (tipo == 'ING') {
        $('.tr-bodega-origen').hide();
        $('.tr-bodega-destino').show();
        $('.td-costo').hide();
        $('.td-precio').show();
        $('.td-subtotal').show();
        $('.td-ajuste-costo').hide();
        $('.tr-total').show();
        $('.td-cantidad').show();
        $('.tr-genera-asiento').show();
        mostrarCentrocosto();
        // Manejo de series
        $('.serie').filter('.seriado').show();
        $('.serie').find('input[id$="-serie"]').removeAttr('readonly');
        //Unidades
        $('.label-unidad').hide();
        $('.unidades, .td-total-mov').show();

        validarTipoCuenta('ING');




    }
    else if (tipo == 'EGR') {
        $('.tr-bodega-origen').show();
        $('.tr-bodega-destino').hide();
        $('.td-costo').show();
        $('.td-precio').hide();
        $('.td-subtotal').show();
        $('.td-ajuste-costo').hide();
        $('.tr-total').show();
        $('.td-cantidad').show();
        $('.tr-genera-asiento').show();
        mostrarCentrocosto();
        // Manejo de series
        $('.serie').filter('.seriado').show();
        $('.serie').find('input[id$="-serie"]').attr('readonly', 'yes');
        //Unidades
        $('.label-unidad').hide();
        $('.unidades, .td-total-mov').show();

        validarTipoCuenta('EGR');




    }
    else if (tipo == 'TRA') {
        $('.tr-bodega-origen').show();
        $('.tr-bodega-destino').show();
        $('.td-costo').show();
        $('.td-precio').hide();
        $('.td-total-mov').show();
        //$('.td-subtotal').hide();
        $('.td-ajuste-costo').hide();
        //$('.tr-total').hide();		
        $('.td-cantidad').show();
        $('.tr-genera-asiento').show();
        mostrarCentrocosto();
        // Manejo de series
        $('.serie').filter('.seriado').show();
        $('.serie').find('input[id$="-serie"]').attr('readonly', 'yes');
        //Unidades
        $('.label-unidad').hide();
        $('.unidades').show();

        validarTipoCuenta('TRA');
        //$('#producciones').show();


        //

    }
    else if (tipo == 'TRT') {
        $('.tr-bodega-origen').show();
        $('.tr-bodega-destino').show();
        $('.td-costo').show();
        $('.td-precio').hide();
        $('.td-subtotal').hide();
        $('.td-ajuste-costo').hide();
        $('.tr-total').hide();
        $('.td-cantidad').show();
        $('.tr-genera-asiento').show();
        mostrarCentrocosto();
        // Manejo de series
        $('.serie').filter('.seriado').show();
        $('.serie').find('input[id$="-serie"]').attr('readonly', 'yes');
        //Unidades
        $('.label-unidad, .td-total-mov').hide();
        $('.unidades').show();

        validarTipoCuenta('TRA');
        //$('#producciones').show();


        //

    }
    else if (tipo == 'AJU') {
        $('.tr-bodega-origen').hide();
        $('.tr-bodega-destino').hide();
        $('.td-costo').show();
        $('.td-precio').hide();
        $('.td-subtotal').hide();
        $('.td-ajuste-costo').show();
        $('.tr-total').hide();
        $('.td-cantidad').hide();
        $('.tr-genera-asiento').hide();
        $('.serie').hide();
        $('.serie').hide();
        $('.unidades, .td-total-mov').hide();
        $('.label-unidad').show();

        validarTipoCuenta('AJU');
    }

}

function mostrarCentrocosto() {
    var check = $("#GeneraAsiCon").is(':checked');
    $("#GeneraAsiCon").is(':checked') ? $('#GeneraAsiCon').val(true) : $('#GeneraAsiCon').val(false);
    var tipo = $("#TipoMovimiento").val();
    if ((check && tipo != 'TRA') && (check && tipo != 'TRT')) {
        $('.tr-centrocosto').show();
    } else {
        $('.tr-centrocosto').hide();
    }
}

function validarTipoCuenta(tipo) {
    cuentafield['dlgUrl'] = safe_url_cuentafield;
}

function generarProductoAdicional() {
    var agregar_detalle_producto = true;
    var prods = $('input[id$="-producto"]');
    for (var i = 1; i < prods.length; i++) {
        valor = prods[i].value;
        if (!valor || valor == '') agregar_detalle_producto = false;
    }
    return agregar_detalle_producto;
}

function calcularSubtotal(caller) {
    var tr = $(caller).closest('tr');
    var cantidad = parseFloat($(tr).find('input[id$="-cantidad"]').val());
    var precio;
    var subtotal = null, descuento = null;
    var tipo = $('#TipoMovimiento').val();
    if (tipo == 'ING') {
        precio = parseFloat($(tr).find('input[id$="-precio"]').val());
    }
    if (tipo == 'EGR' || tipo == 'TRA' || tipo == 'TRT') {
        precio = parseFloat($(tr).find('div[id$="-labelcosto"]').html());
        //precio = parseFloat($(tr).find('input[id$="-precio"]').val());
    }
    if (cantidad && precio && (cantidad * precio) > 0) {
        subtotal = cantidad * precio;
    }
    if (subtotal && subtotal > 0) {
        $(tr).find('input[id$="-subtotal"]').val(subtotal.toFixed(decimales));
    }
    else {
        $(tr).find('input[id$="-subtotal"]').val("0.00");
    }
    calcularTotal();
}

function calcularTotal() {
    var subtotal = 0.00;
    var valores = $('.val-subtotal'), valor;
    for (var i = 0; i < valores.length; i++) {
        valor = parseFloat(valores[i].value);
        if (valor > 0 && !isNaN(valor)) {
            subtotal = subtotal + valor;
        }
    }
    $('#id_total').val(subtotal.toFixed(decimales));
}

function agregarDetalleItemMovimiento() {
    bodega = $('#BodegaOrigenId');
    if (!bodega.val()) {
        $('.alert-warning').removeClass('hide'); return;
    }
    movimientofield.reset();
    $('#dlgItemsMovimiento').modal();
}

function getDetallesMovimiento(movimiento_id) {
    $.getJSON('/Movimientos/GetDetalleMovimientos?Id=' + movimiento_id, function (data) {
        $.each(data, function (key, val) {
            tipo_mov = $("#TipoMovimiento").val();
            movimiento.agregarDetalle();
            tr = movimiento.getLastRow();
            var prod = Producto.getByIdSy('' + val['ProductosId'], false);
            $(tr).find('input[id$="-cantidad"]').val(val['Cantidad']);
            if (tipo_mov == 'ING') {
                if (!isNaN(val['CostoUnitario'])) { $(tr).find('input[id$="-precio"]').val(val['CostoUnitario']); }
            }
            $(tr).find('input[id$="-unidad"]').val(val['Unidad']);
            dt = movimiento.getDetalle(tr);
            dt.productofield.setObj(prod);
        });
    });

}
