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
using UniOdonto.DAL.Entidad;
using UniOdonto.Models;

namespace UniOdonto.Controllers
{
    public class ConsultasController : BaseController<Guid, Consultas, ConsultasViewModel>
    {
        public ConsultasController()
        {
            Title = "Cosultas";
            EntityService = new ConsultaService();
        }
        

        protected override IQueryable<Consultas> ApplyFilters(IQueryable<Consultas> generalQuery, Rule[] filters)
        {
            throw new NotImplementedException();
        }

        protected override string[] GetRow(Consultas item)
        {
            throw new NotImplementedException();
        }

        protected override ConsultasViewModel MapperEntityToModel(Consultas entity)
        {
            return Mapper.Map<Consultas, ConsultasViewModel>(entity);
        }

        protected override Consultas MapperModelToEntity(ConsultasViewModel viewModel)
        {
            var agenda = new Consultas();
            if (viewModel.Id != null && viewModel.Id != Guid.Empty)
            {
                agenda = EntityService.GetById(viewModel.Id.Value);
            }
            return Mapper.Map(viewModel, agenda);
        }

        public ActionResult Consultas()
        {
            return PartialView();
        }

        [HttpGet]
        public async Task<JsonResult> GetData(Guid id)
        {
            var consultas = await EntityService.GetAll().Where(x=>x.PersonasId == id).ToListAsync();
            var consultasDto = Mapper.Map<List<ConsultasViewModel>>(consultas);
            return Json(new { consultasDto} , JsonRequestBehavior.AllowGet);
        }
    }
}