using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace UniOdonto.DAL.Entidad
{
    [Table("Receta")]
    public class Receta : BaseEntity
    {
        [Required]
        public Guid PersonasId { get; set; }
        [ForeignKey("PersonasId")]
        public virtual Personas Personas { get; set; }
        public DateTime Fecha { get; set; }
        public DateTime? ProximaCita { get; set; }
        public string Indicaciones { get; set; }
        public string Diagnostico { get; set; }
        public string Recomendaciones { get; set; }
        public string Ciudad { get; set; }
    }
}