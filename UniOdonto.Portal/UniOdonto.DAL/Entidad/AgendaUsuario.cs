using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UniOdonto.DAL.Entidad
{
    [Table("AgendaUsuarios")]
    public class AgendaUsuario
    {
        [Key]
        [Column(Order = 0)]
        public virtual Guid? UsuarioId { get; set; }
        public virtual Usuario Usuario { get; set; }

        [Key]
        [Column(Order = 1)]
        public virtual Guid? AgendaId { get; set; }
        public virtual Agendas Agenda { get; set; }

        public string Inicio { get; set; }
        public string Fin { get; set; }
    }
}