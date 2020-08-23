using RP.DAL.Repository;
using UniOdonto.DAL.Entidad;
namespace UniOdonto.BO
{
    public class AntecedenteService : EntityService<Antecedentes>
    {
        public AntecedenteService()
        {

        }
        public AntecedenteService(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }
    }
}