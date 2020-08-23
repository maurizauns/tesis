using System;
using System.ComponentModel.DataAnnotations;
using UniOdonto.Comun;

namespace UniOdonto.Models
{
    public class AntecedentesViewModel: BaseModel
    {
        public Guid PersonasId { get; set; }
        public virtual PersonasViewModel Personas { get; set; }
        [Required(ErrorMessage = "El campo {0} es obligatorio.")]
        [Display(Name = "SIN PATOLOGÍA APARENTE")]
        public bool SinPatologiaFamiliares { get; set; }
        public string DetalleFamiliares { get; set; }
        [Display(Name = "COMENTARIOS")]
        public string ComentarioFamiliares { get; set; }
        [Required(ErrorMessage = "El campo {0} es obligatorio.")]
        [Display(Name = "SIN PATOLOGÍA APARENTE")]
        public bool SinPatologiaPersonales { get; set; }
        public string DetallePersonales { get; set; }
        [Display(Name = "COMENTARIOS")]
        public string ComentarioPersonales { get; set; }
        [Display(Name = "OTROS ANTECEDENTES PATOLÓGICOS ")]
        public string OtrosPersonales { get; set; }
        [Display(Name = "MEDICAMENTOS")]
        public string Medicamentos { get; set; }
        [Display(Name = "ALERGIAS / ALERTAS")]
        public string Alergias { get; set; }
        [Display(Name = "HÁBITOS")]
        public string Habitos { get; set; }
        [Display(Name = "CIRUGÍAS")]
        public string Cirugias { get; set; }
        [Display(Name = "ANTECEDENTES PERINATALES")]
        public string Perinatales { get; set; }
    }
}