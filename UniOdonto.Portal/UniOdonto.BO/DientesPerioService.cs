using RP.DAL.Repository;
using UniOdonto.DAL.Entidad;

namespace UniOdonto.BO
{
    public  class DientesPerioService : EntityService<DientesPerio>
    {
        public DientesPerioService()
        {

        }
        public DientesPerioService(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }
    }
}