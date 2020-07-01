using System;
using UniOdonto.DAL.Comun;

namespace UniOdonto.DAL.Entidad
{
    public interface IBaseEntity
    {
        DateTime FechaCreacion { get; set; }
        DateTime? FechaModificacion { get; set; }
        DateTime? FechaEliminacion { get; set; }
        EstadoEnum Estado { get; set; }
    }
}
