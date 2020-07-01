using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using UniOdonto.Comun;
using UniOdonto.DAL.Entidad;

namespace UniOdonto.Models
{
    public class AgendasViewModel: BaseModel
    {
        public virtual TipoIdentificacionViewModel DuracionCita { get; set; }
        public virtual UsuarioViewModel Propietario { get; set; }
        public virtual List<AgendaUsuarioViewModel> AgendaUsuario { get; set; }
        public virtual List<HorariosViewModel> Horarios { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido")]
        [Display(Name = "Coódigo")]
        public string Codigo { get; set; }
        [Required(ErrorMessage = "El campo {0} es requerido")]
        [Display(Name = "Descripción")]
        public string Descripcion { get; set; }
        [Required(ErrorMessage = "El campo {0} es requerido")]
        [Display(Name = "Duración de cita")]
        public Guid DuracionCitaId { get; set; }
        [Required(ErrorMessage = "El campo {0} es requerido")]
        [Display(Name = "Nombre de la agenda")]
        public string Nombre { get; set; }
        public Guid? PropietarioId { get; set; }
    }
}