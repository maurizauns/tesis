function SecuenciaChequeForm(tr) {
    this.tr = tr;
}

SecuenciaChequeForm.sonIguales = function (detalle1, detalle2) {
    var input1 = $(detalle1).find('input').get(0);
    var input2 = $(detalle2).find('input').get(0);
    return (input1.id == input2.id);
}