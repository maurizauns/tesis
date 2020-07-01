using System;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using UniOdonto.Comun;

namespace UniOdonto.Models
{
    public class PanelesViewModel : BaseModel
    {
        [Required(ErrorMessage = "Ingrese Nombre.")]
        [Display(Name = "Nombre")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "Ingrese Descripción.")]
        [Display(Name = "Descripción")]
        public string Descripcion { get; set; }

        [Required(ErrorMessage = "Ingrese Texto.")]
        [Display(Name = "Texto")]
        [UIHint("tinymce_jquery_full"), AllowHtml]
        public string Texto { get; set; }

        [Display(Name = "Estilo")]
        public string Estilo { get; set; }

        [Display(Name = "Color")]
        public string Color { get; set; }

        public Guid EmpresaId { get; set; }
    }

}
