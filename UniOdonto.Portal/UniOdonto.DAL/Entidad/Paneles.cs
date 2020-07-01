using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace UniOdonto.DAL.Entidad
{
    [Table("Paneles")]
    public class Paneles : BaseEntity
    {
        public Guid EmpresaId { get; set; }
        public virtual Empresa Empresa { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Texto { get; set; }
        public string Estilo { get; set; }
        public string Color { get; set; }
    }
}
