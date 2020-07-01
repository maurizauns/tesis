using RP.DAL.Repository;
using UniOdonto.DAL.Entidad;
namespace UniOdonto.BO
{
    public class TipoIdentificacionService : CatalogService<TipoIdentificacion>
    {
        public TipoIdentificacionService()
        {

        }
        public TipoIdentificacionService(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }
    }
}
