

//$('#detalle_documentos').on('click', '.object-button', function () {
    
//    var tr_actual = $(this).parents('tr');
//    var input_docs_modal = $('#ids_docs_recently_selected');
//    $(input_docs_modal).val(''); //limpiando input antes de capturar los nuevos docs seleccionados
//    $('.custom_contifico_bootbox').on('hidden.bs.modal', function (e) {
//        var ids_docs_modal = $(input_docs_modal).val();
//        var ids = ids_docs_modal.split(',').filter((item) =>item != '');
//        if (ids.length > 0) {
//            for (var i = 0; i < ids.length; i++) {
//                if (i == 0) { //Para setear el documento en el primer tr agregado a la tabla. 
//                    tr = tr_actual;
//                    obj = transaccion.detalle_documentos.getDetalle(tr);
//                    if (obj.docField.obj == null) {
//                        obj.docField.selectObj(ids[i]);
//                        continue;
//                    }
//                }
//                //añade al final los documentos seleccionados
//                transaccion.detalle_documentos.agregarDetalle();
//                tr = transaccion.detalle_documentos.getLastRow();
//                obj = transaccion.detalle_documentos.getDetalle(tr); //se obtiene ObjectField del tr  
//                obj.docField.selectObj(ids[i]);
//            }
//        }
//    });
//});


function DetalleDocumento(tr) {
    this.tr = tr;
    this.inputCodDocumento = $(this.tr).find('input.object-codigo');
    var docField = new ObjectField($(this.tr).find('input.object-hidden[id$="documento_id"]'));
    var urldocumento = docField.dlgUrl;
    docField.onButtonClick = function () {
        var personaid = $('#PersonasId').val();
        if (personaid) {
            
            if (!$('#TipoTransaccionesId').val()) {
                showMessage('Registrar transaccion', 'Debe seleccionar el documento de cruce.');
                return false;
            }
            if ($('#id_documento_id').val())
                //docField.dlgUrl = urldocumento + '?personasId=' + String(personaid) + '&TipoTransaccion=' + String($('#TipoTransaccionesId option:selected').html())  + '&estado=P&excluir_cotizacion=1&excluir_prefactura=1&excluir_dac=1&excluir_ocv=1';
                docField.dlgUrl = urldocumento + '?personasId=' + String(personaid) + '&TipoTransaccion=' + String($('#TipoTransaccionesId').val()) + '&estado=P&excluir_cotizacion=1&excluir_prefactura=1&excluir_dac=1&excluir_ocv=1';
            else
                // docField.dlgUrl = urldocumento + '?personasId=' + String(personaid) + '&TipoTransaccion=' + String($('#TipoTransaccionesId option:selected').html()) + '&estado=P&excluir_cotizacion=1&excluir_prefactura=1&excluir_ocv=1';
                docField.dlgUrl = urldocumento + '?personasId=' + String(personaid) + '&TipoTransaccion=' + String($('#TipoTransaccionesId').val()) + '&estado=P&excluir_cotizacion=1&excluir_prefactura=1&excluir_ocv=1';
            docField.dlgUrl = docField.dlgUrl + '&seleccion_masiva_docs=1' //DEV_EJECUTTRANS
            return true;
        } else {
            showMessage('Registrar transaccion', 'No ha seleccionado una persona.');
            return false;
        }
    };
    docField.elDescription.bind('selected', function () {
        var transaccion_id = null;
        if ($('#Id').val()) {
            transaccion_id = $('#Id').val();
        }
        var fecha_emision = $(tr).find('td.documento_fechaemision');
        var tipo_documento = $(tr).find('td.documento_tipodocumento');
        var valor = $(tr).find('td.documento_valor');
        var saldo = $(tr).find('td.documento_saldo');
        var saldo_pendiente_xtrans = null;
        var mostrar_saldos = false;
        if (transaccion_id != null) {
            var tipo = 'doc';
            
            $.ajax({
                async: false,
                url: urlprefix + "/Transacciones/GetSaldoDocumentos?Id=" + transaccion_id + '&DocumentoId=' + docField.obj.id + '&tipo=' + tipo,
                success: function (data) {
                    
                    saldo_pendiente_xtrans = data['saldo_pendiente'];
                    mostrar_saldos =  true // data['mostrar_saldos']; MAURICIO
                }
            });
        }

        if (docField.obj) {
            
            fecha_emision.html(docField.obj.fecha_emision);
            valor.html(docField.obj.total);
            if (mostrar_saldos == true) {
                if (transaccion_id == null) {
                    saldo.html(docField.obj.saldo);
                } else {
                    saldo.html(saldo_pendiente_xtrans);
                }
            }
            else {
                saldo.html(docField.obj.saldo);
            }

            if (docField.obj.tipo_documento == 'FAC') {
                tipo_documento.html('Factura');
            }
            if (docField.obj.tipo_documento == 'NVE') {
                tipo_documento.html('Nota de Venta');
            }
            if (docField.obj.tipo_documento == 'LQC') {
                tipo_documento.html('LiquidaciÃ³n de Compra');
            }
            if (docField.obj.tipo_documento == 'LMU') {
                tipo_documento.html('LiquidaciÃ³n de Bienes Muebles Usados');
            }
            if (docField.obj.tipo_documento == 'TMR') {
                tipo_documento.html('Tiquetes o vales emitidos por maquinas registradoras');
            }
            if (docField.obj.tipo_documento == 'BEP') {
                tipo_documento.html('Boletos o entradas a espectaculos publicos');
            }
            if (docField.obj.tipo_documento == 'EIE') {
                tipo_documento.html('Documentos emitidos por Estado');
            }
            if (docField.obj.tipo_documento == 'EIF') {
                tipo_documento.html('Doc. Emi. Financieras');
            }
            if (docField.obj.tipo_documento == 'IMP') {
                tipo_documento.html('Doc. Importacion');
            }
            if (docField.obj.tipo_documento == 'ROL') {
                tipo_documento.html('Rol de Pagos');
            }
            if (docField.obj.tipo_documento == 'ODA') {
                tipo_documento.html('Otros Documentos Autorizados');
            }
            if (docField.obj.tipo_documento == 'NDT') {
                tipo_documento.html('Nota Debito');
            }
            if (docField.obj.tipo_documento == 'NCT') {
                tipo_documento.html('Nota Credito');
            }
            if (docField.obj.tipo_documento == 'RET') {
                tipo_documento.html('Retencion');
            }
            if (docField.obj.tipo_documento == 'CVE') {
                tipo_documento.html('Comprobantes de venta emitido en el Exterior');
            }

            /* Input oculto que mantiene los ids de documentos seleccionados */
            /*var docs_form = [];
			$.each($('#tdetalle_documento .object-hidden' + ':not(input[id^="id_documento_template-"])'), function() {
					valor = $(this).val();
					docs_form.push(valor);
			});
			$('#ids_docs_form').val(docs_form);*/
            //console.log('DOCS ids');
            //console.log($('#ids_docs_form').val());

        } else {
            fecha_emision.html("");
            valor.html("");
            saldo.html("");
            tipo_documento.html("");
        }
    });
    this.docField = docField;
}

DetalleDocumento.sonIguales = function (detalle1, detalle2) {
    var input1 = $(detalle1).find('input[type=hidden]').get(0);
    var input2 = $(detalle2).find('input[type=hidden]').get(0);
    return (input1.id == input2.id);
}

function TransaccionForm(data_documentos, data_comprobantes) {
    this.setAttributes(data_documentos, data_comprobantes);
}

TransaccionForm.prototype.setAttributes = function (data_documentos, data_comprobantes) {
    if (data_documentos) {
        this.detalle_documentos = new MasterDetail(data_documentos);
    }
    if (data_comprobantes) {
        this.detalle_comprobantes = new MasterDetail(data_comprobantes);
    }
};



DetalleAnticipo.sonIguales = function (detalle1, detalle2) {
    var input1 = $(detalle1).find('input[type=hidden]').get(0);
    var input2 = $(detalle2).find('input[type=hidden]').get(0);
    return (input1.id == input2.id);
}

function DetalleAnticipo(tr) {
    this.tr = tr;
    var anticipoField = new ObjectField($(this.tr).find('input.object-hidden[id$="anticipo_id"]'));
    var urldocumento = anticipoField.dlgUrl;
    anticipoField.onButtonClick = function () {
        var personaid = $('#PersonasId').val();
        if (personaid) {
            if (!$('#TipoTransaccionesId').val()) {
                showMessage('Registrar transacción', 'Debe seleccionar el documento de cruce.');
                return false;
            }
            anticipoField.dlgUrl = urldocumento + '?persona_id=' + String(personaid) + '&tipo_transaccion=' + String($('#TipoTransaccionesId').val());
            return true;
        } else {
            showMessage('Registrar transacción', 'No ha seleccionado una persona.');
            return false;
        }
    };
    anticipoField.elDescription.bind('selected', function () {

        var transaccion_id = null;
        if ($('#Id').val()) {
            transaccion_id = $('#Id').val();
        }

        var fecha_emision = $(tr).find('td.anticipo_fechaemision');
        var valor = $(tr).find('td.anticipo_valor');
        var saldo = $(tr).find('td.anticipo_saldo');
        var valor_pago = $(tr).find('input[name$="-valor_pago"]');
        if (documentofield.obj && documentofield.obj.tipo_documento == "DAC" && anticipoField.obj != null) {
            if (anticipoField.obj.tipo_documento == "DAC") {
                if (anticipoField.obj.tipo_registro_documento == documentofield.obj.tipo_registro_documento) {
                    var tipo = 'Cliente';
                    if (documentofield.obj.tipo_registro_documento == "PRO") {
                        tipo = "Proveedor";
                    }
                    showMessage('Registrar transacción', 'Los Documentos no pueden ser del mismo tipo. [' + tipo + ']');
                    anticipoField.reset();
                }
            }
        }
        var saldo_pendiente_xtrans = null;
        var mostrar_saldos = false;
        if (transaccion_id != null) {
            var tipo = 'ant';
            $.ajax({
                async: false,
                url: urlprefix + "/registro/transaccion/saldo_documentos/?transaccion=" + transaccion_id + '&documento=' + anticipoField.obj.id + '&tipo=' + tipo,
                success: function (data) {
                    saldo_pendiente_xtrans = data['saldo_pendiente']
                    mostrar_saldos = data['mostrar_saldos'];
                }
            });
        }

        if (anticipoField.obj) {
            fecha_emision.html(anticipoField.obj.fecha_emision);
            valor.html(anticipoField.obj.total);
            if (mostrar_saldos == true) {
                if (transaccion_id == null) {
                    saldo.html(anticipoField.obj.saldo_anticipo);
                } else {
                    saldo.html(saldo_pendiente_xtrans);
                }
            } else {
                saldo.html(anticipoField.obj.saldo_anticipo);
            }

        } else {
            fecha_emision.html("");
            valor.html("");
            saldo.html("");
            valor_pago.val("");
        }
    });
    this.anticipoField = anticipoField;
}

DetalleAnticipo.sonIguales = function (detalle1, detalle2) {
    var input1 = $(detalle1).find('input[type=hidden]').get(0);
    var input2 = $(detalle2).find('input[type=hidden]').get(0);
    return (input1.id == input2.id);
}


function DetalleCuenta(tr) {
    this.tr = tr;
    this.cuentafield = new ObjectField($(this.tr).find('input.object-hidden[id$="cuenta"]'));
    this.centrocostofield = new ObjectField($(this.tr).find('input.object-hidden[id$="centro_costo"]'));
    this.personafield = new ObjectField($(this.tr).find('input.object-hidden[id$="persona_id"]'));
    this.cuentafield.onSetObj = function (obj) {
        debugger
        if (obj && obj.tipo_cuenta && obj.tipo_cuenta.codigo in { '35': null, '36': null, '3': null, '4': null, '5': null, '6': null, '25': null, '59': null, '60': null, '116': null, '132': null, '113': null, '114': null }) {
            $(tr).find('div.personacuenta-field').show();
            $(tr).find('div.centrocostocuenta-field').hide();
        } else if (obj && (obj.codigo.startsWith('4') || obj.codigo.startsWith('5'))) {
            $(tr).find('div.personacuenta-field').hide();
            $(tr).find('div.centrocostocuenta-field').show();
        } else {
            $(tr).find('div.personacuenta-field').hide();
            $(tr).find('div.centrocostocuenta-field').hide();
        }
    };
}

DetalleCuenta.sonIguales = function (detalle1, detalle2) {
    var input1 = $(detalle1).find('input[type=hidden]').get(0);
    var input2 = $(detalle2).find('input[type=hidden]').get(0);
    return (input1.id == input2.id);
}
