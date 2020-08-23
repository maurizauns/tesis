using System;
using System.ComponentModel.DataAnnotations;
using UniOdonto.Comun;
using UniOdonto.Models;

namespace UniOdonto.Models
{
    public class ConsultasViewModel : BaseModel
    {
        public Guid PersonasId { get; set; }
        public virtual PersonasViewModel Personas { get; set; }
        public string Fecha { get; set; }

        [Display(Name = "Frecuencia cardiaca")]
        public string Fc { get; set; }

        [Display(Name = "Frecuencia respiratorio")]
        public string Fr { get; set; }

        [Display(Name = "Frecuencia respiratorio")]
        public string So2 { get; set; }

        [Display(Name = "Tensión arterial")]
        public string Ta { get; set; }

        [Display(Name = "Temperatura")]
        public string Temp { get; set; }

        [Display(Name = "Peso")]
        public string Peso { get; set; }

        [Display(Name = "Talla")]
        public string Talla { get; set; }

        [Display(Name = "Motivo de consulta")]
        public string Motivo { get; set; }

        [Display(Name = "Enfermedad Actual")]
        public string EnfermedadActual { get; set; }

        [Display(Name = "Diagnóstico")]
        public string Diagnostico { get; set; }

        [Display(Name = "Plan de tratamiento")]
        public string Plan { get; set; }
    }
}