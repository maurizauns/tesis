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

namespace UniOdonto.Controllers
{
    public class AppointmentController : BaseController<Guid, Appointment, AppointmentViewModel>
    {
        private readonly AgendaService agendaService;
        private readonly HorarioService horarioService;
        private readonly PersonaService PersonaService;
        public AppointmentController()
        {
            Title = "Agendas";
            PersonaService = new PersonaService();
            horarioService = new HorarioService();
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

        [ValidateInput(true)]
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
                var saveResult = await EntityService.SaveAsync(entity); //Guardar Documento
                if (saveResult.Succeeded)
                {
                    return await Task.Run(() => Json(new { success = true, message = string.Empty }, JsonRequestBehavior.AllowGet));
                }
                return await Task.Run(() => Json(new { success = false, message = saveResult.GetErrorsString() }, JsonRequestBehavior.AllowGet));
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}