using AutoMapper;
using Microsoft.AspNet.Identity;
using MvcJqGrid;
using RP.Website.Helpers;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using UniOdonto.BO;
using UniOdonto.Comun;
using UniOdonto.DAL;
using UniOdonto.DAL.Entidad;
using UniOdonto.Extensions;
using UniOdonto.Models;
using UniOdonto.Resources;

namespace UniOdonto.Controllers
{
    [CustomAuthorize(ModuleName = "Agendas", AllowActions = "GetValues")]
    public class AgendasController : BaseController<Guid,Agendas, AgendasViewModel>
    {
        private readonly Guid UserID = Context.CurrentUserId;
        private readonly WebVentasContext db = new WebVentasContext();
        private readonly UsuarioService UsuarioService;
        public AgendasController()
        {
            EntityService = new AgendaService();
            UsuarioService = new UsuarioService();
            Title = "Agenda";
        }
        public override void OnBeginIndex()
        {
            using (var tipoIdentificacionService = new TipoIdentificacionService())
            {
                ViewBag.TipoIdentificacionService = new SelectList(tipoIdentificacionService.GetAll().Where(x => x.SubTipoIdentificacion.Codigo == "DurCit").ToList(), "Id", "Descripcion", null);
            }
        }
        protected override IQueryable<Agendas> ApplyFilters(IQueryable<Agendas> generalQuery, Rule[] filters)
        {
            throw new NotImplementedException();
        }

        protected override string[] GetRow(Agendas item)
        {
            return new[]
            {
                HttpUtility.HtmlEncode(item.Nombre),
                HttpUtility.HtmlEncode(item.Propietario.NombresCompletos),
                HttpUtility.HtmlEncode(GridHelperExts.ActionsList("agendas-modal")
                    .Add(GridHelperExts.EditAction(Url.Action("GetEntity"), item.Id, "agendasCallback"))
                    .Add(GridHelperExts.AddOther(Url.Action("GetHorariosEntity"), item.Id, "horariosCallback"))
                    .Add(GridHelperExts.DeleteAction(Url.Action("Delete"), "agendas-grid", item.Id))
                    .End())
            };
        }
        public virtual async Task<ActionResult> GetHorariosEntity(Guid id)
        {
            OnBeginCrudAction();

            var entity = await EntityService.GetByIdAsync(id);

            if (entity == null)
            {
                return await Task.Run(() => Json(new { success = false, message = ResourceMessage.NoExisteRegistro }, JsonRequestBehavior.AllowGet));
            }

            return await Task.Run(() => Json(MapperEntityToModel(entity), JsonRequestBehavior.AllowGet));
        }


        protected override AgendasViewModel MapperEntityToModel(Agendas entity)
        {
            return Mapper.Map<Agendas, AgendasViewModel>(entity);
        }

        protected override Agendas MapperModelToEntity(AgendasViewModel viewModel)
        {
            var agenda = new Agendas();
            if (viewModel.Id != null && viewModel.Id != Guid.Empty)
            {
                agenda = EntityService.FirstOrDefault(x=>x.Id == viewModel.Id.Value);
            }
            return Mapper.Map(viewModel, agenda);
        }

        public virtual async Task<ActionResult> SaveAgenda(AgendasViewModel model)
        {
            OnBeginCrudAction();

            if (!ModelState.IsValid)
            {
                return await Task.Run(() => Json(new { success = false, message = GetValidationMessages() }, JsonRequestBehavior.AllowGet));
            }

            try
            {
                var entity = MapperModelToEntity(model);

                var claims = ClaimsPrincipal.Current.Identities.First().Claims.ToList();
                var asd = claims?.FirstOrDefault(x => x.Type.Equals("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier", StringComparison.OrdinalIgnoreCase))?.Value;
                entity.PropietarioId = new Guid(asd);
                var saveResult = await EntityService.SaveAsync(entity);

                if (saveResult.Succeeded)
                {
                    AgendaUsuario nuevaAgendaUsuario = new AgendaUsuario
                    {
                        AgendaId = entity.Id,
                        UsuarioId = entity.PropietarioId,
                        Inicio ="06:00:00",
                        Fin = "20:00:00"
                    };
                    try
                    {
                        db.AgendaUsuario.Add(nuevaAgendaUsuario);
                        await db.SaveChangesAsync();
                    }
                    catch (Exception)
                    {
                    }
                    return await Task.Run(() => Json(new { success = true, message = string.Empty }, JsonRequestBehavior.AllowGet));
                }

                return await Task.Run(() => Json(new { success = false, message = saveResult.GetErrorsString() }, JsonRequestBehavior.AllowGet));
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        protected override void Dispose(bool disposing)
        {
            EntityService.Dispose();
            base.Dispose(disposing);
        }
    }
}