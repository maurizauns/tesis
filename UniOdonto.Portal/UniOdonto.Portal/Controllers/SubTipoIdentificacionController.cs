using UniOdonto.BO;
using UniOdonto.Controllers;
using UniOdonto.DAL.Entidad;

namespace UniOdonto.Controllers
{
    public class SubTipoIdentificacionController : BaseConfiguracionGeneralController<SubTipoIdentificacion>
    {
        public SubTipoIdentificacionController()
        {
            EntityService = new SubTipoIdentificacionService();
            Title = "Tipo Configuración";
        }
    }
}