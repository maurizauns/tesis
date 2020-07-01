using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace UniOdonto.DAL.Entidad
{
    [Table("TipoIdentificacion")]
    public class TipoIdentificacion : BaseConfiguracionGeneral
    {
        public Guid SubTipoIdentificacionId { get; set; }
        public virtual SubTipoIdentificacion SubTipoIdentificacion { get; set; }
        public string BackgroundColor { get; set; }
        public string Color { get; set; }
        public string Class { get; set; }
    }
}