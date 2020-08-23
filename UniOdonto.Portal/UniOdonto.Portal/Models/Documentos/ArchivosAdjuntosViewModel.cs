using System;
using System.Collections.Generic;
using UniOdonto.Comun;

namespace UniOdonto.Models
{
    public class ArchivosAdjuntosViewModel : BaseModel
    {
        public Guid PersonasId { get; set; }
        public virtual PersonasViewModel Personas { get; set; }
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public string Fecha { get; set; }
        public virtual List<ArchivosAdjuntosDetViewModel> ArchivosAdjuntosDet { get; set; }
    }
}