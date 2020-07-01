using UniOdonto.Comun;

namespace UniOdonto.Models
{
    public class MedicamentosViewModel: BaseModel
    {
        public string Generico { get; set; }
        public string Comercial { get; set; }
        public string Dosis { get; set; }
        public string Presentacion { get; set; }
        public int Cantidad { get; set; }
        public string Indicaciones { get; set; }
    }
}