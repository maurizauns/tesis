using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace UniOdonto.DAL.Entidad
{
    [Table("Cantones")]
    public class Cantones : BaseConfiguracionGeneral
    {
        public Guid? ProvinciasId { get; set; }
        public virtual Provincias Provincias { get; set; }
    }
}
