using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UniOdonto.DAL.Entidad
{
    [Table("EvolucionesOdontograma")]
    public class EvolucionesOdontograma : BaseEntity
    {
        [Required]
        public Guid OdontogramaId { get; set; }
        [Required]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy HH:mm}")]
        public DateTime EvolucionDate { get; set; }
        public string Diente { get; set; }
        public string Pieza { get; set; }
        public string Pieza2 { get; set; }
        public string EstadoDiente { get; set; }
        public string Indicacion { get; set; }
        public bool Cara { get; set; }
        public bool Cara1 { get; set; }
        public bool Cara2 { get; set; }
        public bool Cara3 { get; set; }
        public bool Cara4 { get; set; }

        [ForeignKey("OdontogramaId")]
        public virtual Odontograma Odontograma { get; set; }
    }
}
