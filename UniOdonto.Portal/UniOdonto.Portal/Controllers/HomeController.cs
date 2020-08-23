using AutoMapper;
using MvcJqGrid;
using RP.Website.Helpers;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using UniOdonto.BO;
using UniOdonto.Comun;
using UniOdonto.Controllers;
using UniOdonto.DAL.Entidad;
using UniOdonto.Models;
using UniOdonto.Models.Filters;
using UniOdonto.Portal.Helpers;

namespace UniOdonto.Portal.Controllers
{
    [Authorize]
    public class HomeController : BaseController<Guid, Appointment, AppointmentViewModel>
    {
        public readonly ConsultaService consultaService;
        public readonly PersonaService personaService;
        public readonly OdontogramaService odontogramaService;
        public readonly PeriodonciaService periodonciaService;
        public readonly UsuarioService usuarioService;
        public readonly AgendaService agendaService;
        public readonly MedicamentoService medicamentoService;
        private GridSettings GridSettings
        {
            get { return Session["_GridSettings"] as GridSettings; }
            set { Session["_GridSettings"] = value; }
        }
        public HomeController()
        {
            consultaService = new ConsultaService();
            personaService = new PersonaService();
            odontogramaService = new OdontogramaService();
            periodonciaService = new PeriodonciaService();
            usuarioService = new UsuarioService();
            agendaService = new AgendaService();
            medicamentoService = new MedicamentoService();
            EntityService = new AppointmentService();
        }
        public override void OnBeginIndex()
        {
            ViewBag.Personas = personaService.GetAll().Count();
            ViewBag.Usuarios = usuarioService.GetAll().Count();
            ViewBag.Agendas = agendaService.GetAll().Count();
            ViewBag.Medicamentos = medicamentoService.GetAll().Count();

            ViewBag.CitasAnteriorAnual = EntityService.GetAll().Where(x => x.AppointmentDate.Year == (DateTime.Now.Year - 1)).Count();
            ViewBag.CitasActualesAnual = EntityService.GetAll().Where(x => x.AppointmentDate.Year == DateTime.Now.Year).Count();

            ViewBag.CitasMesAnterior = EntityService.GetAll().Where(x => x.AppointmentDate.Month == (DateTime.Now.Month - 1) && x.AppointmentDate.Year == DateTime.Now.Year).Count();
            ViewBag.CitasMesActual = EntityService.GetAll().Where(x => x.AppointmentDate.Month == DateTime.Now.Month && x.AppointmentDate.Year == DateTime.Now.Year).Count();

            ViewBag.CitasAnteriorDias = EntityService.GetAll().Where(x => x.AppointmentDate.Day == (DateTime.Now.Day - 1) && x.AppointmentDate.Month == DateTime.Now.Month && x.AppointmentDate.Year == DateTime.Now.Year).Count();
            ViewBag.CitasActualesDias = EntityService.GetAll().Where(x => x.AppointmentDate.Day == DateTime.Now.Day && x.AppointmentDate.Month == DateTime.Now.Month && x.AppointmentDate.Year == DateTime.Now.Year).Count();

        }

        protected override IQueryable<Appointment> ApplyFilters(IQueryable<Appointment> generalQuery, Rule[] filters)
        {
            if (filters == null)
            {
                return generalQuery;
            }

            foreach (var item in filters)
            {
                var term = item.data.Trim().ToUpper();
                if (String.Equals(item.field, "fromfechaemision", StringComparison.OrdinalIgnoreCase))
                {
                    var fromfechaEmision = DateTime.ParseExact(item.data, Context.FormatoFecha, CultureInfo.InvariantCulture);
                    generalQuery = generalQuery.Where(u => u.AppointmentDate >= fromfechaEmision);
                }
                else if (String.Equals(item.field, "tofechaemision", StringComparison.OrdinalIgnoreCase))
                {
                    var tofechaEmision = DateTime.ParseExact(item.data, Context.FormatoFecha, CultureInfo.InvariantCulture).AddHours(23).AddMinutes(59).AddSeconds(59);
                    generalQuery = generalQuery.Where(u => u.AppointmentDate <= tofechaEmision);
                }
                else if (String.Equals(item.field, "persona", StringComparison.OrdinalIgnoreCase))
                {
                    var tipoIdentificacion = Guid.Parse(item.data);
                    generalQuery = generalQuery.Where(x => x.PersonasId == tipoIdentificacion);
                }
                else if (String.Equals(item.field, "empresa", StringComparison.OrdinalIgnoreCase))
                {
                    var empresaId = Guid.Parse(item.data);
                    generalQuery = generalQuery.Where(x => x.Personas.EmpresaId == empresaId);
                }
                else if (String.Equals(item.field, "tipoCita", StringComparison.OrdinalIgnoreCase))
                {
                    var seguroMedico = Guid.Parse(item.data);
                    generalQuery = generalQuery.Where(x => x.TipoCitaId == seguroMedico);
                }
                else if (String.Equals(item.field, "estadoCita", StringComparison.OrdinalIgnoreCase))
                {
                    var seguroMedico = Guid.Parse(item.data);
                    generalQuery = generalQuery.Where(x => x.EstadoCitaId == seguroMedico);
                }

            }
            return generalQuery;
        }

        protected override string[] GetRow(Appointment item)
        {
            Func<Guid, string> UltimaConsulta = delegate (Guid id)
            {
                string val = "";
                var result = consultaService.Where(x => x.PersonasId == id).OrderByDescending(x => x.Fecha).FirstOrDefault();

                return val = result == null ? "" : result.Fecha.ToString(Context.FormatoFecha);
            };
            return new[]
            {
                HttpUtility.HtmlEncode(string.Format("HC. {0}",item.Personas.NumeroPaciente)),
                HttpUtility.HtmlEncode(item.Personas.Identificacion),
                HttpUtility.HtmlEncode(item.Personas.NombreCompleto),
                HttpUtility.HtmlEncode(item.Personas.FechaNacimiento.Value.ToString(Context.FormatoFecha)),
                HttpUtility.HtmlEncode(string.Format("{0} años",CalculoEdad.Edad(item.Personas.FechaNacimiento.Value))),
                HttpUtility.HtmlEncode(GridHelperExts.CreateSpanHome(item.TipoCita.Descripcion, item.TipoCita.BackgroundColor, item.TipoCita.Color)),
                HttpUtility.HtmlEncode(GridHelperExts.CreateSpanHome(item.EstadoCita.Descripcion, item.EstadoCita.BackgroundColor, item.EstadoCita.Color)),
                HttpUtility.HtmlEncode(UltimaConsulta(item.PersonasId.Value)),
                HttpUtility.HtmlEncode(item.AppointmentDate.ToString(Context.FormatoHora)),
                HttpUtility.HtmlEncode(GridHelperExts.ActionsList("agendas-modal")
                     .Add(EditAction(Url.Action("Personas","Personas", new {id = item.PersonasId.Value})))
                     .Add(ConfiguracionAction(item.PersonasId))
                    .End())
            };
        }

        public IHtmlString ConfiguracionAction(object id = null)
        {
            var button = string.Format(@"<li class=""""><a title=""Historia Clínica"" target=""_blank"" data-toggle=""tooltip"" class=""btn btn-info btn-xs"" href=""{0}""><i class=""fa fa-comment-alt-medical""></i></a></li>",
                            Url.Action("Index", "Historia", new { id }));
            return MvcHtmlString.Create(button);
        }

        public IHtmlString EditAction(string url)
        {
            var button = string.Format(@"<li><a title=""Editar"" data-toggle=""tooltip"" target=""_blank"" class=""btn btn-primary btn-xs"" href=""{0}""><i class='glyphicon glyphicon-pencil'></i></a></li>",
                            url);
            return MvcHtmlString.Create(button);
        }

        protected override Appointment MapperModelToEntity(AppointmentViewModel viewModel)
        {
            throw new NotImplementedException();
        }

        protected override AppointmentViewModel MapperEntityToModel(Appointment entity)
        {
            throw new NotImplementedException();
        }

        public override IEnumerable<FieldFilter> Filters
        {
            get
            {
                var filters = new List<FieldFilter>
                {
                      new FieldFilter
                    {
                        Description = "Tipo Cita",
                        Name = "tipoCita",
                        Type = FilterType.Select,
                        UrlData = Url.Action("GetValuesTipoDocumento","TipoIdentificacion",new { Tipo = "TipCit"})
                    },
                     new FieldFilter
                    {
                        Description = "Estado Cita",
                        Name = "estadoCita",
                        Type = FilterType.Select,
                        UrlData = Url.Action("GetValuesTipoDocumento","TipoIdentificacion",new { Tipo = "EstCit"})
                    },
                    new FieldFilter
                    {
                        Description = "Personas",
                        Name = "persona",
                        Type = FilterType.DataModal,
                        Placeholder = "Ruc/CI/Pasaporte Cliente",
                        Url = "/Personas/ListaPersonas/",
                        Modelo="Personas"
                    },
                     new FieldFilter
                    {
                        Description = "Fecha Emisión",
                        Name = "fechaemision",
                        Type = FilterType.DateRange
                    },
                     new FieldFilter
                    {
                        Description = "Empresa",
                        Name = "empresa",
                        Type = FilterType.Select,
                        UrlData = Url.Action("GetValues","Empresas")
                    }
                };
                return filters;
            }
        }
    }
}