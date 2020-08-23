using AutoMapper;
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

namespace UniOdonto.Controllers
{
    public class RecetaController : BaseController<Guid, Receta, RecetaViewModel>
    {
        private readonly PersonaService personaService;
        public RecetaController()
        {
            personaService = new PersonaService();
            EntityService = new RecetaService();
            Title = "Recetas";
        }

        public ActionResult Receta()
        {
            return PartialView();
        }
        //public override void OnBeginIndex()
        //{

        //}

        protected override IQueryable<Receta> ApplyFilters(IQueryable<Receta> generalQuery, Rule[] filters)
        {
            throw new NotImplementedException();
        }

        protected override string[] GetRow(Receta item)
        {
            throw new NotImplementedException();
        }

        protected override RecetaViewModel MapperEntityToModel(Receta entity)
        {
            return Mapper.Map<Receta, RecetaViewModel>(entity);
        }

        protected override Receta MapperModelToEntity(RecetaViewModel viewModel)
        {
            var agenda = new Receta();
            if (viewModel.Id != null && viewModel.Id != Guid.Empty)
            {
                agenda = EntityService.GetById(viewModel.Id.Value);
                agenda.Personas = viewModel.PersonasId != null ? personaService.FirstOrDefault(x => x.Id == viewModel.PersonasId) : null;
            }
            return Mapper.Map(viewModel, agenda);
        }

        [HttpGet]
        public async Task<JsonResult> GetData(Guid id)
        {
            var consultas = await EntityService.GetAll().Where(x => x.PersonasId == id).OrderByDescending(x => x.FechaCreacion).ToListAsync();
            var consultasDto = Mapper.Map<List<RecetaViewModel>>(consultas);
            return Json(new { consultasDto = consultasDto }, JsonRequestBehavior.AllowGet);
        }

        public async Task<ActionResult> Print(Guid id)
        {
            var consulta = EntityService.GetById(id);
            RecetaViewModel consultaDto = Mapper.Map<RecetaViewModel>(consulta);
            ReportingService _reportingService = new ReportingService("https://simecmexico.jsreportonline.net/", "p.almeida@sistemawebmedico.com", "Simec2015");
            var report = await _reportingService
               .RenderAsync("H1e5e4IGeD", new
               {
                   Consulta = consultaDto,
               });

            FileStreamResult result = new FileStreamResult(report.Content, report.ContentType.MediaType);
            return result;
        }
    }
}