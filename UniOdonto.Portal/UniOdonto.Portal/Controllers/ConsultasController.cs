using AutoMapper;
using jsreport.Client;
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
    [Authorize]
    public class ConsultasController : BaseController<Guid, Consultas, ConsultasViewModel>
    {
        private readonly PersonaService personaService;
        private readonly EmpresaService empresaService;
        public ConsultasController()
        {
            Title = "Cosultas";
            personaService = new PersonaService();
            empresaService = new EmpresaService();
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
                agenda.Personas = viewModel.PersonasId != null ? personaService.FirstOrDefault(x => x.Id == viewModel.PersonasId) : null;
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
            var consultas = await EntityService.GetAll().OrderByDescending(x => x.Fecha).Where(x => x.PersonasId == id).OrderByDescending(x => x.FechaCreacion).ToListAsync();
            var consultasDto = Mapper.Map<List<ConsultasViewModel>>(consultas);
            return Json(new { consultasDto }, JsonRequestBehavior.AllowGet);
        }

        public async Task<ActionResult> Print(Guid id)
        {
            var consulta = EntityService.GetById(id);
            ConsultasViewModel consultaDto = Mapper.Map<ConsultasViewModel>(consulta);
            ReportingService _reportingService = new ReportingService("https://simecmexico.jsreportonline.net/", "p.almeida@sistemawebmedico.com", "Simec2015");
            var report = await _reportingService
               .RenderAsync("SklbI2aUJv", new
               {
                   Consulta = consultaDto,
               });

            FileStreamResult result = new FileStreamResult(report.Content, report.ContentType.MediaType);
            return result;
        }
    }
}