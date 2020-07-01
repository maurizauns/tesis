using System.ComponentModel.DataAnnotations;
using UniOdonto.Comun;

namespace UniOdonto.Models
{
    public class ConfiguracionViewModel : BaseModel
    {
        [Display(Name = "Ruta Aplicación")]
        public string RutaAplicacion { get; set; }

        [Display(Name = "Registros por Página")]
        public int RegitrosPorPagina { get; set; }

        [Display(Name = "Url Autorización")]
        public string UrlAutorizacionPruebas { get; set; }

        [Display(Name = "Url Recepción")]
        public string UrlRecepcionPruebas { get; set; }

        [Display(Name = "Url Autorización")]
        public string UrlAutorizacionProduccion { get; set; }

        [Display(Name = "Url Recepción")]
        public string UrlRecepcionProduccion { get; set; }

        [Display(Name = "Proxy")]
        public string Proxy { get; set; }

        [Display(Name = "Integración Menatics")]
        public bool IntegracionMenatics { get; set; }

        [Display(Name = "Formato Fecha")]
        public string FormatoFecha { get; set; }

        [Display(Name = "Ruta Xmls a Procesar")]
        public string RutaXmls { get; set; }

        [Display(Name = "Url Publicacion Externa")]
        public string UrlPublicacionExterna { get; set; }
    }
}