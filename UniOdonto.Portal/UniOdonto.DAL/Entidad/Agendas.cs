using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace UniOdonto.DAL.Entidad
{
    [Table("Agendas")]
    public class Agendas : BaseConfiguracionGeneral
    {
        public Agendas()
        {
            Horarios = new HashSet<Horarios>(); 
        }
        public Guid DuracionCitaId { get; set; }
        public virtual TipoIdentificacion DuracionCita { get; set; }
        public string Nombre { get; set; }
        public Guid? PropietarioId { get; set; }
        public virtual Usuario Propietario { get; set; }

        public ICollection<AgendaUsuario> AgendaUsuario { get; set; }
        public virtual ICollection<Horarios> Horarios { get; set; }
    }
}
