using AutoMapper;
using MvcJqGrid;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using UniOdonto.BO;
using UniOdonto.DAL.Entidad;
using UniOdonto.Models;

namespace UniOdonto.Controllers
{
    public class AntecedentesController : BaseController<Guid, Antecedentes, AntecedentesViewModel>
    {
        private readonly PersonaService PersonaService;
        public AntecedentesController()
        {
            EntityService = new AntecedenteService();
            PersonaService = new PersonaService();
            Title = "Antecedentes";
        }
        protected override IQueryable<Antecedentes> ApplyFilters(IQueryable<Antecedentes> generalQuery, Rule[] filters)
        {
            throw new NotImplementedException();
        }

        protected override string[] GetRow(Antecedentes item)
        {
            throw new NotImplementedException();
        }

        protected override AntecedentesViewModel MapperEntityToModel(Antecedentes entity)
        {
            return Mapper.Map<Antecedentes, AntecedentesViewModel>(entity);
        }

        protected override Antecedentes MapperModelToEntity(AntecedentesViewModel viewModel)
        {
            var producto = EntityService.FirstOrDefault(x => x.PersonasId == viewModel.PersonasId);
            if (producto != null)
            {
                producto.Personas = PersonaService.GetById(viewModel.PersonasId);
                viewModel.Id = producto.Id;
            }
            else {
                producto = new Antecedentes();
                viewModel.Id = Guid.Empty;
            }

            return Mapper.Map(viewModel, producto);
        }

        public ActionResult Antecedentes(Guid id)
        {
            var model = new AntecedentesViewModel();
            var formulario = EntityService.FirstOrDefault(x => x.PersonasId == id);
            if (formulario != null)
            {
                model = MapperEntityToModel(formulario);
            }
            model.PersonasId = id;
            return PartialView(model);
        }

        [HttpPost]
        public virtual async Task<ActionResult> SaveAntecedentes(AntecedentesViewModel model)
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
                    return await Task.Run(() => Json(new { success = true, message = string.Empty }, JsonRequestBehavior.AllowGet));
                }

                return await Task.Run(() => Json(new { success = false, message = saveResult.GetErrorsString() }, JsonRequestBehavior.AllowGet));
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}