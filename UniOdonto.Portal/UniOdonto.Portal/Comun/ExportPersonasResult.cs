using ClosedXML.Excel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using UniOdonto.BO;
using UniOdonto.DAL.Entidad;

namespace UniOdonto.Comun
{
    public class ExportPersonasResult : ActionResult
    {
        public string WorksheetName { get; set; }
        #region Fila


        public FilaExcel FilaExcel = new FilaExcel()
            {
            new CeldaExcel("EMPRESA"),
            new CeldaExcel("TIPO IDENTIFICACION"),
            new CeldaExcel("IDENTIFICACION"),
            new CeldaExcel("NOMBRE COMPLETO"),
            new CeldaExcel("NOMBRE COMERCIAL"),
            new CeldaExcel("TELEFONO"),
            new CeldaExcel("DIRECCION"),
            new CeldaExcel("EMAIL"),
            new CeldaExcel("ES EXTRANJERO"),
            new CeldaExcel("PROVINCIA"),
            new CeldaExcel("CANTON"),
            };

        #endregion
        private string FileName { get; set; }
        private string Path { get; set; }

        public IQueryable<Personas> Query { get; set; }
        public ControllerContext Context { get; set; }

        public ExportPersonasResult() : this(null)
        {

        }

        public ExportPersonasResult(IQueryable<Personas> query)
        {
            WorksheetName = "Personas";
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
                    var service = new PersonaService();
                    var cuentaBancaria = new SelectList(new List<SelectListItem>
                        {
                            new SelectListItem { Selected = false, Value = "CA", Text = "Cuenta de Ahorros"},
                            new SelectListItem { Selected = false, Value = "CC", Text = "Cuenta Corriente"},
                        }, "Value", "Text", null);
                    foreach (var formularioId in lista)
                    {
                        try
                        {




                            var categoria = service.GetByIdInclude(formularioId);
                            FilaExcel.NewFila();
                            FilaExcel.NextCell().Valor = categoria.Empresa.NombreCompleto;
                            FilaExcel.NextCell().Valor = categoria.TipoIdentificacion.Descripcion;
                            FilaExcel.NextCell().Valor = string.Format("'{0}", categoria.Identificacion);
                            FilaExcel.NextCell().Valor = categoria.NombreCompleto.ToUpper();
                            FilaExcel.NextCell().Valor = categoria.NombreComercial != null ? categoria.NombreComercial.ToUpper() : "";
                            FilaExcel.NextCell().Valor = categoria.Telefonos;
                            FilaExcel.NextCell().Valor = categoria.Direccion;
                            FilaExcel.NextCell().Valor = categoria.Email != null ? categoria.Email.Replace(" ", ";") : "";
                            FilaExcel.NextCell().Valor = categoria.Extranjero == true ? "SI" : "NO";
                            FilaExcel.NextCell().Valor = categoria.ProvinciasId.HasValue ? categoria.Provincias.Descripcion.ToUpper() : "";
                            FilaExcel.NextCell().Valor = categoria.CantonesId.HasValue ? categoria.Cantones.Descripcion.ToUpper() : "";

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
                ws.Range(1, 1, 1, 11).Style.Fill.BackgroundColor = XLColor.FromArgb(20, 108, 187);
                ws.Range(1, 1, 1, 11).Style.Font.FontColor = XLColor.FromArgb(255, 255, 255);
                ws.Range(1, 1, 1, 11).Style.Font.Bold = true;
                ws.Range(1, 1, 1, 11).Style.Font.FontSize = 10;
                ws.Columns().AdjustToContents();

                ws.RangeUsed().SetAutoFilter();

                FileName = "Personas.xlsx";
                Path = Context.HttpContext.Server.MapPath(FileName).ToLower().Replace("\\personas\\", "\\temp\\");
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