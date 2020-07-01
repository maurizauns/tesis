using System;
using System.Linq;
using System.Web.Mvc;
using MvcJqGrid;
using UniOdonto.DAL.Entidad;
using UniOdonto.Extensions;
using UniOdonto.Models;
using System.Web;
using UniOdonto.BO;
using RP.Website.Helpers;
using System.Collections.Generic;
using UniOdonto.Models.Filters;
using UniOdonto.Comun;
using Microsoft.AspNet.Identity;
using UniOdonto.DAL;
using AutoMapper;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Web.Services;
using System.Web.Script.Services;
using PagedList;


namespace UniOdonto.Controllers
{
    [CustomAuthorize(ModuleName = "Personas", AllowActions = "GetValues", PublicActions = "ObtenerXmls,Procesar,Notificacion")]
    public class PersonasController : BaseController<Guid, Personas, PersonasViewModel>
    {
        WebVentasContext db = new WebVentasContext();

        public Guid EmpresasID = Context.CurrentEmpresaId;
        private readonly TipoIdentificacionService TipoIdentificacionService;
        private readonly ProvinciaService ProvinciaService;
        private readonly CantoneService CantoneService;
        private GridSettings GridSettings
        {
            get { return Session["_GridSettings"] as GridSettings; }
            set { Session["_GridSettings"] = value; }
        }
        public PersonasController()
        {
            TipoIdentificacionService = new TipoIdentificacionService();
            ProvinciaService = new ProvinciaService();
            CantoneService = new CantoneService();
            EntityService = new PersonaService();
            Title = "Personas";
        }

        protected override IQueryable<Personas> ApplyFilters(IQueryable<Personas> generalQuery, Rule[] filters)
        {
            if (filters == null)
            {
                return generalQuery;
            }

            foreach (var item in filters)
            {
                var term = item.data.Trim().ToUpper();
                if (String.Equals(item.field, "identificacion", StringComparison.OrdinalIgnoreCase))
                {
                    generalQuery = generalQuery.Where(x => x.Identificacion.Trim().ToUpper().Contains(term) || x.Identificacion.Trim().ToUpper().Contains(term));
                }
                else if (String.Equals(item.field, "persona", StringComparison.OrdinalIgnoreCase))
                {
                    var tipoIdentificacion = Guid.Parse(item.data);
                    generalQuery = generalQuery.Where(x => x.Id == tipoIdentificacion);
                }
                else if (String.Equals(item.field, "seguroMedico", StringComparison.OrdinalIgnoreCase))
                {
                    var seguroMedico = Guid.Parse(item.data);
                    generalQuery = generalQuery.Where(x => x.SeguroMedicoId == seguroMedico);
                }
                else if (String.Equals(item.field, "tipoSangre", StringComparison.OrdinalIgnoreCase))
                {
                    var seguroMedico = Guid.Parse(item.data);
                    generalQuery = generalQuery.Where(x => x.TipoSangreId == seguroMedico);
                }
                else if (String.Equals(item.field, "sexo", StringComparison.OrdinalIgnoreCase))
                {
                    var seguroMedico = Guid.Parse(item.data);
                    generalQuery = generalQuery.Where(x => x.SexoId == seguroMedico);
                }
                else if (String.Equals(item.field, "tipoIdentificacion", StringComparison.OrdinalIgnoreCase))
                {
                    var tipoIdentificacion = Guid.Parse(item.data);
                    generalQuery = generalQuery.Where(x => x.TipoIdentificacionId == tipoIdentificacion);
                }
                else if (String.Equals(item.field, "empresa", StringComparison.OrdinalIgnoreCase))
                {
                    var empresaId = Guid.Parse(item.data);
                    generalQuery = generalQuery.Where(x => x.EmpresaId == empresaId);
                }

            }
            return generalQuery;
        }
        public override IQueryable<Personas> OnBeginFilter(IQueryable<Personas> generalQuery)
        {
            generalQuery = generalQuery.Where(u => u.EmpresaId == EmpresasID);
            return generalQuery;
        }
        protected override string[] GetRow(Personas item)
        {
            return new[]
          {
                HttpUtility.HtmlEncode(item.NumeroPaciente),
                HttpUtility.HtmlEncode(item.TipoIdentificacion.Descripcion),
                HttpUtility.HtmlEncode(item.Identificacion),
                HttpUtility.HtmlEncode(item.FechaNacimiento.Value.ToString(Comun.Context.FormatoFecha)),
                HttpUtility.HtmlEncode(item.TipoSangre.Descripcion??""),
                HttpUtility.HtmlEncode(string.Format("{0} - {1}",item.Provincias?.Descripcion,item.Cantones?.Descripcion)),
                HttpUtility.HtmlEncode(item.SeguroMedico.Descripcion??""),
                HttpUtility.HtmlEncode(item.Sexo.Descripcion??""),
                HttpUtility.HtmlEncode(string.Format("{0} {1} {2} {3}",item.PrimerNombre, item.SegundoNombre, item.PrimerApellido, item.SegundoApellido)),
                HttpUtility.HtmlEncode(GridHelperExts.ActionsList("personas-modal")
                            .Add(EditAction(Url.Action("Personas", new {item.Id})))
                            .Add(ConfiguracionAction(item.Id))
                            .Add(GridHelperExts.DeleteAction(Url.Action("Delete"), "personas-grid", item.Id))
                            .End())
            };
        }

        public IHtmlString ConfiguracionAction(object id = null)
        {
            var button = string.Format(@"<li class=""""><a title=""Historia Clinica"" data-toggle=""tooltip"" class=""btn btn-primary btn-xs"" href=""{0}""><i class=""glyphicon glyphicon-cog""></i></a></li>",
                            Url.Action("Index", "Historia", new { id }));


            return MvcHtmlString.Create(button);
        }

        public override IEnumerable<FieldFilter> Filters
        {
            get
            {
                var filters = new List<FieldFilter>
                {
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
                        Description = "Identificacion",
                        Name = "identificacion",
                        Type = FilterType.Textbox
                    },
                     new FieldFilter
                    {
                        Description = "Tipo Identificacion",
                        Name = "tipoIdentificacion",
                        Type = FilterType.Select,
                        UrlData = Url.Action("GetValuesTipoDocumento","TipoIdentificacion",new { Tipo = "DocIde"})
                    },
                     new FieldFilter
                    {
                        Description = "Seguro Médico",
                        Name = "seguroMedico",
                        Type = FilterType.Select,
                        UrlData = Url.Action("GetValuesTipoDocumento","TipoIdentificacion",new { Tipo = "SegMed"})
                    },
                     new FieldFilter
                    {
                        Description = "Tipo de Sangre",
                        Name = "tipoSangre",
                        Type = FilterType.Select,
                        UrlData = Url.Action("GetValuesTipoDocumento","TipoIdentificacion",new { Tipo = "TipSan"})
                    },
                     new FieldFilter
                    {
                        Description = "Sexo",
                        Name = "sexo",
                        Type = FilterType.Select,
                        UrlData = Url.Action("GetValuesTipoDocumento","TipoIdentificacion",new { Tipo = "Sex"})
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

        [AllowAnonymous]
        public JsonResult GetTipoPersona()
        {
            try
            {
                var estados = new List<KeyValuePair<string, string>>
                {
                    new KeyValuePair<string, string>("CLI", "Cliente"),
                    new KeyValuePair<string, string>("EMP", "Empleado"),
                    new KeyValuePair<string, string>("PRO", "Proveedor"),
                    new KeyValuePair<string, string>("VEN", "Vendedor"),
                    new KeyValuePair<string, string>("ACC", "Accionista")
                };


                var result = estados.Select(q => new
                {
                    value = q.Key,
                    text = q.Value
                });

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

        protected override Personas MapperModelToEntity(PersonasViewModel viewModel)
        {
            var producto = new Personas();
            if (viewModel.Id != null && viewModel.Id != Guid.Empty)
            {
                producto = EntityService.GetById(viewModel.Id.Value);
                var tipoIdentificacion = TipoIdentificacionService;
                producto.TipoSangre = viewModel.TipoSangreId != null ? tipoIdentificacion.Where(x => x.Id == viewModel.TipoSangreId).FirstOrDefault() : null;
                producto.Sexo = viewModel.SexoId != null ? tipoIdentificacion.Where(x => x.Id == viewModel.SexoId).FirstOrDefault() : null;
                producto.EstadoCivil = viewModel.EstadoCivilId != null ? tipoIdentificacion.Where(x => x.Id == viewModel.EstadoCivilId).FirstOrDefault() : null;
                producto.TipoPaciente = viewModel.TipoPacienteId != null ? tipoIdentificacion.Where(x => x.Id == viewModel.TipoPacienteId).FirstOrDefault() : null;
                producto.SeguroMedico = viewModel.SeguroMedicoId != null ? tipoIdentificacion.Where(x => x.Id == viewModel.SeguroMedicoId).FirstOrDefault() : null;
                producto.TipoPariente = viewModel.TipoParienteId != null ? tipoIdentificacion.Where(x => x.Id == viewModel.TipoParienteId).FirstOrDefault() : null;
                producto.Ocupacion = viewModel.OcupacionId != null ? tipoIdentificacion.Where(x => x.Id == viewModel.OcupacionId).FirstOrDefault() : null;
                producto.Provincias = viewModel.ProvinciasId != null ? ProvinciaService.Where(x => x.Id == viewModel.ProvinciasId).FirstOrDefault() : null;
                producto.Cantones = viewModel.CantonesId != null ? CantoneService.Where(x => x.Id == viewModel.CantonesId).FirstOrDefault() : null;
            }

            return Mapper.Map(viewModel, producto);
        }

        protected override PersonasViewModel MapperEntityToModel(Personas entity)
        {
            return Mapper.Map<Personas, PersonasViewModel>(entity);
        }
        public IHtmlString EditAction(string url)
        {
            var button = string.Format(@"<li><a title=""Editar"" data-toggle=""tooltip"" class=""btn btn-primary btn-xs"" href=""{0}""><i class='glyphicon glyphicon-pencil'></i></a></li>",
                            url);
            return MvcHtmlString.Create(button);
        }
        public ActionResult Personas(Guid? id)
        {
            ViewBag.DocumentoNuevo = true;
            var model = new PersonasViewModel();
            if (id != null)
            {
                if (id.HasValue)
                {
                    var formulario = EntityService.GetById(id.Value);
                    if (formulario == null)
                    {
                        return new HttpNotFoundResult();
                    }

                    model = MapperEntityToModel(formulario);
                    ViewBag.DocumentoNuevo = false;
                }
                else
                {
                    return new HttpNotFoundResult();
                }
            }

            Listas(model);
            return View(model);
        }
        private void Listas(PersonasViewModel model)
        {
            ViewBag.ProvinciassId = new SelectList(new ProvinciaService(EntityService.UnitOfWork).GetAll().ToList(), "Id", "Descripcion", model.ProvinciasId);
            ViewBag.CantonessId = new SelectList(new CantoneService(EntityService.UnitOfWork).GetAll().ToList(), "Id", "Descripcion", model.CantonesId);

            var tipoDocumento = new TipoIdentificacionService(EntityService.UnitOfWork);
            ViewBag.TipoIdentificaciones = new SelectList(tipoDocumento.GetAll().Where(x => x.SubTipoIdentificacion.Codigo == "DocIde").OrderBy(x => x.Codigo).ToList(), "Id", "Descripcion", model.TipoIdentificacionId);
            ViewBag.TipoSangre = new SelectList(tipoDocumento.GetAll().Where(x => x.SubTipoIdentificacion.Codigo == "TipSan").OrderBy(x => x.Codigo).ToList(), "Id", "Descripcion", model.TipoSangreId);
            ViewBag.SexoIds = new SelectList(tipoDocumento.GetAll().Where(x => x.SubTipoIdentificacion.Codigo == "Sex").OrderBy(x => x.Codigo).ToList(), "Id", "Descripcion", model.SexoId);
            ViewBag.EstadoCivil = new SelectList(tipoDocumento.GetAll().Where(x => x.SubTipoIdentificacion.Codigo == "EstCiv").OrderBy(x => x.Codigo).ToList(), "Id", "Descripcion", model.EstadoCivilId);
            ViewBag.TipoPaciente = new SelectList(tipoDocumento.GetAll().Where(x => x.SubTipoIdentificacion.Codigo == "TipPac").OrderBy(x => x.Codigo).ToList(), "Id", "Descripcion", model.TipoPacienteId);
            ViewBag.SeguroMedico = new SelectList(tipoDocumento.GetAll().Where(x => x.SubTipoIdentificacion.Codigo == "SegMed").OrderBy(x => x.Codigo).ToList(), "Id", "Descripcion", model.SeguroMedicoId);
            ViewBag.TipoPariente = new SelectList(tipoDocumento.GetAll().Where(x => x.SubTipoIdentificacion.Codigo == "TipoPar").OrderBy(x => x.Codigo).ToList(), "Id", "Descripcion", model.TipoParienteId);
            ViewBag.Ocupacion = new SelectList(tipoDocumento.GetAll().Where(x => x.SubTipoIdentificacion.Codigo == "Ocu").OrderBy(x => x.Codigo).ToList(), "Id", "Descripcion", model.OcupacionId);
        }

        [HttpPost]
        public virtual async Task<ActionResult> SavePersonas(PersonasViewModel model)
        {
            OnBeginCrudAction();
            if (!ModelState.IsValid)
            {
                return await Task.Run(() => Json(new { success = false, message = GetValidationMessages() }, JsonRequestBehavior.AllowGet));
            }
            try
            {
                var entity = MapperModelToEntity(model);
                entity.EmpresaId = EmpresasID;
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

        [HttpGet]
        public virtual async Task<JsonResult> GetPersonas(Guid? Id)
        {
            var personas = await EntityService.GetAll().Where(p => p.Id == Id).FirstOrDefaultAsync();
            PersonasViewModel personasDTO = new PersonasViewModel();
            personasDTO = personas != null ? Mapper.Map<PersonasViewModel>(personas) : new PersonasViewModel();
            return Json(personasDTO, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public virtual async Task<JsonResult> GetPersonasIdentificacion(string Identificacion)
        {
            var personas = await EntityService.GetAll().Where(p => p.Identificacion == Identificacion).FirstOrDefaultAsync();
            PersonasViewModel personasDTO = new PersonasViewModel();
            personasDTO = personas != null ? Mapper.Map<PersonasViewModel>(personas) : new PersonasViewModel();
            return Json(personasDTO, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public virtual async Task<JsonResult> GetCuentasProveedor(Guid Id)
        {
            var personas = await EntityService.GetAll().Where(p => p.Id == Id).FirstOrDefaultAsync();
            PersonasViewModel personasDTO = new PersonasViewModel();
            personasDTO = personas != null ? Mapper.Map<PersonasViewModel>(personas) : new PersonasViewModel();
            return Json(personasDTO, JsonRequestBehavior.AllowGet);
        }

        [WebMethod]
        [ScriptMethod]
        [HttpGet]
        public virtual ActionResult ListaPersonas(string sortOrder, string currentFilter, string filtro, int? page, string tipoCuenta, string Estado, string term, string tipopersona)
        {
            ViewBag.CurrentSort = sortOrder;
            ViewBag.NameSortParm = String.IsNullOrEmpty(sortOrder) ? "name_desc" : "";
            ViewBag.DateSortParm = sortOrder == "Date" ? "date_desc" : "Date";

            if (filtro != "")
            {
                page = 1;
            }
            else
            {
                filtro = tipoCuenta;
            }
            if (term == null)
            {
                term = "";
            }
            ViewBag.CurrentFilter = filtro;

            var students = EntityService.GetAll().Where(x => x.EmpresaId == EmpresasID);
            if (!String.IsNullOrEmpty(filtro))
            {
                students = EntityService.Where(s => s.Identificacion.Contains(filtro)
                                      || s.PrimerNombre.Contains(filtro)
                                      || s.PrimerApellido.Contains(filtro)
                                       );
            }
            if (!String.IsNullOrEmpty(term))
            {
                students = students.Where(s => s.Identificacion.Contains(term) || s.PrimerNombre.Contains(term) || s.SegundoNombre.Contains(term) || s.PrimerApellido.Contains(term) || s.SegundoApellido.Contains(term));
            }
            //if (!String.IsNullOrEmpty(tipopersona))
            //{
            //    if (tipopersona == "CLI")
            //    {
            //        students = students.Where(s => s.EsCliente == true);
            //    }
            //    if (tipopersona == "PRO")
            //    {
            //        students = students.Where(s => s.EsProveedor == true);
            //    }

            //}
            switch (sortOrder)
            {
                case "name_desc":
                    students = students.OrderByDescending(s => s.Identificacion);
                    break;
                case "Date":
                    students = students.OrderBy(s => s.PrimerApellido);
                    break;
                default:  // Name ascending 
                    students = students.OrderBy(s => s.PrimerNombre);
                    break;
            }

            int pageSize = 10;
            int pageNumber = (page ?? 1);
            ViewBag.Total = students.Count();
            List<PersonasViewModel> planCuentaDescripcionDTO = new List<PersonasViewModel>();
            planCuentaDescripcionDTO = students != null ? Mapper.Map<List<PersonasViewModel>>(students) : new List<PersonasViewModel>();
            if (Estado == "1")
            {
                return Json(planCuentaDescripcionDTO, JsonRequestBehavior.AllowGet);
            }
            return PartialView(planCuentaDescripcionDTO.ToPagedList(pageNumber, pageSize));
        }



        protected override void Dispose(bool disposing)
        {
            TipoIdentificacionService.Dispose();
            CantoneService.Dispose();
            ProvinciaService.Dispose();
            EntityService.Dispose();
            base.Dispose(disposing);
        }
    }
}