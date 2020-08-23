using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace UniOdonto.DAL.Entidad
{
    [Table("Personas")]
    public class Personas : BaseConfiguracionGeneral
    {
        public Guid? EmpresaId { get; set; }
        public virtual Empresa Empresa { get; set; }
        public Guid TipoIdentificacionId { get; set; }
        public virtual TipoIdentificacion TipoIdentificacion { get; set; }
        public Guid? TipoSangreId { get; set; }
        public virtual TipoIdentificacion TipoSangre { get; set; }
        public Guid? SexoId { get; set; }
        public virtual TipoIdentificacion Sexo { get; set; }
        public Guid? EstadoCivilId { get; set; }
        public virtual TipoIdentificacion EstadoCivil { get; set; }
        public Guid? TipoPacienteId { get; set; }
        public virtual TipoIdentificacion TipoPaciente { get; set; }
        public Guid? SeguroMedicoId { get; set; }
        public virtual TipoIdentificacion SeguroMedico { get; set; }
        public Guid? TipoParienteId { get; set; }
        public virtual TipoIdentificacion TipoPariente { get; set; }
        public Guid? OcupacionId { get; set; }
        public virtual TipoIdentificacion Ocupacion { get; set; }
        public Guid? ProvinciasId { get; set; }
        public virtual Provincias Provincias { get; set; }
        public Guid? CantonesId { get; set; }
        public virtual Cantones Cantones { get; set; }
        public Guid? PersonaAsoId { get; set; }
        public virtual Personas PersonaAso { get; set; }
        public DateTime? FechaNacimiento { get; set; }
        public string NumeroPaciente { get; set; }
        public string Identificacion { get; set; }
        public string PrimerNombre { get; set; }
        public string SegundoNombre { get; set; }
        public string PrimerApellido { get; set; }
        public string SegundoApellido { get; set; }
        public string NombreComercial { get; set; }
        public string Telefonos { get; set; }
        public string Direccion { get; set; }
        public bool Extranjero { get; set; }
        public string Email { get; set; }
        public bool EsPaciente { get; set; }
        public bool EsPariente { get; set; }
        public bool Discapacidad { get; set; }
        public string PorcentajeDiscapacidad { get; set; }
        public string Referenia { get; set; }

        [NotMapped]
        public string NombreCompleto
        {
            get { return string.Format("{0} {1} {2} {3}", PrimerNombre != null ? PrimerNombre.ToUpper() : "", SegundoNombre != null ? SegundoNombre.ToUpper() : "", PrimerApellido != null ? PrimerApellido.ToUpper() : "", SegundoApellido != null ? SegundoApellido.ToUpper() : ""); }
        }
        [NotMapped]
        public string NombreAutocomplete
        {
            get { return string.Format("({4}) - {0} {1} {2} {3}", PrimerNombre != null ? PrimerNombre.ToUpper() : "", SegundoNombre != null ? SegundoNombre.ToUpper() : "", PrimerApellido != null ? PrimerApellido.ToUpper() : "", SegundoApellido != null ? SegundoApellido.ToUpper() : "", Identificacion); }
        }

    }
}