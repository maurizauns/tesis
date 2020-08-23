using RP.DAL.Repository;
using System;
using System.Linq;
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

        public Appointment GetByIdInclude(Guid personasId)
        {
            return GetAll().FirstOrDefault(f => f.Id == personasId);
        }
    }
}