using RP.DAL.Repository;
using UniOdonto.DAL.Entidad;

namespace UniOdonto.BO
{
    public class ConsultaService : EntityService<Consultas>
    {
        public ConsultaService()
        {

        }
        public ConsultaService(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }
    }
}