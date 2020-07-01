using System;
using UniOdonto.Comun;
using UniOdonto.Models;

namespace UniOdonto.Models
{
    public class ConsultasViewModel:BaseModel
    {
        public Guid PersonasId { get; set; }
        public virtual PersonasViewModel Personas { get; set; }
        public string Fecha { get; set; }
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