using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UniOdonto.DAL.Entidad
{
   public  class Appointment :BaseEntity
    {
        public Guid? PersonasId { get; set; }

        [ForeignKey("PersonasId")]
        public virtual Personas Personas { get; set; }

        [Required]
        public Guid UsuarioId { get; set; }

        [ForeignKey("UsuarioId")]
        public virtual Usuario Usuario { get; set; }

        [Required]
        public Guid AgendasId { get; set; }
        [ForeignKey("AgendasId")]
        public virtual Agendas Agendas { get; set; }

        public Guid? TipoCitaId { get; set; }
        public virtual TipoIdentificacion TipoCita { get; set; }

        public Guid? EstadoCitaId { get; set; }
        public virtual TipoIdentificacion EstadoCita { get; set; }

        [Required]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:MM/dd/yyyy}")]
        public DateTime AppointmentDate { get; set; }

        public string AppointmentTitle { get; set; }

        [Required]
        public int AppointmentLenght { get; set; }

        public int RepetirTipo { get; set; }

        public bool EnvioRecordatorio { get; set; }

        public bool EnvioCorreo { get; set; }
    }
}
