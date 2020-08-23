using ClosedXML.Excel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using UniOdonto.BO;
using UniOdonto.DAL.Entidad;

namespace UniOdonto.Comun
{
    public class ExportAppointmentResult : ActionResult
    {
        public string WorksheetName { get; set; }
        #region Fila


        public FilaExcel FilaExcel = new FilaExcel()
            {
            new CeldaExcel("EMPRESA"),
            new CeldaExcel("TIPO IDENTIFICACION"),
            new CeldaExcel("IDENTIFICACION"),
            new CeldaExcel("FECHA DE NACIMIENTO"),
            new CeldaExcel("EDAD"),
            new CeldaExcel("NOMBRE COMPLETO"),
            new CeldaExcel("FECHA DE CITA"),
            new CeldaExcel("HORA"),
            new CeldaExcel("TIPO DE CITA"),
            new CeldaExcel("ESTADO DE CITA"),

            };

        #endregion
        private string FileName { get; set; }
        private string Path { get; set; }

        public IQueryable<Appointment> Query { get; set; }
        public ControllerContext Context { get; set; }

        public ExportAppointmentResult() : this(null)
        {

        }

        public ExportAppointmentResult(IQueryable<Appointment> query)
        {
            WorksheetName = "Appointment";
            Query = query;
        }

        public override void ExecuteResult(ControllerContext context)
        {
            Context = context;

            if (ExportData())
            {
                context.HttpContext.Response.Buffer = true;
                context.HttpContext.Response.Clear();
                context.HttpContext.Response.AddHeader("content-disposition", "attachment; filename=" + FileName);
                context.HttpContext.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                context.HttpContext.Response.WriteFile(Path);
            }
        }

        private bool ExportData()
        {
            try
            {
                var lista = Query.Select(f => f.Id).ToList();
                var wb = new XLWorkbook();

                var ws = wb.Worksheets.Add(WorksheetName);

                //Cabecera
                foreach (var celdaExcel in FilaExcel)
                {
                    ws.Cell(celdaExcel.Celda).Value = celdaExcel.Nombre;
                }

                if (lista.Any())
                {
                    var service = new AppointmentService();
                    foreach (var formularioId in lista)
                    {
                        try
                        {
                            var categoria = service.GetByIdInclude(formularioId);
                            FilaExcel.NewFila();
                            FilaExcel.NextCell().Valor = categoria.Personas.Empresa.NombreCompleto;
                            FilaExcel.NextCell().Valor = categoria.Personas.TipoIdentificacion.Descripcion;
                            FilaExcel.NextCell().Valor = string.Format("'{0}", categoria.Personas.Identificacion);
                            FilaExcel.NextCell().Valor = categoria.Personas.FechaNacimiento.Value.ToString(Comun.Context.FormatoFecha);
                            FilaExcel.NextCell().Valor = string.Format("{0} años", Portal.Helpers.CalculoEdad.Edad(categoria.Personas.FechaNacimiento.Value));
                            FilaExcel.NextCell().Valor = categoria.Personas.NombreCompleto.ToUpper();
                            FilaExcel.NextCell().Valor = categoria.AppointmentDate.ToString(Comun.Context.FormatoFecha);
                            FilaExcel.NextCell().Valor = categoria.AppointmentDate.ToString(Comun.Context.FormatoHora);
                            FilaExcel.NextCell().Valor = categoria.TipoCita.Descripcion;
                            FilaExcel.NextCell().Valor = categoria.EstadoCita.Descripcion;
                        }
                        catch (Exception ex)
                        {
                            FilaExcel.NextCell().Valor = ex.Message;
                        }

                        foreach (var celda in FilaExcel)
                        {
                            ws.Cell(celda.Celda).Value = celda.Valor;

                        }
                    }
                }
                ws.Range(1, 1, 1, 10).Style.Fill.BackgroundColor = XLColor.FromArgb(20, 108, 187);
                ws.Range(1, 1, 1, 10).Style.Font.FontColor = XLColor.FromArgb(255, 255, 255);
                ws.Range(1, 1, 1, 10).Style.Font.Bold = true;
                ws.Range(1, 1, 1, 10).Style.Font.FontSize = 10;
                ws.Columns().AdjustToContents();

                ws.RangeUsed().SetAutoFilter();

                FileName = "Appointment.xlsx";
                Path = Context.HttpContext.Server.MapPath(FileName).ToLower().Replace("\\appointment\\", "\\temp\\");
                wb.SaveAs(Path);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        private string GetCodigo(BaseConfiguracionGeneral entity)
        {
            return entity != null ? entity.Codigo : "";
        }
    }
}