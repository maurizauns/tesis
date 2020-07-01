using RP.DAL.Repository;
using UniOdonto.DAL.Entidad;

namespace UniOdonto.BO
{
    public class AuditoriaService : EntityService<Auditoria>
    {
        public AuditoriaService()
        {

        }
        public AuditoriaService(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {

        }
    }
}
