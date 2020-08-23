using System;
using System.ComponentModel.DataAnnotations;
using UniOdonto.Comun;

namespace UniOdonto.Models
{
    public class RecetaViewModel : BaseModel
    {
        public Guid PersonasId { get; set; } 
        public virtual PersonasViewModel Personas { get; set; }

        [Display(Name = "Fecha")]
        public string Fecha { get; set; }

        [Display(Name = "Próxima cita")]
        public string ProximaCita { get; set; }

        [Display(Name = "Indicaciones")]
        public string Indicaciones { get; set; }

        [Display(Name = "Diagnóstico")]
        public string Diagnostico { get; set; }

        [Display(Name = "Recomendaciones")]
        public string Recomendaciones { get; set; }

        [Display(Name = "Ciudad")]
        public string Ciudad { get; set; }
    }
}