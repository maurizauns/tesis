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
using UniOdonto.Resources;

namespace UniOdonto.Controllers
{
    public class OdontogramaController : BaseController<Guid, Odontograma, OdontogramaViewModel>
    {
		private readonly DienteService DienteService;
		private readonly WebVentasContext db= new WebVentasContext();
		private readonly EvolucionesOdontogramaService EvolucionesOdontogramaService;
		public OdontogramaController()
        {
            Title = "Odontograma";
			DienteService = new DienteService();
			EvolucionesOdontogramaService = new EvolucionesOdontogramaService();
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

		protected  DienteViewModel MapperEntityToModelDiente(Diente entity)
		{
			return Mapper.Map<Diente, DienteViewModel>(entity);
		}

		protected override Odontograma MapperModelToEntity(OdontogramaViewModel viewModel)
        {
			var agenda = new Odontograma();
			if (viewModel.Id != null && viewModel.Id != Guid.Empty)
			{
				agenda = EntityService.GetById(viewModel.Id.Value);
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

		public virtual async Task<ActionResult> SaveOdontograma(OdontogramaViewModel model)
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

		public virtual async Task<ActionResult> UpdateOdontograma(OdontogramaViewModel model)
		{
			OnBeginCrudAction();

			if (!ModelState.IsValid)
			{
				return await Task.Run(() => Json(new { success = false, message = GetValidationMessages() }, JsonRequestBehavior.AllowGet));
			}

			try
			{
				var result = await EntityService.GetAll().Include(x=>x.Dientes).FirstOrDefaultAsync(x => x.Id == model.Id.Value);
				model.Dientes = Mapper.Map<List<DienteViewModel>>(result.Dientes.ToList());
				model.Dientes.ToList().ForEach(x => x.OdontogramaId = Guid.Empty);
				model.Dientes.ToList().ForEach(x => x.Id = Guid.Empty);
				model.Personas = null;
				if (result != null)
				{
					var evoluciones = await db.EvolucionesOdontograma.Where(x => x.OdontogramaId == model.Id.Value).ToListAsync();
					db.EvolucionesOdontograma.RemoveRange(evoluciones);
					db.SaveChanges();
				}

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

		public virtual async Task<ActionResult> GetEntityId(Guid id)
		{
			OnBeginCrudAction();

			List<Diente> entity = await DienteService.Where(x=>x.OdontogramaId == id).ToListAsync();

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
	}
}