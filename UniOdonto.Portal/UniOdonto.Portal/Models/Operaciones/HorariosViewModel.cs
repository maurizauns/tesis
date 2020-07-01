using System;

namespace UniOdonto.Models
{
    public class HorariosViewModel
    {
        public Guid AgendasId { get; set; }
        public int Dia { get; set; }
        public string HoraInicio { get; set; }
        public string HoraFin { get; set; }
    }
}