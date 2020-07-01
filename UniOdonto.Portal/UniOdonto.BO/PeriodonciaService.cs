using RP.DAL.Repository;
using UniOdonto.DAL.Entidad;

namespace UniOdonto.BO
{
    public class PeriodonciaService : EntityService<Periodoncia>
    {
        public PeriodonciaService()
        {

        }
        public PeriodonciaService(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }
    }
}