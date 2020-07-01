using RP.DAL.Repository;
using UniOdonto.DAL.Entidad;

namespace UniOdonto.BO
{
    public class OdontogramaService : EntityService<Odontograma>
    {
        public OdontogramaService()
        {

        }
        public OdontogramaService(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }
    }
}