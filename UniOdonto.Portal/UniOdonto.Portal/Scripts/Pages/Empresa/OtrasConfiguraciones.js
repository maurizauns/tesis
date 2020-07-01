$(function () {
    new ObjectField($('#OtrasConfiguraciones_IvaGastosId'));
    new ObjectField($('#OtrasConfiguraciones_CuentasIceId'));
    new ObjectField($('#OtrasConfiguraciones_ChequeProtestadoId'));
    new ObjectField($('#OtrasConfiguraciones_ComisionNoDeducibleId'));

    $.each({
        '#OtrasConfiguraciones_ConfigPersonalizadoCliente': false,
        '#OtrasConfiguraciones_ConfigPersonalizadoProveedor': false,
        '#OtrasConfiguraciones_ConfigCrearEvento': false,
        '#OtrasConfiguraciones_ConfigHabilitarCiudad': false,
        '#OtrasConfiguraciones_ConfigCentroCosto': false,
        '#OtrasConfiguraciones_ConfigCampoAdicional': false,

        '#OtrasConfiguraciones_ConfigCotizacion': false,
        '#OtrasConfiguraciones_ConfigAprobarCotizacion': false,
        '#OtrasConfiguraciones_ConfigPreFactura': false,
        '#OtrasConfiguraciones_ConfigIdentificacionRepetido': false,
        '#OtrasConfiguraciones_ConfigRetencionIndependiante': false,
        '#OtrasConfiguraciones_ConfigReembolsoGastos': false,
        '#OtrasConfiguraciones_EnviarIvaGastos': false,
        '#OtrasConfiguraciones_ConfigPorcentajeServicio': false,
        '#OtrasConfiguraciones_ConfigVentasSinStock': false,
        '#OtrasConfiguraciones_ConfigVentasSinStockBodega': false,
        '#OtrasConfiguraciones_ConfigDiasVencimiento': false,
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
        '#OtrasConfiguraciones_ConfigPersonalizadoCliente': '.campos_cliente',
        '#OtrasConfiguraciones_ConfigPersonalizadoProveedor': '.campos_proveedor',
        '#OtrasConfiguraciones_ConfigCampoAdicional': '.campos_adicionales_documento',
        '#OtrasConfiguraciones_EnviarIvaGastos': '.div_cta_ivagasto',
        '#OtrasConfiguraciones_ConfigPorcentajeServicio': '.porcentaje-servicio',
        
    }, function (key, value) {
        $(key).bind('click', function () { showFieldWhenChecked(key, value); });
        showFieldWhenChecked(key, value);
    });
    function showFieldWhenChecked(checkboxSelector, fieldSelector) {
        if ($(checkboxSelector).is(':checked')) {
            $(fieldSelector).removeClass("hide")
            $(checkboxSelector).val(true);
        }
        else {
            $(fieldSelector).addClass("hide")
            $(checkboxSelector).val(false);
        }
    }
});


$('#OtrasConfiguraciones_ConfigPersonalizadoCliente').on('click', function () {
    $(this).is(':checked') ? $('#OtrasConfiguraciones_ConfigPersonalizadoCliente').val(true) : $('#OtrasConfiguraciones_ConfigPersonalizadoCliente').val(false);
    $(this).is(':checked') ? $('.campos_cliente').removeClass("hide") : $('.campos_cliente').addClass("hide");
});

$('#OtrasConfiguraciones_ConfigPersonalizadoProveedor').on('click', function () {
    $(this).is(':checked') ? $('#OtrasConfiguraciones_ConfigPersonalizadoProveedor').val(true) : $('#OtrasConfiguraciones_ConfigPersonalizadoProveedor').val(false);
    $(this).is(':checked') ? $('.campos_proveedor').removeClass("hide") : $('.campos_proveedor').addClass("hide");
});

$('#OtrasConfiguraciones_ConfigCampoAdicional').on('click', function () {
    $(this).is(':checked') ? $('#OtrasConfiguraciones_ConfigCampoAdicional').val(true) : $('#OtrasConfiguraciones_ConfigCampoAdicional').val(false);
    $(this).is(':checked') ? $('.campos_adicionales_documento').removeClass("hide") : $('.campos_adicionales_documento').addClass("hide");
});

$('#OtrasConfiguraciones_EnviarIvaGastos').on('click', function () {
    $(this).is(':checked') ? $('#OtrasConfiguraciones_EnviarIvaGastos').val(true) : $('#OtrasConfiguraciones_EnviarIvaGastos').val(false);
    $(this).is(':checked') ? $('.div_cta_ivagasto').removeClass("hide") : $('.div_cta_ivagasto').addClass("hide");
});

$('#OtrasConfiguraciones_ConfigPorcentajeServicio').on('click', function () {
    $(this).is(':checked') ? $('#OtrasConfiguraciones_ConfigPorcentajeServicio').val(true) : $('#OtrasConfiguraciones_ConfigPorcentajeServicio').val(false);
    $(this).is(':checked') ? $('.porcentaje-servicio').removeClass("hide") : $('.porcentaje-servicio').addClass("hide");
});