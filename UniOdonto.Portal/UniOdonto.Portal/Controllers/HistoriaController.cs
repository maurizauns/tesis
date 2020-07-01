using AutoMapper;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using UniOdonto.BO;
using UniOdonto.Models;

namespace UniOdonto.Portal.Controllers
{
    [Authorize]
    public class HistoriaController : Controller
    {
        private readonly PersonaService PersonaService;
        public HistoriaController()
        {
            PersonaService = new PersonaService();
        }
        public ActionResult Index(Guid id)
        {
            ViewBag.id = id;
            return View();
        }

        [HttpGet]
        public async Task<JsonResult> GetData()
        {
            var personas = await PersonaService.GetAll().FirstOrDefaultAsync();
            var persinasDto = Mapper.Map<PersonasViewModel>(personas);
            return Json(persinasDto, JsonRequestBehavior.AllowGet);
        }
    }
}