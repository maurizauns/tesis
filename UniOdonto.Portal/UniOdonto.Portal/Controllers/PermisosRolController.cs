using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using UniOdonto.BO;
using UniOdonto.DAL.Entidad;
using UniOdonto.Models;

namespace UniOdonto.Controllers
{
    public class PermisosRolController : Controller
    {
        public RoleMenuService roleMenuService = new RoleMenuService();

        // GET: PermisosRol
        public ActionResult Index(string id, string mensajes)
        {
            var model = SeleccionarRol(id);

            if (!string.IsNullOrEmpty(mensajes))
            {
                foreach (var mensaje in mensajes.Split(','))
                {
                    ModelState.AddModelError("", mensaje);
                }
            }

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Save(RoleMenuViewModel model)
        {
            var result = roleMenuService.Save(model.ApplicationRoleId, model.PostedMenus.MenuIds);
            if (result.Succeeded)
            {
                return RedirectToAction("Index", new { id = model.ApplicationRoleId });
            }
            else
            {
                return RedirectToAction("Index", new { id = model.ApplicationRoleId, mensajes = result.GetErrorsString() });
            }

        }

        private RoleMenuViewModel SeleccionarRol(string id)
        {

            var menus = roleMenuService.ObtenerMenus();

            var menusOrdenados = new List<Menu>();

            foreach (var menuPadre in menus.Where(m => m.ParentId == null).OrderBy(m => m.Orden))
            {
                menuPadre.Descripcion = string.Format("<span class = 'menu-padre'>{0}</span>", menuPadre.Descripcion);
                menusOrdenados.Add(menuPadre);
                foreach (var menuHijo in menus.Where(m => m.ParentId == menuPadre.Id).OrderBy(m => m.Orden))
                {
                    menuHijo.Descripcion = string.Format("<span class = 'menu-hijo'>{0}</span>", menuHijo.Descripcion);
                    menusOrdenados.Add(menuHijo);
                }
            }

            var model = new RoleMenuViewModel
            {
                AvailableMenus = menusOrdenados
            };
            var roles = roleMenuService.ObtenerRoles();
            id = id ?? roles[0].Id;
            ViewBag.ApplicationRoleId = new SelectList(roles, "Id", "Name", id);
            model.SelectedMenus = roleMenuService.ObtenerMenusPorRol(id);

            return model;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (roleMenuService != null)
                {
                    roleMenuService.Dispose();
                }
            }
            base.Dispose(disposing);
        }
    }
}