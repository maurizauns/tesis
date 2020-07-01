using System;
using UniOdonto.Comun;

namespace UniOdonto.Models
{
    public class DienteViewModel : BaseModel
    {
		public Guid OdontogramaId { get; set; }
		public int Numero { get; set; }
		public int? Numero2 { get; set; }
		public string Vestibular { get; set; }
		public string Oclusal { get; set; }
		public string Lingual { get; set; }
		public string Distal { get; set; }
		public string Mesial { get; set; }
		public bool SellanteI { get; set; }
		public bool SellanteR { get; set; }
		public bool ExtraccionI { get; set; }
		public bool ExtraccionR { get; set; }
		public bool AusenteI { get; set; }
		public bool CoronaI { get; set; }
		public bool CoronaR { get; set; }
		public bool EndodonciaI { get; set; }
		public bool EndodonciaR { get; set; }
		public bool PuenteI { get; set; }
		public bool PuenteR { get; set; }
		public bool RemovidoI { get; set; }
		public bool RemovidoR { get; set; }
		public bool ProtesisI { get; set; }
		public bool ProtesisR { get; set; }

		public string Color { get; set; }
		
	}
}