using UniOdonto.Comun;
using UniOdonto.BO;
namespace UniOdonto
{
    public static class WebVentasConfig
    {
        public static void Init()
        {
            var config = ConfiguracionService.ObtenerConfiguracion();

            Context.RutaAplicacion = config.RutaAplicacion;
            //ConfiguracionManager.RutaAplicacion = Context.RutaAplicacion; //Establece la Ruta a las Dlls del Servicio Firmador
            

            //Context.BaseImpuestosRetencion = string.Format("{0}\\baseImpuestosRetencion.xml", ConfiguracionManager.RutaBase);
            //Context.BaseRetencionIsd = string.Format("{0}\\baseRetencionIsd.xml", ConfiguracionManager.RutaBase);
            //Context.BaseRetencionIva = string.Format("{0}\\baseRetencionIva.xml", ConfiguracionManager.RutaBase);
            //Context.BaseRetencionRenta = string.Format("{0}\\baseRetencionRenta.xml", ConfiguracionManager.RutaBase);
            //Context.BaseTarifaIce = string.Format("{0}\\baseTarifaIce.xml", ConfiguracionManager.RutaBase);
            //Context.BaseTarifaIva = string.Format("{0}\\baseTarifaIva.xml", ConfiguracionManager.RutaBase);
            //Context.BaseTarifasImpuestos = string.Format("{0}\\baseTarifasImpuestos.xml", ConfiguracionManager.RutaBase);
            //Context.BaseTipoAmbiente = string.Format("{0}\\baseTipoAmbiente.xml", ConfiguracionManager.RutaBase);
            //Context.BaseTipoComprobante = string.Format("{0}\\baseTipoComprobante.xml", ConfiguracionManager.RutaBase);
            //Context.BaseTipoEmision = string.Format("{0}\\baseTipoEmision.xml", ConfiguracionManager.RutaBase);
            //Context.BaseTipoVenta = string.Format("{0}\\baseTipoVenta.xml", ConfiguracionManager.RutaBase);
            //Context.BaseFormaPago = string.Format("{0}\\baseFormasPago.xml", ConfiguracionManager.RutaBase);
            //Context.BaseCompensacion = string.Format("{0}\\baseCompensacion.xml", ConfiguracionManager.RutaBase);
            //Context.BaseTipoProducto = string.Format("{0}\\baseTipoProducto.xml", ConfiguracionManager.RutaBase);
            //Context.BaseIRBPNR = string.Format("{0}\\baseIRBPNR.xml", ConfiguracionManager.RutaBase);
            //Context.BaseSustentoTributario = string.Format("{0}\\baseSustentoTributario.xml", ConfiguracionManager.RutaBase);

            Context.PageSize = config.RegitrosPorPagina;
            Context.FormatoFecha = config.FormatoFecha;
            
            // ConfiguracionManager.ObtenerConfiguracion(); //Crea la configuración general de la aplicación
        }
    }
}
