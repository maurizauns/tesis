var movimiento;
$(function () {
    new ObjectField($('#BodegasId'));
    movimiento = new MasterDetail({
        'templateDetalle': $('#dtemplate_movimiento'),
        'tableDetalle': $('#tdetalle_movimiento'),
        'prefixDetalle': 'template',
        'funcCompDetalle': TomafisicaForm.sonIguales,
        'klassDetalle': TomafisicaForm
    });
    movimiento.agregarDetalle();
});

function Tomafisica(data) {
    this.setAttributes(data);
}

Tomafisica.prototype.setAttributes = function (data) {
    this.id = data['Id'];
    this.fecha = data['Fecha'];
    this.codigo = data['codigo'];
    this.descripcion = data['Descripcion'];
    this.estado = data['Estado'];
    this.bodega = data['bodega'];
    this.desc = data['codigo'];
};

Tomafisica.getById = function (id, async, callback, oThis) {
    $.ajax({
        type: "GET",
        url: urlprefix + "/TomaFisica/GetTomaFisica?Id=" + id,
        data: { 'format': 'json' },
        dataType: "json",
        async: true,
        success: function (data, textStatus) {
            var movimiento = null;
            movimiento = new Movimiento(data['obj']);
            if (oThis) {
                callback.call(oThis, movimiento);
            }
            else {
                callback(movimiento);
            }
        },
        error: function () {
            showMessage('Error', 'OcurriÃ³ un error al intentar cargar los datos del movimiento, por favor intÃ©ntelo nuevamente');
        }
    });
};

function TomafisicaForm(tr, firstLoad) {
    this.tr = tr;
    this.productofield = new ObjectField($(this.tr).find('input.object-hidden[id$="ProductosId"]'));
    var urlproducto = this.productofield.dlgUrl;

    id_tomafisica = $("#Id").val();

    this.productofield.onButtonClick = function () {
        // se cambia la url para setear productos para la compra o venta
        this.dlgUrl = urlproducto + '?pagina=1&solo_inventariable=1&excluir_combos=1&solo_activos=1&mostrar_serie=0&excluir_seriados=1';

        bodega = $("#BodegasId").val();
        if (!bodega || bodega == '') {
            showMessage("Atencion!", "Por favor Seleccione una bodega");
            return false;
        }
        return true;
    };

    this.productofield.onSetObj = function (obj) {
        var p = 0.00;
        if (obj && obj['unidadDescripcion']) {
            $(tr).find('div[id$="-labelunidad"]').html(obj['unidadDescripcion']);
        }

        var fecha = $('#id_fecha').val();
       
        if (((!id_tomafisica || id_tomafisica == '') && !firstLoad) || !firstLoad) {
            bodega = $("#BodegasId").val();
            data = {};
            $(tr).find(".indicator").addClass('show');
            $.ajax({
                type: "GET",
                //url: urlprefix + "/Productos/Get_stock?" + obj['id'] + '/?fecha=' + fecha + '&bodega=' + bodega,
                url: urlprefix + "/Movimientos/Get_stock?Id=" + obj['id'] + '&BodegasId=' + bodega,
                data: data,
                dataType: "json",
                async: true,
                success: function (data) {
                    
                    //st = data['obj'].stock;
                    st = data.stock;
                    stock_data = st;

                    $(tr).find('input[id$="-cantidad_sistema"]').val(stock_data);
                    $(tr).find('input[id$="-cantidad_registrada"]').val(stock_data);
                },
                complete: function () {
                    $(tr).find(".indicator").removeClass('show');
                    //calcularSubtotal($(tr).find('input[id$="-cantidad_sistema"]'));
                }
            });
        }

        if (generarProductoAdicional() && !firstLoad) movimiento.agregarDetalle();
    };

};

TomafisicaForm.sonIguales = function (detalle1, detalle2) {
    var input1 = $(detalle1).find('input[type=hidden]').get(0);
    var input2 = $(detalle2).find('input[type=hidden]').get(0);
    return (input1.id == input2.id);
};


function calcularSubtotal(caller) {
    var tr = $(caller).closest('tr');
    var cantidad_sistema = parseFloat($(tr).find('input[id$="-cantidad_sistema"]').val());
    var cantidad_registrada = parseFloat($(tr).find('input[id$="-cantidad_registrada"]').val());
    $(tr).find('input[id$="-cantidad_diferencia"]').val((cantidad_sistema - cantidad_registrada).toFixed(2));
    //calcularTotal();
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

$(document).on("submit", "form.frmTomaFisica", function () {
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
                    var url = "/TomaFisica"
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