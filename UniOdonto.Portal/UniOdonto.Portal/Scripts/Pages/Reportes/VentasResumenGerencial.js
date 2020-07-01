
$.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "/Reportes/GetVentasTrimestrales",
    success: function (a) {
        var total = [];
        var totalP = [];
        var periodo = [];

        for (var i = 0; i < a.Total.length; i++) {
            total.push(a.Total[i]);
        }
        for (var j = 0; j < a.TotalP.length; j++) {
            totalP.push(a.TotalP[j]);
        }
        for (var k = 0; k < a.Periodo.length; k++) {
            periodo.push(a.Periodo[k].toString());
        }
        serie = [{
            name: 'Periodo Actual',
            color: '#2155e0',
            zIndex: 2,
            data: total
        },
        {
            name: 'Periodo Pasado',
            color: '#00a65a',
            zIndex: 1,
            data: totalP
        }];
        drawChart('container', 'Ventas Trimestrales', periodo, serie);
    }
});

$.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "/Reportes/GetVentasMensuales",
    success: function (a) {
        var totalVM = [];
        var totalPVM = [];
        var periodoVM = [];

        for (var i = 0; i < a.Resultado.length; i++) {
            totalVM.push(a.Resultado[i].Total);
        }
        for (var k = 0; k < a.ResultadoP.length; k++) {
            totalPVM.push(a.ResultadoP[k].Total);
        }
        for (var j = 0; j < a.Resultado.length; j++) {
            periodoVM.push(a.Resultado[j].Mes);
        }
       
        serie = [{
            name: 'Periodo Actual',
            color: '#2155e0',
            zIndex: 2,
            data: totalVM
        },
        {
            name: 'Periodo Pasado',
            color: '#00a65a',
            zIndex: 1,
            data: totalPVM
        }];

        drawChart('VentasMensuales', 'Ventas Mensuales', periodoVM, serie);
    }
});

function drawChart(div, title, leyenda, serie) {
    Highcharts.chart(div, {

        title: {
            text: title
        },
        subtitle: {
            text: nombreEmpresa,
            style: {
                color: '#4d759e',
                fontWeight: 'bold',
                fontSize: "15px",
            },
        },
        xAxis: {
            categories: leyenda
            //crosshair: true
        },
        yAxis: {
            title: {
                text: 'Ventas'
            }
        },
        plotOptions: {
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function (event) {
                            var cloneDiv = this.series.chart.tooltip.label.div.cloneNode(true);
                            chart.container.appendChild(cloneDiv);
                        }
                    }
                }
            }
        },
        tooltip: {
            useHTML: true,
            shadow: false
        },

        series: serie
    });

}

var totalVD = [];
var totalPVD = [];
var periodoVD = [];

$.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "/Reportes/GetVentasDiarias",
    success: function (a) {
        for (var i = 0; i < a.Resultado.length; i++) {
            totalVD.push(a.Resultado[i].Total);
        }
        for (var k = 0; k < a.ResultadoP.length; k++) {
            totalPVD.push(a.ResultadoP[k].Total);
        }
        for (var j = 0; j < a.Resultado.length; j++) {
            periodoVD.push(a.Resultado[j].Mes);
        }
        drawChartDiarias();
    }
});

function drawChartDiarias() {
    Highcharts.chart('VentasDiarias', {

        title: {
            text: 'Ventas Diarias'
        },
        subtitle: {
            text: nombreEmpresa,
            style: {
                color: '#4d759e',
                fontWeight: 'bold',
                fontSize: "15px",
            },
        },
        xAxis: {
            type: 'datetime',
            maxZoom: 365 * 360000,
        },
        yAxis: {
            title: {
                text: 'Ventas'
            }
        },

        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: []
                },
                lineWidth: 2,
                marker: {
                    enabled: false
                },
                shadow: false,
                states: {
                    hover: {
                        lineWidth: 2
                    }
                },
                threshold: null
            },
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function (event) {
                            var cloneDiv = this.series.chart.tooltip.label.div.cloneNode(true);
                            chart.container.appendChild(cloneDiv);
                        }
                    }
                }
            }
        },
        scrollbar: {
            enabled: true
        },
        tooltip: {
            useHTML: true,
            shadow: false
        },

        series: [{
            data: totalVD,
            color: '#2155e0',
            zIndex: 2,
            pointInterval: 24 * 3600 * 1000,
            pointStart: Date.UTC(2019, 0, 1),
            name: 'Periodo Actual'
        },{
            data: totalPVD,
            color: '#00a65a',
            zIndex: 1,
            pointInterval: 24 * 3600 * 1000,
            pointStart: Date.UTC(2019, 0, 1),
            name: 'Periodo Pasado'
        }]
    });
}