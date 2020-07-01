using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UniOdonto.Comun;
using UniOdonto.Models;

namespace UniOdonto.Models
{
    public class PeriodonciaViewModel :BaseModel
    {
		public Guid PersonasId { get; set; }
		public virtual PersonasViewModel Personas { get; set; }
		public string Fecha { get; set; }
		public string Pronostico { get; set; }
		public string Tratamiento { get; set; }
		public string Diagnostico { get; set; }
		public string AccionesClinicas { get; set; }
		public virtual List<DientesPerioViewModel> Dientes { get; set; }
	}
}