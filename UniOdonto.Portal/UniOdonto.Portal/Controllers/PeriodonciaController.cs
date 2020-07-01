using AutoMapper;
using MvcJqGrid;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using UniOdonto.BO;
using UniOdonto.DAL;
using UniOdonto.DAL.Entidad;
using UniOdonto.Models;

namespace UniOdonto.Controllers
{
    public class PeriodonciaController : BaseController<Guid, Periodoncia, PeriodonciaViewModel>
    {
        private readonly WebVentasContext db = new WebVentasContext();
        private readonly DientesPerioService dientesPerioService;
        public PeriodonciaController()
        {
            Title = "Periodoncia";
            dientesPerioService = new DientesPerioService();
            EntityService = new PeriodonciaService();
        }
        protected override IQueryable<Periodoncia> ApplyFilters(IQueryable<Periodoncia> generalQuery, Rule[] filters)
        {
            throw new NotImplementedException();
        }

        protected override string[] GetRow(Periodoncia item)
        {
            throw new NotImplementedException();
        }

        protected override PeriodonciaViewModel MapperEntityToModel(Periodoncia entity)
        {
            return Mapper.Map<Periodoncia, PeriodonciaViewModel>(entity);
        }

        protected override Periodoncia MapperModelToEntity(PeriodonciaViewModel viewModel)
        {
            var agenda = new Periodoncia();
            if (viewModel.Id != null && viewModel.Id != Guid.Empty)
            {
                agenda = EntityService.GetById(viewModel.Id.Value);
            }
            return Mapper.Map(viewModel, agenda);
        }

        public ActionResult Periodoncia()
        {
            return PartialView();
        }

        [HttpGet]
        public async Task<JsonResult> GetData(Guid id)
        {
            var consultas = await EntityService.GetAll().Where(x => x.PersonasId == id).ToListAsync();
            var consultasDto = Mapper.Map<List<PeriodonciaViewModel>>(consultas);
            return Json(consultasDto.OrderByDescending(x => x.Id), JsonRequestBehavior.AllowGet);
        }

        public async Task<ActionResult> GetEmptyPeriodoncia(Guid id)
        {
            var Dientes = new List<DientesPerio>();
            var LastOdontogram = EntityService.Where(x => x.PersonasId == id).OrderByDescending(x => x.Id).FirstOrDefault();
            if (LastOdontogram == null)
            {
                var Numbers = new int[] {18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26,
                27, 28,48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38 };


                foreach (int number in Numbers)
                {
                    Dientes.Add(new DientesPerio()
                    {
                        Numero = number,
                        Implante = 0,
                        Movilidad = 0,
                        Pronostico = null,
                        Furca = 0,
                        Sangrado1 = 0,
                        Sangrado2 = 0,
                        Sangrado3 = 0,
                        Placa1 = 0,
                        Placa2 = 0,
                        Placa3 = 0,
                        Anchura = null,
                        Margen1 = 0,
                        Margen2 = 0,
                        Margen3 = 0,
                        Profundidad1 = 0,
                        Profundidad2 = 0,
                        Profundidad3 = 0,
                        FurcaDos = 0,
                        Ausente = false,
                        ProfundidadB1 = 0,
                        ProfundidadB2 = 0,
                        ProfundidadB3 = 0,
                        MargenB1 = 0,
                        MargenB2 = 0,
                        MargenB3 = 0,
                        PlacaB1 = 0,
                        PlacaB2 = 0,
                        PlacaB3 = 0,
                        NIC1 = 0,
                        NIC2 = 0,
                        NIC3 = 0,
                        NICB1 = 0,
                        NICB2 = 0,
                        NICB3 = 0,
                        SangradoB1 = 0,
                        SangradoB2 = 0,
                        SangradoB3 = 0,
                        Nota = null,
                        FurcaB = 0,
                        FurcaBDos = 0

                    });
                }
            }
            else
            {
                Dientes = await dientesPerioService.Where(x => x.PeriodonciaId == LastOdontogram.Id).ToListAsync();
            }


            Periodoncia presupuesto = await EntityService.Where(s => s.PersonasId == id).OrderByDescending(r => r.Fecha).FirstOrDefaultAsync();

            PeriodonciaViewModel presupuestoDTO = Mapper.Map<PeriodonciaViewModel>(presupuesto);

            var _Dientes = Mapper.Map<List<DientesPerio>, List<DientesPerioViewModel>>(Dientes);
            return Json(new { Data = _Dientes, Periodoncia = presupuestoDTO }, JsonRequestBehavior.AllowGet);
        }

        public virtual async Task<ActionResult> SavePeriodoncia(PeriodonciaViewModel model)
        {
            OnBeginCrudAction();

            if (!ModelState.IsValid)
            {
                return await Task.Run(() => Json(new { success = false, message = GetValidationMessages() }, JsonRequestBehavior.AllowGet));
            }

            try
            {
                var entity = MapperModelToEntity(model);

                var saveResult = await EntityService.SaveAsync(entity);

                if (saveResult.Succeeded)
                {
                    return await Task.Run(() => Json(new { data = MapperEntityToModel(entity), success = true, message = string.Empty }, JsonRequestBehavior.AllowGet));
                }

                return await Task.Run(() => Json(new { success = false, message = saveResult.GetErrorsString() }, JsonRequestBehavior.AllowGet));
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public async Task<ActionResult> PostDientesPeriodoncia(List<DientesPerio> Dientes)
        {
            try
            {
                await dientesPerioService.CreateRangeAsync(Dientes);
            }
            catch (Exception ex)
            {
                throw (ex);
            }

            return Json(Dientes, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetDientesPeriodoncia(Guid id)
        {
            var Dientes = dientesPerioService.Where(x => x.PeriodonciaId == id).ToList();
            var result = Mapper.Map<List<DientesPerio>, List<DientesPerioViewModel>>(Dientes);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public async Task<ActionResult> UpdatePeriodoncia(Periodoncia _Periodoncia)
        {
            try
            {
                db.Entry(_Periodoncia).State = EntityState.Modified;
                db.Entry(_Periodoncia).Property(m => m.Fecha).IsModified = false;
                await db.SaveChangesAsync();

                var result = Mapper.Map<Periodoncia, PeriodonciaViewModel>(_Periodoncia);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        //PostDientes
        [HttpPost]
        public async Task<ActionResult> UpdatePeriodonciaDientes(List<DientesPerio> Dientes)
        {
            try
            {
                foreach (DientesPerio d in Dientes)
                {
                    db.Entry(d).State = EntityState.Modified;
                }
                await db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Json(Dientes, JsonRequestBehavior.AllowGet);
        }
    }
}