using RP.DAL.Repository;
using UniOdonto.DAL.Entidad;

namespace UniOdonto.BO
{
    public class HorarioService : EntityService<Horarios>
    {
        public HorarioService()
        {

        }
        public HorarioService(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }
    }
}