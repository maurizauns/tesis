using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using UniOdonto.Comun;


namespace UniOdonto.Models
{
    public class PersonasDto
    {
        public Guid? EmpresaId { get; set; }
        public virtual EmpresaViewModel Empresa { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio.")]
        [Display(Name = "Tipo de Identificación")]
        public Guid TipoIdentificacionId { get; set; }
        public virtual TipoIdentificacionViewModel TipoIdentificacion { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio.")]
        [Display(Name = "Tipo de Sangre")]
        public Guid? TipoSangreId { get; set; }
        public virtual TipoIdentificacionViewModel TipoSangre { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio.")]
        [Display(Name = "Sexo")]
        public Guid? SexoId { get; set; }
        public virtual TipoIdentificacionViewModel Sexo { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio.")]
        [Display(Name = "Estado Civil")]
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

        //[Range(typeof(DateTime), "01/01/1945", DateTime.Now.ToString(Comun.Context.FormatoFecha), ErrorMessage = "Value for {0} must be between {1} and {2}")]
        [CustomValidation(typeof(PersonDateTimeValidation), "ValidaFechaNacimiento")]
        [Required(ErrorMessage = "El campo {0} es obligatorio.")]
        [Display(Name = "Fecha de Nacimiento")]
        public string FechaNacimiento { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio.")]
        [Display(Name = "Número de Paciente")]
        public string NumeroPaciente { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio.")]
        [Display(Name = "Identificación")]
        public string Identificacion { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio.")]
        [Display(Name = "Primer Nombre")]
        public string PrimerNombre { get; set; }

        [Display(Name = "Segundo Nombre")]
        public string SegundoNombre { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio.")]
        [Display(Name = "Primer Apellido")]
        public string PrimerApellido { get; set; }

        [Display(Name = "Segundo Apellido")]
        public string SegundoApellido { get; set; }

        [Display(Name = "Nombre Comercial")]
        public string NombreComercial { get; set; }

        [Display(Name = "Teléfono")]
        public string Telefonos { get; set; }

        [Display(Name = "Dirección")]
        public string Direccion { get; set; }

        [Display(Name = "Es Extranjero")]
        public bool Extranjero { get; set; }

        [Display(Name = "Email")]
        public string Email { get; set; }

        [Display(Name = "Es Paciente")]
        public bool EsPaciente { get; set; }
        public bool EsPariente { get; set; }

        [Display(Name = "Es Discapacidad")]
        public bool Discapacidad { get; set; }

        [Display(Name = "Porcentaje de Discapacidad")]
        public string PorcentajeDiscapacidad { get; set; }
        public string Referenia { get; set; }
        public string NombreCompleto
        {
            get { return string.Format("{0} {1} {2} {3}", PrimerNombre != null ? PrimerNombre.ToUpper() : "", SegundoNombre != null ? SegundoNombre.ToUpper() : "", PrimerApellido != null ? PrimerApellido.ToUpper() : "", SegundoApellido != null ? SegundoApellido.ToUpper() : ""); }
        }
        public string NombreAutocomplete
        {
            get { return string.Format("({4}) - {0} {1} {2} {3}", PrimerNombre != null ? PrimerNombre.ToUpper() : "", SegundoNombre != null ? SegundoNombre.ToUpper() : "", PrimerApellido != null ? PrimerApellido.ToUpper() : "", SegundoApellido != null ? SegundoApellido.ToUpper() : "", Identificacion); }
        }
    }
}