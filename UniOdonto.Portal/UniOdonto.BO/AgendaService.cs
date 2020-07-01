using RP.DAL.Repository;
using UniOdonto.DAL.Entidad;

namespace UniOdonto.BO
{
    public class AgendaService : CatalogService<Agendas>
    {
        public AgendaService()
        {

        }
        public AgendaService(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }
    }
}