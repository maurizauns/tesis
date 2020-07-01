using System;
using UniOdonto.Comun;

namespace UniOdonto.Models
{
    public class PersonasViewModel : BaseModel
    {
        public Guid? EmpresaId { get; set; }
        public virtual EmpresaViewModel Empresa { get; set; }
        public Guid TipoIdentificacionId { get; set; }
        public virtual TipoIdentificacionViewModel TipoIdentificacionViewModel { get; set; }
        public Guid? TipoSangreId { get; set; }
        public virtual TipoIdentificacionViewModel TipoSangre { get; set; }
        public Guid? SexoId { get; set; }
        public virtual TipoIdentificacionViewModel Sexo { get; set; }
        public Guid? EstadoCivilId { get; set; }
        public virtual TipoIdentificacionViewModel EstadoCivil { get; set; }
        public Guid? TipoPacienteId { get; set; }
        public virtual TipoIdentificacionViewModel TipoPaciente { get; set; }
        public Guid? SeguroMedicoId { get; set; }
        public virtual TipoIdentificacionViewModel SeguroMedico { get; set; }
        public Guid? TipoParienteId { get; set; }
        public virtual TipoIdentificacionViewModel TipoPariente { get; set; }
        public Guid? OcupacionId { get; set; }
        public virtual TipoIdentificacionViewModel Ocupacion { get; set; }
        public Guid? ProvinciasId { get; set; }
        public virtual ProvinciasViewModel Provincias { get; set; }
        public Guid? CantonesId { get; set; }
        public virtual CantonesViewModel Cantones { get; set; }
        public Guid? PersonaAsoId { get; set; }
        public virtual PersonasViewModel PersonaAso { get; set; }
        public string FechaNacimiento { get; set; }
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
        public string NombreCompleto
        {
            get { return string.Format("{0} {1} {2} {3}", PrimerNombre != null ? PrimerNombre.ToUpper() : "" , SegundoNombre != null ? SegundoNombre.ToUpper() : "", PrimerApellido != null ? PrimerApellido.ToUpper() : "", SegundoApellido != null ? SegundoApellido.ToUpper() : ""); }
        }
        public string NombreAutocomplete
        {
            get { return string.Format("({4}) - {0} {1} {2} {3}", PrimerNombre != null ? PrimerNombre.ToUpper() : "", SegundoNombre != null ? SegundoNombre.ToUpper() : "", PrimerApellido != null ? PrimerApellido.ToUpper() : "", SegundoApellido != null ? SegundoApellido.ToUpper() : "", Identificacion); }
        }

    }
    public class TipoIdentificacionViewModel : BaseModel
    {
        public string Codigo { get; set; }

        public string Descripcion { get; set; }
    }
}