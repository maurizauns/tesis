using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UniOdonto.Models
{
    public class AgendaUsuarioViewModel
    {
        public virtual Guid? UsuarioId { get; set; }

        public virtual Guid? AgendaId { get; set; }

        public string Inicio { get; set; }

        public string Fin { get; set; }
    }
}