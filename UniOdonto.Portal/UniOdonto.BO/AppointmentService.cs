using RP.DAL.Repository;
using UniOdonto.DAL.Entidad;

namespace UniOdonto.BO
{
   public class AppointmentService : EntityService<Appointment>
    {
        public AppointmentService()
        {

        }
        public AppointmentService(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }
    }
}