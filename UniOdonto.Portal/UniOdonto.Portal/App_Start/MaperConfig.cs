using AutoMapper;
using System;
using UniOdonto.DAL.Entidad;
using UniOdonto.Models;

namespace UniOdonto
{
    public class MaperConfig : Profile
    {
        public MaperConfig()
        {

        }

        protected override void Configure()
        {
            Mapper.CreateMap<Empresa, EmpresaViewModel>();
            Mapper.CreateMap<EmpresaViewModel, Empresa>();

            Mapper.CreateMap<Empresa, EmpresaSmtpViewModel>();
            Mapper.CreateMap<EmpresaSmtpViewModel, Empresa>();

            Mapper.CreateMap<Empresa, EmpresaEmailClienteViewModel>();
            Mapper.CreateMap<EmpresaEmailClienteViewModel, Empresa>();

            Mapper.CreateMap<Configuracion, ConfiguracionViewModel>();
            Mapper.CreateMap<ConfiguracionViewModel, Configuracion>();

            Mapper.CreateMap<EmpresaViewModel, Empresa>()
                .ForMember(c => c.Usuarios, option => option.Ignore());

            Mapper.CreateMap<Paneles, PanelesViewModel>();
            Mapper.CreateMap<PanelesViewModel, Paneles>();

            Mapper.CreateMap<Personas, PersonasViewModel>();
            Mapper.CreateMap<PersonasViewModel, Personas>();

            Mapper.CreateMap<TipoIdentificacion, TipoIdentificacionViewModel>();
            Mapper.CreateMap<TipoIdentificacion, TipoIdentificacionViewModel>().ReverseMap();

            Mapper.CreateMap<Provincias, ProvinciasViewModel>();
            Mapper.CreateMap<ProvinciasViewModel, Provincias>();

            Mapper.CreateMap<Cantones, CantonesViewModel>();
            Mapper.CreateMap<Cantones, CantonesViewModel>().ReverseMap();

            Mapper.CreateMap<Agendas, AgendasViewModel>();
            Mapper.CreateMap<Agendas, AgendasViewModel>().ReverseMap();

            Mapper.CreateMap<Horarios, HorariosViewModel>();
            Mapper.CreateMap<Horarios, HorariosViewModel>().ReverseMap();

            Mapper.CreateMap<Medicamentos, MedicamentosViewModel>();
            Mapper.CreateMap<Medicamentos, MedicamentosViewModel>().ReverseMap();

            Mapper.CreateMap<Consultas, ConsultasViewModel>();
            Mapper.CreateMap<Consultas, ConsultasViewModel>().ReverseMap();

            Mapper.CreateMap<Odontograma, OdontogramaViewModel>();
            Mapper.CreateMap<Odontograma, OdontogramaViewModel>().ReverseMap();

            Mapper.CreateMap<Diente, DienteViewModel>();
            Mapper.CreateMap<Diente, DienteViewModel>().ReverseMap();

            Mapper.CreateMap<EvolucionesOdontograma, EvolucionesOdontogramaViewModel>();
            Mapper.CreateMap<EvolucionesOdontograma, EvolucionesOdontogramaViewModel>().ReverseMap();

            Mapper.CreateMap<DientesPerio, DientesPerioViewModel>();
            Mapper.CreateMap<DientesPerio, DientesPerioViewModel>().ReverseMap();

            Mapper.CreateMap<Periodoncia, PeriodonciaViewModel>();
            Mapper.CreateMap<Periodoncia, PeriodonciaViewModel>().ReverseMap();

            Mapper.CreateMap<Appointment, AppointmentViewModel>();
            Mapper.CreateMap<Appointment, AppointmentViewModel>().ReverseMap();

            Mapper.CreateMap<AgendaUsuario, AgendaUsuarioViewModel>();
            Mapper.CreateMap<AgendaUsuario, AgendaUsuarioViewModel>().ReverseMap();

            Mapper.CreateMap<Usuario, UsuarioViewModel>();
            Mapper.CreateMap<Usuario, UsuarioViewModel>().ReverseMap();
        }
    }
}