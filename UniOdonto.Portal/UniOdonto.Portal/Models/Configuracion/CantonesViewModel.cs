using System;
using System.ComponentModel.DataAnnotations;
using UniOdonto.Comun;

namespace UniOdonto.Models
{
    public class CantonesViewModel : BaseModel
    {
        [Required(ErrorMessage = "Ingrese Código.")]
        [Display(Name = "Código")]
        public string Codigo { get; set; }

        [Required(ErrorMessage = "Ingrese Descripción.")]
        [Display(Name = "Descripción")]
        public string Descripcion { get; set; }

        [Required(ErrorMessage = "Seleccione Provincia.")]
        [Display(Name = "Provincia")]
        public Guid? ProvinciasId { get; set; }

        [System.ComponentModel.DataAnnotations.Schema.NotMapped]
        public ProvinciasViewModel Provincias { get; set; }

        public string NombreAutocomplete
        {
            get { return string.Format("({0}) {1}", Codigo != null ? Codigo.ToUpper() : "", Descripcion != null ? Descripcion.ToUpper() : ""); }
        }

    }
    public class ProvinciasViewModel : BaseModel
    {
        public string Codigo { get; set; }

        public string Descripcion { get; set; }
    }
}
