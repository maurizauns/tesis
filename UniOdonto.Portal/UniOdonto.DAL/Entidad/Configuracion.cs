namespace UniOdonto.DAL.Entidad
{
    public class Configuracion : BaseEntity
    {
        public string RutaAplicacion { get; set; }
        public int RegitrosPorPagina { get; set; }
        public string UrlAutorizacionPruebas { get; set; }
        public string UrlRecepcionPruebas { get; set; }
        public string UrlAutorizacionProduccion { get; set; }
        public string UrlRecepcionProduccion { get; set; }
        public string Proxy { get; set; }
        public string FormatoFecha { get; set; }
        public string RutaXmls { get; set; }
        public string UrlPublicacionExterna { get; set; }
        public bool IntegracionMenatics { get; set; }
    }
}
