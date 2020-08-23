using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace UniOdonto.DAL.Entidad
{
    [Table("Antecedentes")]
    public class Antecedentes : BaseEntity
    {
        [Required]
        public Guid PersonasId { get; set; }
        [ForeignKey("PersonasId")]
        public virtual Personas Personas { get; set; }
        public bool SinPatologiaFamiliares { get; set; }
        public string DetalleFamiliares { get; set; }
        public string ComentarioFamiliares { get; set; }
        public bool SinPatologiaPersonales { get; set; }
        public string DetallePersonales { get; set; }
        public string ComentarioPersonales { get; set; }
        public string OtrosPersonales { get; set; }
        public string Medicamentos { get; set; }
        public string Alergias { get; set; }
        public string Habitos { get; set; }
        public string Cirugias { get; set; }
        public string Perinatales { get; set; }
    }
}
