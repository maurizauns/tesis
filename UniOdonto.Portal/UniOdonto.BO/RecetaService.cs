using RP.DAL.Repository;
using UniOdonto.DAL.Entidad;
namespace UniOdonto.BO
{
    public class RecetaService : EntityService<Receta>
    {
        public RecetaService()
        {

        }
        public RecetaService(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }
    }
}