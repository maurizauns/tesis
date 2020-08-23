using System.ComponentModel.DataAnnotations;
using UniOdonto.Comun;

namespace UniOdonto.Models
{
    public class MedicamentosViewModel: BaseModel
    {
        [Required(ErrorMessage = "El campo {0} es obligatorio.")]
        [Display(Name = "Genérico")]
        public string Generico { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio.")]
        [Display(Name = "Comercial")]
        public string Comercial { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio.")]
        [Display(Name = "Dosis")]
        public string Dosis { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio.")]
        [Display(Name = "Presentación")]
        public string Presentacion { get; set; }
        public int Cantidad { get; set; }
        public string Indicaciones { get; set; }
    }
}