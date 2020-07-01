using System;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using UniOdonto.Comun;

namespace UniOdonto.Models
{
    public class EmpresaViewModel : BaseModel
    {
        //public EmpresaViewModel()
        //{
        //    OtrasConfiguraciones = new OtrasConfiguracionesViewModel();
        //}
        [Required(ErrorMessage = "Ingrese Ruc")]
        public string Ruc { get; set; }
        [Required(ErrorMessage = "Ingrese Razón Social")]
        [Display(Name = "Razón Social")]
        public string RazonSocial { get; set; }
        [Required(ErrorMessage = "Ingrese Nombre Comercial")]
        [Display(Name = "Nombre Comercial")]
        public string NombreComercial { get; set; }
        [Required(ErrorMessage = "Ingrese Dirección Matriz")]
        [Display(Name = "Dirección Matriz")]
        public string DireccionMatriz { get; set; }
        public bool ContribuyenteEspecial { get; set; }
        public bool ObligadoContabilidad { get; set; }
        public int Decimales { get; set; }
    }

    public class EmpresaSmtpViewModel : BaseModel
    {
        [Display(Name = "Servidor")]
        public string SmtpServidor { get; set; }

        [Display(Name = "Usuario")]
        public string SmtpUsuario { get; set; }
        [Display(Name = "Clave")]
        public string SmtpClave { get; set; }
        [Display(Name = "Puerto")]
        public int? SmtpPuerto { get; set; }
        [Display(Name = "Habilita Ssl")]
        public bool SmtpHabilitaSsl { get; set; }
    }

    public class EmpresaEmailClienteViewModel : BaseModel
    {
        [Display(Name = "Asunto")] 
        public string EmailAsunto { get; set; }
        [Display(Name = "Incluye tipo de Comprobante")]

        public bool EmailIncluyeTipoDocumento { get; set; }

        [Display(Name = "De")]
        [Required(ErrorMessage = "Ingrese un correo")]
        [EmailAddress(ErrorMessage = "Ingrese un correo válido")]
        public string EmailDe { get; set; }

        [Display(Name = "Para")]
        [Required(ErrorMessage = "Ingrese Tag de infoAdicional que contenta la dirección de correo del cliente")]
        public string EmailPara { get; set; }

        [Display(Name = "Para Adicional")]
        public string EmailParaAdicional { get; set; }

        [Display(Name = "CC")]
        public string EmailCc { get; set; }

        [Display(Name = "CCO")]
        public string EmailCco { get; set; }

        [Display(Name = "Mensaje")]
        [UIHint("tinymce_jquery_full"), AllowHtml]
        public string EmailMensajeHtml { get; set; }
    }

    public class EmpresaNotificaionViewModel : BaseModel
    {
        public bool Generado { get; set; }
        public bool Firmado { get; set; }
        public bool NoFirmado { get; set; }
        public bool Recibido { get; set; }
        public bool Devuelto { get; set; }
        public bool TimeoutRecepcion { get; set; }
        public bool Contingencia { get; set; }
        public bool Autorizado { get; set; }
        public bool NoAutorizado { get; set; }
        public bool TimeoutAutorizacion { get; set; }
        public bool Pendiente { get; set; }
        public bool NoProcesados { get; set; }
    }

    public class EmpresaConfiguracionViewModel : BaseModel
    {
        [Display(Name = "Ruc")]
        public string Ruc { get; set; }
        public string RazonSocial { get; set; }
        [Display(Name = "Nombre Comercial")]
        public string NombreComercial { get; set; }

        [Display(Name = "Dirección Matriz")]
        public string DireccionMatriz { get; set; }

        [Display(Name = "Contribuyente Especial")]
        public bool ContribuyenteEspecial { get; set; }

        [Display(Name = "Obligado Contabilidad")]
        public bool ObligadoContabilidad { get; set; }

        public int Decimales { get; set; }

        [Display(Name = "Ruta Comandos")]
        public string RutaComandos { get; set; }

        [Display(Name = "Timeout Recepción")]
        public int RecepcionTimeOut { get; set; }

        [Display(Name = "Timeout Autorización")]
        public int AutorizacionTimeOut { get; set; }
        public bool GeneraClaveAcceso { get; set; }


        [Display(Name = "Información Adicional")]
        public string InformacionAdicional1 { get; set; }

        [Display(Name = "Información Adicional")]
        public string InformacionAdicional2 { get; set; }

        [Display(Name = "Información Adicional")]
        public string InformacionAdicional3 { get; set; }

        [Display(Name = "Ruta de Xmls Procesados")]
        public Guid DocumentoPathId { get; set; }

        [Display(Name = "Numero de Establecimientos")]
        public string NumeroEstablecimientos { get; set; }

        [Display(Name = "Exportador")]
        public bool Exportador { get; set; }

        [Display(Name = "Telefonos")]
        public string Telefonos { get; set; }

        [Display(Name = "Actividad Economica")]
        public string ActividadEconomica { get; set; }

    }

}