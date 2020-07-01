using RP.DAL.Repository;
using UniOdonto.DAL.Entidad;
namespace UniOdonto.BO
{
    public class ProvinciaService : CatalogService<Provincias>
    {
        public ProvinciaService()
        {

        }
        public ProvinciaService(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }
    }
}
