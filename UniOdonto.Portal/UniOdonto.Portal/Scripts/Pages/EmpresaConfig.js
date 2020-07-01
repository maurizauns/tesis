﻿
function empresasCallback(data) {
    $('#Id').val(data.Id);
    $('#Ruc').val(data.Ruc);
    $('#RazonSocial').val(data.RazonSocial);
    $('#NombreComercial').val(data.NombreComercial);
    $("#DireccionMatriz").val(data.DireccionMatriz);
    $("#ContribuyenteEspecial").prop("checked", data.ContribuyenteEspecial);
    $("#ContribuyenteEspecial").val(data.ContribuyenteEspecial);
    $("#ObligadoContabilidad").prop("checked", data.ObligadoContabilidad);
    $("#ObligadoContabilidad").val(data.ObligadoContabilidad);
    if (data.OtrasConfiguraciones != null) {
        $("#OtrasConfiguraciones_Id").val(data.OtrasConfiguraciones.Id);
    } else {
        $("#OtrasConfiguraciones_Id").val(data.Id);
    }
    
}

$('#ContribuyenteEspecial').on('click', function (event) {
    var checkboxChecked = $(this).is(':checked');
    if (checkboxChecked) {
        $('#ContribuyenteEspecial').val('true').trigger('change');
    } else {
        $("#ContribuyenteEspecial").val('false').trigger('change');
    }
});
$('#ObligadoContabilidad').on('click', function (event) {
    var checkboxChecked = $(this).is(':checked');
    if (checkboxChecked) {
        $('#ObligadoContabilidad').val('true').trigger('change');
    } else {
        $("#ObligadoContabilidad").val('false').trigger('change');
    }
});