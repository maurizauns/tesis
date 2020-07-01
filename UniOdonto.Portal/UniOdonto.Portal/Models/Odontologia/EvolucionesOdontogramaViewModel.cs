using System;
using UniOdonto.Comun;

namespace UniOdonto.Models
{
    public class EvolucionesOdontogramaViewModel:BaseModel
    {
        public Guid OdontogramaId { get; set; }
        public string EvolucionDate { get; set; }
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
    }
}