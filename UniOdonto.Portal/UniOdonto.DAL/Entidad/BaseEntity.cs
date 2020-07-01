using System;
using UniOdonto.DAL.Comun;

namespace UniOdonto.DAL.Entidad
{
    [Serializable]
    public class BaseEntity : BaseEntityClass<Guid>, IBaseEntity
    {
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public DateTime? FechaEliminacion { get; set; }
        public EstadoEnum Estado { get; set; }

        protected BaseEntity()
        {
            Estado = EstadoEnum.Activo;
            FechaCreacion = DateTime.Now;
        }

        public bool IsNew()
        {
            return Id == Guid.Empty;
        }
    }
}