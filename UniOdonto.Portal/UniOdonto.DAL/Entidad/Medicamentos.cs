using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace UniOdonto.DAL.Entidad
{
    public class Medicamentos : BaseEntity
    {
        public string Generico { get; set; }
        public string Comercial { get; set; }
        public string Dosis { get; set; }
        public string Presentacion { get; set; }
        public int Cantidad { get; set; }

        public string Indicaciones { get; set; }
        [ForeignKey("ApplicationUser")]
        public string ApplicationUserId { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}