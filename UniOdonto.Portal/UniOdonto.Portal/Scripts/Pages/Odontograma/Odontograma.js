if (typeof vmOdonto == 'undefined') {
	var vmOdonto = {};
	var dental = {};
}
wait("Dental", function () {

	function Knockout(data) {
		//Functionality
		vmOdonto.Dientes = [];
		vmOdonto.DientesBackup = [];

		vmOdonto.Id = ko.observable("00000000-0000-0000-0000-000000000000");
		vmOdonto.Fecha = ko.observable("");
		vmOdonto.FechaBackup = ko.observable("");
		vmOdonto.Comentarios = ko.observable("");
		vmOdonto.ComentariosBackup = ko.observable("");
		vmOdonto.Acciones = ko.observable("");

		vmOdonto.SAdulto = ko.observable(false);
		vmOdonto.SInferior = ko.observable(false);
		vmOdonto.SInfancia = ko.observable(false);
		vmOdonto.IInfancia = ko.observable(false);


		//////////
		vmOdonto.R1 = ko.observable("");
		vmOdonto.R1Backup = ko.observable("");
		vmOdonto.R2 = ko.observable("");
		vmOdonto.R2Backup = ko.observable("");
		vmOdonto.R3 = ko.observable("");
		vmOdonto.R3Backup = ko.observable("");
		vmOdonto.R4 = ko.observable("");
		vmOdonto.R4Backup = ko.observable("");
		vmOdonto.R5 = ko.observable("");
		vmOdonto.R5Backup = ko.observable("");
		vmOdonto.R6 = ko.observable("");
		vmOdonto.R6Backup = ko.observable("");
		vmOdonto.R7 = ko.observable("");
		vmOdonto.R7Backup = ko.observable("");
		vmOdonto.R8 = ko.observable("");
		vmOdonto.R8Backup = ko.observable("");
		vmOdonto.R9 = ko.observable("");
		vmOdonto.R9Backup = ko.observable("");
		vmOdonto.R10 = ko.observable("");
		vmOdonto.R10Backup = ko.observable("");
		vmOdonto.R11 = ko.observable("");
		vmOdonto.R11Backup = ko.observable("");
		vmOdonto.R12 = ko.observable("");
		vmOdonto.R12Backup = ko.observable("");
		vmOdonto.R13 = ko.observable("");
		vmOdonto.R13Backup = ko.observable("");
		vmOdonto.R14 = ko.observable("");
		vmOdonto.R14Backup = ko.observable("");
		vmOdonto.R15 = ko.observable("");
		vmOdonto.R15Backup = ko.observable("");
		vmOdonto.R16 = ko.observable("");
		vmOdonto.R16Backup = ko.observable("");

		vmOdonto.M1 = ko.observable("");
		vmOdonto.M1Backup = ko.observable("");
		vmOdonto.M2 = ko.observable("");
		vmOdonto.M2Backup = ko.observable("");
		vmOdonto.M3 = ko.observable("");
		vmOdonto.M3Backup = ko.observable("");
		vmOdonto.M4 = ko.observable("");
		vmOdonto.M4Backup = ko.observable("");
		vmOdonto.M5 = ko.observable("");
		vmOdonto.M5Backup = ko.observable("");
		vmOdonto.M6 = ko.observable("");
		vmOdonto.M6Backup = ko.observable("");
		vmOdonto.M7 = ko.observable("");
		vmOdonto.M7Backup = ko.observable("");
		vmOdonto.M8 = ko.observable("");
		vmOdonto.M8Backup = ko.observable("");
		vmOdonto.M9 = ko.observable("");
		vmOdonto.M9Backup = ko.observable("");
		vmOdonto.M10 = ko.observable("");
		vmOdonto.M10Backup = ko.observable("");
		vmOdonto.M11 = ko.observable("");
		vmOdonto.M11Backup = ko.observable("");
		vmOdonto.M12 = ko.observable("");
		vmOdonto.M12Backup = ko.observable("");
		vmOdonto.M13 = ko.observable("");
		vmOdonto.M13Backup = ko.observable("");
		vmOdonto.M14 = ko.observable("");
		vmOdonto.M14Backup = ko.observable("");
		vmOdonto.M15 = ko.observable("");
		vmOdonto.M15Backup = ko.observable("");
		vmOdonto.M16 = ko.observable("");
		vmOdonto.M16Backup = ko.observable("");

		vmOdonto.Re1 = ko.observable("");
		vmOdonto.Re1Backup = ko.observable("");
		vmOdonto.Re2 = ko.observable("");
		vmOdonto.Re2Backup = ko.observable("");
		vmOdonto.Re3 = ko.observable("");
		vmOdonto.Re3Backup = ko.observable("");
		vmOdonto.Re4 = ko.observable("");
		vmOdonto.Re4Backup = ko.observable("");
		vmOdonto.Re5 = ko.observable("");
		vmOdonto.Re5Backup = ko.observable("");
		vmOdonto.Re6 = ko.observable("");
		vmOdonto.Re6Backup = ko.observable("");
		vmOdonto.Re7 = ko.observable("");
		vmOdonto.Re7Backup = ko.observable("");
		vmOdonto.Re8 = ko.observable("");
		vmOdonto.Re8Backup = ko.observable("");
		vmOdonto.Re9 = ko.observable("");
		vmOdonto.Re9Backup = ko.observable("");
		vmOdonto.Re10 = ko.observable("");
		vmOdonto.Re10Backup = ko.observable("");
		vmOdonto.Re11 = ko.observable("");
		vmOdonto.Re11Backup = ko.observable("");
		vmOdonto.Re12 = ko.observable("");
		vmOdonto.Re12Backup = ko.observable("");
		vmOdonto.Re13 = ko.observable("");
		vmOdonto.Re13Backup = ko.observable("");
		vmOdonto.Re14 = ko.observable("");
		vmOdonto.Re14Backup = ko.observable("");
		vmOdonto.Re15 = ko.observable("");
		vmOdonto.Re15Backup = ko.observable("");
		vmOdonto.Re16 = ko.observable("");
		vmOdonto.Re16Backup = ko.observable("");

		vmOdonto.Mo1 = ko.observable("");
		vmOdonto.Mo1Backup = ko.observable("");
		vmOdonto.Mo2 = ko.observable("");
		vmOdonto.Mo2Backup = ko.observable("");
		vmOdonto.Mo3 = ko.observable("");
		vmOdonto.Mo3Backup = ko.observable("");
		vmOdonto.Mo4 = ko.observable("");
		vmOdonto.Mo4Backup = ko.observable("");
		vmOdonto.Mo5 = ko.observable("");
		vmOdonto.Mo5Backup = ko.observable("");
		vmOdonto.Mo6 = ko.observable("");
		vmOdonto.Mo6Backup = ko.observable("");
		vmOdonto.Mo7 = ko.observable("");
		vmOdonto.Mo7Backup = ko.observable("");
		vmOdonto.Mo8 = ko.observable("");
		vmOdonto.Mo8Backup = ko.observable("");
		vmOdonto.Mo9 = ko.observable("");
		vmOdonto.Mo9Backup = ko.observable("");
		vmOdonto.Mo10 = ko.observable("");
		vmOdonto.Mo10Backup = ko.observable("");
		vmOdonto.Mo11 = ko.observable("");
		vmOdonto.Mo11Backup = ko.observable("");
		vmOdonto.Mo12 = ko.observable("");
		vmOdonto.Mo12Backup = ko.observable("");
		vmOdonto.Mo13 = ko.observable("");
		vmOdonto.Mo13Backup = ko.observable("");
		vmOdonto.Mo14 = ko.observable("");
		vmOdonto.Mo14Backup = ko.observable("");
		vmOdonto.Mo15 = ko.observable("");
		vmOdonto.Mo15Backup = ko.observable("");
		vmOdonto.Mo16 = ko.observable("");
		vmOdonto.Mo16Backup = ko.observable("");
		//////////

		vmOdonto.EvolucionesConductoDesa_ = ko.observableArray([]);

		vmOdonto.IsOpen = ko.observable(false);
		vmOdonto.IsNotOpen = ko.computed(function () { return !vmOdonto.IsOpen(); });

		vmOdonto.State = ko.observable("Blank");

		vmOdonto.IsBlank = ko.computed(function () { return (vmOdonto.State() == "Blank") ? true : false; });
		vmOdonto.IsNew = ko.computed(function () { return (vmOdonto.State() == "New") ? true : false; });
		vmOdonto.IsEdit = ko.computed(function () { return (vmOdonto.State() == "Edit") ? true : false; });
		vmOdonto.IsView = ko.computed(function () { return (vmOdonto.State() == "View") ? true : false; });

		vmOdonto.IsNotBlank = ko.computed(function () { return (vmOdonto.State() != "Blank") ? true : false; });
		vmOdonto.IsNotNew = ko.computed(function () { return (vmOdonto.State() != "New") ? true : false; });
		vmOdonto.IsNotEdit = ko.computed(function () { return (vmOdonto.State() != "Edit") ? true : false; });
		vmOdonto.IsNotView = ko.computed(function () { return (vmOdonto.State() != "View") ? true : false; });

		vmOdonto.BtnEditar = ko.observable(false);
		vmOdonto.Empty = [];
		vmOdonto.Nuevo = function () {
			$.get("/Odontograma/GetEmpty/" + PersonaID).done(function (data) {
				vmOdonto.Empty = JSON.parse(JSON.stringify(data.Data));
				vmOdonto.Dientes = data.Data;

				if (data.Odontograma != null) {

					var arrayProperties = new Array();
					for (var i = 0; i < data.Odontograma.Evoluciones.length; i++) {
						var properties = new Object();
						try {
							var datasE = data.Odontograma.Evoluciones[i].EncuestaID();
							var datas = data.Odontograma.Evoluciones[i].EvolucionDate();
							var datas1 = data.Odontograma.Evoluciones[i].Diente();
							var datas2 = data.Odontograma.Evoluciones[i].Pieza();
							var datas10 = data.Odontograma.Evoluciones[i].Pieza2();
							var datas3 = data.Odontograma.Evoluciones[i].Indicacion();
							var datas4 = data.Odontograma.Evoluciones[i].Estado();
							var datas5 = data.Odontograma.Evoluciones[i].Cara();
							var datas6 = data.Odontograma.Evoluciones[i].Cara1();
							var datas7 = data.Odontograma.Evoluciones[i].Cara2();
							var datas8 = data.Odontograma.Evoluciones[i].Cara3();
							var datas9 = data.Odontograma.Evoluciones[i].Cara4();
						} catch (e) {
							var datasE = data.Odontograma.Evoluciones[i].EncuestaID;
							var datas = data.Odontograma.Evoluciones[i].EvolucionDate;
							var datas1 = data.Odontograma.Evoluciones[i].Diente;
							var datas2 = data.Odontograma.Evoluciones[i].Pieza;
							var datas3 = data.Odontograma.Evoluciones[i].Indicacion;
							var datas4 = data.Odontograma.Evoluciones[i].Estado;
							var datas5 = data.Odontograma.Evoluciones[i].Cara;
							var datas6 = data.Odontograma.Evoluciones[i].Cara1;
							var datas7 = data.Odontograma.Evoluciones[i].Cara2;
							var datas8 = data.Odontograma.Evoluciones[i].Cara3;
							var datas9 = data.Odontograma.Evoluciones[i].Cara4;
							var datas10 = data.Odontograma.Evoluciones[i].Pieza2;
						}

						properties.EncuestaID = datasE;
						properties.Diente = datas1;
						properties.Pieza = datas2;
						properties.Pieza2 = datas10;
						properties.Indicacion = datas3;
						properties.Estado = datas4;
						properties.Cara = datas5;
						properties.Cara1 = datas6;
						properties.Cara2 = datas7;
						properties.Cara3 = datas8;
						properties.Cara4 = datas9;
						properties.EncuestaID = i;
						properties.EvolucionDate = moment(datas, 'DD/MM/YYYY hh:mm a').format("DD/MM/YYYY HH:mm");

						if (datas3 == "Ausente") {
							properties.validar2 = false;
						} else {
							properties.validar2 = true;
						}

						if (datas3 == "Caries" || datas3 == "Restauracion" || datas3 == "Incrustacion") {
							properties.validar = false;
						} else {
							properties.validar = true;
						}
						arrayProperties.push(properties);

					}
					vmOdonto.EvolucionesConductoDesa_(arrayProperties);


					//////////
					vmOdonto.R1(data.Odontograma.R1);
					vmOdonto.R2(data.Odontograma.R2);
					vmOdonto.R3(data.Odontograma.R3);
					vmOdonto.R4(data.Odontograma.R4);
					vmOdonto.R5(data.Odontograma.R5);
					vmOdonto.R6(data.Odontograma.R6);
					vmOdonto.R7(data.Odontograma.R7);
					vmOdonto.R8(data.Odontograma.R8);
					vmOdonto.R9(data.Odontograma.R9);
					vmOdonto.R10(data.Odontograma.R10);
					vmOdonto.R11(data.Odontograma.R11);
					vmOdonto.R12(data.Odontograma.R12);
					vmOdonto.R13(data.Odontograma.R13);
					vmOdonto.R14(data.Odontograma.R14);
					vmOdonto.R15(data.Odontograma.R15);
					vmOdonto.R16(data.Odontograma.R16);

					vmOdonto.M1(data.Odontograma.M1);
					vmOdonto.M2(data.Odontograma.M2);
					vmOdonto.M3(data.Odontograma.M3);
					vmOdonto.M4(data.Odontograma.M4);
					vmOdonto.M5(data.Odontograma.M5);
					vmOdonto.M6(data.Odontograma.M6);
					vmOdonto.M7(data.Odontograma.M7);
					vmOdonto.M8(data.Odontograma.M8);
					vmOdonto.M9(data.Odontograma.M9);
					vmOdonto.M10(data.Odontograma.M10);
					vmOdonto.M11(data.Odontograma.M11);
					vmOdonto.M12(data.Odontograma.M12);
					vmOdonto.M13(data.Odontograma.M13);
					vmOdonto.M14(data.Odontograma.M14);
					vmOdonto.M15(data.Odontograma.M15);
					vmOdonto.M16(data.Odontograma.M16);

					vmOdonto.Re1(data.Odontograma.Re1);
					vmOdonto.Re2(data.Odontograma.Re2);
					vmOdonto.Re3(data.Odontograma.Re3);
					vmOdonto.Re4(data.Odontograma.Re4);
					vmOdonto.Re5(data.Odontograma.Re5);
					vmOdonto.Re6(data.Odontograma.Re6);
					vmOdonto.Re7(data.Odontograma.Re7);
					vmOdonto.Re8(data.Odontograma.Re8);
					vmOdonto.Re9(data.Odontograma.Re9);
					vmOdonto.Re10(data.Odontograma.Re10);
					vmOdonto.Re11(data.Odontograma.Re11);
					vmOdonto.Re12(data.Odontograma.Re12);
					vmOdonto.Re13(data.Odontograma.Re13);
					vmOdonto.Re14(data.Odontograma.Re14);
					vmOdonto.Re15(data.Odontograma.Re15);
					vmOdonto.Re16(data.Odontograma.Re16);

					vmOdonto.Mo1(data.Odontograma.Mo1);
					vmOdonto.Mo2(data.Odontograma.Mo2);
					vmOdonto.Mo3(data.Odontograma.Mo3);
					vmOdonto.Mo4(data.Odontograma.Mo4);
					vmOdonto.Mo5(data.Odontograma.Mo5);
					vmOdonto.Mo6(data.Odontograma.Mo6);
					vmOdonto.Mo7(data.Odontograma.Mo7);
					vmOdonto.Mo8(data.Odontograma.Mo8);
					vmOdonto.Mo9(data.Odontograma.Mo9);
					vmOdonto.Mo10(data.Odontograma.Mo10);
					vmOdonto.Mo11(data.Odontograma.Mo11);
					vmOdonto.Mo12(data.Odontograma.Mo12);
					vmOdonto.Mo13(data.Odontograma.Mo13);
					vmOdonto.Mo14(data.Odontograma.Mo14);
					vmOdonto.Mo15(data.Odontograma.Mo15);
					vmOdonto.Mo16(data.Odontograma.Mo16);



				} else {

				}

				dental.ResetTeethState();
				dental.Draw();
				dental.Initialize();
				vmOdonto.Parse();
				vmOdonto.Id("00000000-0000-0000-0000-000000000000");
				vmOdonto.Fecha("");
				vmOdonto.Comentarios("");

				vmOdonto.BtnEditar(false);
				vmOdonto.State("New");
				vmOdonto.IsOpen(true);
			}).fail(function (res) {
				vmOdonto.Dientes = [];
				console.log("Error in Dientes Sanos function (Odontograma.js)", res);
			});
		};


		vmOdonto.DelDesaNew = function () {
			try {

				$('#tbDesaNew tbody tr#' + this.EncuestaID).remove();
			} catch (e) {

				$('#tbDesaNew tbody tr#' + this.EncuestaID()).remove();
			}

			if (this.Indicacion == "Sellante" && this.Estado == "Indicada") {
				vmOdonto.Sano(vmOdonto.Dientes, "d" + this.Pieza + " nervio");
			}
			else if (this.Indicacion == "Sellante" && this.Estado == "Realizada") {
				vmOdonto.Sano(vmOdonto.Dientes, "d" + this.Pieza + " nervio");
			}
			else if (this.Indicacion == "Extraccion" && this.Estado == "Indicada") {
				vmOdonto.Sano(vmOdonto.Dientes, "d" + this.Pieza + " extraccion");
			}
			else if (this.Indicacion == "Extraccion" && this.Estado == "Realizada") {
				vmOdonto.Sano(vmOdonto.Dientes, "d" + this.Pieza + " extraccion");
			}
			else if (this.Indicacion == "Endodoncia" && this.Estado == "Indicada") {
				vmOdonto.Sano(vmOdonto.Dientes, "d" + this.Pieza + " dentina");
			}
			else if (this.Indicacion == "Endodoncia" && this.Estado == "Realizada") {
				vmOdonto.Sano(vmOdonto.Dientes, "d" + this.Pieza + " dentina");
			}
			else if (this.Indicacion == "Corona" && this.Estado == "Indicada") {
				vmOdonto.Sano(vmOdonto.Dientes, "d" + this.Pieza + " corona");
			}
			else if (this.Indicacion == "Corona" && this.Estado == "Realizada") {
				vmOdonto.Sano(vmOdonto.Dientes, "d" + this.Pieza + " corona");
			}
			else if (this.Indicacion == "Ausente") {
				vmOdonto.Sano(vmOdonto.Dientes, "d" + this.Pieza + " cuello");
			}
			else if (this.Indicacion == "Protesis Total" && this.Estado == "Indicada") {
				vmOdonto.Sano(vmOdonto.Dientes, "d" + this.Pieza + " puente");
			}
			else if (this.Indicacion == "Protesis Total" && this.Estado == "Realizada") {
				vmOdonto.Sano(vmOdonto.Dientes, "d" + this.Pieza + " puente");
			}
			else if (this.Indicacion == "Protesis Parcial Fija" && this.Estado == "Indicada") {
				vmOdonto.Sano(vmOdonto.Dientes, "d" + this.Pieza + "_d" + this.Pieza2 + " puenteVarios");
			}
			else if (this.Indicacion == "Protesis Parcial Fija" && this.Estado == "Realizada") {
				vmOdonto.Sano(vmOdonto.Dientes, "d" + this.Pieza + "_d" + this.Pieza2 + " puenteVarios");
			}
			else if (this.Indicacion == "Protesis Parcial Removible" && this.Estado == "Indicada") {
				vmOdonto.Sano(vmOdonto.Dientes, "d" + this.Pieza + "_d" + this.Pieza2 + " protesis");
			}
			else if (this.Indicacion == "Protesis Parcial Removible" && this.Estado == "Realizada") {
				vmOdonto.Sano(vmOdonto.Dientes, "d" + this.Pieza + "_d" + this.Pieza2 + " protesis");
			}
			else if (this.Indicacion == "Incrustacion") {
				if (this.Cara)
					vmOdonto.Parse("d" + this.Pieza + " oclusal", vmOdonto.Dientes, "Sano");
				if (this.Cara1)
					vmOdonto.Parse("d" + this.Pieza + " mesial", vmOdonto.Dientes, "Sano");
				if (this.Cara2)
					vmOdonto.Parse("d" + this.Pieza + " lingual", vmOdonto.Dientes, "Sano");
				if (this.Cara3)
					vmOdonto.Parse("d" + this.Pieza + " distal", vmOdonto.Dientes, "Sano");
				if (this.Cara4)
					vmOdonto.Parse("d" + this.Pieza + " vestibular", vmOdonto.Dientes, "Sano");
			}
			else if (this.Indicacion == "Caries") {
				if (this.Cara)
					vmOdonto.Parse("d" + this.Pieza + " oclusal", vmOdonto.Dientes, "Sano");
				if (this.Cara1)
					vmOdonto.Parse("d" + this.Pieza + " mesial", vmOdonto.Dientes, "Sano");
				if (this.Cara2)
					vmOdonto.Parse("d" + this.Pieza + " lingual", vmOdonto.Dientes, "Sano");
				if (this.Cara3)
					vmOdonto.Parse("d" + this.Pieza + " distal", vmOdonto.Dientes, "Sano");
				if (this.Cara4)
					vmOdonto.Parse("d" + this.Pieza + " vestibular", vmOdonto.Dientes, "Sano");
			}
			else if (this.Indicacion == "Restauracion") {
				if (this.Cara)
					vmOdonto.Parse("d" + this.Pieza + " oclusal", vmOdonto.Dientes, "Sano");
				if (this.Cara1)
					vmOdonto.Parse("d" + this.Pieza + " mesial", vmOdonto.Dientes, "Sano");
				if (this.Cara2)
					vmOdonto.Parse("d" + this.Pieza + " lingual", vmOdonto.Dientes, "Sano");
				if (this.Cara3)
					vmOdonto.Parse("d" + this.Pieza + " distal", vmOdonto.Dientes, "Sano");
				if (this.Cara4)
					vmOdonto.Parse("d" + this.Pieza + " vestibular", vmOdonto.Dientes, "Sano");
			}

			var now = moment().format();
			var arrayProperties = new Array();
			var rowctr = $('#tbDesaNew tbody tr');
			for (var i = 0; i < rowctr.length; i++) {
				var properties = new Object();
				var data = $(rowctr[i]).find("td:eq(0) input[type='text']").val();
				var data1 = $(rowctr[i]).find("td:eq(1) input[type='text']").val();
				var data2 = $(rowctr[i]).find("td:eq(2) input[type='text']").val();
				var data3 = $(rowctr[i]).find("td:eq(3) input[type='text']").val();
				var data10 = $(rowctr[i]).find("td:eq(4) input[type='text']").val();
				var data4 = $(rowctr[i]).find("td:eq(5) select").val();
				var data5 = $(rowctr[i]).find("td:eq(6) input[type='checkbox']").eq(0).is(":checked");
				var data6 = $(rowctr[i]).find("td:eq(6) input[type='checkbox']").eq(1).is(":checked");
				var data7 = $(rowctr[i]).find("td:eq(6) input[type='checkbox']").eq(2).is(":checked");
				var data8 = $(rowctr[i]).find("td:eq(6) input[type='checkbox']").eq(3).is(":checked");
				var data9 = $(rowctr[i]).find("td:eq(6) input[type='checkbox']").eq(4).is(":checked");

				properties.Pieza2 = data10;
				properties.Diente = data1;
				properties.Pieza = data2;
				properties.Indicacion = data3;
				properties.Estado = data4;
				properties.Cara = data5;
				properties.Cara1 = data6;
				properties.Cara2 = data7;
				properties.Cara3 = data8;
				properties.Cara4 = data9;
				properties.EncuestaID = i;
				properties.EvolucionDate = moment(data, 'DD/MM/YYYY hh:mm a').format("DD/MM/YYYY HH:mm");

				if (properties.Indicacion == "Ausente") {
					properties.validar2 = false;
				} else {
					properties.validar2 = true;
				}

				if (properties.Indicacion == "Caries" || properties.Indicacion == "Restauracion" || properties.Indicacion == "Incrustacion") {
					properties.validar = false;
				} else {
					properties.validar = true;
				}


				arrayProperties.push(properties);
			}
			vmOdonto.EvolucionesConductoDesa_(arrayProperties);


		};


		vmOdonto.AddDesayunoNew = function () {
			var valorValidar = false;
			var now = moment().format();
			var arrayProperties = new Array();
			var rowctr = $('#tbDesaNew tbody tr');
			var i = 0
			for (; i < rowctr.length; i++) {

				var properties = new Object();
				var data = $(rowctr[i]).find("td:eq(0) input[type='text']").val();
				var data1 = $(rowctr[i]).find("td:eq(1) input[type='text']").val();
				var data2 = $(rowctr[i]).find("td:eq(2) input[type='text']").val();
				var data3 = $(rowctr[i]).find("td:eq(3) input[type='text']").val();
				var data10 = $(rowctr[i]).find("td:eq(4) input[type='text']").val();
				var data4 = $(rowctr[i]).find("td:eq(5) select").val();
				var data5 = $(rowctr[i]).find("td:eq(6) input[type='checkbox']").eq(0).is(":checked");
				var data6 = $(rowctr[i]).find("td:eq(6) input[type='checkbox']").eq(1).is(":checked");
				var data7 = $(rowctr[i]).find("td:eq(6) input[type='checkbox']").eq(2).is(":checked");
				var data8 = $(rowctr[i]).find("td:eq(6) input[type='checkbox']").eq(3).is(":checked");
				var data9 = $(rowctr[i]).find("td:eq(6) input[type='checkbox']").eq(4).is(":checked");

				properties.Pieza2 = data10;
				properties.Diente = data1;
				properties.Pieza = data2;
				properties.Indicacion = data3;
				properties.Estado = data4;
				properties.Cara = data5;
				properties.Cara1 = data6;
				properties.Cara2 = data7;
				properties.Cara3 = data8;
				properties.Cara4 = data9;
				properties.EncuestaID = i;
				properties.EvolucionDate = moment(data, 'DD/MM/YYYY hh:mm a').format("DD/MM/YYYY HH:mm");

				if (data3 == "Ausente") {
					properties.validar2 = false;
				} else {
					properties.validar2 = true;
				}

				if (data3 == "Caries" || data3 == "Restauracion" || data3 == "Incrustacion") {
					properties.validar = false;
				} else {
					properties.validar = true;
				}

				arrayProperties.push(properties);
			}

			var properties = new Object();
			properties.EvolucionDate = moment().format('DD/MM/YYYY HH:mm');
			properties.Diente = $("#DientesNew").val();
			properties.Pieza = $("#PiezaNew").val();
			properties.Pieza2 = $("#Pieza2New").val();
			properties.Indicacion = $("#IndicacionNew").val();
			properties.Estado = $("#EstadoNew").val();
			properties.Cara = $("#CaraNew").is(":checked");
			properties.Cara1 = $("#CaraNew1").is(":checked");
			properties.Cara2 = $("#CaraNew2").is(":checked");
			properties.Cara3 = $("#CaraNew3").is(":checked");
			properties.Cara4 = $("#CaraNew4").is(":checked");


			if (properties.Indicacion == "Ausente") {
				properties.validar2 = false;
			} else {
				properties.validar2 = true;
			}

			if (properties.Indicacion == "Caries" || properties.Indicacion == "Restauracion" || properties.Indicacion == "Incrustacion") {
				properties.validar = false;
			} else {
				properties.validar = true;
			}

			for (var i = 0; i < vmOdonto.EvolucionesConductoDesa_().length; i++) {
				if (properties.Pieza == vmOdonto.EvolucionesConductoDesa_()[i].Pieza && properties.Indicacion == vmOdonto.EvolucionesConductoDesa_()[i].Indicacion) {
					valorValidar = true;
				}
			}


			if (properties.Diente == null) {
				error('Seleccione el Diente')
			}
			else if (properties.Pieza == null) {
				error(
					'Seleccione la Pieza'
				)
			}
			else if (properties.Indicacion == null) {
				error(
					'Seleccione la Indicación'
				)
			}

			else if (properties.Indicacion == "Caries" || properties.Indicacion == "Restauracion" || properties.Indicacion == "Incrustacion") {

				if (properties.Cara == false && properties.Cara1 == false && properties.Cara2 == false && properties.Cara3 == false && properties.Cara4 == false) {
					error(
						'Seleccione la Cara del diente'
					)
				} else {

					if (valorValidar == true) {
						error(
							'Esta Indicación ya ha sido asignada a esta Pieza'
						)
					} else {


						properties.EncuestaID = i;
						arrayProperties.push(properties);
						vmOdonto.EvolucionesConductoDesa_(arrayProperties);
						$("#CaraNew").prop("checked", false)
						$("#CaraNew1").prop("checked", false)
						$("#CaraNew2").prop("checked", false)
						$("#CaraNew3").prop("checked", false)
						$("#CaraNew4").prop("checked", false)
						$("#EstadoNew").val("");
						$("#IndicacionNew").val("");
						$("#PiezaNew").val("");
						$("#Pieza2New").val("");
						$("#DientesNew").val("");
						vmOdonto.SAdulto(false);
						vmOdonto.SInferior(false);
						vmOdonto.SInfancia(false);
						vmOdonto.IInfancia(false);
					}
				}
			}
			else if ((properties.Indicacion != "Caries" || properties.Indicacion != "Restauracion" || properties.Indicacion != "Incrustacion") && properties.Indicacion != "Ausente") {

				if (properties.Indicacion == "Protesis Parcial Fija" || properties.Indicacion == "Protesis Parcial Removible") {
					if (properties.Estado == null) {
						error(
							'Seleccione el Estado'
						)
					} else if (properties.Pieza2 == null) {
						error(
							'Seleccione la Pieza Fin',
						)
					} else {

						if (properties.Diente == "Superior Infancia" || properties.Diente == "Inferior Infancia") {

							if (properties.Indicacion == "Protesis Parcial Fija" || properties.Indicacion == "Protesis Parcial Removible" || properties.Indicacion == "Protesis Total" || properties.Indicacion == "Corona") {
								error(
									'No se le puede asignar esta Indicación a Dientes de Infancia',
								)

							} else {

								if (valorValidar == true) {
									error(
										'Esta Indicación ya ha sido asignada a esta Pieza',
									)
								} else {
									properties.EncuestaID = i;
									arrayProperties.push(properties);
									vmOdonto.EvolucionesConductoDesa_(arrayProperties);
									$("#CaraNew").prop("checked", false)
									$("#CaraNew1").prop("checked", false)
									$("#CaraNew2").prop("checked", false)
									$("#CaraNew3").prop("checked", false)
									$("#CaraNew4").prop("checked", false)
									$("#EstadoNew").val("");
									$("#IndicacionNew").val("");
									$("#PiezaNew").val("");
									$("#Pieza2New").val("");
									$("#DientesNew").val("");
									vmOdonto.SAdulto(false);
									vmOdonto.SInferior(false);
									vmOdonto.SInfancia(false);
									vmOdonto.IInfancia(false);
								}
							}

						} else {

							if (valorValidar == true) {
								error(
									'Esta Indicación ya ha sido asignada a esta Pieza'
								)
							} else {
								properties.EncuestaID = i;
								arrayProperties.push(properties);
								vmOdonto.EvolucionesConductoDesa_(arrayProperties);
								$("#CaraNew").prop("checked", false)
								$("#CaraNew1").prop("checked", false)
								$("#CaraNew2").prop("checked", false)
								$("#CaraNew3").prop("checked", false)
								$("#CaraNew4").prop("checked", false)
								$("#EstadoNew").val("");
								$("#IndicacionNew").val("");
								$("#PiezaNew").val("");
								$("#Pieza2New").val("");
								$("#DientesNew").val("");
								vmOdonto.SAdulto(false);
								vmOdonto.SInferior(false);
								vmOdonto.SInfancia(false);
								vmOdonto.IInfancia(false);
							}
						}
					}



				} else {
					if (properties.Estado == null) {
						error(
							'Seleccione el Estado'
						)
					} else {



						if (properties.Diente == "Superior Infancia" || properties.Diente == "Inferior Infancia") {

							if (properties.Indicacion == "Protesis Parcial Fija" || properties.Indicacion == "Protesis Parcial Removible" || properties.Indicacion == "Protesis Total" || properties.Indicacion == "Corona") {
								error(
									'No se le puede asignar esta Indicación a Dientes de Infancia'
								)

							} else {

								if (valorValidar == true) {
									error(
										'Esta Indicación ya ha sido asignada a esta Pieza'
									)
								} else {
									properties.EncuestaID = i;
									arrayProperties.push(properties);
									vmOdonto.EvolucionesConductoDesa_(arrayProperties);
									$("#CaraNew").prop("checked", false)
									$("#CaraNew1").prop("checked", false)
									$("#CaraNew2").prop("checked", false)
									$("#CaraNew3").prop("checked", false)
									$("#CaraNew4").prop("checked", false)
									$("#EstadoNew").val("");
									$("#IndicacionNew").val("");
									$("#PiezaNew").val("");
									$("#Pieza2New").val("");
									$("#DientesNew").val("");
									vmOdonto.SAdulto(false);
									vmOdonto.SInferior(false);
									vmOdonto.SInfancia(false);
									vmOdonto.IInfancia(false);
								}
							}

						} else {

							if (valorValidar == true) {
								error(
									'Esta Indicación ya ha sido asignada a esta Pieza'
								)
							} else {
								properties.EncuestaID = i;
								arrayProperties.push(properties);
								vmOdonto.EvolucionesConductoDesa_(arrayProperties);
								$("#CaraNew").prop("checked", false)
								$("#CaraNew1").prop("checked", false)
								$("#CaraNew2").prop("checked", false)
								$("#CaraNew3").prop("checked", false)
								$("#CaraNew4").prop("checked", false)
								$("#EstadoNew").val("");
								$("#IndicacionNew").val("");
								$("#PiezaNew").val("");
								$("#Pieza2New").val("");
								$("#DientesNew").val("");
								vmOdonto.SAdulto(false);
								vmOdonto.SInferior(false);
								vmOdonto.SInfancia(false);
								vmOdonto.IInfancia(false);
							}
						}



					}
				}


			}
			else {

				if (properties.Diente == "Superior Infancia" || properties.Diente == "Inferior Infancia") {

					if (properties.Indicacion == "Protesis Parcial Fija" || properties.Indicacion == "Protesis Parcial Removible" || properties.Indicacion == "Protesis Total" || properties.Indicacion == "Corona") {

						error(
							'No se le puede asignar esta Indicación a Dientes de Infancia'
						)
					} else {

						if (valorValidar == true) {
							error(
								'Esta Indicación ya ha sido asignada a esta Pieza'
							)
						} else {
							properties.EncuestaID = i;
							arrayProperties.push(properties);
							vmOdonto.EvolucionesConductoDesa_(arrayProperties);
							$("#CaraNew").prop("checked", false)
							$("#CaraNew1").prop("checked", false)
							$("#CaraNew2").prop("checked", false)
							$("#CaraNew3").prop("checked", false)
							$("#CaraNew4").prop("checked", false)
							$("#EstadoNew").val("");
							$("#IndicacionNew").val("");
							$("#PiezaNew").val("");
							$("#Pieza2New").val("");
							$("#DientesNew").val("");
							vmOdonto.SAdulto(false);
							vmOdonto.SInferior(false);
							vmOdonto.SInfancia(false);
							vmOdonto.IInfancia(false);
						}
					}

				} else {

					if (valorValidar == true) {
						error(
							'Esta Indicación ya ha sido asignada a esta Pieza'
						)
					} else {
						properties.EncuestaID = i;
						arrayProperties.push(properties);
						vmOdonto.EvolucionesConductoDesa_(arrayProperties);
						$("#CaraNew").prop("checked", false)
						$("#CaraNew1").prop("checked", false)
						$("#CaraNew2").prop("checked", false)
						$("#CaraNew3").prop("checked", false)
						$("#CaraNew4").prop("checked", false)
						$("#EstadoNew").val("");
						$("#IndicacionNew").val("");
						$("#PiezaNew").val("");
						$("#Pieza2New").val("");
						$("#DientesNew").val("");
						vmOdonto.SAdulto(false);
						vmOdonto.SInferior(false);
						vmOdonto.SInfancia(false);
						vmOdonto.IInfancia(false);
					}
				}
			}


			for (var i = 0; i < vmOdonto.EvolucionesConductoDesa_().length; i++) {

				if (vmOdonto.EvolucionesConductoDesa_()[i].Diente == "Superior Infancia" || vmOdonto.EvolucionesConductoDesa_()[i].Diente == "Inferior Infancia") {

					if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Sellante" && vmOdonto.EvolucionesConductoDesa_()[i].Estado == "Indicada") {

						for (var j = 0; j < vmOdonto.Dientes.length; j++) {
							if (vmOdonto.Dientes[j].Numero == vmOdonto.EvolucionesConductoDesa_()[i].Pieza) {
								vmOdonto.Dientes[j].SellanteI = true;
							}
						}

						vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " nervio", vmOdonto.Dientes, "SellanteI");
					}

					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Sellante" && vmOdonto.EvolucionesConductoDesa_()[i].Estado == "Realizada") {

						for (var j = 0; j < vmOdonto.Dientes.length; j++) {
							if (vmOdonto.Dientes[j].Numero == vmOdonto.EvolucionesConductoDesa_()[i].Pieza) {
								vmOdonto.Dientes[j].SellanteR = true;
							}
						}
						vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " nervio", vmOdonto.Dientes, "SellanteR");
					}

					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Extraccion" && vmOdonto.EvolucionesConductoDesa_()[i].Estado == "Indicada") {

						for (var j = 0; j < vmOdonto.Dientes.length; j++) {
							if (vmOdonto.Dientes[j].Numero == vmOdonto.EvolucionesConductoDesa_()[i].Pieza) {
								vmOdonto.Dientes[j].ExtraccionI = true;
							}
						}
						vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " extraccion", vmOdonto.Dientes, "ExtraccionI");
					}

					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Extraccion" && vmOdonto.EvolucionesConductoDesa_()[i].Estado == "Realizada") {

						for (var j = 0; j < vmOdonto.Dientes.length; j++) {
							if (vmOdonto.Dientes[j].Numero == vmOdonto.EvolucionesConductoDesa_()[i].Pieza) {
								vmOdonto.Dientes[j].ExtraccionR = true;
							}
						}
						vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " extraccion", vmOdonto.Dientes, "ExtraccionR");
					}

					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Endodoncia" && vmOdonto.EvolucionesConductoDesa_()[i].Estado == "Indicada") {

						for (var j = 0; j < vmOdonto.Dientes.length; j++) {
							if (vmOdonto.Dientes[j].Numero == vmOdonto.EvolucionesConductoDesa_()[i].Pieza) {
								vmOdonto.Dientes[j].EndodonciaI = true;
							}
						}
						vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " dentina", vmOdonto.Dientes, "EndodonciaI");
					}

					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Endodoncia" && vmOdonto.EvolucionesConductoDesa_()[i].Estado == "Realizada") {

						for (var j = 0; j < vmOdonto.Dientes.length; j++) {
							if (vmOdonto.Dientes[j].Numero == vmOdonto.EvolucionesConductoDesa_()[i].Pieza) {
								vmOdonto.Dientes[j].EndodonciaR = true;
							}
						}
						vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " dentina", vmOdonto.Dientes, "EndodonciaR");
					}

					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Ausente") {

						for (var j = 0; j < vmOdonto.Dientes.length; j++) {
							if (vmOdonto.Dientes[j].Numero == vmOdonto.EvolucionesConductoDesa_()[i].Pieza) {
								vmOdonto.Dientes[j].AusenteI = true;
							}
						}
						vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " cuello", vmOdonto.Dientes, "AusenteI");
					}

					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Incrustacion") {
						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " oclusal", vmOdonto.Dientes, "Incrustacion");

						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara1 == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " mesial", vmOdonto.Dientes, "Incrustacion");

						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara2 == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " lingual", vmOdonto.Dientes, "Incrustacion");

						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara3 == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " distal", vmOdonto.Dientes, "Incrustacion");

						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara4 == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " vestibular", vmOdonto.Dientes, "Incrustacion");
					}

					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Caries") {
						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " oclusal", vmOdonto.Dientes, "Caries");

						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara1 == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " mesial", vmOdonto.Dientes, "Caries");

						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara2 == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " lingual", vmOdonto.Dientes, "Caries");

						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara3 == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " distal", vmOdonto.Dientes, "Caries");

						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara4 == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " vestibular", vmOdonto.Dientes, "Caries");
					}


					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Restauracion") {
						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " oclusal", vmOdonto.Dientes, "Composited");

						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara1 == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " mesial", vmOdonto.Dientes, "Composited");

						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara2 == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " lingual", vmOdonto.Dientes, "Composited");

						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara3 == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " distal", vmOdonto.Dientes, "Composited");

						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara4 == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " vestibular", vmOdonto.Dientes, "Composited");

					}


				} else {


					if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Sellante" && vmOdonto.EvolucionesConductoDesa_()[i].Estado == "Indicada") {

						for (var j = 0; j < vmOdonto.Dientes.length; j++) {
							if (vmOdonto.Dientes[j].Numero == vmOdonto.EvolucionesConductoDesa_()[i].Pieza) {
								vmOdonto.Dientes[j].SellanteI = true;
							}
						}

						vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " nervio", vmOdonto.Dientes, "SellanteI");
					}

					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Sellante" && vmOdonto.EvolucionesConductoDesa_()[i].Estado == "Realizada") {

						for (var j = 0; j < vmOdonto.Dientes.length; j++) {
							if (vmOdonto.Dientes[j].Numero == vmOdonto.EvolucionesConductoDesa_()[i].Pieza) {
								vmOdonto.Dientes[j].SellanteR = true;
							}
						}
						vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " nervio", vmOdonto.Dientes, "SellanteR");
					}

					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Extraccion" && vmOdonto.EvolucionesConductoDesa_()[i].Estado == "Indicada") {

						for (var j = 0; j < vmOdonto.Dientes.length; j++) {
							if (vmOdonto.Dientes[j].Numero == vmOdonto.EvolucionesConductoDesa_()[i].Pieza) {
								vmOdonto.Dientes[j].ExtraccionI = true;
							}
						}
						vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " extraccion", vmOdonto.Dientes, "ExtraccionI");
					}

					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Extraccion" && vmOdonto.EvolucionesConductoDesa_()[i].Estado == "Realizada") {

						for (var j = 0; j < vmOdonto.Dientes.length; j++) {
							if (vmOdonto.Dientes[j].Numero == vmOdonto.EvolucionesConductoDesa_()[i].Pieza) {
								vmOdonto.Dientes[j].ExtraccionR = true;
							}
						}
						vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " extraccion", vmOdonto.Dientes, "ExtraccionR");
					}

					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Endodoncia" && vmOdonto.EvolucionesConductoDesa_()[i].Estado == "Indicada") {

						for (var j = 0; j < vmOdonto.Dientes.length; j++) {
							if (vmOdonto.Dientes[j].Numero == vmOdonto.EvolucionesConductoDesa_()[i].Pieza) {
								vmOdonto.Dientes[j].EndodonciaI = true;
							}
						}
						vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " dentina", vmOdonto.Dientes, "EndodonciaI");
					}

					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Endodoncia" && vmOdonto.EvolucionesConductoDesa_()[i].Estado == "Realizada") {

						for (var j = 0; j < vmOdonto.Dientes.length; j++) {
							if (vmOdonto.Dientes[j].Numero == vmOdonto.EvolucionesConductoDesa_()[i].Pieza) {
								vmOdonto.Dientes[j].EndodonciaR = true;
							}
						}
						vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " dentina", vmOdonto.Dientes, "EndodonciaR");
					}

					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Ausente") {

						for (var j = 0; j < vmOdonto.Dientes.length; j++) {
							if (vmOdonto.Dientes[j].Numero == vmOdonto.EvolucionesConductoDesa_()[i].Pieza) {
								vmOdonto.Dientes[j].AusenteI = true;
							}
						}
						vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " cuello", vmOdonto.Dientes, "AusenteI");
					}

					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Corona" && vmOdonto.EvolucionesConductoDesa_()[i].Estado == "Indicada") {

						for (var j = 0; j < vmOdonto.Dientes.length; j++) {
							if (vmOdonto.Dientes[j].Numero == vmOdonto.EvolucionesConductoDesa_()[i].Pieza) {
								vmOdonto.Dientes[j].CoronaI = true;
							}
						}
						vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " corona", vmOdonto.Dientes, "CoronaI");
					}

					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Corona" && vmOdonto.EvolucionesConductoDesa_()[i].Estado == "Realizada") {

						for (var j = 0; j < vmOdonto.Dientes.length; j++) {
							if (vmOdonto.Dientes[j].Numero == vmOdonto.EvolucionesConductoDesa_()[i].Pieza) {
								vmOdonto.Dientes[j].CoronaR = true;
							}
						}
						vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " corona", vmOdonto.Dientes, "CoronaR");
					}

					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Protesis Parcial Fija" && vmOdonto.EvolucionesConductoDesa_()[i].Estado == "Indicada") {

						for (var j = 0; j < vmOdonto.Dientes.length; j++) {
							if (vmOdonto.Dientes[j].Numero == vmOdonto.EvolucionesConductoDesa_()[i].Pieza) {
								vmOdonto.Dientes[j].PuenteI = true;
								vmOdonto.Dientes[j].Numero2 = vmOdonto.EvolucionesConductoDesa_()[i].Pieza2;
							}
						}
						vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " puenteVarios", vmOdonto.Dientes, "PuenteI", "d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza2 + " puenteVarios");
					}

					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Protesis Parcial Fija" && vmOdonto.EvolucionesConductoDesa_()[i].Estado == "Realizada") {

						for (var j = 0; j < vmOdonto.Dientes.length; j++) {
							if (vmOdonto.Dientes[j].Numero == vmOdonto.EvolucionesConductoDesa_()[i].Pieza) {
								vmOdonto.Dientes[j].PuenteR = true;
								vmOdonto.Dientes[j].Numero2 = vmOdonto.EvolucionesConductoDesa_()[i].Pieza2;
							}
						}
						vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " puenteVarios", vmOdonto.Dientes, "PuenteR", "d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza2 + " puenteVarios");
					}


					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Protesis Parcial Removible" && vmOdonto.EvolucionesConductoDesa_()[i].Estado == "Indicada") {

						for (var j = 0; j < vmOdonto.Dientes.length; j++) {
							if (vmOdonto.Dientes[j].Numero == vmOdonto.EvolucionesConductoDesa_()[i].Pieza) {
								vmOdonto.Dientes[j].RemovidoI = true;
								vmOdonto.Dientes[j].Numero2 = vmOdonto.EvolucionesConductoDesa_()[i].Pieza2;
							}
						}
						vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " protesis", vmOdonto.Dientes, "RemovidoI", "d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza2 + " protesis");
					}

					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Protesis Parcial Removible" && vmOdonto.EvolucionesConductoDesa_()[i].Estado == "Realizada") {

						for (var j = 0; j < vmOdonto.Dientes.length; j++) {
							if (vmOdonto.Dientes[j].Numero == vmOdonto.EvolucionesConductoDesa_()[i].Pieza) {
								vmOdonto.Dientes[j].RemovidoR = true;
								vmOdonto.Dientes[j].Numero2 = vmOdonto.EvolucionesConductoDesa_()[i].Pieza2;
							}
						}
						vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " protesis", vmOdonto.Dientes, "RemovidoR", "d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza2 + " protesis");
					}

					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Protesis Total" && vmOdonto.EvolucionesConductoDesa_()[i].Estado == "Indicada") {

						for (var j = 0; j < vmOdonto.Dientes.length; j++) {
							if (vmOdonto.Dientes[j].Numero == vmOdonto.EvolucionesConductoDesa_()[i].Pieza) {
								vmOdonto.Dientes[j].ProtesisI = true;
							}
						}
						vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " puente", vmOdonto.Dientes, "ProtesisI");
					}

					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Protesis Total" && vmOdonto.EvolucionesConductoDesa_()[i].Estado == "Realizada") {

						for (var j = 0; j < vmOdonto.Dientes.length; j++) {
							if (vmOdonto.Dientes[j].Numero == vmOdonto.EvolucionesConductoDesa_()[i].Pieza) {
								vmOdonto.Dientes[j].ProtesisR = true;
							}
						}
						vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " puente", vmOdonto.Dientes, "ProtesisR");
					}


					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Incrustacion") {
						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " oclusal", vmOdonto.Dientes, "Incrustacion");

						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara1 == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " mesial", vmOdonto.Dientes, "Incrustacion");

						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara2 == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " lingual", vmOdonto.Dientes, "Incrustacion");

						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara3 == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " distal", vmOdonto.Dientes, "Incrustacion");

						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara4 == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " vestibular", vmOdonto.Dientes, "Incrustacion");
					}

					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Caries") {
						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " oclusal", vmOdonto.Dientes, "Caries");

						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara1 == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " mesial", vmOdonto.Dientes, "Caries");

						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara2 == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " lingual", vmOdonto.Dientes, "Caries");

						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara3 == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " distal", vmOdonto.Dientes, "Caries");

						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara4 == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " vestibular", vmOdonto.Dientes, "Caries");
					}


					else if (vmOdonto.EvolucionesConductoDesa_()[i].Indicacion == "Restauracion") {
						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " oclusal", vmOdonto.Dientes, "Composited");

						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara1 == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " mesial", vmOdonto.Dientes, "Composited");

						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara2 == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " lingual", vmOdonto.Dientes, "Composited");

						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara3 == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " distal", vmOdonto.Dientes, "Composited");

						if (vmOdonto.EvolucionesConductoDesa_()[i].Cara4 == true)
							vmOdonto.Parse("d" + vmOdonto.EvolucionesConductoDesa_()[i].Pieza + " vestibular", vmOdonto.Dientes, "Composited");

					}

				}
			}

		};


		vmOdonto.CambioIR = function () {
			if (this.Indicacion == "Sellante" && this.Estado == "Indicada") {

				for (var j = 0; j < vmOdonto.Dientes.length; j++) {
					if (vmOdonto.Dientes[j].Numero == this.Pieza) {
						vmOdonto.Dientes[j].SellanteI = true;
						vmOdonto.Dientes[j].SellanteR = false;
					}
				}

				vmOdonto.Parse("d" + this.Pieza + " nervio", vmOdonto.Dientes, "SellanteI");
			}

			else if (this.Indicacion == "Sellante" && this.Estado == "Realizada") {

				for (var j = 0; j < vmOdonto.Dientes.length; j++) {
					if (vmOdonto.Dientes[j].Numero == this.Pieza) {
						vmOdonto.Dientes[j].SellanteR = true;
						vmOdonto.Dientes[j].SellanteI = false;
					}
				}
				vmOdonto.Parse("d" + this.Pieza + " nervio", vmOdonto.Dientes, "SellanteR");
			}

			else if (this.Indicacion == "Extraccion" && this.Estado == "Indicada") {

				for (var j = 0; j < vmOdonto.Dientes.length; j++) {
					if (vmOdonto.Dientes[j].Numero == this.Pieza) {
						vmOdonto.Dientes[j].ExtraccionI = true;
						vmOdonto.Dientes[j].ExtraccionR = false;
					}
				}
				vmOdonto.Parse("d" + this.Pieza + " extraccion", vmOdonto.Dientes, "ExtraccionI");
			}

			else if (this.Indicacion == "Extraccion" && this.Estado == "Realizada") {

				for (var j = 0; j < vmOdonto.Dientes.length; j++) {
					if (vmOdonto.Dientes[j].Numero == this.Pieza) {
						vmOdonto.Dientes[j].ExtraccionR = true;
						vmOdonto.Dientes[j].ExtraccionI = false;
					}
				}
				vmOdonto.Parse("d" + this.Pieza + " extraccion", vmOdonto.Dientes, "ExtraccionR");
			}

			else if (this.Indicacion == "Endodoncia" && this.Estado == "Indicada") {

				for (var j = 0; j < vmOdonto.Dientes.length; j++) {
					if (vmOdonto.Dientes[j].Numero == this.Pieza) {
						vmOdonto.Dientes[j].EndodonciaI = true;
						vmOdonto.Dientes[j].EndodonciaR = false;
					}
				}
				vmOdonto.Parse("d" + this.Pieza + " dentina", vmOdonto.Dientes, "EndodonciaI");
			}

			else if (this.Indicacion == "Endodoncia" && this.Estado == "Realizada") {

				for (var j = 0; j < vmOdonto.Dientes.length; j++) {
					if (vmOdonto.Dientes[j].Numero == this.Pieza) {
						vmOdonto.Dientes[j].EndodonciaR = true;
						vmOdonto.Dientes[j].EndodonciaI = false;
					}
				}
				vmOdonto.Parse("d" + this.Pieza + " dentina", vmOdonto.Dientes, "EndodonciaR");
			}

			else if (this.Indicacion == "Ausente") {

				for (var j = 0; j < vmOdonto.Dientes.length; j++) {
					if (vmOdonto.Dientes[j].Numero == this.Pieza) {
						vmOdonto.Dientes[j].AusenteI = true;
					}
				}
				vmOdonto.Parse("d" + this.Pieza + " cuello", vmOdonto.Dientes, "AusenteI");
			}

			else if (this.Indicacion == "Corona" && this.Estado == "Indicada") {

				for (var j = 0; j < vmOdonto.Dientes.length; j++) {
					if (vmOdonto.Dientes[j].Numero == this.Pieza) {
						vmOdonto.Dientes[j].CoronaI = true;
						vmOdonto.Dientes[j].CoronaR = false;
					}
				}
				vmOdonto.Parse("d" + this.Pieza + " corona", vmOdonto.Dientes, "CoronaI");
			}

			else if (this.Indicacion == "Corona" && this.Estado == "Realizada") {

				for (var j = 0; j < vmOdonto.Dientes.length; j++) {
					if (vmOdonto.Dientes[j].Numero == this.Pieza) {
						vmOdonto.Dientes[j].CoronaR = true;
						vmOdonto.Dientes[j].CoronaI = false;
					}
				}
				vmOdonto.Parse("d" + this.Pieza + " corona", vmOdonto.Dientes, "CoronaR");
			}

			else if (this.Indicacion == "Protesis Total" && this.Estado == "Indicada") {

				for (var j = 0; j < vmOdonto.Dientes.length; j++) {
					if (vmOdonto.Dientes[j].Numero == this.Pieza) {
						vmOdonto.Dientes[j].ProtesisI = true;
						vmOdonto.Dientes[j].ProtesisR = false;
					}
				}
				vmOdonto.Parse("d" + this.Pieza + " puente", vmOdonto.Dientes, "ProtesisI");
			}

			else if (this.Indicacion == "Protesis Total" && this.Estado == "Realizada") {

				for (var j = 0; j < vmOdonto.Dientes.length; j++) {
					if (vmOdonto.Dientes[j].Numero == this.Pieza) {
						vmOdonto.Dientes[j].ProtesisR = true;
						vmOdonto.Dientes[j].ProtesisI = false;
					}
				}
				vmOdonto.Parse("d" + this.Pieza + " puente", vmOdonto.Dientes, "ProtesisR");
			}

			else if (this.Indicacion == "Protesis Parcial Fija" && this.Estado == "Indicada") {

				for (var j = 0; j < vmOdonto.Dientes.length; j++) {
					if (vmOdonto.Dientes[j].Numero == this.Pieza) {
						vmOdonto.Dientes[j].PuenteI = true;
						vmOdonto.Dientes[j].PuenteR = false;
					}
				}
				vmOdonto.Parse("d" + this.Pieza + " puente", vmOdonto.Dientes, "PuenteI", "d" + this.Pieza2);
			}

			else if (this.Indicacion == "Protesis Parcial Fija" && this.Estado == "Realizada") {

				for (var j = 0; j < vmOdonto.Dientes.length; j++) {
					if (vmOdonto.Dientes[j].Numero == this.Pieza) {
						vmOdonto.Dientes[j].PuenteR = true;
						vmOdonto.Dientes[j].PuenteI = false;
					}
				}
				vmOdonto.Parse("d" + this.Pieza + " puente", vmOdonto.Dientes, "PuenteR", "d" + this.Pieza2);
			}

			else if (this.Indicacion == "Protesis Parcial Removible" && this.Estado == "Indicada") {

				for (var j = 0; j < vmOdonto.Dientes.length; j++) {
					if (vmOdonto.Dientes[j].Numero == this.Pieza) {
						vmOdonto.Dientes[j].RemovidoI = true;
						vmOdonto.Dientes[j].RemovidoR = false;
					}
				}
				vmOdonto.Parse("d" + this.Pieza + " protesis", vmOdonto.Dientes, "RemovidoI", "d" + this.Pieza2);
			}

			else if (this.Indicacion == "Protesis Parcial Removible" && this.Estado == "Realizada") {

				for (var j = 0; j < vmOdonto.Dientes.length; j++) {
					if (vmOdonto.Dientes[j].Numero == this.Pieza) {
						vmOdonto.Dientes[j].RemovidoR = true;
						vmOdonto.Dientes[j].RemovidoI = false;
					}
				}
				vmOdonto.Parse("d" + this.Pieza + " protesis", vmOdonto.Dientes, "RemovidoR", "d" + this.Pieza2);
			}

		};

		vmOdonto.CambioCara = function () {

			///incrustacion
			if (this.Indicacion == "Incrustacion" && this.Cara == false) {
				vmOdonto.Parse("d" + this.Pieza + " oclusal", vmOdonto.Dientes, "Sano");
			} else if (this.Indicacion == "Incrustacion" && this.Cara == true) {
				vmOdonto.Parse("d" + this.Pieza + " oclusal", vmOdonto.Dientes, "Incrustacion");
			}

			if (this.Indicacion == "Incrustacion" && this.Cara1 == false) {

				vmOdonto.Parse("d" + this.Pieza + " mesial", vmOdonto.Dientes, "Sano");
			} else if (this.Indicacion == "Incrustacion" && this.Cara1 == true) {
				vmOdonto.Parse("d" + this.Pieza + " mesial", vmOdonto.Dientes, "Incrustacion");
			}

			if (this.Indicacion == "Incrustacion" && this.Cara2 == false) {

				vmOdonto.Parse("d" + this.Pieza + " lingual", vmOdonto.Dientes, "Sano");
			} else if (this.Indicacion == "Incrustacion" && this.Cara2 == true) {
				vmOdonto.Parse("d" + this.Pieza + " lingual", vmOdonto.Dientes, "Incrustacion");
			}

			if (this.Indicacion == "Incrustacion" && this.Cara3 == false) {

				vmOdonto.Parse("d" + this.Pieza + " distal", vmOdonto.Dientes, "Sano");
			} else if (this.Indicacion == "Incrustacion" && this.Cara3 == true) {
				vmOdonto.Parse("d" + this.Pieza + " distal", vmOdonto.Dientes, "Incrustacion");
			}

			if (this.Indicacion == "Incrustacion" && this.Cara4 == false) {

				vmOdonto.Parse("d" + this.Pieza + " vestibular", vmOdonto.Dientes, "Sano");
			} else if (this.Indicacion == "Incrustacion" && this.Cara4 == true) {
				vmOdonto.Parse("d" + this.Pieza + " vestibular", vmOdonto.Dientes, "Incrustacion");
			}

			///////caries

			if (this.Indicacion == "Caries" && this.Cara == false) {
				vmOdonto.Parse("d" + this.Pieza + " oclusal", vmOdonto.Dientes, "Sano");
			} else if (this.Indicacion == "Caries" && this.Cara == true) {
				vmOdonto.Parse("d" + this.Pieza + " oclusal", vmOdonto.Dientes, "Caries");
			}

			if (this.Indicacion == "Caries" && this.Cara1 == false) {

				vmOdonto.Parse("d" + this.Pieza + " mesial", vmOdonto.Dientes, "Sano");
			} else if (this.Indicacion == "Caries" && this.Cara1 == true) {
				vmOdonto.Parse("d" + this.Pieza + " mesial", vmOdonto.Dientes, "Caries");
			}

			if (this.Indicacion == "Caries" && this.Cara2 == false) {

				vmOdonto.Parse("d" + this.Pieza + " lingual", vmOdonto.Dientes, "Sano");
			} else if (this.Indicacion == "Caries" && this.Cara2 == true) {
				vmOdonto.Parse("d" + this.Pieza + " lingual", vmOdonto.Dientes, "Caries");
			}

			if (this.Indicacion == "Caries" && this.Cara3 == false) {

				vmOdonto.Parse("d" + this.Pieza + " distal", vmOdonto.Dientes, "Sano");
			} else if (this.Indicacion == "Caries" && this.Cara3 == true) {
				vmOdonto.Parse("d" + this.Pieza + " distal", vmOdonto.Dientes, "Caries");
			}

			if (this.Indicacion == "Caries" && this.Cara4 == false) {

				vmOdonto.Parse("d" + this.Pieza + " vestibular", vmOdonto.Dientes, "Sano");
			} else if (this.Indicacion == "Caries" && this.Cara4 == true) {
				vmOdonto.Parse("d" + this.Pieza + " vestibular", vmOdonto.Dientes, "Caries");
			}


			/////restauracion

			if (this.Indicacion == "Restauracion" && this.Cara == false) {
				vmOdonto.Parse("d" + this.Pieza + " oclusal", vmOdonto.Dientes, "Sano");
			} else if (this.Indicacion == "Restauracion" && this.Cara == true) {
				vmOdonto.Parse("d" + this.Pieza + " oclusal", vmOdonto.Dientes, "Composited");
			}

			if (this.Indicacion == "Restauracion" && this.Cara1 == false) {

				vmOdonto.Parse("d" + this.Pieza + " mesial", vmOdonto.Dientes, "Sano");
			} else if (this.Indicacion == "Restauracion" && this.Cara1 == true) {
				vmOdonto.Parse("d" + this.Pieza + " mesial", vmOdonto.Dientes, "Composited");
			}

			if (this.Indicacion == "Restauracion" && this.Cara2 == false) {

				vmOdonto.Parse("d" + this.Pieza + " lingual", vmOdonto.Dientes, "Sano");
			} else if (this.Indicacion == "Restauracion" && this.Cara2 == true) {
				vmOdonto.Parse("d" + this.Pieza + " lingual", vmOdonto.Dientes, "Composited");
			}

			if (this.Indicacion == "Restauracion" && this.Cara3 == false) {

				vmOdonto.Parse("d" + this.Pieza + " distal", vmOdonto.Dientes, "Sano");
			} else if (this.Indicacion == "Restauracion" && this.Cara3 == true) {
				vmOdonto.Parse("d" + this.Pieza + " distal", vmOdonto.Dientes, "Composited");
			}

			if (this.Indicacion == "Restauracion" && this.Cara4 == false) {

				vmOdonto.Parse("d" + this.Pieza + " vestibular", vmOdonto.Dientes, "Sano");
			} else if (this.Indicacion == "Restauracion" && this.Cara4 == true) {
				vmOdonto.Parse("d" + this.Pieza + " vestibular", vmOdonto.Dientes, "Composited");
			}

		}


		vmOdonto.CargarCaras = function () {
			var valor = $("#IndicacionNew").val();

			if (valor == "Caries" || valor == "Restauracion" || valor == "Incrustacion") {
				$("#CaraNew").removeAttr('disabled');
				$("#CaraNew1").removeAttr('disabled');
				$("#Pieza2New").attr('disabled', true);
				$("#CaraNew2").removeAttr('disabled');
				$("#CaraNew3").removeAttr('disabled');
				$("#CaraNew4").removeAttr('disabled');
				$("#EstadoNew").attr('disabled', true);

			} else if (valor == "Ausente") {
				$("#EstadoNew").attr('disabled', true);
				$("#Pieza2New").attr('disabled', true);
				$("#CaraNew").attr('disabled', true);
				$("#CaraNew1").attr('disabled', true);
				$("#CaraNew2").attr('disabled', true);
				$("#CaraNew3").attr('disabled', true);
				$("#CaraNew4").attr('disabled', true);
			}
			else if (valor == "Protesis Parcial Fija" || valor == "Protesis Parcial Removible") {

				$("#Pieza2New").removeAttr('disabled');
				$("#EstadoNew").removeAttr('disabled');
				$("#CaraNew").attr('disabled', true);
				$("#CaraNew1").attr('disabled', true);
				$("#CaraNew2").attr('disabled', true);
				$("#CaraNew3").attr('disabled', true);
				$("#CaraNew4").attr('disabled', true);
			}

			else {
				$("#EstadoNew").removeAttr('disabled');
				$("#Pieza2New").attr('disabled', true);
				$("#CaraNew").attr('disabled', true);
				$("#CaraNew1").attr('disabled', true);
				$("#CaraNew2").attr('disabled', true);
				$("#CaraNew3").attr('disabled', true);
				$("#CaraNew4").attr('disabled', true);
			}
		};


		vmOdonto.CargarDatosDientes = function () {
			var valor = $("#DientesNew").val();

			if (valor == "Superior Adultos") {
				vmOdonto.SAdulto(true);
				vmOdonto.SInferior(false);
				vmOdonto.SInfancia(false);
				vmOdonto.IInfancia(false);

			} else if (valor == "Superior Infancia") {
				vmOdonto.SAdulto(false);
				vmOdonto.SInferior(false);
				vmOdonto.SInfancia(true);
				vmOdonto.IInfancia(false);
			} else if (valor == "Inferior Adultos") {
				vmOdonto.SAdulto(false);
				vmOdonto.SInferior(true);
				vmOdonto.SInfancia(false);
				vmOdonto.IInfancia(false);
			} else if (valor == "Inferior Infancia") {
				vmOdonto.SAdulto(false);
				vmOdonto.SInferior(false);
				vmOdonto.SInfancia(false);
				vmOdonto.IInfancia(true);
			} else {
				vmOdonto.SAdulto(false);
				vmOdonto.SInferior(false);
				vmOdonto.SInfancia(false);
				vmOdonto.IInfancia(false);
			}


		};


		vmOdonto.Backup = function () {
			vmOdonto.ComentariosBackup(vmOdonto.Comentarios());

			//////////

			vmOdonto.R1Backup(vmOdonto.R1());
			vmOdonto.R2Backup(vmOdonto.R2());
			vmOdonto.R3Backup(vmOdonto.R3());
			vmOdonto.R4Backup(vmOdonto.R4());
			vmOdonto.R5Backup(vmOdonto.R5());
			vmOdonto.R6Backup(vmOdonto.R6());
			vmOdonto.R7Backup(vmOdonto.R7());
			vmOdonto.R8Backup(vmOdonto.R8());
			vmOdonto.R9Backup(vmOdonto.R9());
			vmOdonto.R10Backup(vmOdonto.R10());
			vmOdonto.R11Backup(vmOdonto.R11());
			vmOdonto.R12Backup(vmOdonto.R12());
			vmOdonto.R13Backup(vmOdonto.R13());
			vmOdonto.R14Backup(vmOdonto.R14());
			vmOdonto.R15Backup(vmOdonto.R15());
			vmOdonto.R16Backup(vmOdonto.R16());

			vmOdonto.M1Backup(vmOdonto.M1());
			vmOdonto.M2Backup(vmOdonto.M2());
			vmOdonto.M3Backup(vmOdonto.M3());
			vmOdonto.M4Backup(vmOdonto.M4());
			vmOdonto.M5Backup(vmOdonto.M5());
			vmOdonto.M6Backup(vmOdonto.M6());
			vmOdonto.M7Backup(vmOdonto.M7());
			vmOdonto.M8Backup(vmOdonto.M8());
			vmOdonto.M9Backup(vmOdonto.M9());
			vmOdonto.M10Backup(vmOdonto.M10());
			vmOdonto.M11Backup(vmOdonto.M11());
			vmOdonto.M12Backup(vmOdonto.M12());
			vmOdonto.M13Backup(vmOdonto.M13());
			vmOdonto.M14Backup(vmOdonto.M14());
			vmOdonto.M15Backup(vmOdonto.M15());
			vmOdonto.M16Backup(vmOdonto.M16());

			vmOdonto.Re1Backup(vmOdonto.Re1());
			vmOdonto.Re2Backup(vmOdonto.Re2());
			vmOdonto.Re3Backup(vmOdonto.Re3());
			vmOdonto.Re4Backup(vmOdonto.Re4());
			vmOdonto.Re5Backup(vmOdonto.Re5());
			vmOdonto.Re6Backup(vmOdonto.Re6());
			vmOdonto.Re7Backup(vmOdonto.Re7());
			vmOdonto.Re8Backup(vmOdonto.Re8());
			vmOdonto.Re9Backup(vmOdonto.Re9());
			vmOdonto.Re10Backup(vmOdonto.Re10());
			vmOdonto.Re11Backup(vmOdonto.Re11());
			vmOdonto.Re12Backup(vmOdonto.Re12());
			vmOdonto.Re13Backup(vmOdonto.Re13());
			vmOdonto.Re14Backup(vmOdonto.Re14());
			vmOdonto.Re15Backup(vmOdonto.Re15());
			vmOdonto.Re16Backup(vmOdonto.Re16());


			vmOdonto.Mo1Backup(vmOdonto.Mo1());
			vmOdonto.Mo2Backup(vmOdonto.Mo2());
			vmOdonto.Mo3Backup(vmOdonto.Mo3());
			vmOdonto.Mo4Backup(vmOdonto.Mo4());
			vmOdonto.Mo5Backup(vmOdonto.Mo5());
			vmOdonto.Mo6Backup(vmOdonto.Mo6());
			vmOdonto.Mo7Backup(vmOdonto.Mo7());
			vmOdonto.Mo8Backup(vmOdonto.Mo8());
			vmOdonto.Mo9Backup(vmOdonto.Mo9());
			vmOdonto.Mo10Backup(vmOdonto.Mo10());
			vmOdonto.Mo11Backup(vmOdonto.Mo11());
			vmOdonto.Mo12Backup(vmOdonto.Mo12());
			vmOdonto.Mo13Backup(vmOdonto.Mo13());
			vmOdonto.Mo14Backup(vmOdonto.Mo14());
			vmOdonto.Mo15Backup(vmOdonto.Mo15());
			vmOdonto.Mo16Backup(vmOdonto.Mo16());
			//////////
			vmOdonto.FechaBackup(vmOdonto.Fecha());
			vmOdonto.DientesBackup = vmOdonto.Dientes.slice();
		};

		vmOdonto.Restore = function () {

			//////////
			vmOdonto.R1(vmOdonto.R1Backup());
			vmOdonto.R2(vmOdonto.R2Backup());
			vmOdonto.R3(vmOdonto.R3Backup());
			vmOdonto.R4(vmOdonto.R4Backup());
			vmOdonto.R5(vmOdonto.R5Backup());
			vmOdonto.R6(vmOdonto.R6Backup());
			vmOdonto.R7(vmOdonto.R7Backup());
			vmOdonto.R8(vmOdonto.R8Backup());
			vmOdonto.R9(vmOdonto.R9Backup());
			vmOdonto.R10(vmOdonto.R10Backup());
			vmOdonto.R11(vmOdonto.R11Backup());
			vmOdonto.R12(vmOdonto.R12Backup());
			vmOdonto.R13(vmOdonto.R13Backup());
			vmOdonto.R14(vmOdonto.R14Backup());
			vmOdonto.R15(vmOdonto.R15Backup());
			vmOdonto.R16(vmOdonto.R16Backup());

			vmOdonto.M1(vmOdonto.M1Backup());
			vmOdonto.M2(vmOdonto.M2Backup());
			vmOdonto.M3(vmOdonto.M3Backup());
			vmOdonto.M4(vmOdonto.M4Backup());
			vmOdonto.M5(vmOdonto.M5Backup());
			vmOdonto.M6(vmOdonto.M6Backup());
			vmOdonto.M7(vmOdonto.M7Backup());
			vmOdonto.M8(vmOdonto.M8Backup());
			vmOdonto.M9(vmOdonto.M9Backup());
			vmOdonto.M10(vmOdonto.M10Backup());
			vmOdonto.M11(vmOdonto.M11Backup());
			vmOdonto.M12(vmOdonto.M12Backup());
			vmOdonto.M13(vmOdonto.M13Backup());
			vmOdonto.M14(vmOdonto.M14Backup());
			vmOdonto.M15(vmOdonto.M15Backup());
			vmOdonto.M16(vmOdonto.M16Backup());

			vmOdonto.Re1(vmOdonto.Re1Backup());
			vmOdonto.Re2(vmOdonto.Re2Backup());
			vmOdonto.Re3(vmOdonto.Re3Backup());
			vmOdonto.Re4(vmOdonto.Re4Backup());
			vmOdonto.Re5(vmOdonto.Re5Backup());
			vmOdonto.Re6(vmOdonto.Re6Backup());
			vmOdonto.Re7(vmOdonto.Re7Backup());
			vmOdonto.Re8(vmOdonto.Re8Backup());
			vmOdonto.Re9(vmOdonto.Re9Backup());
			vmOdonto.Re10(vmOdonto.Re10Backup());
			vmOdonto.Re11(vmOdonto.Re11Backup());
			vmOdonto.Re12(vmOdonto.Re12Backup());
			vmOdonto.Re13(vmOdonto.Re13Backup());
			vmOdonto.Re14(vmOdonto.Re14Backup());
			vmOdonto.Re15(vmOdonto.Re15Backup());
			vmOdonto.Re16(vmOdonto.Re16Backup());

			vmOdonto.Mo1(vmOdonto.Mo1Backup());
			vmOdonto.Mo2(vmOdonto.Mo2Backup());
			vmOdonto.Mo3(vmOdonto.Mo3Backup());
			vmOdonto.Mo4(vmOdonto.Mo4Backup());
			vmOdonto.Mo5(vmOdonto.Mo5Backup());
			vmOdonto.Mo6(vmOdonto.Mo6Backup());
			vmOdonto.Mo7(vmOdonto.Mo7Backup());
			vmOdonto.Mo8(vmOdonto.Mo8Backup());
			vmOdonto.Mo9(vmOdonto.Mo9Backup());
			vmOdonto.Mo10(vmOdonto.Mo10Backup());
			vmOdonto.Mo11(vmOdonto.Mo11Backup());
			vmOdonto.Mo12(vmOdonto.Mo12Backup());
			vmOdonto.Mo13(vmOdonto.Mo13Backup());
			vmOdonto.Mo14(vmOdonto.Mo14Backup());
			vmOdonto.Mo15(vmOdonto.Mo15Backup());
			vmOdonto.Mo16(vmOdonto.Mo16Backup());
			//////////

			vmOdonto.Comentarios(vmOdonto.ComentariosBackup());
			vmOdonto.Fecha(vmOdonto.FechaBackup());
			vmOdonto.Dientes = vmOdonto.DientesBackup.slice();
		};

		vmOdonto.LoadTeeth = function () {

			if (vmOdonto.IsOpen()) { vmOdonto.Backup(); }

			vmOdonto.State("View");
			vmOdonto.Id(x.Id);
			vmOdonto.Fecha(x.Fecha);
			vmOdonto.Comentarios(x.Comentarios);
			vmOdonto.Acciones(x.Acciones);
			vmOdonto.EvolucionesConductoDesa_(x.Evoluciones);

			vmOdonto.R1(x.R1);
			vmOdonto.R2(x.R2);
			vmOdonto.R3(x.R3);
			vmOdonto.R4(x.R4);
			vmOdonto.R5(x.R5);
			vmOdonto.R6(x.R6);
			vmOdonto.R7(x.R7);
			vmOdonto.R8(x.R8);
			vmOdonto.R9(x.R9);
			vmOdonto.R10(x.R10);
			vmOdonto.R11(x.R11);
			vmOdonto.R12(x.R12);
			vmOdonto.R13(x.R13);
			vmOdonto.R14(x.R14);
			vmOdonto.R15(x.R15);
			vmOdonto.R16(x.R16);

			vmOdonto.M1(x.M1);
			vmOdonto.M2(x.M2);
			vmOdonto.M3(x.M3);
			vmOdonto.M4(x.M4);
			vmOdonto.M5(x.M5);
			vmOdonto.M6(x.M6);
			vmOdonto.M7(x.M7);
			vmOdonto.M8(x.M8);
			vmOdonto.M9(x.M9);
			vmOdonto.M10(x.M10);
			vmOdonto.M11(x.M11);
			vmOdonto.M12(x.M12);
			vmOdonto.M13(x.M13);
			vmOdonto.M14(x.M14);
			vmOdonto.M15(x.M15);
			vmOdonto.M16(x.M16);

			vmOdonto.Re1(x.Re1);
			vmOdonto.Re2(x.Re2);
			vmOdonto.Re3(x.Re3);
			vmOdonto.Re4(x.Re4);
			vmOdonto.Re5(x.Re5);
			vmOdonto.Re6(x.Re6);
			vmOdonto.Re7(x.Re7);
			vmOdonto.Re8(x.Re8);
			vmOdonto.Re9(x.Re9);
			vmOdonto.Re10(x.Re10);
			vmOdonto.Re11(x.Re11);
			vmOdonto.Re12(x.Re12);
			vmOdonto.Re13(x.Re13);
			vmOdonto.Re14(x.Re14);
			vmOdonto.Re15(x.Re15);
			vmOdonto.Re16(x.Re16);

			vmOdonto.Mo1(x.Mo1);
			vmOdonto.Mo2(x.Mo2);
			vmOdonto.Mo3(x.Mo3);
			vmOdonto.Mo4(x.Mo4);
			vmOdonto.Mo5(x.Mo5);
			vmOdonto.Mo6(x.Mo6);
			vmOdonto.Mo7(x.Mo7);
			vmOdonto.Mo8(x.Mo8);
			vmOdonto.Mo9(x.Mo9);
			vmOdonto.Mo10(x.Mo10);
			vmOdonto.Mo11(x.Mo11);
			vmOdonto.Mo12(x.Mo12);
			vmOdonto.Mo13(x.Mo13);
			vmOdonto.Mo14(x.Mo14);
			vmOdonto.Mo15(x.Mo15);
			vmOdonto.Mo16(x.Mo16);


			$.get("/Odontograma/GetEntityId/" + x.Id).done(function (dientes) {

				dental.ResetTeethState();
				dental.Draw();
				vmOdonto.Dientes = dientes;
				vmOdonto.Parse();

			}).fail(function (res) {
				console.log("Error in InjectLoadFunction (Odontograma.js) in", x);
				console.log("The error is", res);
			});
		};


		vmOdonto.InjectLoadFunction = function (array) {
			array.forEach(function (x) {
				x.LoadTeeth = function () {
					if (vmOdonto.IsOpen()) { vmOdonto.Backup(); }

					vmOdonto.State("View");
					vmOdonto.Id(x.Id);
					vmOdonto.Fecha(x.Fecha);
					vmOdonto.Comentarios(x.Comentarios);
					vmOdonto.Acciones(x.Acciones);

					var now = moment().format();

					var momentDate = moment(vmOdonto.Fecha(), "DD/MM/YYYY hh:mm a").format();


						vmOdonto.BtnEditar(true);
					

					var arrayProperties = new Array();
					for (var i = 0; i < x.Evoluciones.length; i++) {
						var properties = new Object();
						try {
							var datasE = x.Evoluciones[i].EncuestaID();
							var datas = x.Evoluciones[i].EvolucionDate();
							var datas1 = x.Evoluciones[i].Diente();
							var datas2 = x.Evoluciones[i].Pieza();
							var datas3 = x.Evoluciones[i].Indicacion();
							var datas4 = x.Evoluciones[i].Estado();
							var datas5 = x.Evoluciones[i].Cara();
							var datas6 = x.Evoluciones[i].Cara1();
							var datas7 = x.Evoluciones[i].Cara2();
							var datas8 = x.Evoluciones[i].Cara3();
							var datas9 = x.Evoluciones[i].Cara4();
							var datas10 = x.Evoluciones[i].Pieza2();
						} catch (e) {
							var datasE = x.Evoluciones[i].EncuestaID;
							var datas = x.Evoluciones[i].EvolucionDate;
							var datas1 = x.Evoluciones[i].Diente;
							var datas2 = x.Evoluciones[i].Pieza;
							var datas3 = x.Evoluciones[i].Indicacion;
							var datas4 = x.Evoluciones[i].Estado;
							var datas5 = x.Evoluciones[i].Cara;
							var datas6 = x.Evoluciones[i].Cara1;
							var datas7 = x.Evoluciones[i].Cara2;
							var datas8 = x.Evoluciones[i].Cara3;
							var datas9 = x.Evoluciones[i].Cara4;
							var datas10 = x.Evoluciones[i].Pieza2;
						}

						properties.EncuestaID = datasE;
						properties.Diente = datas1;
						properties.Pieza = datas2;
						properties.Pieza2 = datas10;
						properties.Indicacion = datas3;
						properties.Estado = datas4;
						properties.Cara = datas5;
						properties.Cara1 = datas6;
						properties.Cara2 = datas7;
						properties.Cara3 = datas8;
						properties.Cara4 = datas9;
						properties.EncuestaID = i;
						properties.EvolucionDate = moment(datas, 'DD/MM/YYYY hh:mm a').format("DD/MM/YYYY HH:mm");
						if (datas3 == "Ausente") {
							properties.validar2 = false;
						} else {
							properties.validar2 = true;
						}

						if (datas3 == "Caries" || datas3 == "Restauracion" || datas3 == "Incrustacion") {
							properties.validar = false;
						} else {
							properties.validar = true;
						}
						arrayProperties.push(properties);

					}
					vmOdonto.EvolucionesConductoDesa_(arrayProperties);


					vmOdonto.R1(x.R1);
					vmOdonto.R2(x.R2);
					vmOdonto.R3(x.R3);
					vmOdonto.R4(x.R4);
					vmOdonto.R5(x.R5);
					vmOdonto.R6(x.R6);
					vmOdonto.R7(x.R7);
					vmOdonto.R8(x.R8);
					vmOdonto.R9(x.R9);
					vmOdonto.R10(x.R10);
					vmOdonto.R11(x.R11);
					vmOdonto.R12(x.R12);
					vmOdonto.R13(x.R13);
					vmOdonto.R14(x.R14);
					vmOdonto.R15(x.R15);
					vmOdonto.R16(x.R16);

					vmOdonto.M1(x.M1);
					vmOdonto.M2(x.M2);
					vmOdonto.M3(x.M3);
					vmOdonto.M4(x.M4);
					vmOdonto.M5(x.M5);
					vmOdonto.M6(x.M6);
					vmOdonto.M7(x.M7);
					vmOdonto.M8(x.M8);
					vmOdonto.M9(x.M9);
					vmOdonto.M10(x.M10);
					vmOdonto.M11(x.M11);
					vmOdonto.M12(x.M12);
					vmOdonto.M13(x.M13);
					vmOdonto.M14(x.M14);
					vmOdonto.M15(x.M15);
					vmOdonto.M16(x.M16);

					vmOdonto.Re1(x.Re1);
					vmOdonto.Re2(x.Re2);
					vmOdonto.Re3(x.Re3);
					vmOdonto.Re4(x.Re4);
					vmOdonto.Re5(x.Re5);
					vmOdonto.Re6(x.Re6);
					vmOdonto.Re7(x.Re7);
					vmOdonto.Re8(x.Re8);
					vmOdonto.Re9(x.Re9);
					vmOdonto.Re10(x.Re10);
					vmOdonto.Re11(x.Re11);
					vmOdonto.Re12(x.Re12);
					vmOdonto.Re13(x.Re13);
					vmOdonto.Re14(x.Re14);
					vmOdonto.Re15(x.Re15);
					vmOdonto.Re16(x.Re16);

					vmOdonto.Mo1(x.Mo1);
					vmOdonto.Mo2(x.Mo2);
					vmOdonto.Mo3(x.Mo3);
					vmOdonto.Mo4(x.Mo4);
					vmOdonto.Mo5(x.Mo5);
					vmOdonto.Mo6(x.Mo6);
					vmOdonto.Mo7(x.Mo7);
					vmOdonto.Mo8(x.Mo8);
					vmOdonto.Mo9(x.Mo9);
					vmOdonto.Mo10(x.Mo10);
					vmOdonto.Mo11(x.Mo11);
					vmOdonto.Mo12(x.Mo12);
					vmOdonto.Mo13(x.Mo13);
					vmOdonto.Mo14(x.Mo14);
					vmOdonto.Mo15(x.Mo15);
					vmOdonto.Mo16(x.Mo16);

					$.get("/Odontograma/GetEntityId/" + x.Id).done(function (dientes) {
						dental.ResetTeethState();
						dental.Draw();
						vmOdonto.Dientes = dientes;
						vmOdonto.Parse();

					}).fail(function (res) {
						console.log("Error in InjectLoadFunction (Odontograma.js) in", x);
						console.log("The error is", res);
					});
				};
			});
		};

		vmOdonto.Regresar = function () {
			vmOdonto.Restore();
			dental.ResetTeethState();
			dental.Draw();
			vmOdonto.Parse();
			vmOdonto.State("New");
		};

		vmOdonto.Editar = function () {
			$.get("/Odontograma/GetEntity?id=" + vmOdonto.Id()).done(function (data) {

				if (data.Odontograma != null) {

					var arrayProperties = new Array();
					for (var i = 0; i < data.Odontograma.Evoluciones.length; i++) {
						var properties = new Object();
						try {
							var datasE = data.Odontograma.Evoluciones[i].EncuestaID();
							var datas = data.Odontograma.Evoluciones[i].EvolucionDate();
							var datas1 = data.Odontograma.Evoluciones[i].Diente();
							var datas2 = data.Odontograma.Evoluciones[i].Pieza();
							var datas3 = data.Odontograma.Evoluciones[i].Indicacion();
							var datas4 = data.Odontograma.Evoluciones[i].Estado();
							var datas5 = data.Odontograma.Evoluciones[i].Cara();
							var datas6 = data.Odontograma.Evoluciones[i].Cara1();
							var datas7 = data.Odontograma.Evoluciones[i].Cara2();
							var datas8 = data.Odontograma.Evoluciones[i].Cara3();
							var datas9 = data.Odontograma.Evoluciones[i].Cara4();
							var datas10 = data.Odontograma.Evoluciones[i].Pieza2();
						} catch (e) {
							var datasE = data.Odontograma.Evoluciones[i].EncuestaID;
							var datas = data.Odontograma.Evoluciones[i].EvolucionDate;
							var datas1 = data.Odontograma.Evoluciones[i].Diente;
							var datas2 = data.Odontograma.Evoluciones[i].Pieza;
							var datas3 = data.Odontograma.Evoluciones[i].Indicacion;
							var datas4 = data.Odontograma.Evoluciones[i].Estado;
							var datas5 = data.Odontograma.Evoluciones[i].Cara;
							var datas6 = data.Odontograma.Evoluciones[i].Cara1;
							var datas7 = data.Odontograma.Evoluciones[i].Cara2;
							var datas8 = data.Odontograma.Evoluciones[i].Cara3;
							var datas9 = data.Odontograma.Evoluciones[i].Cara4;
							var datas10 = data.Odontograma.Evoluciones[i].Pieza2;
						}

						properties.EncuestaID = datasE;
						properties.Diente = datas1;
						properties.Pieza = datas2;
						properties.Pieza2 = datas10;
						properties.Indicacion = datas3;
						properties.Estado = datas4;
						properties.Cara = datas5;
						properties.Cara1 = datas6;
						properties.Cara2 = datas7;
						properties.Cara3 = datas8;
						properties.Cara4 = datas9;
						properties.EncuestaID = i;
						properties.EvolucionDate = moment(datas, 'DD/MM/YYYY hh:mm a').format("DD/MM/YYYY HH:mm");

						if (datas3 == "Ausente") {
							properties.validar2 = false;
						} else {
							properties.validar2 = true;
						}

						if (datas3 == "Caries" || datas3 == "Restauracion" || datas3 == "Incrustacion") {
							properties.validar = false;
						} else {
							properties.validar = true;
						}
						arrayProperties.push(properties);

					}
					vmOdonto.EvolucionesConductoDesa_(arrayProperties);



					//////////
					vmOdonto.R1(data.Odontograma.R1);
					vmOdonto.R2(data.Odontograma.R2);
					vmOdonto.R3(data.Odontograma.R3);
					vmOdonto.R4(data.Odontograma.R4);
					vmOdonto.R5(data.Odontograma.R5);
					vmOdonto.R6(data.Odontograma.R6);
					vmOdonto.R7(data.Odontograma.R7);
					vmOdonto.R8(data.Odontograma.R8);
					vmOdonto.R9(data.Odontograma.R9);
					vmOdonto.R10(data.Odontograma.R10);
					vmOdonto.R11(data.Odontograma.R11);
					vmOdonto.R12(data.Odontograma.R12);
					vmOdonto.R13(data.Odontograma.R13);
					vmOdonto.R14(data.Odontograma.R14);
					vmOdonto.R15(data.Odontograma.R15);
					vmOdonto.R16(data.Odontograma.R16);

					vmOdonto.M1(data.Odontograma.M1);
					vmOdonto.M2(data.Odontograma.M2);
					vmOdonto.M3(data.Odontograma.M3);
					vmOdonto.M4(data.Odontograma.M4);
					vmOdonto.M5(data.Odontograma.M5);
					vmOdonto.M6(data.Odontograma.M6);
					vmOdonto.M7(data.Odontograma.M7);
					vmOdonto.M8(data.Odontograma.M8);
					vmOdonto.M9(data.Odontograma.M9);
					vmOdonto.M10(data.Odontograma.M10);
					vmOdonto.M11(data.Odontograma.M11);
					vmOdonto.M12(data.Odontograma.M12);
					vmOdonto.M13(data.Odontograma.M13);
					vmOdonto.M14(data.Odontograma.M14);
					vmOdonto.M15(data.Odontograma.M15);
					vmOdonto.M16(data.Odontograma.M16);

					vmOdonto.Re1(data.Odontograma.Re1);
					vmOdonto.Re2(data.Odontograma.Re2);
					vmOdonto.Re3(data.Odontograma.Re3);
					vmOdonto.Re4(data.Odontograma.Re4);
					vmOdonto.Re5(data.Odontograma.Re5);
					vmOdonto.Re6(data.Odontograma.Re6);
					vmOdonto.Re7(data.Odontograma.Re7);
					vmOdonto.Re8(data.Odontograma.Re8);
					vmOdonto.Re9(data.Odontograma.Re9);
					vmOdonto.Re10(data.Odontograma.Re10);
					vmOdonto.Re11(data.Odontograma.Re11);
					vmOdonto.Re12(data.Odontograma.Re12);
					vmOdonto.Re13(data.Odontograma.Re13);
					vmOdonto.Re14(data.Odontograma.Re14);
					vmOdonto.Re15(data.Odontograma.Re15);
					vmOdonto.Re16(data.Odontograma.Re16);

					vmOdonto.Mo1(data.Odontograma.Mo1);
					vmOdonto.Mo2(data.Odontograma.Mo2);
					vmOdonto.Mo3(data.Odontograma.Mo3);
					vmOdonto.Mo4(data.Odontograma.Mo4);
					vmOdonto.Mo5(data.Odontograma.Mo5);
					vmOdonto.Mo6(data.Odontograma.Mo6);
					vmOdonto.Mo7(data.Odontograma.Mo7);
					vmOdonto.Mo8(data.Odontograma.Mo8);
					vmOdonto.Mo9(data.Odontograma.Mo9);
					vmOdonto.Mo10(data.Odontograma.Mo10);
					vmOdonto.Mo11(data.Odontograma.Mo11);
					vmOdonto.Mo12(data.Odontograma.Mo12);
					vmOdonto.Mo13(data.Odontograma.Mo13);
					vmOdonto.Mo14(data.Odontograma.Mo14);
					vmOdonto.Mo15(data.Odontograma.Mo15);
					vmOdonto.Mo16(data.Odontograma.Mo16);



				} else {

				}

				dental.Initialize();
				vmOdonto.State("Edit");

			}).fail(function (res) {
				vmOdonto.Dientes = [];
				console.log("Error in Dientes Sanos function (Odontograma.js)", res);
			});



		};

		vmOdonto.InjectLoadFunction(data);
		vmOdonto.Odontogramas = ko.observableArray(data);

		vmOdonto.Save = function () {

			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: "/Odontograma/SaveOdontograma",
				data: JSON.stringify({

					R1: vmOdonto.R1(),
					R2: vmOdonto.R2(),
					R3: vmOdonto.R3(),
					R4: vmOdonto.R4(),
					R5: vmOdonto.R5(),
					R6: vmOdonto.R6(),
					R7: vmOdonto.R7(),
					R8: vmOdonto.R8(),
					R9: vmOdonto.R9(),
					R10: vmOdonto.R10(),
					R11: vmOdonto.R11(),
					R12: vmOdonto.R12(),
					R13: vmOdonto.R13(),
					R14: vmOdonto.R14(),
					R15: vmOdonto.R15(),
					R16: vmOdonto.R16(),

					M1: vmOdonto.M1(),
					M2: vmOdonto.M2(),
					M3: vmOdonto.M3(),
					M4: vmOdonto.M4(),
					M5: vmOdonto.M5(),
					M6: vmOdonto.M6(),
					M7: vmOdonto.M7(),
					M8: vmOdonto.M8(),
					M9: vmOdonto.M9(),
					M10: vmOdonto.M10(),
					M11: vmOdonto.M11(),
					M12: vmOdonto.M12(),
					M13: vmOdonto.M13(),
					M14: vmOdonto.M14(),
					M15: vmOdonto.M15(),
					M16: vmOdonto.M16(),

					Re1: vmOdonto.Re1(),
					Re2: vmOdonto.Re2(),
					Re3: vmOdonto.Re3(),
					Re4: vmOdonto.Re4(),
					Re5: vmOdonto.Re5(),
					Re6: vmOdonto.Re6(),
					Re7: vmOdonto.Re7(),
					Re8: vmOdonto.Re8(),
					Re9: vmOdonto.Re9(),
					Re10: vmOdonto.Re10(),
					Re11: vmOdonto.Re11(),
					Re12: vmOdonto.Re12(),
					Re13: vmOdonto.Re13(),
					Re14: vmOdonto.Re14(),
					Re15: vmOdonto.Re15(),
					Re16: vmOdonto.Re16(),

					Mo1: vmOdonto.Mo1(),
					Mo2: vmOdonto.Mo2(),
					Mo3: vmOdonto.Mo3(),
					Mo4: vmOdonto.Mo4(),
					Mo5: vmOdonto.Mo5(),
					Mo6: vmOdonto.Mo6(),
					Mo7: vmOdonto.Mo7(),
					Mo8: vmOdonto.Mo8(),
					Mo9: vmOdonto.Mo9(),
					Mo10: vmOdonto.Mo10(),
					Mo11: vmOdonto.Mo11(),
					Mo12: vmOdonto.Mo12(),
					Mo13: vmOdonto.Mo13(),
					Mo14: vmOdonto.Mo14(),
					Mo15: vmOdonto.Mo15(),
					Mo16: vmOdonto.Mo16(),

					Comentarios: vmOdonto.Comentarios(),
					Acciones: vmOdonto.Acciones(),
					PersonasId: PersonaID,
					EvolucionesListado: vmOdonto.EvolucionesConductoDesa_(),
					Fecha: moment().format(),
				}),
				success: function (res) {

					//res.Fecha = moment(res.Fecha).format("DD/MM/YYYY")
					res.LoadTeeth = function () {
						
						if (vmOdonto.IsOpen()) { vmOdonto.Backup(); }
						vmOdonto.State("View");
						vmOdonto.Id(res.Id);
						vmOdonto.Fecha(res.Fecha);
						vmOdonto.Comentarios(res.Comentarios);
						vmOdonto.Acciones(res.Acciones);



						var arrayProperties = new Array();
						for (var i = 0; i < res.Evoluciones.length; i++) {
							var properties = new Object();
							try {
								var datasE = res.Evoluciones[i].EncuestaID();
								var datas = res.Evoluciones[i].EvolucionDate();
								var datas1 = res.Evoluciones[i].Diente();
								var datas2 = res.Evoluciones[i].Pieza();
								var datas3 = res.Evoluciones[i].Indicacion();
								var datas4 = res.Evoluciones[i].Estado();
								var datas5 = res.Evoluciones[i].Cara();
								var datas6 = res.Evoluciones[i].Cara1();
								var datas7 = res.Evoluciones[i].Cara2();
								var datas8 = res.Evoluciones[i].Cara3();
								var datas9 = res.Evoluciones[i].Cara4();
								var datas10 = res.Evoluciones[i].Pieza2();
							} catch (e) {
								var datasE = res.Evoluciones[i].EncuestaID;
								var datas = res.Evoluciones[i].EvolucionDate;
								var datas1 = res.Evoluciones[i].Diente;
								var datas2 = res.Evoluciones[i].Pieza;
								var datas3 = res.Evoluciones[i].Indicacion;
								var datas4 = res.Evoluciones[i].Estado;
								var datas5 = res.Evoluciones[i].Cara;
								var datas6 = res.Evoluciones[i].Cara1;
								var datas7 = res.Evoluciones[i].Cara2;
								var datas8 = res.Evoluciones[i].Cara3;
								var datas9 = res.Evoluciones[i].Cara4;
								var datas10 = res.Evoluciones[i].Pieza2;
							}

							properties.EncuestaID = datasE;
							properties.Diente = datas1;
							properties.Pieza = datas2;
							properties.Pieza2 = datas10;
							properties.Indicacion = datas3;
							properties.Estado = datas4;
							properties.Cara = datas5;
							properties.Cara1 = datas6;
							properties.Cara2 = datas7;
							properties.Cara3 = datas8;
							properties.Cara4 = datas9;
							properties.EncuestaID = i;
							properties.EvolucionDate = moment(datas, 'DD/MM/YYYY hh:mm a').format("DD/MM/YYYY HH:mm");
							if (datas3 == "Ausente") {
								properties.validar2 = false;
							} else {
								properties.validar2 = true;
							}

							if (datas3 == "Caries" || datas3 == "Restauracion" || datas3 == "Incrustacion") {
								properties.validar = false;
							} else {
								properties.validar = true;
							}
							arrayProperties.push(properties);

						}
						vmOdonto.EvolucionesConductoDesa_(arrayProperties);



						vmOdonto.R1(res.R1);
						vmOdonto.R2(res.R2);
						vmOdonto.R3(res.R3);
						vmOdonto.R4(res.R4);
						vmOdonto.R5(res.R5);
						vmOdonto.R6(res.R6);
						vmOdonto.R7(res.R7);
						vmOdonto.R8(res.R8);
						vmOdonto.R9(res.R9);
						vmOdonto.R10(res.R10);
						vmOdonto.R11(res.R11);
						vmOdonto.R12(res.R12);
						vmOdonto.R13(res.R13);
						vmOdonto.R14(res.R14);
						vmOdonto.R15(res.R15);
						vmOdonto.R16(res.R16);

						vmOdonto.M1(res.M1);
						vmOdonto.M2(res.M2);
						vmOdonto.M3(res.M3);
						vmOdonto.M4(res.M4);
						vmOdonto.M5(res.M5);
						vmOdonto.M6(res.M6);
						vmOdonto.M7(res.M7);
						vmOdonto.M8(res.M8);
						vmOdonto.M9(res.M9);
						vmOdonto.M10(res.M10);
						vmOdonto.M11(res.M11);
						vmOdonto.M12(res.M12);
						vmOdonto.M13(res.M13);
						vmOdonto.M14(res.M14);
						vmOdonto.M15(res.M15);
						vmOdonto.M16(res.M16);

						vmOdonto.Re1(res.Re1);
						vmOdonto.Re2(res.Re2);
						vmOdonto.Re3(res.Re3);
						vmOdonto.Re4(res.Re4);
						vmOdonto.Re5(res.Re5);
						vmOdonto.Re6(res.Re6);
						vmOdonto.Re7(res.Re7);
						vmOdonto.Re8(res.Re8);
						vmOdonto.Re9(res.Re9);
						vmOdonto.Re10(res.Re10);
						vmOdonto.Re11(res.Re11);
						vmOdonto.Re12(res.Re12);
						vmOdonto.Re13(res.Re13);
						vmOdonto.Re14(res.Re14);
						vmOdonto.Re15(res.Re15);
						vmOdonto.Re16(res.Re16);

						vmOdonto.Mo1(res.Mo1);
						vmOdonto.Mo2(res.Mo2);
						vmOdonto.Mo3(res.Mo3);
						vmOdonto.Mo4(res.Mo4);
						vmOdonto.Mo5(res.Mo5);
						vmOdonto.Mo6(res.Mo6);
						vmOdonto.Mo7(res.Mo7);
						vmOdonto.Mo8(res.Mo8);
						vmOdonto.Mo9(res.Mo9);
						vmOdonto.Mo10(res.Mo10);
						vmOdonto.Mo11(res.Mo11);
						vmOdonto.Mo12(res.Mo12);
						vmOdonto.Mo13(res.Mo13);
						vmOdonto.Mo14(res.Mo14);
						vmOdonto.Mo15(res.Mo15);
						vmOdonto.Mo16(res.Mo16);


						$.get("/Odontograma/GetEntityId/" + res.Id).done(function (dientes) {
							dental.ResetTeethState();
							dental.Draw();
							vmOdonto.Dientes = dientes;
							vmOdonto.Parse();

						}).fail(function (res) {
							console.log("Error in InjectLoadFunction (Odontograma.js) in", res);
							console.log("The error is", res);
						});
					};
					vmOdonto.UpdateCurrent(res);

					vmOdonto.Odontogramas.unshift(res);
					vmOdonto.SaveTeeths(vmOdonto.Id());
				}
			});

		};

		vmOdonto.UpdateData = function () {
			$.post("/Odontograma/UpdateOdontograma", {
				_Odontograma: {
					Id: vmOdonto.Id(),
					Fecha: moment(vmOdonto.Fecha(), "DD/MM/YYYY").format(),
					Comentarios: vmOdonto.Comentarios(),
					Acciones: vmOdonto.Acciones(),
					PersonasId: PersonaID,

					R1: vmOdonto.R1(),
					R2: vmOdonto.R2(),
					R3: vmOdonto.R3(),
					R4: vmOdonto.R4(),
					R5: vmOdonto.R5(),
					R6: vmOdonto.R6(),
					R7: vmOdonto.R7(),
					R8: vmOdonto.R8(),
					R9: vmOdonto.R9(),
					R10: vmOdonto.R10(),
					R11: vmOdonto.R11(),
					R12: vmOdonto.R12(),
					R13: vmOdonto.R13(),
					R14: vmOdonto.R14(),
					R15: vmOdonto.R15(),
					R16: vmOdonto.R16(),

					M1: vmOdonto.M1(),
					M2: vmOdonto.M2(),
					M3: vmOdonto.M3(),
					M4: vmOdonto.M4(),
					M5: vmOdonto.M5(),
					M6: vmOdonto.M6(),
					M7: vmOdonto.M7(),
					M8: vmOdonto.M8(),
					M9: vmOdonto.M9(),
					M10: vmOdonto.M10(),
					M11: vmOdonto.M11(),
					M12: vmOdonto.M12(),
					M13: vmOdonto.M13(),
					M14: vmOdonto.M14(),
					M15: vmOdonto.M15(),
					M16: vmOdonto.M16(),

					Re1: vmOdonto.Re1(),
					Re2: vmOdonto.Re2(),
					Re3: vmOdonto.Re3(),
					Re4: vmOdonto.Re4(),
					Re5: vmOdonto.Re5(),
					Re6: vmOdonto.Re6(),
					Re7: vmOdonto.Re7(),
					Re8: vmOdonto.Re8(),
					Re9: vmOdonto.Re9(),
					Re10: vmOdonto.Re10(),
					Re11: vmOdonto.Re11(),
					Re12: vmOdonto.Re12(),
					Re13: vmOdonto.Re13(),
					Re14: vmOdonto.Re14(),
					Re15: vmOdonto.Re15(),
					Re16: vmOdonto.Re16(),

					Mo1: vmOdonto.Mo1(),
					Mo2: vmOdonto.Mo2(),
					Mo3: vmOdonto.Mo3(),
					Mo4: vmOdonto.Mo4(),
					Mo5: vmOdonto.Mo5(),
					Mo6: vmOdonto.Mo6(),
					Mo7: vmOdonto.Mo7(),
					Mo8: vmOdonto.Mo8(),
					Mo9: vmOdonto.Mo9(),
					Mo10: vmOdonto.Mo10(),
					Mo11: vmOdonto.Mo11(),
					Mo12: vmOdonto.Mo12(),
					Mo13: vmOdonto.Mo13(),
					Mo14: vmOdonto.Mo14(),
					Mo15: vmOdonto.Mo15(),
					Mo16: vmOdonto.Mo16(),

				},
				EvolucionListado: vmOdonto.EvolucionesConductoDesa_(),
			})
				.done(function (res) {
					vmOdonto.UpdateCurrent(res);
					vmOdonto.UpdateTeeths(vmOdonto.Id());
				})
				.fail(function (res) {
					console.log("Error in Save function (Odontograma.js)", res);
				});
		};

		vmOdonto.UpdateCurrent = function (newItem) {
			vmOdonto.Id(newItem.Id);
			vmOdonto.Fecha(newItem.Fecha);
			vmOdonto.Comentarios(newItem.Comentarios);

			vmOdonto.R1(newItem.R1);
			vmOdonto.R2(newItem.R2);
			vmOdonto.R3(newItem.R3);
			vmOdonto.R4(newItem.R4);
			vmOdonto.R5(newItem.R5);
			vmOdonto.R6(newItem.R6);
			vmOdonto.R7(newItem.R7);
			vmOdonto.R8(newItem.R8);
			vmOdonto.R9(newItem.R9);
			vmOdonto.R10(newItem.R10);
			vmOdonto.R11(newItem.R11);
			vmOdonto.R12(newItem.R12);
			vmOdonto.R13(newItem.R13);
			vmOdonto.R14(newItem.R14);
			vmOdonto.R15(newItem.R15);
			vmOdonto.R16(newItem.R16);

			vmOdonto.M1(newItem.M1);
			vmOdonto.M2(newItem.M2);
			vmOdonto.M3(newItem.M3);
			vmOdonto.M4(newItem.M4);
			vmOdonto.M5(newItem.M5);
			vmOdonto.M6(newItem.M6);
			vmOdonto.M7(newItem.M7);
			vmOdonto.M8(newItem.M8);
			vmOdonto.M9(newItem.M9);
			vmOdonto.M10(newItem.M10);
			vmOdonto.M11(newItem.M11);
			vmOdonto.M12(newItem.M12);
			vmOdonto.M13(newItem.M13);
			vmOdonto.M14(newItem.M14);
			vmOdonto.M15(newItem.M15);
			vmOdonto.M16(newItem.M16);

			vmOdonto.Re1(newItem.Re1);
			vmOdonto.Re2(newItem.Re2);
			vmOdonto.Re3(newItem.Re3);
			vmOdonto.Re4(newItem.Re4);
			vmOdonto.Re5(newItem.Re5);
			vmOdonto.Re6(newItem.Re6);
			vmOdonto.Re7(newItem.Re7);
			vmOdonto.Re8(newItem.Re8);
			vmOdonto.Re9(newItem.Re9);
			vmOdonto.Re10(newItem.Re10);
			vmOdonto.Re11(newItem.Re11);
			vmOdonto.Re12(newItem.Re12);
			vmOdonto.Re13(newItem.Re13);
			vmOdonto.Re14(newItem.Re14);
			vmOdonto.Re15(newItem.Re15);
			vmOdonto.Re16(newItem.Re16);

			vmOdonto.Mo1(newItem.Mo1);
			vmOdonto.Mo2(newItem.Mo2);
			vmOdonto.Mo3(newItem.Mo3);
			vmOdonto.Mo4(newItem.Mo4);
			vmOdonto.Mo5(newItem.Mo5);
			vmOdonto.Mo6(newItem.Mo6);
			vmOdonto.Mo7(newItem.Mo7);
			vmOdonto.Mo8(newItem.Mo8);
			vmOdonto.Mo9(newItem.Mo9);
			vmOdonto.Mo10(newItem.Mo10);
			vmOdonto.Mo11(newItem.Mo11);
			vmOdonto.Mo12(newItem.Mo12);
			vmOdonto.Mo13(newItem.Mo13);
			vmOdonto.Mo14(newItem.Mo14);
			vmOdonto.Mo15(newItem.Mo15);
			vmOdonto.Mo16(newItem.Mo16);

		};

		vmOdonto.SaveTeeths = function (Id) {
			vmOdonto.Dientes.forEach(function (x) { x.OdontogramaId = Id; });
			$.post("/Odontograma/PostDientes", { Dientes: vmOdonto.Dientes })
				.done(function (res) {
					success("Odontograma guardado exitosamente");
					vmOdonto.Cancelar();
				})
				.fail(function (res) {
					console.log("Error in SaveTeeths function (Odontograma.js)", res);
				});
		};

		vmOdonto.UpdateTeeths = function (Id) {
			vmOdonto.Dientes.forEach(function (x) { x.OdontogramaId = Id; });
			$.post("/Odontograma/UpdateDientes", { Dientes: vmOdonto.Dientes })
				.done(function (res) {
					success("Odontograma actualizado exitosamente");
					vmOdonto.State("View");
					vmOdonto = {};
					$("#contenidoHistoria").load("/Odontograma/Odontograma");
					$("#contenidoHistoria").show();


				})
				.fail(function (res) {
					console.log("Error in UpdateTeeths function (Odontograma.js)", res);
				});
		};

		vmOdonto.Print = function () {
			var mySVG = document.querySelector('#draw'),
				tgtImage = document.querySelector('#PrintID'),
				can = document.createElement('canvas'),
				ctx = can.getContext('2d'),
				loader = new Image;

			loader.width = can.width = tgtImage.width = mySVG.clientWidth;
			loader.height = can.height = tgtImage.height = mySVG.clientHeight;

			loader.onload = function () {
				ctx.drawImage(loader, 0, 0, loader.width, loader.height);
				tgtImage.src = can.toDataURL();
			};
			var svgAsXML = (new XMLSerializer).serializeToString(mySVG);
			loader.src = 'data:image/svg+xml,' + encodeURIComponent(svgAsXML);

			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: '/Odontograma/Print',
				data: JSON.stringify({
					curva2: loader.src,
					id: vmOdonto.Id()
				}),
				success: function (result) {
					window.open("/Odontograma/DownloadPdf?id=" + result.File, '_blank');
				},
				error: function (data, textStatus, jqXHR) {
				}
			});
		};

		vmOdonto.Cancelar = function () {
			vmOdonto = {};
			$("#contenidoHistoria").load("/Odontograma/Odontograma");
			$("#contenidoHistoria").show();

		};


		vmOdonto.Parse = function (selected, data, value, selected2) {
			var global;
			if (selected != undefined && data != undefined && value != undefined) {
				var id = selected.split(" ")[0];
				var teeth = selected.split(" ")[0].replace("d", "");
				var position = selected.split(" ")[1];

				if (selected2 != null) {
					var id2 = selected2.split(" ")[0];
					var teeth2 = selected2.split(" ")[0].replace("d", "");
					var position2 = selected2.split(" ")[1];
				}

				vmOdonto.Dientes.forEach(function (diente) {

					if (diente.Numero == parseInt(teeth)) {
						global = diente;
					}
				});
				if (value == "SellanteI") {
					vmOdonto.SellanteIV(teeth, position, global);
				}
				else if (value == "SellanteR") {
					vmOdonto.SellanteRV(teeth, position, global);
				}
				else if (value == "ExtraccionI") {
					vmOdonto.ExtraccionIV(teeth, position, global);
				}
				else if (value == "ExtraccionR") {
					vmOdonto.ExtraccionRV(teeth, position, global);
				}
				else if (value == "AusenteI") {
					vmOdonto.AusenteIV(teeth, position, global);
				}
				else if (value == "EndodonciaI") {
					vmOdonto.EndodonciaIV(teeth, position, global);
				}
				else if (value == "EndodonciaR") {
					vmOdonto.EndodonciaRV(teeth, position, global);
				}
				else if (value == "CoronaI") {
					vmOdonto.CoronaIV(teeth, position, global);
				}
				else if (value == "CoronaR") {
					vmOdonto.CoronaRV(teeth, position, global);
				}
				else if (value == "RemovidoI") {
					vmOdonto.RemovidoIV(teeth, teeth2, position, global);
				}
				else if (value == "RemovidoR") {

					vmOdonto.RemovidoRV(teeth, teeth2, position, global);

				}
				else if (value == "PuenteI") {

					vmOdonto.PuenteIV(teeth, teeth2, position, global);
				}
				else if (value == "PuenteR") {

					vmOdonto.PuenteRV(teeth, teeth2, position, global);

				}
				else if (value == "ProtesisI") {

					vmOdonto.ProtesisIV(teeth, position, global);
				}
				else if (value == "ProtesisR") {

					vmOdonto.ProtesisRV(teeth, position, global);

				}
				else if (value == "Incrustacion") {
					if (position == "lingual") {
						global.Lingual = "Incrustacion";
						vmOdonto.PaintCircle(global, "Lingual");

					} else if (position == "vestibular") {
						global.Vestibular = "Incrustacion";
						vmOdonto.PaintCircle(global, "Vestibular");

					} else if (position == "oclusal") {
						global.Oclusal = "Incrustacion";
						vmOdonto.PaintCircle(global, "Oclusal");

					} else if (position == "mesial") {
						global.Mesial = "Incrustacion";
						vmOdonto.PaintCircle(global, "Mesial");

					} else if (position == "distal") {
						global.Distal = "Incrustacion";
						vmOdonto.PaintCircle(global, "Distal");
					}
				}

				else if (value == "Caries") {
					if (position == "lingual") {
						global.Lingual = "Caries";
						vmOdonto.PaintCircle(global, "Lingual");

					} else if (position == "vestibular") {
						global.Vestibular = "Caries";
						vmOdonto.PaintCircle(global, "Vestibular");

					} else if (position == "oclusal") {
						global.Oclusal = "Caries";
						vmOdonto.PaintCircle(global, "Oclusal");

					} else if (position == "mesial") {
						global.Mesial = "Caries";
						vmOdonto.PaintCircle(global, "Mesial");

					} else if (position == "distal") {
						global.Distal = "Caries";
						vmOdonto.PaintCircle(global, "Distal");
					}

				} else if (value == "Composited") {
					if (position == "lingual") {
						global.Lingual = "Composited";
						vmOdonto.PaintCircle(global, "Lingual");

					} else if (position == "vestibular") {
						global.Vestibular = "Composited";
						vmOdonto.PaintCircle(global, "Vestibular");

					} else if (position == "oclusal") {
						global.Oclusal = "Composited";
						vmOdonto.PaintCircle(global, "Oclusal");

					} else if (position == "mesial") {
						global.Mesial = "Composited";
						vmOdonto.PaintCircle(global, "Mesial");

					} else if (position == "distal") {
						global.Distal = "Composited";
						vmOdonto.PaintCircle(global, "Distal");
					}
				}
				else if (value == "Sano") {
					if (position == "lingual") {
						global.Lingual = "Sano";
						vmOdonto.PaintCircle(global, "Lingual");

					} else if (position == "vestibular") {
						global.Vestibular = "Sano";
						vmOdonto.PaintCircle(global, "Vestibular");

					} else if (position == "oclusal") {
						global.Oclusal = "Sano";
						vmOdonto.PaintCircle(global, "Oclusal");

					} else if (position == "mesial") {
						global.Mesial = "Sano";
						vmOdonto.PaintCircle(global, "Mesial");

					} else if (position == "distal") {
						global.Distal = "Sano";
						vmOdonto.PaintCircle(global, "Distal");
					}
				}


			} else {


				vmOdonto.Dientes.forEach(function (diente) {

					vmOdonto.SellanteI(diente);
					vmOdonto.SellanteR(diente);
					vmOdonto.ExtraccionI(diente);
					vmOdonto.ExtraccionR(diente);
					vmOdonto.AusenteI(diente);
					vmOdonto.CoronaI(diente);
					vmOdonto.CoronaR(diente);
					vmOdonto.EndodonciaI(diente);
					vmOdonto.EndodonciaR(diente);
					vmOdonto.PuenteI(diente);
					vmOdonto.PuenteR(diente);
					vmOdonto.RemovidoI(diente);
					vmOdonto.RemovidoR(diente);
					vmOdonto.ProtesisI(diente);
					vmOdonto.ProtesisR(diente);

					vmOdonto.PaintCircle(diente, "Vestibular");
					vmOdonto.PaintCircle(diente, "Oclusal");
					vmOdonto.PaintCircle(diente, "Lingual");
					vmOdonto.PaintCircle(diente, "Mesial");
					vmOdonto.PaintCircle(diente, "Distal");



				});
			}
		}

		vmOdonto.Update = function (selected, data, value) {

			var id = selected.split(" ")[0];
			var teeth = selected.split(" ")[0].replace("d", "");
			var position = selected.split(" ")[1];

			if (isOdonto(position)) {
				data.filter(function (x) { return x.Numero == teeth })[0][position.capitalizeFirstLetter()] = value;
			} else {
				if (value == "Sano") {
					vmOdonto.Sano(data, selected);
				} else {
					data.filter(function (x) { return x.Numero == teeth })[0][value] = true;
				}
			}

		}

		vmOdonto.Trigger = function (ctx, value) {

			if (vmOdonto.IsNotView()) {
				vmOdonto.Update(ctx.Selected, vmOdonto.Dientes, value);
				vmOdonto.Parse(ctx.Selected, vmOdonto.Dientes, value);
			} else {
				error("No es posible editar en modo Vista");
			}
		}

		vmOdonto.MenuPrimario = [

		];



		vmOdonto.MenuSecundario = [
			//{ text: "Sano", action: function (ctx) { vmOdonto.Trigger(ctx, "Sano"); } },
			//{ text: "Caries", action: function (ctx) { vmOdonto.Trigger(ctx, "Caries"); } },
			//{ text: "Restauración", action: function (ctx) { vmOdonto.Trigger(ctx, "Composited"); } },
			//{ text: "Sellante Indicado", action: function (ctx) { vmOdonto.Trigger(ctx, "SellanteI"); } },
			//{ text: "Sellante Realizado", action: function (ctx) { vmOdonto.Trigger(ctx, "SellanteR"); } },
			//{ text: "Extracción Indicado", action: function (ctx) { vmOdonto.Trigger(ctx, "ExtraccionI"); } },
			//{ text: "Extracción Realizado", action: function (ctx) { vmOdonto.Trigger(ctx, "ExtraccionR"); } },
			//{ text: "Endodoncia Indicado", action: function (ctx) { vmOdonto.Trigger(ctx, "EndodonciaI"); } },
			//{ text: "Endodoncia Realizado", action: function (ctx) { vmOdonto.Trigger(ctx, "EndodonciaR"); } },
			//{ text: "Corona Indicado", action: function (ctx) { vmOdonto.Trigger(ctx, "CoronaI"); } },
			//{ text: "Corona Realizado", action: function (ctx) { vmOdonto.Trigger(ctx, "CoronaR"); } },
			//{ text: "Protesis Removible Indicado", action: function (ctx) { vmOdonto.Trigger(ctx, "RemovidoI"); } },
			//{ text: "Protesis Removible Realizado", action: function (ctx) { vmOdonto.Trigger(ctx, "RemovidoR"); } },
			//{ text: "Puente Indicado", action: function (ctx) { vmOdonto.Trigger(ctx, "PuenteI"); } },
			//{ text: "Puente Realizado", action: function (ctx) { vmOdonto.Trigger(ctx, "PuenteR"); } },
			//{ text: "Ausente", action: function (ctx) { vmOdonto.Trigger(ctx, "AusenteI"); } },
			//{ text: "Protesis Total Indicada", action: function (ctx) { vmOdonto.Trigger(ctx, "ProtesisI"); } },
			//{ text: "Protesis Total Realizada", action: function (ctx) { vmOdonto.Trigger(ctx, "ProtesisR"); } },



		];

		vmOdonto.Sano = function (data, selected) {


			var id = selected.split(" ")[0];
			var position = selected.split(" ")[1];
			var teeth = selected.split(" ")[0].replace("d", "");

			if (position == "puenteVarios" || position == "protesis") {
				var teeth2 = teeth.split(" ")[0].replace("_d", " ");
				var teeth3 = teeth2.split(" ")[0];
				var item = data.filter(function (x) { return x.Numero == teeth3 })[0];
			} else {
				var item = data.filter(function (x) { return x.Numero == teeth })[0];
			}


			if (position == "extraccion") {
				dental.Apply([{ diente: id, pieza: "extraccion", fill: "transparent", stroke: "transparent" }]);
				item.ExtraccionI = false;
				item.ExtraccionR = false;

			} else if (position == "dentina") {
				dental.Apply([{ diente: id, pieza: "dentina", fill: "transparent", stroke: "transparent" }]);
				item.EndodonciaI = false;
				item.EndodonciaR = false;

			} else if (position == "nervio") {
				dental.Apply([{ diente: id, pieza: "nervio", fill: "transparent", stroke: "transparent" }]);
				item.SellanteI = false;
				item.SellanteR = false;

			} else if (position == "cuello") {
				dental.Apply([{ diente: id, pieza: "cuello", fill: "transparent", stroke: "transparent" }]);
				item.AusenteI = false;

			} else if (position == "corona") {
				dental.Apply([{ diente: id, pieza: "corona", fill: "transparent", stroke: "transparent" }]);
				item.CoronaI = false;
				item.CoronaR = false;

			} else if (position == "puente") {
				dental.Apply([{ diente: id, pieza: "puente", fill: "transparent", stroke: "transparent" }]);
				for (var i = 0; i < data.length; i++) {

					data[i].ProtesisI = false;
					data[i].ProtesisR = false;
				}
			}
			else if (position == "puenteVarios") {
				dental.Apply([{ diente: id, pieza: "puenteVarios", fill: "transparent", stroke: "transparent" }]);
				item.PuenteI = false;
				item.PuenteR = false;

			}
			else if (position == "protesis") {
				dental.Apply([{ diente: id, pieza: "protesis", fill: "transparent", stroke: "transparent" }]);
				item.RemovidoI = false;
				item.RemovidoR = false;

			}


			//Esto es importante dental.SetState(id, "sano");



		}

		vmOdonto.PaintCircle = function (diente, position) {
			switch (diente[position]) {
				case "Sano": dental.Apply([{ diente: "d" + diente.Numero, pieza: position.toLowerCase(), fill: Color.Sano, stroke: "#282828" }]); break;
				case "Caries": dental.Apply([{ diente: "d" + diente.Numero, pieza: position.toLowerCase(), fill: Color.Caries, stroke: "#282828" }]); break;
				case "Composited": dental.Apply([{ diente: "d" + diente.Numero, pieza: position.toLowerCase(), fill: Color.Composited, stroke: "#282828" }]); break;
				case "Incrustacion": dental.Apply([{ diente: "d" + diente.Numero, pieza: position.toLowerCase(), fill: Color.Incrustacion, stroke: "#282828" }]); break;
			}
		}
		vmOdonto.AusenteIV = function (teeth, position, global) {

			dental.Apply([{ diente: "d" + teeth, pieza: "cuello", fill: "transparent", stroke: "transparent" }]);
			dental.Apply([{ diente: "d" + teeth, pieza: "cuello", fill: "transparent", stroke: "#000000" }]);
			global.AusenteI = true;
			global.AusenteR = false;

		}

		vmOdonto.ProtesisIV = function (teeth, position, global) {
			dental.Apply([{ diente: "d" + teeth, pieza: "puente", fill: "transparent", stroke: "transparent" }]);
			dental.Apply([{ diente: "d" + teeth, pieza: "puente", fill: "#EF3636", stroke: "#EF3636" }]);
			global.ProtesisI = true;
			global.ProtesisR = false;

		}
		vmOdonto.ProtesisRV = function (teeth, position, global) {

			dental.Apply([{ diente: "d" + teeth, pieza: "puente", fill: "transparent", stroke: "transparent" }]);
			dental.Apply([{ diente: "d" + teeth, pieza: "puente", fill: "#1b037c", stroke: "#1b037c" }]);
			global.ProtesisR = true;
			global.ProtesisI = false;

		}

		vmOdonto.CoronaIV = function (teeth, position, global) {

			dental.Apply([{ diente: "d" + teeth, pieza: "corona", fill: "transparent", stroke: "transparent" }]);
			dental.Apply([{ diente: "d" + teeth, pieza: "corona", fill: "#EF3636", stroke: "#EF3636" }]);
			global.CoronaI = true;
			global.CoronaR = false;

		}
		vmOdonto.CoronaRV = function (teeth, position, global) {

			dental.Apply([{ diente: "d" + teeth, pieza: "corona", fill: "transparent", stroke: "transparent" }]);
			dental.Apply([{ diente: "d" + teeth, pieza: "corona", fill: "#1b037c", stroke: "#1b037c" }]);
			global.CoronaR = true;
			global.CoronaI = false;

		}
		vmOdonto.EndodonciaIV = function (teeth, position, global) {

			dental.Apply([{ diente: "d" + teeth, pieza: "dentina", fill: "transparent", stroke: "transparent" }]);
			dental.Apply([{ diente: "d" + teeth, pieza: "dentina", fill: "#EF3636", stroke: "#EF3636" }]);
			global.EndodonciaI = true;
			global.EndodonciaR = false;

		}
		vmOdonto.EndodonciaRV = function (teeth, position, global) {

			dental.Apply([{ diente: "d" + teeth, pieza: "dentina", fill: "transparent", stroke: "transparent" }]);
			dental.Apply([{ diente: "d" + teeth, pieza: "dentina", fill: "#1b037c", stroke: "#1b037c" }]);
			global.EndodonciaR = true;
			global.EndodonciaI = false;

		}

		vmOdonto.SellanteIV = function (teeth, position, global) {

			dental.Apply([{ diente: "d" + teeth, pieza: "nervio", fill: "transparent", stroke: "transparent" }]);
			dental.Apply([{ diente: "d" + teeth, pieza: "nervio", fill: "#EF3636", stroke: "#EF3636" }]);
			global.SellanteI = true;
			global.SellanteR = false;

		}
		vmOdonto.SellanteRV = function (teeth, position, global) {

			dental.Apply([{ diente: "d" + teeth, pieza: "nervio", fill: "transparent", stroke: "transparent" }]);
			dental.Apply([{ diente: "d" + teeth, pieza: "nervio", fill: "#1b037c", stroke: "#1b037c" }]);
			global.SellanteR = true;
			global.SellanteI = false;

		}

		vmOdonto.ExtraccionIV = function (teeth, position, global) {

			dental.Apply([{ diente: "d" + teeth, pieza: "extraccion", fill: "transparent", stroke: "transparent" }]);
			dental.Apply([{ diente: "d" + teeth, pieza: "extraccion", fill: "#EF3636", stroke: "#EF3636" }]);
			global.ExtraccionI = true;
			global.ExtraccionR = false;
		}
		vmOdonto.ExtraccionRV = function (teeth, position, global) {

			dental.Apply([{ diente: "d" + teeth, pieza: "extraccion", fill: "transparent", stroke: "transparent" }]);
			dental.Apply([{ diente: "d" + teeth, pieza: "extraccion", fill: "#1b037c", stroke: "#1b037c" }]);
			global.ExtraccionR = true;
			global.ExtraccionI = false;
		}

		vmOdonto.PuenteIV = function (teeth, teeth2, position, global) {


			dental.Apply([{ diente: "d" + teeth + "_d" + teeth2, pieza: "puenteVarios", fill: "transparent", stroke: "transparent" }]);
			dental.Apply([{ diente: "d" + teeth + "_d" + teeth2, pieza: "puenteVarios", fill: "#EF3636", stroke: "#EF3636" }]);
			global.PuenteI = true;
			global.PuenteR = false;
		}
		vmOdonto.PuenteRV = function (teeth, teeth2, position, global) {

			dental.Apply([{ diente: "d" + teeth + "_d" + teeth2, pieza: "puenteVarios", fill: "transparent", stroke: "transparent" }]);
			dental.Apply([{ diente: "d" + teeth + "_d" + teeth2, pieza: "puenteVarios", fill: "#1b037c", stroke: "#1b037c" }]);
			global.PuenteR = true;
			global.PuenteI = false;
		}

		vmOdonto.RemovidoIV = function (teeth, teeth2, position, global) {

			dental.Apply([{ diente: "d" + teeth + "_d" + teeth2, pieza: "protesis", fill: "transparent", stroke: "transparent" }]);
			dental.Apply([{ diente: "d" + teeth + "_d" + teeth2, pieza: "protesis", fill: "transparent", stroke: "#EF3636" }]);
			global.RemovidoI = true;
			global.RemovidoR = false;
		}
		vmOdonto.RemovidoRV = function (teeth, teeth2, position, global) {

			dental.Apply([{ diente: "d" + teeth + "_d" + teeth2, pieza: "protesis", fill: "transparent", stroke: "transparent" }]);
			dental.Apply([{ diente: "d" + teeth + "_d" + teeth2, pieza: "protesis", fill: "transparent", stroke: "#1b037c" }]);
			global.RemovidoR = true;
			global.RemovidoI = false;
		}



		////////////////////////////////////////////
		vmOdonto.ProtesisI = function (diente) {
			if (diente.ProtesisI) {
				dental.Apply([{ diente: "d" + diente.Numero, pieza: "puente", fill: "transparent", stroke: "transparent" }]);
				dental.Apply([{ diente: "d" + diente.Numero, pieza: "puente", fill: "#EF3636", stroke: "#EF3636" }]);

			}
		}
		vmOdonto.ProtesisR = function (diente) {

			if (diente.ProtesisR) {

				dental.Apply([{ diente: "d" + diente.Numero, pieza: "puente", fill: "transparent", stroke: "transparent" }]);
				dental.Apply([{ diente: "d" + diente.Numero, pieza: "puente", fill: "#1b037c", stroke: "#1b037c" }]);

			}
		}

		vmOdonto.ExtraccionI = function (diente) {
			if (diente.ExtraccionI) {
				dental.Apply([{ diente: "d" + diente.Numero, pieza: "extraccion", fill: "transparent", stroke: "transparent" }]);
				dental.Apply([{ diente: "d" + diente.Numero, pieza: "extraccion", fill: "#EF3636", stroke: "#EF3636" }]);

			}
		}
		vmOdonto.ExtraccionR = function (diente) {

			if (diente.ExtraccionR) {

				dental.Apply([{ diente: "d" + diente.Numero, pieza: "extraccion", fill: "transparent", stroke: "transparent" }]);
				dental.Apply([{ diente: "d" + diente.Numero, pieza: "extraccion", fill: "#1b037c", stroke: "#1b037c" }]);

			}
		}
		vmOdonto.SellanteI = function (diente) {

			if (diente.SellanteI) {
				dental.Apply([{ diente: "d" + diente.Numero, pieza: "nervio", fill: "transparent", stroke: "transparent" }]);
				dental.Apply([{ diente: "d" + diente.Numero, pieza: "nervio", fill: "#EF3636", stroke: "#EF3636" }]);

			}
		}
		vmOdonto.SellanteR = function (diente) {
			if (diente.SellanteR) {

				dental.Apply([{ diente: "d" + diente.Numero, pieza: "nervio", fill: "transparent", stroke: "transparent" }]);
				dental.Apply([{ diente: "d" + diente.Numero, pieza: "nervio", fill: "#1b037c", stroke: "#1b037c" }]);

			}

		}

		vmOdonto.AusenteI = function (diente) {
			if (diente.AusenteI) {

				dental.Apply([{ diente: "d" + diente.Numero, pieza: "cuello", fill: "transparent", stroke: "transparent" }]);
				dental.Apply([{ diente: "d" + diente.Numero, pieza: "cuello", fill: "#1b037c", stroke: "#000000" }]);

			}
		}


		vmOdonto.CoronaI = function (diente) {
			if (diente.CoronaI) {
				dental.Apply([{ diente: "d" + diente.Numero, pieza: "corona", fill: "transparent", stroke: "transparent" }]);
				dental.Apply([{ diente: "d" + diente.Numero, pieza: "corona", fill: "#EF3636", stroke: "#EF3636" }]);

			}

		}
		vmOdonto.CoronaR = function (diente) {

			if (diente.CoronaR) {
				dental.Apply([{ diente: "d" + diente.Numero, pieza: "corona", fill: "transparent", stroke: "transparent" }]);
				dental.Apply([{ diente: "d" + diente.Numero, pieza: "corona", fill: "#EF3636", stroke: "#EF3636" }]);

			}
		}
		vmOdonto.EndodonciaI = function (diente) {

			if (diente.EndodonciaI) {
				dental.Apply([{ diente: "d" + diente.Numero, pieza: "dentina", fill: "transparent", stroke: "transparent" }]);
				dental.Apply([{ diente: "d" + diente.Numero, pieza: "dentina", fill: "#EF3636", stroke: "#EF3636" }]);

			}
		}
		vmOdonto.EndodonciaR = function (diente) {
			if (diente.EndodonciaR) {

				dental.Apply([{ diente: "d" + diente.Numero, pieza: "dentina", fill: "transparent", stroke: "transparent" }]);
				dental.Apply([{ diente: "d" + diente.Numero, pieza: "dentina", fill: "#1b037c", stroke: "#1b037c" }]);

			}

		}
		vmOdonto.PuenteI = function (diente) {
			if (diente.PuenteI) {
				dental.Apply([{ diente: "d" + diente.Numero + "_d" + diente.Numero2, pieza: "puenteVarios", fill: "transparent", stroke: "transparent" }]);
				dental.Apply([{ diente: "d" + diente.Numero + "_d" + diente.Numero2, pieza: "puenteVarios", fill: "#EF3636", stroke: "#EF3636" }]);

			}

		}
		vmOdonto.PuenteR = function (diente) {
			if (diente.PuenteR) {

				dental.Apply([{ diente: "d" + diente.Numero + "_d" + diente.Numero2, pieza: "puenteVarios", fill: "transparent", stroke: "transparent" }]);
				dental.Apply([{ diente: "d" + diente.Numero + "_d" + diente.Numero2, pieza: "puenteVarios", fill: "#1b037c", stroke: "#1b037c" }]);

			}

		}

		vmOdonto.RemovidoI = function (diente) {
			if (diente.RemovidoI) {
				dental.Apply([{ diente: "d" + diente.Numero + "_d" + diente.Numero2, pieza: "protesis", fill: "transparent", stroke: "transparent" }]);
				dental.Apply([{ diente: "d" + diente.Numero + "_d" + diente.Numero2, pieza: "protesis", fill: "transparent", stroke: "#EF3636" }]);

			}

		}
		vmOdonto.RemovidoR = function (diente) {
			if (diente.RemovidoR) {

				dental.Apply([{ diente: "d" + diente.Numero + "_d" + diente.Numero2, pieza: "protesis", fill: "transparent", stroke: "transparent" }]);
				dental.Apply([{ diente: "d" + diente.Numero + "_d" + diente.Numero2, pieza: "protesis", fill: "transparent", stroke: "#1b037c" }]);

			}

		}


		dental.MenuOdonto = vmOdonto.MenuSecundario;
		dental.MenuPeriodonto = vmOdonto.MenuSecundario;
		dental.OnLoaded = function () {
			dental.Draw();
			dental.Initialize();
			vmOdonto.Parse();
		};

		ko.cleanNode($("#contenidoHistoria")[0]);
		ko.applyBindings(vmOdonto, $("#contenidoHistoria")[0]);
	}

	function ran(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	var Color = {
		Sano: "#FFFFFF",
		Caries: "#EF3636",
		Sellante: "#4CAD55",
		Amalgama: "#BFBFBF",
		Composited: "#231cbc",
		Incrustacion: "#EF3636",
		Fractura: "#FB9B35",
		Surco: "#F1E66D"
	}



	if (isEmpty(vmOdonto)) {

		window.dental = new Dental("/Content/Images/OdontogramaFinal.svg");

		$.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			url: "/Odontograma/GetData?id=" + PersonaID,
			success: Knockout
		});

	} else {
		ko.cleanNode($("#contenidoHistoria")[0]);
		ko.applyBindings(vmOdonto, $("#contenidoHistoria")[0]);
		dental.Reload("/Content/Images/OdontogramaFinal.svg");
		dental.Draw();
		dental.Initialize();
		vmOdonto.Parse();
	}
});