function DetalleRetencion(tr) {
    this.tr = tr;
    //$(this.tr).find('input[class$="fecha-retencion"]').datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true });
    $(this.tr).find('input[class$="numero-retencion"]').mask("999-999-9?99999999");
    $(this.tr).find('input[class$="autorizacion-retencion"]').mask("999?9999999999999999999999999999999999999999999999");
    preparedDate();
}

function DetalleRetencionIVA(tr) {
    this.tr = tr;
    //$(this.tr).find('input[class$="fecha-retencion"]').datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true });
    $(this.tr).find('input[class$="numero-retencion"]').mask("999-999-9?99999999");
    $(this.tr).find('input[class$="autorizacion-retencion"]').mask("999?9999999999999999999999999999999999999999999999");
    preparedDate();
}

function DetalleLiquidacion(tr) {
    this.tr = tr;
    console.info($(this.tr).find('input[class~="date"]'));
    //$(this.tr).find('input[class^="date"]').datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true });
    this.cuentafield = new ObjectField($(this.tr).find('input.object-hidden[id$="cuenta_id"]'));

    this.tiporetirfield = new ObjectField($(this.tr).find('input.object-hidden[id$="tipo_retencion_ir_id"]'));
    this.tiporetirfield.onSetObj = function (obj) {
        var elements = $(tr).find('input[id$="-base_ret_ir"]');
        var recap = $(tr).find('input[id$="-num_recap"]');
        if (obj) {
            porcent_ret[obj.codigo] = parseFloat(obj.porcentaje);
            elements.addClass('base-retencion');
            elements.attr('codigoret', obj.codigo);
            elements.attr('numrecapir', recap.val());
        }
        else {
            elements.removeClass('base-retencion');
            elements.removeAttr('codigoret');
            elements.removeAttr('numrecapir');
        }
        calcularValorAPagar(recap[0]);
    };

    this.tiporetivafield = new ObjectField($(this.tr).find('input.object-hidden[id$="tipo_retencion_iva_id"]'));
    this.tiporetivafield.onSetObj = function (obj) {
        var elements = $(tr).find('input[id$="-base_ret_iva"]');
        var recap = $(tr).find('input[id$="-num_recap"]');
        if (obj) {
            porcent_retiva[obj.codigo] = parseFloat(obj.porcentaje);
            elements.addClass('base-retencion-iva');
            elements.attr('codigoretiva', obj.codigo);
            elements.attr('numrecapiva', recap.val());
        }
        else {
            elements.removeClass('base-retencion-iva');
            elements.removeAttr('codigoretiva');
            elements.removeAttr('numrecapiva');
        }
        calcularValorAPagar(recap[0]);
    };
    preparedDate();
}

DetalleRetencion.sonIguales = function (detalle1, detalle2) {
    var input1 = $(detalle1).find('input[type=hidden]').get(0);
    var input2 = $(detalle2).find('input[type=hidden]').get(0);
    return (input1.id == input2.id);
}

DetalleRetencionIVA.sonIguales = function (detalle1, detalle2) {
    var input1 = $(detalle1).find('input[type=hidden]').get(0);
    var input2 = $(detalle2).find('input[type=hidden]').get(0);
    return (input1.id == input2.id);
}

DetalleLiquidacion.sonIguales = function (detalle1, detalle2) {
    var input1 = $(detalle1).find('input[type=hidden]').get(0);
    var input2 = $(detalle2).find('input[type=hidden]').get(0);
    return (input1.id == input2.id);
}