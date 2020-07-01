function Cuenta(data) {
    this.setAttributes(data);
}

Cuenta.prototype.setAttributes = function (data) {
    
    this.Id = data['Id'];
    this.codigo = data['Codigo'];
    this.tipo = data['tipo'];
    this.Descripcion = data['Descripcion'];
    this.padre_id = data['ParentId'];
    this.tipo_cuenta_id = data['TipoCuentasId'];
    if (data['padre']) {
        this.padre = new Cuenta(data['padre']);
    }
    else {
        this.padre = null;
    }
    if (data['tipo_cuenta']) {
        this.tipo_cuenta = new TipoCuenta(data['tipo_cuenta']);
    }
    else {
        this.tipo_cuenta = null;
    }

    this.tipoCuenta = data['TipoCuentas'];
    if (this.tipoCuenta != null) {
        this.tipo_cuenta = new TipoCuenta(this.tipoCuenta);
        //this.padre = data['ParentId'];
    } else {
        this.tipo_cuenta = null;
        // this.padre = null;
    }
};

Cuenta.getById = function (id, async, callback, oThis) {
    if (async == undefined) async = true;
    var cuenta = null;
    $.ajax({
        type: "GET",
        url: urlprefix + "/PlanCuentas/GetPlanCuentasActual?PlanCuentasId=" + id,
        dataType: "json",
        async: async,
        success: function (data, textStatus) {
            cuenta = new Cuenta(data);
            if (async) {
                if (oThis) {
                    callback.call(oThis, cuenta);
                }
                else {
                    callback(cuenta);
                }
            }
        },
        error: function () {
            showMessage('Error', 'Ocurrio un error al intentar cargar los datos de la cuenta, por favor intentelo nuevamente');
        }
    });
    if (typeof promises_js !== 'undefined') {
        promises_js.push(a);
    }
    if (!async) {
        return cuenta;
    }
}
Cuenta.getObjDesc = function () {
    return this.obj.Descripcion;
};

Cuenta.getCodigoNombre = function () {
    return this.obj.codigo + " - " + this.obj.Descripcion;
};

Cuenta.prototype.getNivel = function () {
    /* Devuelve el nivel de la cuenta contable */
    return this.codigo.split('.').length;
};


Cuenta.prototype.getPadding = function () {
    /* Devuelve el nivel de la cuenta contable */
    return 35 * (this.getNivel() - 1);
};

Cuenta.prototype.save = function (callback) {
    debugger
    /* Guarda los datos de la cuenta contable */
    var data = { 'Descripcion': this.Descripcion, 'ParentId': this.padre_id, 'TipoCuentasId': this.tipo_cuenta_id };
    var titulo, url;
    this.Descripcion = $.trim($("#Descripcion").val());
    if (!this.Descripcion) {
        showMessage('Registrar cuenta', 'Debe escribir el nombre de la cuenta contable');
        return false;
    }
    if (this.tipo == 'C' && !this.tipo_cuenta_id) {
        showMessage('Registrar cuenta', 'El tipo de cuenta es requerido.');
        return false;
    }
    if (this.Id) {
        data['id'] = this.Id;
        titulo = 'Modificar cuenta';
        url = urlprefix + "/contabilidad/cuenta/" + this.Id + "/";
    } else {
        titulo = 'Registrar cuenta';
        url = urlprefix + "/PlanCuentas/Ingreso/";
    }
    $.ajax({
        type: "POST",
        data: data,
        url: url,
        dataType: "json",
        beforeSend: function () {
            $('#dlgmsgcuenta').modal();
        },
        success: function (data, textStatus) {
            
            var saved = data.data, cuenta = null;
            
            if (saved) {
                cuenta = new Cuenta(data.data);
                if (callback) {
                    callback(cuenta);
                }
            }
            else {
                showMessage(titulo, data['errors']);
            }
        },
        complete: function () {
            $('#dlgmsgcuenta').modal('hide');
        },
        error: function () {
            $('#dlgmsgcuenta').modal('hide');
            showMessage('Error', 'OcurriÃ³ un error al intentar guardar la cuenta, por favor intÃ©ntelo nuevamente');
        }
    });
};


Cuenta.prototype.eliminar = function (callback) {
    /* Elimina la cuenta contable */
    $.ajax({
        type: "GET",
        url: urlprefix + "/contabilidad/cuenta/" + this.Id + "/eliminar/",
        dataType: "json",
        beforeSend: function () {
            $('#dlgmsgcuenta').modal();
        },
        success: function (data, textStatus) {
            var deleted = data['saved'];
            if (deleted) {
                if (callback) {
                    callback(data['obj']);
                }
            }
            else {
                showMessage('Eliminar cuenta', data['errors']);
            }
        },
        complete: function () {
            $('#dlgmsgcuenta').modal('hide');
        },
        error: function () {
            $('#dlgmsgcuenta').modal('hide');
            showMessage('Error', 'OcurriÃ³ un error al intentar guardar la cuenta, por favor intÃ©ntelo nuevamente');
        }
    });
};
