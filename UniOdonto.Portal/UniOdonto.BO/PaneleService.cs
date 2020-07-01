using RP.DAL.Repository;
using UniOdonto.DAL.Entidad;
namespace UniOdonto.BO
{
    public class PaneleService : EntityService<Paneles>
    {
        public PaneleService()
        {

        }
        public PaneleService(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {

        }
    }
}
