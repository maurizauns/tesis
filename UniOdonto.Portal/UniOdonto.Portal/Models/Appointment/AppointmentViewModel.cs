using System;
using System.ComponentModel.DataAnnotations;
using UniOdonto.Comun;

namespace UniOdonto.Models
{
    public class AppointmentViewModel :BaseModel
    {
        [Required(ErrorMessage = "Seleccione un paciente.")]
        [Display(Name = "Paciente")] 
        public Guid? PersonasId { get; set; }
        public virtual PersonasViewModel Personas { get; set; }

        public Guid UsuarioId { get; set; }

        public virtual UsuarioViewModel Usuario { get; set; }

        public Guid AgendasId { get; set; }

        public virtual AgendasViewModel Agendas { get; set; }

        [Required(ErrorMessage = "Seleccione un {0}")]
        [Display(Name = "Tipo de Cita")]
        public Guid? TipoCitaId { get; set; }
        public virtual TipoIdentificacionViewModel TipoCita { get; set; }

        [Required(ErrorMessage = "Seleccione un {0}")]
        [Display(Name = "Estado de Cita")]
        public Guid? EstadoCitaId { get; set; }
        public virtual TipoIdentificacionViewModel EstadoCita { get; set; }

        [Required(ErrorMessage = "Seleccione un {0}")]
        [Display(Name = "Fecha")]
        public string AppointmentDate { get; set; }

        [Required(ErrorMessage = "Seleccione un {0}")]
        [Display(Name = "Duración de Cita")]
        public int AppointmentLenght { get; set; }

        public string AppointmentTitle { get; set; }

        public int RepetirTipo { get; set; }

        public bool EnvioRecordatorio { get; set; }

        public bool EnvioCorreo { get; set; }
    }

    public class AppointmentDiaryViewModel :BaseModel
    {
        public string Title { get; set; }
        public string PatientName { get; set; }
        public Guid? PersonasId { get; set; }
        public Guid UsuarioId { get; set; }
        public string DoctorName { get; set; }
        public string StartDateString { get; set; }
        public string EndDateString { get; set; }
        public string StatusString { get; set; }
        public string StatusColor { get; set; }
        public string ClassName { get; set; }
        public string TextColor { get; set; }
        public Guid AgendasId { get; set; }
        public Guid AppointmentTypeID { get; set; }
    }
}