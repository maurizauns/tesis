using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using UniOdonto.BO;
using UniOdonto.DAL.Entidad;
using UniOdonto.Extensions;
using UniOdonto.Models;
using UniOdonto.Models.Filters;
using MvcJqGrid;
using RP.Website.Helpers;
using UniOdonto.DAL;
using Microsoft.AspNet.Identity;

namespace UniOdonto.Controllers
{
    [CustomAuthorize(ModuleName = "Usuarios")]
    public class UsuariosController : BaseController<Guid, Usuario, UsuarioViewModel>
    {
        WebVentasContext db = new WebVentasContext();
        private string EmpresaId
        {
            get { return Session["empresaId"] != null ? Session["empresaId"].ToString() : ""; }
            set { Session["empresaId"] = value; }
        }

        public UsuariosController()
        {
            EntityService = new UsuarioService();
        }
        public override void OnBeginIndex()
        {
            using (var empresaService = new EmpresaService())
            {
               // if (User.IsInRole("Usuario"))
               // {
               //     ViewBag.EmpresaId = new SelectList(empresaService.Where(x=>x.Id == EmpresasId).ToList(), "Id", "NombreCompleto", null);
               // }
               // else
               // {
                    ViewBag.EmpresaId = new SelectList(empresaService.GetAll().ToList(), "Id", "NombreCompleto", null);
                //}
            }
            using (var roleMenuService = new RoleMenuService())
            {
                ViewBag.ApplicationRoleName = new SelectList(roleMenuService.ObtenerRoles(), "Name", "Name", null);
            }
        }

        public async Task<ActionResult> Lista()
        {
            Session.Remove("empresaId");
            return RedirectToAction("Index", "Usuarios");
        }
        public override IQueryable<Usuario> OnBeginFilter(IQueryable<Usuario> generalQuery)
        {
            //if (User.IsInRole("Usuario"))
            //{
            //    generalQuery = generalQuery.Where(u => u.EmpresaId == EmpresasId);
            //}
            return generalQuery;
        }
        // GET: Usuario
        protected override IQueryable<Usuario> ApplyFilters(IQueryable<Usuario> generalQuery, Rule[] filters)
        {
            if (filters == null)
            {
                return generalQuery;
            }

            foreach (var item in filters)
            {
                var term = item.data.Trim().ToUpper();

                if (String.Equals(item.field, "empresa", StringComparison.OrdinalIgnoreCase))
                {
                    var id = Guid.Parse(item.data);
                    generalQuery = generalQuery.Where(u => u.EmpresaId == id);
                }
                else if (String.Equals(item.field, "identificacion", StringComparison.OrdinalIgnoreCase))
                {
                    generalQuery = generalQuery.Where(x => x.Identificacion.Trim().ToLower().Contains(term));
                }
            }
            return generalQuery;
        }

        protected override string[] GetRow(Usuario item)
        {
            var row = new[]
            {
                HttpUtility.HtmlEncode(UsuarioService.GetTipoIdentificacion(item.TipoIdentificacion)),
                HttpUtility.HtmlEncode(item.Identificacion),
                HttpUtility.HtmlEncode(item.NombresCompletos),
                HttpUtility.HtmlEncode(item.ApplicationUser.Email),
                HttpUtility.HtmlEncode(GridHelperExts.ActionsList("usuarios-modal")
                            .Add(GridHelperExts.EditAction(Url.Action("GetEntity"), item.Id, "usuariosCallback"))
                            .Add(GridHelperExts.DeleteAction(Url.Action("Delete"), "usuarios-grid", item.Id))
                            .Add(ConfigurarAction(item.Id))
                            .End())
            };
            return row;
        }

        public IHtmlString ConfigurarAction(object id = null)
        {
            var button = string.Format(@"<li class=""""><a title=""Cambiar de Clave"" data-toggle=""tooltip"" class=""btn btn-warning btn-xs"" href=""{0}""><i class=""fas fa-lock""></i></a></li>",
                            Url.Action("CambiaClave", new { id }));


            return MvcHtmlString.Create(button);
        }

        protected override Usuario MapperModelToEntity(UsuarioViewModel viewModel)
        {
            Usuario usuario = null;

            if (viewModel.Id != null && viewModel.Id != Guid.Empty)
            {
                usuario = EntityService.GetById(viewModel.Id.Value);
            }
            else
            {
                usuario = new Usuario();
            }

            usuario.Id = viewModel.Id == null ? Guid.Empty : viewModel.Id.Value;
            usuario.TipoIdentificacion = viewModel.TipoIdentificacion;
            usuario.Identificacion = viewModel.Identificacion;
            usuario.NombresCompletos = viewModel.NombresCompletos;
            usuario.Email = viewModel.Email;
            usuario.EmpresaId = viewModel.EmpresaId;
            usuario.ApplicationRoleName = viewModel.ApplicationRoleName;

            return usuario;
        }

        protected override UsuarioViewModel MapperEntityToModel(Usuario entity)
        {
            using (var roleMenuService = new RoleMenuService())
            {
                var roles = roleMenuService.ObtenerRolPorUserId(entity.ApplicationUserId);
                if (roles.Any())
                {
                    entity.ApplicationRoleName = roles.FirstOrDefault();
                }
            }

            return new UsuarioViewModel
            {
                Id = entity.Id,
                TipoIdentificacion = entity.TipoIdentificacion,
                Identificacion = entity.Identificacion,
                NombresCompletos = entity.NombresCompletos,
                Email = entity.Email,
                EmpresaId = entity.EmpresaId,
                ApplicationRoleName = entity.ApplicationRoleName
            };
        }

        public override IEnumerable<FieldFilter> Filters
        {
           
            get
            {
                //if (User.IsInRole("Usuario"))
                //{
                //    EmpresaId = EmpresasId.ToString();

                //}
                var filters = new List<FieldFilter>
                {
                    new FieldFilter
                    {
                        Description = "Identificación",
                        Name = "identificacion",
                        Type = FilterType.Textbox,
                    },
                    new FieldFilter
                    {
                        Description = "Empresa",
                        Name = "empresa",
                        Type = FilterType.Select,
                        UrlData = Url.Action("GetValues","Empresas"),
                        DefaultValue = EmpresaId
                    }
                };
                return filters;
            }
        }

        public ActionResult CambiaClave(Guid id)
        {
            var model = new ChangePasswordViewModel() { Id = id };

            return View(model);
        }

        //
        // POST: /Manage/ChangePassword
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> CambiaClave(ChangePasswordViewModel model)
        {
            var mensaje = "";
            if (ModelState.IsValid)
            {
                var userId = model.Id != null ? model.Id.Value : Guid.Empty;

                var result = await ((UsuarioService)EntityService).CambiarClave(userId, model.OldPassword, model.NewPassword);

                mensaje = !result.Succeeded ? result.GetErrorsString() : "Clave cambiada";
            }

            ModelState.AddModelError("", mensaje);

            return View(model);
        }

        public virtual async Task<ActionResult> SaveUsuario(UsuarioViewModel model)
        {
            OnBeginCrudAction();

            if (!ModelState.IsValid)
            {
                return await Task.Run(() => Json(new { success = false, message = GetValidationMessages() }, JsonRequestBehavior.AllowGet));
            }

            try
            {
                var entity = MapperModelToEntity(model);

                var saveResult = await EntityService.SaveAsync(entity);

                var userID = User.Identity.GetUserId();
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