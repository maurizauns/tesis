using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace UniOdonto.DAL.Entidad
{
    [Table("Numeraciones")]
    public class Numeraciones : BaseEntity
    {
        public Guid EmpresaId { get; set; }
        public virtual Empresa Empresa { get; set; }
        public string TipoDoc { get; set; }
        public int Establecimiento { get; set; }
        public int PuntoEmision { get; set; }
        public int Secuencial { get; set; }
    }
}
