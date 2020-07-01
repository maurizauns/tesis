using RP.DAL.Repository;
using UniOdonto.DAL.Entidad;
namespace UniOdonto.BO
{
    public class CantoneService : CatalogService<Cantones>
    {
        public CantoneService()
        {

        }
        public CantoneService(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }
    }
}
