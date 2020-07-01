function categoriaProductosCallback(data) {
    $('#Id').val(data.Id);
    $('#Codigo').val(data.Codigo);
    $('#Descripcion').val(data.Descripcion);
}

function Categoria(data) {
    /* Clase que representa una cuenta contable */
    this.setAttributes(data);
}

Categoria.prototype.setAttributes = function (data) {
    /* Setea los atributos de la cuenta contenidos en el diccionario data */
    this.Id = data['Id'];
    this.codigo = data['Codigo'];
    this.Descripcion = data['Descripcion'];

    this.ParentId = data['ParentId'];
    this.tipo = data['TipoProducto'];
    this.TipoProducto = data['TipoProducto'];
    this.Ingresos = data['Ingresos'];
    this.PlanCuentasIngresosId = data['PlanCuentasIngresosId'];
    this.Activos = data['Activos'];
    this.PlanCuentasActivosId = data['PlanCuentasActivosId'];
    this.Inventarios = data['Inventarios'];
    this.PlanCuentasInventariosId = data['PlanCuentasInventariosId'];

    this.PlanCuentasIngresos = data['PlanCuentasIngresos'];
    this.PlanCuentasActivos = data['PlanCuentasActivos'];
    this.PlanCuentasInventarios = data['PlanCuentasInventarios'];
};

Categoria.prototype.getPadding = function () {
    nivel = this.codigo.split('.').length;
    if (nivel == 1) {
        return 35;
    }
    return 35 * nivel;
}

Categoria.prototype.get_id_padre = function () {
    if (!this.ParentId || this.ParentId == 'null') {
        return '';
    }
    return this.ParentId;
}

Categoria.getById = function (id, async, callback, oThis) {

    /* Obtiene los datos de una cuenta contable por el Id. */
    if (async == undefined) async = true;
    var categoria = null;
    $.ajax({
        type: "GET",
        url: urlprefix + "/CategoriaProductos/GetCategoria?Id=" + id,
        dataType: "json",
        async: async,
        success: function (data, textStatus) {
            categoria = new Categoria(data);
            if (async) {
                if (oThis) {
                    callback.call(oThis, categoria);
                }
                else {
                    callback(categoria);
                }
            }
        },
        error: function () {
            showMessage('Error', 'Ocurrio un error al intentar cargar los datos de la categoria, por favor intentelo nuevamente');
        }
    });
    if (!async) {
        return categoria;
    }
};

Categoria.getByCodigo = function (codigo, async, callback, oThis) {
    /* Obtiene los datos de una cuenta contable por el el cÃ³digo o el nombre. */
    if (async == undefined) async = true;
    var cuenta = null;
    $.ajax({
        type: "GET",
        url: urlprefix + "/contabilidad/cuenta/buscar/",
        data: { 'query': codigo },
        dataType: "json",
        async: async,
        success: function (data, textStatus) {
            var cuenta = null;
            if (data['obj']) {
                cuenta = new Cuenta(data['obj']);
            }
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
            showMessage('Error', 'OcurriÃ³ un error al intentar cargar los datos de la cuenta, por favor intÃ©ntelo nuevamente');
        }
    });
    if (!async) {
        return cuenta;
    }
};

Categoria.prototype.save = function (callback) {

    /* Guarda los datos del centro de costo */
    var data = { 'Descripcion': this.Descripcion, 'Codigo': this.codigo, 'ParentId': this.ParentId, 'PlanCuentasIngresosId': this.PlanCuentasIngresosId, 'PlanCuentasActivosId': this.PlanCuentasActivosId, 'PlanCuentasInventariosId': this.PlanCuentasInventariosId };
    var titulo, url;
    this.Descripcion = $.trim($("#Descripcion").val());
    data['TipoProducto'] = this.TipoProducto;
    if ($('#Ingresos').is(':checked')) {
        this.Ingresos = true;
        data['Ingresos'] = this.Ingresos;
    }
    if ($('#Activos').is(':checked')) {
        this.Activos = true;
        data['Activos'] = this.Activos;
    }
    if ($('#Inventarios').is(':checked')) {
        this.Inventarios = true;
        data['Inventarios'] = this.Inventarios;
    }
    if ($('#agrupar').attr('checked')) {
        this.agrupar = true;
        data['agrupar'] = this.agrupar;
    }
    if ($('#id_dias_plazo').val() && $('#id_dias_plazo').val() != '') {
        this.dias_plazo = $('#id_dias_plazo').val();
        data['dias_plazo'] = this.dias_plazo;
    }

    if ($('#es_comisariato').val() == '1') {
        this.para_comisariato = true;
        data['para_comisariato'] = this.para_comisariato;
    } else {
        this.para_comisariato = false;
        data['para_comisariato'] = this.para_comisariato;
    }

    if (!this.Descripcion) {
        showMessage('Agregar CategorÃ­a', 'Debe ingresar el nombre de la categorÃ­a.');
        return false;
    }
    if (this.Id) {
        data['id'] = this.Id;
        titulo = 'Modificar CategorÃ­a';
        url = urlprefix + "/CategoriaProductos/Ingreso/" + this.Id + "/";
    } else {
        titulo = 'Agregar CategorÃ­a';
        console.log(data);
        url = urlprefix + "/CategoriaProductos/Ingreso/";
    }
    $.ajax({
        type: "POST",
        data: data,
        url: url,
        dataType: "json",
        success: function (data, textStatus) {
            console.log("post ///");
            var saved = data != null ? true : false, categoria = null;
            if (saved) {
                categoria = new Categoria(data.data);
                if (callback) {
                    callback(categoria);
                }
            }
            else {
                showMessage(titulo, data['errors']);
            }
        },
        error: function () {
            showMessage('Error', 'OcurriÃ³ un error al intentar guardar la categorÃ­a, por favor intÃ©ntelo nuevamente');
        }
    });
} 