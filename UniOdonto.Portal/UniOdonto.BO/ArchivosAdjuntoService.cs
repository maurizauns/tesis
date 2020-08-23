using RP.DAL.Repository;
using UniOdonto.DAL.Entidad;

namespace UniOdonto.BO
{
    public class ArchivosAdjuntoService : CatalogService<ArchivosAdjuntos>
    {
        public ArchivosAdjuntoService()
        {

        }
        public ArchivosAdjuntoService(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {

        }
    }
}