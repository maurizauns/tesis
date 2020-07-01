using System;
using UniOdonto.Comun;

namespace UniOdonto.Models
{
    public class DientesPerioViewModel : BaseModel
    {
        public Guid PeriodonciaId { get; set; }
        public int Implante { get; set; }
        public int Numero { get; set; }
        public int Movilidad { get; set; }
        public string Pronostico { get; set; }
        public int Furca { get; set; }
        public int Sangrado1 { get; set; }
        public int Sangrado2 { get; set; }
        public int Sangrado3 { get; set; }
        public int Placa1 { get; set; }
        public int Placa2 { get; set; }
        public int Placa3 { get; set; }
        public string Anchura { get; set; }
        public int Margen1 { get; set; }
        public int Margen2 { get; set; }
        public int Margen3 { get; set; }
        public int Profundidad1 { get; set; }
        public int Profundidad2 { get; set; }
        public int Profundidad3 { get; set; }
        public int FurcaDos { get; set; }
        public bool Ausente { get; set; }
        public int ProfundidadB1 { get; set; }
        public int ProfundidadB2 { get; set; }
        public int ProfundidadB3 { get; set; }
        public int MargenB1 { get; set; }
        public int MargenB2 { get; set; }
        public int MargenB3 { get; set; }
        public int PlacaB1 { get; set; }
        public int PlacaB2 { get; set; }
        public int PlacaB3 { get; set; }
        public int SangradoB1 { get; set; }
        public int SangradoB2 { get; set; }
        public int SangradoB3 { get; set; }
        public int? NIC1 { get; set; }
        public int? NIC2 { get; set; }
        public int? NIC3 { get; set; }
        public int? NICB1 { get; set; }
        public int? NICB2 { get; set; }
        public int? NICB3 { get; set; }

        public string Nota { get; set; }
        public int FurcaB { get; set; }
        public int FurcaBDos { get; set; }
    }
}