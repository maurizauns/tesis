using RP.DAL.Repository;
using UniOdonto.DAL.Entidad;

namespace UniOdonto.BO
{
    public class EvolucionesOdontogramaService : EntityService<EvolucionesOdontograma>
    {
        public EvolucionesOdontogramaService()
        {

        }
        public EvolucionesOdontogramaService(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }
    }
}