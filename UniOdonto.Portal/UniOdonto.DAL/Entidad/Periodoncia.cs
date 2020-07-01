using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UniOdonto.DAL.Entidad
{
	[Table("Periodoncia")]
	public class Periodoncia: BaseEntity
    {
		[Required]
		public Guid PersonasId { get; set; }
		[ForeignKey("PersonasId")]
		public virtual Personas Personas { get; set; }
		[DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
		public DateTime Fecha { get; set; }
		public string Pronostico { get; set; }
		public string Tratamiento { get; set; }
		public string Diagnostico { get; set; }
		public string AccionesClinicas { get; set; }
		public virtual ICollection<DientesPerio> Dientes { get; set; }
	}
}
