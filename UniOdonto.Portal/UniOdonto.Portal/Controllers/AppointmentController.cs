using AutoMapper;
using MvcJqGrid;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using UniOdonto.BO;
using UniOdonto.DAL.Entidad;
using UniOdonto.Models;
using UniOdonto.Comun;
using FirmasUtilities;

namespace UniOdonto.Controllers
{
    public class AppointmentController : BaseController<Guid, Appointment, AppointmentViewModel>
    {
        private readonly AgendaService agendaService;
        private readonly HorarioService horarioService;
        private readonly EmpresaService EmpresaService;
        private readonly TipoIdentificacionService TipoIdentificacionService;
        private readonly UsuarioService UsuarioService;
        PersonaService PersonaService;
        public Guid EmpresasID = Context.CurrentEmpresaId;
        private GridSettings GridSettings
        {
            get { return Session["_GridSettings"] as GridSettings; }
            set { Session["_GridSettings"] = value; }
        }
        public AppointmentController()
        {
            Title = "Agendas";
            PersonaService = new PersonaService();
            horarioService = new HorarioService();
            EmpresaService = new EmpresaService();
            UsuarioService = new UsuarioService();
            TipoIdentificacionService = new TipoIdentificacionService();
            agendaService = new AgendaService();
            EntityService = new AppointmentService();
        }
        public override void OnBeginIndex()
        {
            var duracionCitaMin = new TipoIdentificacionService(EntityService.UnitOfWork);
            ViewBag.AppointmentLenght = new SelectList(duracionCitaMin.Where(x => x.SubTipoIdentificacion.Codigo == "DurCitMin").ToList(), "Codigo", "Descripcion");
            ViewBag.TipoCitaId = new SelectList(duracionCitaMin.Where(x => x.SubTipoIdentificacion.Codigo == "TipCit").ToList(), "Id", "Descripcion");
            ViewBag.EstadoCitaId = new SelectList(duracionCitaMin.Where(x => x.SubTipoIdentificacion.Codigo == "EstCit").ToList(), "Id", "Descripcion");

        }

        protected override IQueryable<Appointment> ApplyFilters(IQueryable<Appointment> generalQuery, Rule[] filters)
        {
            throw new NotImplementedException();
        }

        protected override string[] GetRow(Appointment item)
        {
            throw new NotImplementedException();
        }

        protected override AppointmentViewModel MapperEntityToModel(Appointment entity)
        {
            return Mapper.Map<Appointment, AppointmentViewModel>(entity);
        }

        protected override Appointment MapperModelToEntity(AppointmentViewModel viewModel)
        {
            var bodegas = new Appointment();
            if (viewModel.Id != null && viewModel.Id != Guid.Empty)
            {
                bodegas = EntityService.GetById(viewModel.Id.Value);
                bodegas.Agendas = agendaService.GetById(viewModel.AgendasId);
                bodegas.EstadoCita = TipoIdentificacionService.GetById(viewModel.EstadoCitaId.Value);
                bodegas.Personas = PersonaService.GetById(viewModel.PersonasId.Value);
                bodegas.TipoCita = TipoIdentificacionService.GetById(viewModel.TipoCitaId.Value);
                bodegas.Usuario = UsuarioService.GetById(viewModel.UsuarioId);
            }
            return Mapper.Map(viewModel, bodegas);
        }

        public async Task<ActionResult> GetAgendas()
        {
            var identity = (ClaimsPrincipal)Thread.CurrentPrincipal;
            var sid = identity.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier)
                   .Select(c => c.Value).SingleOrDefault();
            Guid userId = new Guid(sid);
            List<Agendas> result = await agendaService.GetAll().Include(x => x.AgendaUsuario).Where(x => x.AgendaUsuario.Where(s => s.UsuarioId == userId).Count() > 0).ToListAsync();
            return Json(Mapper.Map<List<AgendasViewModel>>(result), JsonRequestBehavior.AllowGet);
        }
        [HttpDelete]
        public async Task<ActionResult> DeleteAppointment(Guid id)
        {
            try
            {
                var result = EntityService.GetById(id);
                var saveResult = await EntityService.DeleteAsync(result);
                return await Task.Run(() => Json(new { success = true, message = string.Empty }, JsonRequestBehavior.AllowGet));
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public async Task<ActionResult> GetSchedule(Guid PropietarioId, Guid AgendaId)
        {
            var result = await horarioService.GetAll().Where(x => x.PropietarioId == PropietarioId && x.AgendasId == AgendaId).ToListAsync();
            return Json(Mapper.Map<List<HorariosViewModel>>(result), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public async Task<ActionResult> GetClinicEvents(Guid PropietarioId, Guid AgendaId, string start, string end)
        {
            var fromDate = Convert.ToDateTime(start);
            var toDate = Convert.ToDateTime(end);
            var AppointmentList = new List<AppointmentDiaryViewModel>();

            var result = await EntityService.GetAll().Where(x => x.UsuarioId == PropietarioId && x.AgendasId == AgendaId && x.AppointmentDate >= fromDate && DbFunctions.AddMinutes(x.AppointmentDate, x.AppointmentLenght) <= toDate).ToListAsync();
            foreach (var item in result)
            {
                AppointmentList.Add(new AppointmentDiaryViewModel()
                {
                    Id = item.Id,
                    PersonasId = item.PersonasId,
                    PatientName = item.Personas.PrimerNombre,
                    UsuarioId = item.UsuarioId,
                    DoctorName = item.Usuario.NombresCompletos,
                    StartDateString = item.AppointmentDate.ToString("s"),
                    EndDateString = item.AppointmentDate.AddMinutes(item.AppointmentLenght).ToString("s"),
                    Title = item.AppointmentTitle,
                    StatusString = item.TipoCita.Descripcion,
                    StatusColor = item.TipoCita.BackgroundColor,
                    TextColor = item.TipoCita.Color,
                    ClassName = "#DD5600",

                });
            }
            var eventList = from e in AppointmentList
                            select new
                            {
                                id = e.Id,
                                title = e.Title,
                                start = e.StartDateString,
                                end = e.EndDateString,
                                className = e.ClassName,
                                color = e.StatusColor,
                                DoctorKey = e.UsuarioId,
                                PatientKey = e.PersonasId,
                                DoctorName = e.DoctorName,
                                PatientName = e.PatientName,
                                allDay = false,
                                textColor = e.TextColor,
                                durationEditable = false,
                            };
            var rows = eventList.ToArray();

            return Json(rows, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public virtual async Task<ActionResult> Ingreso(AppointmentViewModel model)
        {
            OnBeginCrudAction();
            if (!ModelState.IsValid)
            {
                return await Task.Run(() => Json(new { success = false, message = GetValidationMessages() }, JsonRequestBehavior.AllowGet));
            }
            try
            {
                var persona = PersonaService.GetById(model.PersonasId.Value);
                model.AppointmentTitle = string.Format("{0} {1} {2} {3}", persona.PrimerNombre != null ? persona.PrimerNombre.ToUpper() : "", persona.SegundoNombre != null ? persona.SegundoNombre.ToUpper() : "", persona.PrimerApellido != null ? persona.PrimerApellido.ToUpper() : "", persona.SegundoApellido != null ? persona.SegundoApellido.ToUpper() : "");
                model.RepetirTipo = 1;
                var entity = MapperModelToEntity(model);
                persona.Empresa = EmpresaService.GetById(persona.EmpresaId.Value);

                var saveResult = await EntityService.SaveAsync(entity); //Guardar Documento
                if (saveResult.Succeeded)
                {
                    #region enviarMail
                    var resultado = false;
                    var mensaje = "";
                    var manager = new FirmasManager();
                    entity.TipoCita = TipoIdentificacionService.GetById(entity.TipoCitaId.Value);
                    entity.EstadoCita = TipoIdentificacionService.GetById(entity.EstadoCitaId.Value);
                    entity.Usuario = UsuarioService.GetById(entity.UsuarioId);
                    var mensajeHtml = persona.Empresa.EmailMensajeHtml;
                    mensajeHtml = mensajeHtml.Replace("&lt;TIPOCITA&gt;", entity.TipoCita.Descripcion);
                    mensajeHtml = mensajeHtml.Replace("&lt;ESTADOCITA&gt;", entity.EstadoCita.Descripcion);
                    mensajeHtml = mensajeHtml.Replace("&lt;DOCTOR&gt;", entity.Usuario.NombresCompletos);
                    mensajeHtml = mensajeHtml.Replace("&lt;PACIENTE&gt;", persona.NombreCompleto);
                    mensajeHtml = mensajeHtml.Replace("&lt;FECHAACTUAL&gt;", DateTime.Now.ToString(Comun.Context.FormatoFecha));
                    mensajeHtml = mensajeHtml.Replace("&lt;FECHACITA&gt;", entity.AppointmentDate.ToString(Comun.Context.FormatoFecha));
                    mensajeHtml = mensajeHtml.Replace("&lt;HORACITA&gt;", entity.AppointmentDate.ToString(Comun.Context.FormatoHora));

                    var correo = new Correo
                    {
                        De = persona.Empresa.EmailDe,
                        Para = persona.Email,
                        ConCopia = "",
                        ConCopiaOculta = "",
                        Asunto = "Notificacion: " + entity.TipoCita.Descripcion + " Estado: " + entity.EstadoCita.Descripcion,
                        Mensaje = mensajeHtml,
                        ServidorCorreo = persona.Empresa.SmtpServidor,
                        Usuario = persona.Empresa.SmtpUsuario,
                        Clave = persona.Empresa.SmtpClave,
                        Puerto = persona.Empresa.SmtpPuerto,
                        HabilitaSsl = persona.Empresa.SmtpHabilitaSsl
                    };
                    resultado = manager.EnviarCorreo(correo, ref mensaje);
                    #endregion
                    return await Task.Run(() => Json(new { success = true, message = string.Empty }, JsonRequestBehavior.AllowGet));
                }
                return await Task.Run(() => Json(new { success = false, message = saveResult.GetErrorsString() }, JsonRequestBehavior.AllowGet));
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public async Task<ActionResult> Exportar(string empresa, string fromfechaemision, string tofechaemision, string persona, string estadoCita, string tipoCita)
        {
            var generalQuery = await EntityService.GetAllAsync();

            if (!User.IsInRole("Administrador"))
            {
                generalQuery.Where(x => x.Personas.EmpresaId == EmpresasID);
            }
            if (empresa != "")
            {
                generalQuery.Where(x => x.Personas.EmpresaId == EmpresasID);
            }
            if (fromfechaemision != "")
            {
                var fromfechaEmision = DateTime.ParseExact(fromfechaemision, Context.FormatoFecha, CultureInfo.InvariantCulture);
                generalQuery = generalQuery.Where(u => u.AppointmentDate >= fromfechaEmision);
            }
            if (tofechaemision != "")
            {
                var tofechaEmision = DateTime.ParseExact(tofechaemision, Context.FormatoFecha, CultureInfo.InvariantCulture).AddHours(23).AddMinutes(59).AddSeconds(59);
                generalQuery = generalQuery.Where(u => u.AppointmentDate <= tofechaEmision);
            }
            if (persona != "")
            {
                var tipoIdentificacion = Guid.Parse(persona);
                generalQuery = generalQuery.Where(x => x.PersonasId == tipoIdentificacion);
            }
            generalQuery = OnBeginFilter(generalQuery);

            var defaultFilters = GetDefaultFilters();

            if (defaultFilters != null && defaultFilters.Any())
            {
                var rules = defaultFilters.Select(f => new Rule()
                {
                    data = f.DefaultValue,
                    field = f.Name
                });

                generalQuery = ApplyFilters(generalQuery, rules.ToArray());
            }
            generalQuery = generalQuery.Where(x => x.Personas.EmpresaId == EmpresasID);
            if (GridSettings != null && GridSettings.Where != null)
            {
                generalQuery = ApplyFilters(generalQuery, GridSettings.Where.rules);
            }
            return new ExportAppointmentResult(generalQuery);
        }

        protected override void Dispose(bool disposing)
        {
            PersonaService.Dispose();
            horarioService.Dispose();
            agendaService.Dispose();
            EntityService.Dispose();
            base.Dispose(disposing);
        }
    }
}