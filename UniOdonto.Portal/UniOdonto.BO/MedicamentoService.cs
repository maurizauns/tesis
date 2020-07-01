using RP.DAL.Repository;
using UniOdonto.DAL.Entidad;

namespace UniOdonto.BO
{
   public class MedicamentoService : EntityService<Medicamentos>
    {
        public MedicamentoService()
        {

        }
        public MedicamentoService(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }
    }
}