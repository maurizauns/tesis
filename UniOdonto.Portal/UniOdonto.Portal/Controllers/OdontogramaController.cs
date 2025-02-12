﻿using AutoMapper;
using jsreport.Client;
using MvcJqGrid;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using UniOdonto.BO;
using UniOdonto.DAL;
using UniOdonto.DAL.Entidad;
using UniOdonto.Models;
using UniOdonto.Resources;

namespace UniOdonto.Controllers
{
    public class OdontogramaController : BaseController<Guid, Odontograma, OdontogramaViewModel>
    {
        private readonly DienteService DienteService;
        private readonly WebVentasContext db = new WebVentasContext();
        private readonly EvolucionesOdontogramaService EvolucionesOdontogramaService;
        private readonly PersonaService PersonaService;
        public OdontogramaController()
        {
            Title = "Odontograma";
            DienteService = new DienteService();
            EvolucionesOdontogramaService = new EvolucionesOdontogramaService();
            PersonaService = new PersonaService();
            EntityService = new OdontogramaService();
        }
        protected override IQueryable<Odontograma> ApplyFilters(IQueryable<Odontograma> generalQuery, Rule[] filters)
        {
            throw new NotImplementedException();
        }

        protected override string[] GetRow(Odontograma item)
        {
            throw new NotImplementedException();
        }

        protected override OdontogramaViewModel MapperEntityToModel(Odontograma entity)
        {
            return Mapper.Map<Odontograma, OdontogramaViewModel>(entity);
        }

        protected DienteViewModel MapperEntityToModelDiente(Diente entity)
        {
            return Mapper.Map<Diente, DienteViewModel>(entity);
        }

        protected override Odontograma MapperModelToEntity(OdontogramaViewModel viewModel)
        {
            var agenda = new Odontograma();
            if (viewModel.Id != null && viewModel.Id != Guid.Empty)
            {
                agenda = EntityService.GetById(viewModel.Id.Value);
                agenda.Personas = PersonaService.GetById(viewModel.PersonasId);
            }
            return Mapper.Map(viewModel, agenda);
        }

        public ActionResult Odontograma()
        {
            return PartialView();
        }

        [HttpGet]
        public async Task<JsonResult> GetData(Guid id)
        {
            var consultas = await EntityService.GetAll().Where(x => x.PersonasId == id).ToListAsync();
            var consultasDto = Mapper.Map<List<OdontogramaViewModel>>(consultas);
            return Json(consultasDto.OrderByDescending(x => x.Fecha), JsonRequestBehavior.AllowGet);
        }

        public async Task<ActionResult> GetEmpty(Guid id)
        {
            var Dientes = new List<Diente>();
            var LastOdontogram = EntityService.Where(x => x.PersonasId == id).OrderByDescending(x => x.Id).FirstOrDefault();
            if (LastOdontogram == null)
            {
                var Numbers = new int[] {18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26,
                27, 28, 55, 54, 53, 52, 51, 61, 62, 63, 64, 65, 85, 84, 83, 82, 81, 71, 72,
                73, 74, 75, 48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38 };


                foreach (int number in Numbers)
                {
                    Dientes.Add(new Diente()
                    {
                        Numero2 = number,
                        Numero = number,
                        Vestibular = "Sano",
                        Oclusal = "Sano",
                        Lingual = "Sano",
                        Distal = "Sano",
                        Mesial = "Sano",
                        SellanteI = false,
                        SellanteR = false,
                        ExtraccionI = false,
                        ExtraccionR = false,
                        AusenteI = false,
                        CoronaI = false,
                        CoronaR = false,
                        EndodonciaI = false,
                        EndodonciaR = false,
                        PuenteI = false,
                        PuenteR = false,
                        RemovidoI = false,
                        RemovidoR = false,
                        ProtesisI = false,
                        ProtesisR = false,
                        Color = "#FFFFFF"
                    });
                }
            }
            else
            {
                Dientes = await DienteService.Where(x => x.OdontogramaId == LastOdontogram.Id).ToListAsync();
            }

            Odontograma presupuesto = await EntityService.Where(s => s.PersonasId == id).OrderByDescending(r => r.Fecha).FirstOrDefaultAsync();

            OdontogramaViewModel presupuestoDTO = Mapper.Map<OdontogramaViewModel>(presupuesto);

            var _Dientes = Mapper.Map<List<Diente>, List<DienteViewModel>>(Dientes);
            return Json(new { Data = _Dientes, Odontograma = presupuestoDTO }, JsonRequestBehavior.AllowGet);
        }



        public virtual async Task<ActionResult> SaveOdontograma(Odontograma _Odontograma, List<EvolucionesOdontogramaViewModel> EvolucionesListado)
        {

            List<EvolucionesOdontograma> evolucion = new List<EvolucionesOdontograma>();
            EvolucionesOdontograma evo = new EvolucionesOdontograma();
            if (EvolucionesListado != null)
            {
                foreach (var item in EvolucionesListado)
                {
                    evo = new EvolucionesOdontograma
                    {
                        Cara = item.Cara,
                        Cara1 = item.Cara1,
                        Cara2 = item.Cara2,
                        Cara3 = item.Cara3,
                        Cara4 = item.Cara4,
                        Diente = item.Diente,
                        Id = Guid.Empty,
                        Pieza = item.Pieza,
                        Pieza2 = item.Pieza2,
                        EstadoDiente = item.EstadoDiente,
                        Indicacion = item.Indicacion,
                        EvolucionDate = DateTime.ParseExact(item.EvolucionDate, "dd/MM/yyyy HH:mm", CultureInfo.InvariantCulture)
                    };
                    evolucion.Add(evo);
                }
            }
            try
            {
                _Odontograma.Evoluciones = evolucion;
                db.Odontograma.Add(_Odontograma);
                await db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                var a = ex;
            }
            return await Task.Run(() => Json(Mapper.Map<OdontogramaViewModel>(_Odontograma), JsonRequestBehavior.AllowGet));


            //OnBeginCrudAction();

            //if (!ModelState.IsValid)
            //{
            //    return await Task.Run(() => Json(new { success = false, message = GetValidationMessages() }, JsonRequestBehavior.AllowGet));
            //}

            //try
            //{
            //    var entity = MapperModelToEntity(model);

            //    var saveResult = await EntityService.SaveAsync(entity);

            //    if (saveResult.Succeeded)
            //    {
            //        return await Task.Run(() => Json(new { data = MapperEntityToModel(entity), success = true, message = string.Empty }, JsonRequestBehavior.AllowGet));
            //    }

            //    return await Task.Run(() => Json(new { success = false, message = saveResult.GetErrorsString() }, JsonRequestBehavior.AllowGet));
            //}
            //catch (Exception ex)
            //{
            //    return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            //}
        }

        public async Task<ActionResult> UpdateOdontograma(Odontograma _Odontograma, List<EvolucionesOdontogramaViewModel> EvolucionListado)
        {
            try
            {

                string queryUpdate = @"DELETE FROM EvolucionesOdontograma WHERE OdontogramaId like '" + _Odontograma.Id + "'";
                db.Database.ExecuteSqlCommand(queryUpdate);

                List<EvolucionesOdontograma> evolucion = new List<EvolucionesOdontograma>();
                EvolucionesOdontograma evo = new EvolucionesOdontograma();
                if (EvolucionListado != null)
                {
                    foreach (var item in EvolucionListado)
                    {
                        evo = new EvolucionesOdontograma();
                        evo.Cara = item.Cara;
                        evo.Cara1 = item.Cara1;
                        evo.Cara2 = item.Cara2;
                        evo.Cara3 = item.Cara3;
                        evo.Cara4 = item.Cara4;
                        evo.Diente = item.Diente;
                        evo.OdontogramaId = _Odontograma.Id;
                        evo.Pieza = item.Pieza;
                        evo.Pieza2 = item.Pieza2;
                        evo.EstadoDiente = item.EstadoDiente;
                        evo.Indicacion = item.Indicacion;
                        evo.EvolucionDate = DateTime.ParseExact(item.EvolucionDate.Trim(), "dd/MM/yyyy HH:mm", CultureInfo.InvariantCulture);

                        db.EvolucionesOdontograma.Add(evo);
                    }

                }

                db.Entry(_Odontograma).State = EntityState.Modified;
                db.Entry(_Odontograma).Property(m => m.Fecha).IsModified = false;
                await db.SaveChangesAsync();

                _Odontograma.Evoluciones = evolucion;


                var result = Mapper.Map<Odontograma, OdontogramaViewModel>(_Odontograma);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public async Task<ActionResult> PostDientes(List<Diente> Dientes)
        {
            try
            {
                await DienteService.CreateRangeAsync(Dientes);
            }
            catch (Exception ex)
            {
                var a = ex;
            }
            return Json(Dientes, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public async Task<ActionResult> UpdateDientes(List<Diente> Dientes)
        {
            try
            {
                foreach (Diente d in Dientes)
                {
                    db.Entry(d).State = EntityState.Modified;
                }
                await db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                var a = ex;
            }

            return Json(Dientes, JsonRequestBehavior.AllowGet);
        }

        public virtual async Task<ActionResult> GetEntityId(Guid id)
        {
            OnBeginCrudAction();

            List<Diente> entity = await DienteService.Where(x => x.OdontogramaId == id).ToListAsync();

            if (entity == null)
            {
                return await Task.Run(() => Json(new { success = false, message = "Elemento no existe" }, JsonRequestBehavior.AllowGet));
            }
            return await Task.Run(() => Json(Mapper.Map<List<DienteViewModel>>(entity), JsonRequestBehavior.AllowGet));
        }

        protected override void Dispose(bool disposing)
        {
            EntityService.Dispose();
            DienteService.Dispose();
            EvolucionesOdontogramaService.Dispose();
            base.Dispose(disposing);
        }

        public async Task<ActionResult> Print(string curva2, Guid id)
        {
            var consulta = EntityService.GetById(id);
            OdontogramaViewModel consultaDto = Mapper.Map<OdontogramaViewModel>(consulta);
            ReportingService _reportingService = new ReportingService("https://simecmexico.jsreportonline.net/", "p.almeida@sistemawebmedico.com", "Simec2015");
            var report = await _reportingService
               .RenderAsync("ryYnwEtJP", new
               {
                   Consulta = consultaDto,
                   Imagen = curva2
               });

            var name = Guid.NewGuid().ToString();

            MemoryStream ms = new MemoryStream();

            report.Content.CopyTo(ms);

            //write to file
            FileStream file = new FileStream(Server.MapPath("~/Content/Reports/" + name + ".pdf"), FileMode.Create, FileAccess.Write);
            ms.WriteTo(file);

            file.Close();
            ms.Close();

            return Json(new { File = name }, JsonRequestBehavior.AllowGet);
        }

        public class DeleteFileAttribute : ActionFilterAttribute
        {
            public override void OnActionExecuted(ActionExecutedContext filterContext)
            {
                var file = filterContext.Controller.ValueProvider.GetValue("id").AttemptedValue;
                string fullPath = filterContext.Controller.ControllerContext.HttpContext.Server.MapPath("~/Content/Reports/" + file + ".pdf");
                if (System.IO.File.Exists(fullPath))
                {
                    System.IO.File.Delete(fullPath);
                }
            }
        }

        [DeleteFile]
        public FileContentResult DownloadPdf(string id)
        {
            byte[] fileBytes = System.IO.File.ReadAllBytes(Server.MapPath("~/Content/Reports/" + id + ".pdf"));
            return File(fileBytes, "application/pdf");
        }
    }
}