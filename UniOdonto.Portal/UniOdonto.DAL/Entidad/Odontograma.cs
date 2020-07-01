using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UniOdonto.DAL.Entidad
{
	[Table("Odontograma")]
	public class Odontograma : BaseEntity
	{
		[Required]
		public Guid PersonasId { get; set; }
		[ForeignKey("PersonasId")]
		public virtual Personas Personas { get; set; }
		public string Comentarios { get; set; }
		public string Acciones { get; set; }
		[DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
		public DateTime Fecha { get; set; }
		public string R1 { get; set; }
		public string R2 { get; set; }
		public string R3 { get; set; }
		public string R4 { get; set; }
		public string R5 { get; set; }
		public string R6 { get; set; }
		public string R7 { get; set; }
		public string R8 { get; set; }
		public string R9 { get; set; }
		public string R10 { get; set; }
		public string R11 { get; set; }
		public string R12 { get; set; }
		public string R13 { get; set; }
		public string R14 { get; set; }
		public string R15 { get; set; }
		public string R16 { get; set; }
		public string M1 { get; set; }
		public string M2 { get; set; }
		public string M3 { get; set; }
		public string M4 { get; set; }
		public string M5 { get; set; }
		public string M6 { get; set; }
		public string M7 { get; set; }
		public string M8 { get; set; }
		public string M9 { get; set; }
		public string M10 { get; set; }
		public string M11 { get; set; }
		public string M12 { get; set; }
		public string M13 { get; set; }
		public string M14 { get; set; }
		public string M15 { get; set; }
		public string M16 { get; set; }


		public string Re1 { get; set; }
		public string Re2 { get; set; }
		public string Re3 { get; set; }
		public string Re4 { get; set; }
		public string Re5 { get; set; }
		public string Re6 { get; set; }
		public string Re7 { get; set; }
		public string Re8 { get; set; }
		public string Re9 { get; set; }
		public string Re10 { get; set; }
		public string Re11 { get; set; }
		public string Re12 { get; set; }
		public string Re13 { get; set; }
		public string Re14 { get; set; }
		public string Re15 { get; set; }
		public string Re16 { get; set; }
		public string Mo1 { get; set; }
		public string Mo2 { get; set; }
		public string Mo3 { get; set; }
		public string Mo4 { get; set; }
		public string Mo5 { get; set; }
		public string Mo6 { get; set; }
		public string Mo7 { get; set; }
		public string Mo8 { get; set; }
		public string Mo9 { get; set; }
		public string Mo10 { get; set; }
		public string Mo11 { get; set; }
		public string Mo12 { get; set; }
		public string Mo13 { get; set; }
		public string Mo14 { get; set; }
		public string Mo15 { get; set; }
		public string Mo16 { get; set; }
		public virtual ICollection<Diente> Dientes { get; set; }
		public virtual ICollection<EvolucionesOdontograma> Evoluciones { get; set; }
	}
}
