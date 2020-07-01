using System.ComponentModel.DataAnnotations;
using UniOdonto.Comun;

namespace UniOdonto.Models
{
    public class ConfiguracionGeneralViewModel : BaseModel
    {
        [Required(ErrorMessage = "Ingrese Código")]
        public string Codigo { get; set; }

        [Required(ErrorMessage = "Ingrese Descripción")]
        public string Descripcion { get; set; }
    }
}