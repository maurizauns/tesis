using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace UniOdonto.DAL.Entidad
{
    [Table("Consultas")]
    public class Consultas : BaseEntity
    {
        public Guid PersonasId { get; set; }
        public virtual Personas Personas { get; set; }
        public DateTime Fecha { get; set; }
        public string Fc { get; set; }
        public string Fr { get; set; }
        public string So2 { get; set; }
        public string Ta { get; set; }
        public string Temp { get; set; }
        public string Peso { get; set; }
        public string Talla { get; set; }
        public string Motivo { get; set; }
        public string EnfermedadActual { get; set; }
        public string Diagnostico { get; set; }
        public string Plan { get; set; }
    }
}