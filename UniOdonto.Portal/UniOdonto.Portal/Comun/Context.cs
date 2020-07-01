using System;
using System.Linq;
using System.Security.Claims;
using System.Web;
using UniOdonto.BO;
using UniOdonto.DAL;

namespace UniOdonto.Comun
{
    public class Context
    {
        public static WebVentasContext db = new WebVentasContext();

        

        public static int PageSize = 10;
        public static string FormatoFecha = "dd/MM/yyyy";
        public static string FormatoFechaI = "MM/dd/yyyy";
        public static string FormatoHora = "HH:mm:ss";
        public static int NumeroDecimales = 2;
        public static string FormatoFechaHora
        {
            get { return string.Format("{0} {1}", FormatoFecha, FormatoHora); }
        }


        public static string RutaAplicacion;

        public static string BaseImpuestosRetencion;
        public static string BaseRetencionIsd;
        public static string BaseRetencionIva;
        public static string BaseRetencionRenta;
        public static string BaseTarifaIce;
        public static string BaseTarifaIva;
        public static string BaseTarifasImpuestos;
        public static string BaseTipoAmbiente;
        public static string BaseTipoComprobante;
        public static string BaseTipoEmision;
        public static string BaseTipoVenta;
        public static string BaseFormaPago;
        public static string BaseCompensacion;
        public static string BaseTipoProducto;
        public static string BaseIRBPNR;
        public static string BaseSustentoTributario;


        private static Guid EmpresaId = Context.CurrentEmpresaId;

        public static Guid CurrentUserId
        {
            get
            {
                var user = HttpContext.Current.User as ClaimsPrincipal;
                if (user != null && user.Identity.IsAuthenticated)
                {
                    return Guid.Parse(user.Claims.FirstOrDefault(c => c.Type == CustomClaimTypes.UserId).Value);
                }
                return Guid.Empty;
            }
        }

        public static Guid CurrentEmpresaId
        {
            get
            {
                var user = HttpContext.Current.User as ClaimsPrincipal;


                if (user != null && user.Identity.IsAuthenticated)
                {
                    string UserID = user.Claims.FirstOrDefault(c => c.Type == CustomClaimTypes.UserId).Value;
                    var service = new WebVentasServices();
                    try
                    {
                        var usuario = service.UsuarioService.ObtenerPorApplicationUserId(UserID);
                        return usuario.EmpresaId;
                    }
                    finally
                    {
                        service.Dispose();
                    }
                    //var agencia = new Empresa();
                    //agencia.Id = db.Usuarios.Where(x => x.ApplicationUserId == UserID).Select(x => x.EmpresaId).FirstOrDefault();
                    //return agencia.Id;
                }
                return Guid.Empty;
            }
        }
    }
}