using UniOdonto.BO;
using UniOdonto.DAL.Entidad;

namespace UniOdonto.Controllers
{
    public class ProvinciasController : BaseConfiguracionGeneralController<Provincias>
    {
        public ProvinciasController()
        {
            EntityService = new ProvinciaService();
            Title = "Provincias";
        }
    }
}