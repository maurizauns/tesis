using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace UniOdonto.DAL.Entidad
{
    public class Usuario : BaseEntity
    {
        //public Usuario()
        //{
        //    //Documentos = new HashSet<Documento>();
        //    Agendas = new HashSet<Agendas>();
        //}

        public string Identificacion { get; set; }
        public string TipoIdentificacion { get; set; }
        public string NombresCompletos { get; set; }
        public string ApplicationUserId { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
        public string Email { get; set; }

        public Guid EmpresaId { get; set; }
        public virtual Empresa Empresa { get; set; }

        [NotMapped]
        public string ApplicationRoleName { get; set; }
        public string Establecimientos { get; set; }

        public ICollection<AgendaUsuario> AgendaUsuario { get; set; }

    }
}
