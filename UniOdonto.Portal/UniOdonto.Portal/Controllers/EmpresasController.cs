using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using AutoMapper;
using UniOdonto.DAL.Entidad;
using UniOdonto.BO;
using UniOdonto.Extensions;
using UniOdonto.Models;
using UniOdonto.Models.Filters;
using FirmasUtilities;
using RP.DAL.Repository;
using RP.Website.Helpers;

using Rule = MvcJqGrid.Rule;
using UniOdonto.DAL;

namespace UniOdonto.Controllers
{
    [CustomAuthorize(ModuleName = "Empresas", AllowActions = "GetValues", PublicActions = "ObtenerXmls,Procesar,Notificacion")]
    public class EmpresasController : BaseController<Guid, Empresa, EmpresaViewModel>
    {
        WebVentasContext db = new WebVentasContext();
        NumeracionService NumeracionService;
        EmpresaService EmpresaService;

        public EmpresasController()
        {
            EntityService = new EmpresaService();
            EmpresaService = new EmpresaService();
            NumeracionService = new NumeracionService();
        }

        #region Crud

        public override void OnDeleted(Guid id, SaveResult saveResult, ref string message)
        {
            if (saveResult.Succeeded)
            {
                var empresa = saveResult.Entity as Empresa;
                //var configXml = ConfiguracionManager.ObtenerConfiguracion(empresa.Ruc);

                //try
                //{
                //    if (Directory.Exists(configXml.RutaEmpresa))
                //    {
                //        Directory.Delete(configXml.RutaEmpresa, true);
                //    }
                //}
                //catch
                //{
                //    message = "Empresa eliminada, Pero ocurrió un problema al eliminar los directorios relacionados. Por favor borrelos manualmente desde el explorador de windows.";
                //}
            }
        }
        public override IQueryable<Empresa> OnBeginFilter(IQueryable<Empresa> generalQuery)
        {
            //if (User.IsInRole("Usuario"))
            //{
            //    generalQuery = generalQuery.Where(u => u.Id == EmpresaId);
            //}
            return generalQuery;
        }

        protected override IQueryable<Empresa> ApplyFilters(IQueryable<Empresa> generalQuery, Rule[] filters)
        {
            if (filters == null)
            {
                return generalQuery;
            }

            foreach (var item in filters)
            {
                var term = item.data.Trim().ToUpper();

                if (String.Equals(item.field, "ruc", StringComparison.OrdinalIgnoreCase))
                {
                    generalQuery = generalQuery.Where(x => x.Ruc.Trim().ToUpper().Contains(term));
                }
                else if (String.Equals(item.field, "razonsocial", StringComparison.OrdinalIgnoreCase))
                {
                    generalQuery = generalQuery.Where(x => x.RazonSocial.Trim().ToLower().Contains(term));
                }
            }
            return generalQuery;
        }

        protected override string[] GetRow(Empresa item)
        {
            return new[]
            {
                HttpUtility.HtmlEncode(item.Ruc),
                HttpUtility.HtmlEncode(item.RazonSocial),
                HttpUtility.HtmlEncode(GridHelperExts.ActionsList("empresas-modal")
                            .Add(GridHelperExts.EditAction(Url.Action("GetEntity"), item.Id, "empresasCallback"))
                            .Add(GridHelperExts.DeleteAction(Url.Action("Delete"), "empresas-grid", item.Id))
                            .Add(ConfiguracionAction(item.Id))
                            .Add(UsuariosAction(item.Id))
                            .End())
            };
        }


        public IHtmlString ConfiguracionAction(object id = null)
        {
            var button = string.Format(@"<li class=""""><a title=""Configurar Empresa"" data-toggle=""tooltip"" class=""btn btn-primary btn-xs"" href=""{0}""><i class=""glyphicon glyphicon-cog""></i></a></li>",
                            Url.Action("ConfiguracionGeneral", new { id }));


            return MvcHtmlString.Create(button);
        }
        public IHtmlString UsuariosAction(object id = null)
        {
            var button = string.Format(@"<li class=""""><a title=""Usuario/ Clientes de esta Empresa "" data-toggle=""tooltip"" class=""btn btn-primary btn-xs"" href=""{0}""><i class=""glyphicon glyphicon-user""></i></a></li>",
                            Url.Action("Usuarios", new { id }));


            return MvcHtmlString.Create(button);
        }

        public ActionResult MostrarUsuarios(string id)
        {
            Session["empresaId"] = id;
            return RedirectToAction("Index", "Usuarios", new { empresaId = id });
        }

        protected override Empresa MapperModelToEntity(EmpresaViewModel model)
        {
            var empresa = new Empresa();
            if (model.Id != null && model.Id != Guid.Empty)
            {
                empresa = EntityService.GetById(model.Id.Value);
            }
            return Mapper.Map(model, empresa);
        }

        
        protected override EmpresaViewModel MapperEntityToModel(Empresa entity)
        {
            return Mapper.Map<Empresa, EmpresaViewModel>(entity);
        }

        public override IEnumerable<FieldFilter> Filters
        {
            get
            {
                var filters = new List<FieldFilter>
                {
                    new FieldFilter
                    {
                        Description = "Razón Social",
                        Name = "razonsocial",
                        Type = FilterType.Textbox
                    },
                    new FieldFilter
                    {
                        Description = "Ruc",
                        Name = "ruc",
                        Type = FilterType.Textbox
                    },
                };
                return filters;
            }
        }

        public async Task<JsonResult> GetValues()
        {
            try
            {
                var elements = await EntityService.GetAllAsync();
                object result = new object();
                if (User.IsInRole("Administrador") || User.IsInRole("Cliente"))
                {
                    result = await elements.Select(q => new
                    {
                        value = q.Id,
                        text = q.RazonSocial + " (" + q.Ruc + ")"
                    }).ToListAsync();
                }
                else
                {
                    //result = await elements.Where(x => x.Id == Context.CurrentEmpresaId).Select(q => new
                    //{
                    //    value = q.Id,
                    //    text = q.RazonSocial + " (" + q.Ruc + ")"
                    //}).ToListAsync();
                }

                return Json(new
                {
                    success = true,
                    values = (object)result
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(new
                {
                    success = false,
                    values = default(object)
                }, JsonRequestBehavior.AllowGet);
            }
        }

        public virtual async Task<ActionResult> SaveEmpresa(EmpresaViewModel model)
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

        #endregion

        #region Configuracion General

        public async Task<ActionResult> ConfiguracionGeneral(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var empresa = await EntityService.GetByIdAsync(id.Value);
            if (empresa == null)
            {
                return HttpNotFound();
            }

            var model = new EmpresaConfiguracionViewModel();
            model.Id = id;

            model.Ruc = empresa.Ruc;
            model.RazonSocial = empresa.RazonSocial;
            model.NombreComercial = empresa.NombreComercial;
            model.DireccionMatriz = empresa.DireccionMatriz;
            model.ContribuyenteEspecial = empresa.ContribuyenteEspecial;
            model.ObligadoContabilidad = empresa.ObligadoContabilidad;
            model.NumeroEstablecimientos = empresa.NumeroEstablecimientos;
            model.Exportador = empresa.Exportador;
            model.DocumentoPathId = empresa.DocumentoPathId != null ? empresa.DocumentoPathId.Value : Guid.Empty;
            model.RecepcionTimeOut = empresa.RecepcionTimeOut;
            model.AutorizacionTimeOut = empresa.AutorizacionTimeOut;
            model.GeneraClaveAcceso = empresa.GeneraClaveAcceso;
            model.InformacionAdicional1 = empresa.InformacionAdicional1;
            model.InformacionAdicional2 = empresa.InformacionAdicional2;
            model.InformacionAdicional3 = empresa.InformacionAdicional3;
            model.Telefonos = empresa.Telefonos;
            model.ActividadEconomica = empresa.ActividadEconomica;
            model.Decimales = empresa.Decimales;

            if (empresa != null)
            {
                ViewBag.id = empresa.Id;
                ViewBag.ruc = empresa.Ruc;

                CargarCombos(model);
            }
            return View(model);
        }

        private void CargarCombos(EmpresaConfiguracionViewModel model)
        {
            ViewBag.Decimaless = new SelectList(new List<SelectListItem>
            {
                new SelectListItem { Selected = false, Value = "2", Text = "2"},
                new SelectListItem { Selected = false, Value = "3", Text = "3"},
                new SelectListItem { Selected = false, Value = "4", Text = "4"},
                new SelectListItem { Selected = false, Value = "5", Text = "5"},
                new SelectListItem { Selected = false, Value = "6", Text = "6"},
            }, "Value", "Text", model.Decimales);
        }

        private string DefaultUrlHandlerObtener(string url, string ruc)
        {
            if (string.IsNullOrEmpty(url))
            {
                url = Url.Action("ObtenerXmls", "Empresas", null, Request.Url.Scheme);
            }
            return url;
        }

        private string DefaultUrlHandlerProceso(string url, string ruc)
        {
            if (string.IsNullOrEmpty(url))
            {
                url = Url.Action("Procesar", "Empresas", null, Request.Url.Scheme);
            }
            return url;
        }

        private string DefaultUrlHandlerNotificacion(string url, string ruc)
        {
            if (string.IsNullOrEmpty(url))
            {
                url = Url.Action("Notificacion", "Empresas", new { ruc }, Request.Url.Scheme);
            }
            return url;
        }

        [HttpPost, ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ConfiguracionGeneral(EmpresaConfiguracionViewModel model)
        {
            Empresa empresa = null;

            if (ModelState.IsValid)
            {
                empresa = await EntityService.GetByIdAsync(model.Id.Value);

                Mapper.Map(model, empresa);

                foreach (string fileName in Request.Files)
                {
                    HttpPostedFileBase files = Request.Files[fileName];
                    if (files != null && files.ContentLength > 0)
                    {
                        byte[] uploadFile = new byte[files.InputStream.Length];
                        files.InputStream.Read(uploadFile, 0, uploadFile.Length);
                        empresa.Imagen = uploadFile;
                    }

                }
                var result2 = await EntityService.SaveAsync(empresa);
                if (!result2.Succeeded)
                {
                    ModelState.AddModelError("", result2.GetErrorsString());
                }
            }

            if (empresa != null)
            {
                ViewBag.id = empresa.Id;
                ViewBag.ruc = empresa.Ruc;
            }
            CargarCombos(model);
            return View(model);
        }

        public ActionResult CambiarClaveP12(Guid id, string ruc, string claveP12)
        {
            return RedirectToAction("ConfiguracionGeneral", new { id });
        }

        #endregion
        #region Smtp

        public async Task<ActionResult> Smtp(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var empresa = await EntityService.GetByIdAsync(id.Value);
            if (empresa == null)
            {
                return HttpNotFound();
            }

            ViewBag.id = empresa.Id;
            ViewBag.ruc = empresa.Ruc;


            var model = Mapper.Map<Empresa, EmpresaSmtpViewModel>(empresa);
            return View(model);
        }

        [HttpPost, ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Smtp(EmpresaSmtpViewModel model)
        {
            Empresa empresa = null;
            if (ModelState.IsValid)
            {
                empresa = await EntityService.GetByIdAsync(model.Id.Value);
                empresa = Mapper.Map(model, empresa);
                var result = await EntityService.SaveAsync(empresa);
                if (!result.Succeeded)
                {
                    ModelState.AddModelError("", result.GetErrorsString());
                }
            }

            if (empresa != null)
            {
                ViewBag.id = empresa.Id;
                ViewBag.ruc = empresa.Ruc;
            }

            return View(model);
        }
        public async Task<ActionResult> ProbarCorreo(Guid id, string email)
        {
            var resultado = false;
            var mensaje = "";

            var empresa = await EntityService.GetByIdAsync(id);

            if (empresa != null)
            {
                var manager = new FirmasManager();
                var correo = new Correo
                {
                    //De = "efacturec@gmail.com",
                    De = empresa.SmtpUsuario,
                    Para = email,
                    ConCopia = "",
                    ConCopiaOculta = "",
                    Asunto = "UniOdonto.ec - Prueba de Servidor Smtp",
                    Mensaje = "<b>Correo enviado exitosamente</b>",
                    ServidorCorreo = empresa.SmtpServidor,
                    Usuario = empresa.SmtpUsuario,
                    Clave = empresa.SmtpClave,
                    Puerto = empresa.SmtpPuerto,
                    HabilitaSsl = empresa.SmtpHabilitaSsl
                };

                resultado = manager.EnviarCorreo(correo, ref mensaje);
            }
            else
            {
                mensaje = "No existe empresa.";
            }

            var data = new
            {
                success = resultado,
                message = mensaje
            };
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region Usuarios

        public ActionResult Usuarios(Guid? id)
        {
            Session["empresaId"] = id;
            return RedirectToAction("Index", "Usuarios");
        }

        #endregion

        #region Email Cliente
        public async Task<ActionResult> EmailCliente(Guid? id)
        {
            Empresa empresa = null;
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            empresa = await EntityService.GetByIdAsync(id.Value);
            if (empresa == null)
            {
                return HttpNotFound();
            }

            ViewBag.id = empresa.Id;
            ViewBag.ruc = empresa.Ruc;

            var model = Mapper.Map<Empresa, EmpresaEmailClienteViewModel>(empresa);
            return View(model);
        }

        [HttpPost, ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> EmailCliente(EmpresaEmailClienteViewModel model)
        {
            Empresa empresa = null;
            if (ModelState.IsValid)
            {
                empresa = await EntityService.GetByIdAsync(model.Id.Value);
                empresa = Mapper.Map(model, empresa);
                var result = await EntityService.SaveAsync(empresa);
                if (!result.Succeeded)
                {
                    ModelState.AddModelError("", result.GetErrorsString());
                }
            }

            if (empresa != null)
            {
                ViewBag.id = empresa.Id;
                ViewBag.ruc = empresa.Ruc;
            }

            return View(model);
        }

        #endregion

        
    }
}
