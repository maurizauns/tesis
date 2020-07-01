using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using UniOdonto.DAL.Entidad;
using UniOdonto.BO;

namespace UniOdonto.Controllers
{
    public class TipoIdentificacionController : BaseConfiguracionGeneralController<TipoIdentificacion>
    {
        public TipoIdentificacionController()
        {
            EntityService = new TipoIdentificacionService();
            Title = "Tipo Identificacion";
        }

        [AllowAnonymous]
        public async Task<JsonResult> GetValuesTipoDocumento(string Tipo = "DocIde")
        {
            try
            {
                var elements = await EntityService.GetAllAsync();

                var result = await elements.Where(x => x.SubTipoIdentificacion.Codigo == Tipo).Select(q => new
                {
                    value = q.Id,
                    text = q.Descripcion
                }).ToListAsync();

                return Json(new
                {
                    success = true,
                    values = (object)result
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(new
                {
                    success = false,
                    values = default(object)
                }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}