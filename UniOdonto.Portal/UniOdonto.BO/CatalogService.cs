using RP.DAL.Repository;
using System.Threading.Tasks;
using UniOdonto.DAL.Entidad;

namespace UniOdonto.BO
{
    public abstract class CatalogService<TEntity> : EntityService<TEntity> where TEntity : BaseConfiguracionGeneral
    {
        protected CatalogService()
        {

        }

        protected CatalogService(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }

        public override async Task<SaveResult> SaveAsync(TEntity entity)
        {
            var result = FirstOrDefault(e => e.Id != entity.Id && e.Codigo == entity.Codigo);

            if (result != null)
            {
                return SaveResult.Failed(new[] { string.Format("Código: {0} ya asignado a {1} ", result.Codigo, result.Descripcion) });
            }

            return await base.SaveAsync(entity);
        }
    }


}
