using RP.DAL.Repository;
using UniOdonto.DAL.Entidad;

namespace UniOdonto.BO
{
    public class DienteService : EntityService<Diente>
    {
        public DienteService()
        {

        }
        public DienteService(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }
    }
}