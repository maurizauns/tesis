using System.Threading.Tasks;
using System.Web.Mvc;
using AutoMapper;
using UniOdonto.BO;
using UniOdonto.Comun;
using UniOdonto.Extensions;
using UniOdonto.Models;

namespace UniOdonto.Controllers
{
    [CustomAuthorize(ModuleName = "Configuracion")]
    public class ConfiguracionController : Controller
    {
        private ConfiguracionService configuracionService = new ConfiguracionService();
        public ViewResult Index()
        {
            var configuracion = ConfiguracionService.ObtenerConfiguracion();
            var model = new ConfiguracionViewModel();
            model = Mapper.Map(configuracion, model);
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Save(ConfiguracionViewModel model)
        {
            var configuracion = ConfiguracionService.ObtenerConfiguracion();
            configuracion = Mapper.Map(model, configuracion);

            Context.PageSize = configuracion.RegitrosPorPagina;
            Context.FormatoFecha = configuracion.FormatoFecha;

            var result = configuracionService.Update(configuracion);

            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            configuracionService.Dispose();
            base.Dispose(disposing);
        }
    }
}
