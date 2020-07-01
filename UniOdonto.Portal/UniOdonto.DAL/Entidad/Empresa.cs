using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace UniOdonto.DAL.Entidad
{
    public class Empresa : BaseEntity
    {
        public Empresa()
        {
            Usuarios = new HashSet<Usuario>();
            ApplicationUser = new HashSet<ApplicationUser>();
            //OtrasConfiguraciones = new OtrasConfiguraciones();
        }

        public string Ruc { get; set; }
        public string RazonSocial { get; set; }
        public string NombreComercial { get; set; }
        public string DireccionMatriz { get; set; }
        public bool ContribuyenteEspecial { get; set; }
        public bool ObligadoContabilidad { get; set; }
        public string SmtpServidor { get; set; }
        public string SmtpUsuario { get; set; }
        public string SmtpClave { get; set; }
        public int SmtpPuerto { get; set; }
        public bool SmtpHabilitaSsl { get; set; }
        public string EmailAsunto { get; set; }
        public bool EmailIncluyeTipoDocumento { get; set; }
        public string EmailDe { get; set; }
        public string EmailPara { get; set; }
        public string EmailParaAdicional { get; set; }
        public string EmailCc { get; set; }
        public string EmailCco { get; set; }
        public string EmailMensajeHtml { get; set; }
        public int RecepcionTimeOut { get; set; }
        public int AutorizacionTimeOut { get; set; }
        public bool GeneraClaveAcceso { get; set; }
        public string InformacionAdicional1 { get; set; }
        public string InformacionAdicional2 { get; set; }
        public string InformacionAdicional3 { get; set; }
        public Guid? DocumentoPathId { get; set; }
        public int Decimales { get; set; }
        public string NumeroEstablecimientos { get; set; }
        public bool Exportador { get; set; }
        public string Telefonos { get; set; }
        public string ActividadEconomica { get; set; }
        public string EmailInventario { get; set; }
        public byte[] Imagen { get; set; }
        [NotMapped]
        public string NombreCompleto
        {
            get { return string.Format("{0} ({1})", RazonSocial, Ruc); }
        }
        public virtual ICollection<Usuario> Usuarios { get; set; }
        public virtual ICollection<ApplicationUser> ApplicationUser { get; set; }
    }
}
