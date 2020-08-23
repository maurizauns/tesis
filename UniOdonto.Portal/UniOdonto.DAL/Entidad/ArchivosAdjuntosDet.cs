using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace UniOdonto.DAL.Entidad
{
    [Table("ArchivosAdjuntosDet")]
    public class ArchivosAdjuntosDet : BaseEntity
    {
        public Guid ArchivosAdjuntosId { get; set; }
        public virtual ArchivosAdjuntos ArchivosAdjuntos { get; set; }
        public string FileId { get; set; }
    }
}