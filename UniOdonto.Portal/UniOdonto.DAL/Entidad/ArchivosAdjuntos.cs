using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;


namespace UniOdonto.DAL.Entidad
{
    [Table("ArchivosAdjuntos")]
    public class ArchivosAdjuntos : BaseConfiguracionGeneral
    {
        public Guid PersonasId { get; set; }
        public virtual Personas Personas { get; set; }
        public DateTime Fecha { get; set; }
        public virtual ICollection<ArchivosAdjuntosDet> ArchivosAdjuntosDet { get; set; }
    }
}
