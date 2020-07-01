using RP.DAL.Repository;
using UniOdonto.DAL.Entidad;

namespace UniOdonto.BO
{
    public class SubTipoIdentificacionService : CatalogService<SubTipoIdentificacion>
    {
        public SubTipoIdentificacionService()
        {

        }
        public SubTipoIdentificacionService(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }
    }
}