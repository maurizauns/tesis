

$(function () {

    $.contextMenu({
        selector: '.categoria',
        trigger: 'left',
        callback: function (key, opt) {
            handleContextMenu(key, opt.$trigger);
        },
        items: {

            "agregar": { name: "Agregar", icon: "add" },


            "modificar": { name: "Editar", icon: "edit" },


            "eliminar": { name: "Eliminar", icon: "delete" },

        }
    });

    $.contextMenu({
        selector: '.categoria_comisariato',
        trigger: 'left',
        callback: function (key, opt) {
            handleContextMenu(key, opt.$trigger, true);
        },
        items: {

            "agregar": { name: "Agregar", icon: "add" },


            "modificar": { name: "Editar", icon: "edit" },


            "eliminar": { name: "Eliminar", icon: "delete" },

        }
    });


    $.contextMenu({
        selector: '.raiz',
        trigger: 'left',
        callback: function (key, opt) {
            handleContextMenu(key, opt.$trigger);
        },
        items: {

            "agregar": { name: "Agregar", icon: "add" },

        }
    });

    $.contextMenu({
        selector: '.raiz_comisariato',
        trigger: 'left',
        callback: function (key, opt) {
            handleContextMenu(key, opt.$trigger, true);
        },
        items: {

            "agregar": { name: "Agregar", icon: "add" },

        }
    });


});

var cuenta_venta = null, cuenta_compra = null, cuenta_inventario = null;
$(function () {
    cuenta_venta = new ObjectField({
        'el': $('#PlanCuentasIngresosId'),
        'getObjectById': Cuenta.getById,
        'getObjectByDesc': Cuenta.getByCodigo,
        'getObjDesc': Cuenta.getObjDesc,
        'dlgTitle': 'Seleccionar Cuenta',
        'autocompletar': 'True',
        'dlgUrl': '/PlanCuentas/Cuenta/?tipoCuenta=INGRESO&anticipo=1'
    });

    cuenta_compra = new ObjectField({
        'el': $('#PlanCuentasActivosId'),
        'getObjectById': Cuenta.getById,
        'getObjectByDesc': Cuenta.getByCodigo,
        'getObjDesc': Cuenta.getObjDesc,
        'dlgTitle': 'Seleccionar Cuenta',
        'autocompletar': 'True',
        'dlgUrl': '/PlanCuentas/Cuenta/?tipocuenta=INVENTARIABLE'
    });

    cuenta_inventario = new ObjectField({
        'el': $('#PlanCuentasInventariosId'),
        'getObjectById': Cuenta.getById,
        'getObjectByDesc': Cuenta.getByCodigo,
        'getObjDesc': Cuenta.getObjDesc,
        'dlgTitle': 'Seleccionar Cuenta',
        'autocompletar': 'True',
        'dlgUrl': '/PlanCuentas/Cuenta/?tipocuenta=INVENTARIABLE'
    });

    // $("a.categoria").contextMenu({ menu: 'menuCategoria', leftButton: true }, 
    // function(action, el, pos) { handleContextMenu(action, el, pos); }
    // );	 		    		
    // $("a.raiz").contextMenu({ menu: 'menuRaiz', leftButton: true }, 
    // function(action, el, pos) { handleContextMenu(action, el, pos); }
    // );
    // $("#dlgCategoria").dialog({
    // 	bgiframe: true,
    // 	autoOpen: false,
    // 	height: 'auto',
    // 	width: 500,
    // 	resizable: false,
    // 	modal: true,
    // 	close: function() {
    // 		$('input, #grupo').val('').removeClass('ui-state-error');
    // 	}
    // });
});

function eliminarCategoria(el) {
    var categoria = new Categoria({ 'id': el.attr('id') });
    categoria.eliminar(function (categoria) {
        var tr, sibling, hijo;
        tr = el.closest('tr');
        sibling = tr.next();
        tr.remove();
        while (sibling.length > 0) {
            if (categoria.para_comisariato)
                hijo = sibling.find('a.categoria_comisariato');
            else
                hijo = sibling.find('a.categoria');

            if (hijo.attr('codigo').substr(0, categoria.codigo.length) == categoria.codigo) {
                tr = sibling;
                sibling = sibling.next();
                tr.remove();
            }
            else {
                break;
            }
        }
        if (categoria.ParentId) {
            Categoria.getById(categoria.ParentId, true, function (categoriaPadre) {
                debugger
                if (categoriaPadre.esTransaccional()) {
                    if (categoria.para_comisariato)
                        $('a#' + categoriaPadre.id + '.categoria_comisariato').css('font-weight', 'normal');
                    else
                        $('a#' + categoriaPadre.id + '.categoria').css('font-weight', 'normal');
                }
            }, this);
        }
    });
}

function agregarCategoria() {
    var categoria = new Categoria($("#formCategoria").formToObject());
    categoria.save(function (categoria) {
        var trPadre, html = '', sibling, hijo, span, nodoPadre;
        if (categoria.ParentId) {
            if (categoria.para_comisariato)
                nodoPadre = $('a#' + categoria.ParentId + '.categoria_comisariato');
            else
                nodoPadre = $('a#' + categoria.ParentId + '.categoria');
        } else {
            if (categoria.para_comisariato)
                nodoPadre = $('a#0.raiz_comisariato');
            else
                nodoPadre = $('a#0.raiz');
        }
        nodoPadre.closest('td').css('font-weight', 'bold');
        trPadre = nodoPadre.closest('tr');
        sibling = trPadre.next();
        var asdasd = "asdasd/asdas/asd";
        var asda = asdasd.split("/");
        while (sibling.length > 0) {
            if (categoria.para_comisariato)
                hijo = sibling.find('a.categoria_comisariato');
            else
                hijo = sibling.find('a.categoria');

            if (hijo.attr('codigo').split('.').length < categoria.codigo.split('.').length)
                break;
            trPadre = sibling;
            sibling = trPadre.next();
        }
        debugger

        html = '<tr>';
        html = html + '<td style="padding-left:' + categoria.getPadding() + 'px">';
        html = html + '<a style="color:black;" id="' + categoria.Id + '" class="categoria" padre="' + categoria.get_id_padre() + '" codigo="' + categoria.codigo + '" desc="' + categoria.Descripcion + '" href="javascript:;">' + categoria.nombre + '</a>';
        html = html + '</td>';

        html = html + '<td class="text-center">';
        html = html + '<a id="' + categoria.Id + '_agr" agr="' + categoria.agrupar + '">';
        if (categoria.agrupar) {
            html = html + '<i class="ico-ok text-success"></i>';
        }
        else {
            html = html + '<i class="fa fa-minus-circle text-danger"></i>';
        }
        html = html + '</a>';
        html = html + '</td>';

        html = html + '</tr>';
        $(html).insertAfter(trPadre);
        // $("a#" + categoria.id).contextMenu({ menu: 'menuCategoria', leftButton: true },
        // function(action, el, pos) { handleContextMenu(action, el, pos); } 
        // );		
    });
}

function handleContextMenu(action, el, esComisariato) { // Se reemplazo parametro "pos" por "esComisariato" ya que no se usaba
    $(':input', '#formCategoria').not(':button, :submit, :reset').val('').removeAttr('checked').removeAttr('selected');
    $('#dlgCategoria button').unbind();
    switch (action) {
        case "agregar": {
            // Seteo la descripción del grupo y el id al formulario
            $('#grupo').html(el.attr('desc'));
            $('#ParentId').val(el.attr('id'));
            if (el.attr('id') == '0') {
                $('#ParentId').val('');
            }
            //$('#dlgCategoria').dialog('option', 'title', 'Agregar Categoría');
            $('#TipoProducto').val('SERV').trigger('change');
            $('#dlgCategoria .modal-title').html('Agregar Categoría');
            $("#btn_agregar_categ").click(function () {
                agregarCategoria();
                $("#dlgCategoria").modal('hide');
            });

            $("#btn_cerrar_categ").click(function () {
                $("#dlgCategoria").modal('hide');
                $('#formCategoria').find('input:text, input:password, select, textarea').val('');
                $('#formCategoria').find('input:radio, input:checkbox').prop('checked', false);
                $(':input', '#formCategoria').not(':button, :submit, :reset').val('').removeAttr('checked').removeAttr('selected');
            });


            // $('#dlgCategoria').dialog('option', 'buttons', {
            // 	'Agregar Categoría': function() {
            // 		agregarCategoria();
            // 		$(this).dialog('close');
            // 	},
            // 	'Cancelar': function() {				
            // 		$(this).dialog('close');
            // 	}
            // });
            // $('#dlgCategoria').dialog('option', 'open', function(){
            // 	$('.ui-dialog-buttonpane').find('button:contains("Agregar")').attr('class','').addClass('btn btn-primary');
            //          	$('.ui-dialog-buttonpane').find('button:contains("Cancelar")').attr('class','').addClass('btn btn-default');
            //  		$('#id_tipo_producto').val('SERV').trigger('change');
            // });
            $('#dlgCategoria').modal();
            $('#Descripcion').focus();
            break;
        }
        case "modificar": {
            var categoria = Categoria.getById(el.attr('id'), false, function () { }, false);
            //seteo de las cuentas
            var ingresos = Cuenta.getById('' + categoria.PlanCuentasIngresosId, false);
            var activos = Cuenta.getById('' + categoria.PlanCuentasIngresosId, false);
            var inventarios = Cuenta.getById('' + categoria.PlanCuentasIngresosId, false);

            
            //cuenta_compra.setObj(categoria.PlanCuentasActivosId);   Mauricio
            //cuenta_inventario.setObj(categoria.PlanCuentasInventariosId);   Mauricio
            cuenta_venta.setObj(ingresos);
            cuenta_compra.setObj(activos);
            cuenta_inventario.setObj(inventarios);
            $('#Id').val(el.attr('id'));
            $('#ParentId').val(el.attr('padre'));

            $('#TipoProducto').val(categoria.TipoProducto).trigger('change');
            if (categoria.Ingresos) {
                $('#Ingresos').trigger('click').prop('checked', true);
            }
            if (categoria.Activos) {
                $('#Activos').trigger('click').prop('checked', true);
            }
            if (categoria.Inventarios) {
                $('#Inventarios').trigger('click').prop('checked', true);
            }

            if ($('#ParentId').val()) {
                $('#grupo').html($('a#' + $('#ParentId').val()).attr('desc'));
            } else {
                $('#grupo').html('Todos los productos');
            }
            $('#Descripcion').val(el.attr('desc'));
            if (el.attr('agr') == "true") {
                $('#agrupar').attr('checked', true);
            }
            if (el.attr('agr') == "false") {
                $('#agrupar').attr('checked', false);
            }

            if (categoria.dias_plazo && categoria.dias_plazo != '') {
                $("#id_dias_plazo").val(categoria.dias_plazo);
            }
            //$('#agrupar').attr('checked', el.attr('agr'));
            $('#dlgCategoria .modal-title').html('Modificar Categoría');


            $("#btn_agregar_categ").click(function () {
                var categoria = new Categoria($("#formCategoria").formToObject());
                categoria.save(function (categoria) {
                    if (categoria.para_comisariato)
                        var nodo = $('a#' + categoria.Id + '.categoria_comisariato');
                    else
                        var nodo = $('a#' + categoria.Id + '.categoria');
                    nodo.attr('desc', categoria.Descripcion);
                    nodo.attr('agr', categoria.agrupar);
                    nodo.html(categoria.Descripcion);

                });
                $("#dlgCategoria").modal('hide');
            });


            $("#btn_cerrar_categ").click(function () {
                $("#dlgCategoria").modal('hide');
                $(':input', '#formCategoria').not(':button, :submit, :reset').val('').removeAttr('checked').removeAttr('selected');

            });

            // $('#dlgCategoria').dialog('option', 'buttons', {
            // 	'Modificar Categoría': function() {



            // 	},
            // 	'Cancelar': function() {				
            // 		$("#dlgCategoria").modal('hide');
            // 	}
            // });
            // $('#dlgCategoria').dialog('option', 'open', function(){
            // 	$('.ui-dialog-buttonpane').find('button:contains("Modificar")').attr('class','').addClass('btn btn-primary');
            //          	$('.ui-dialog-buttonpane').find('button:contains("Cancelar")').attr('class','').addClass('btn btn-default');
            // });
            $('#dlgCategoria').modal();
            $('#Descripcion').focus();
            break;
        }
        case "eliminar": {
            var msg = '¿Esta seguro que desea eliminar la categoría: ';
            msg = msg + el.attr('desc') + '?<br /><br />';
            msg = msg + 'En caso de que tenga descendientes tambien serán eliminados.';
            showConfirm('Eliminar Categoría', msg, function () {
                eliminarCategoria(el);
            });
            break;
        }
    }
    if (esComisariato) {
        $('#es_comisariato').val('1');
    } else {
        $('#es_comisariato').val('0');
    }
}

function toogleCategorias(t) {
    console.log($(t).next().closest('tr')); //.find('a.categoria').prop('id')
}

$(function (e) {
    if ($('#TipoProducto').val() == "SERV") {
        $('.para_servicio').removeClass('hide');
    } else {
        $('.para_servicio').removeClass('hide');
        $('.para_bien').removeClass('hide');
    }
    //combo de servicio o producto
    $('#TipoProducto').on('change', function (e) {
        if ($(this).val() == 'SERV') {
            $('.para_servicio').removeClass('hide');
            //$('.para_bien').addClass('hide');
            //se quita el check de compra e inventario
            $('#Ingresos').trigger('click').prop('checked', false);
            $('.cuentaventa').addClass('hide');
            $('#Activos').trigger('click').prop('checked', false);
            $('.cuentacompra').addClass('hide');
            //cuenta_compra.reset();
            $('#Inventarios').trigger('click').prop('checked', false);
            $('.cuentainventario').addClass('hide');
            $('.invent_serv').addClass('hide');
            cuenta_inventario.reset();
        } else {
            $('.para_servicio').removeClass('hide');
            $('.para_bien').removeClass('hide');
            $('.invent_serv').removeClass('hide');
        }
    });
    //check de para la venta
    $('#Ingresos').on('change', function (e) {
        if ($(this).is(':checked')) {
            $('.cuentaventa').removeClass('hide');
        } else {
            $('.cuentaventa').addClass('hide');
        }
    });
    //check de para la compra
    $('#Activos').on('change', function (e) {
        if ($(this).is(':checked')) {
            $('.cuentacompra').removeClass('hide');
        } else {
            $('#Inventarios').trigger('click').prop('checked', false);
            cuenta_inventario.reset();
            $('.cuentainventario').addClass('hide');
            $('.cuentacompra').addClass('hide');
        }
    });
    //check de inventariable
    $('#Inventarios').on('change', function (e) {
        if ($(this).is(':checked')) {
            $('.cuentainventario').removeClass('hide');
        } else {
            $('.cuentainventario').addClass('hide');
        }
    });
})
