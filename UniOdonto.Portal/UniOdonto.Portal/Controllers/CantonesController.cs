using AutoMapper;
using MvcJqGrid;
using PagedList;
using RP.Website.Helpers;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using UniOdonto.BO;
using UniOdonto.DAL.Entidad;
using UniOdonto.Models;
using UniOdonto.Models.Filters;

namespace UniOdonto.Controllers
{
    [Authorize(Roles = "Administrador")]
    public class CantonesController : BaseController<Guid, Cantones, CantonesViewModel>
    {
        public CantonesController()
        {
            EntityService = new CantoneService();
            Title = "Ciudades";
        }

        public override void OnBeginIndex()
        {
            using (var paisService = new ProvinciaService())
            {
                ViewBag.PaisId = new SelectList(paisService.GetAll().ToList(), "Id", "Descripcion", null);
            }
        }

        protected override IQueryable<Cantones> ApplyFilters(IQueryable<Cantones> generalQuery, Rule[] filters)
        {
            if (filters == null)
            {
                return generalQuery;
            }

            foreach (var item in filters)
            {
                var term = item.data.Trim().ToUpper();

                if (String.Equals(item.field, "codigo", StringComparison.OrdinalIgnoreCase))
                {
                    generalQuery = generalQuery.Where(x => x.Codigo.Trim().ToUpper().Contains(term));
                }
                else if (String.Equals(item.field, "descripcion", StringComparison.OrdinalIgnoreCase))
                {
                    generalQuery = generalQuery.Where(x => x.Descripcion.Trim().ToLower().Contains(term));
                }
            }
            return generalQuery;
        }

        protected override string[] GetRow(Cantones item)
        {
            return new[]
            {
                HttpUtility.HtmlEncode(item.Codigo),
                HttpUtility.HtmlEncode(item.Descripcion),
                HttpUtility.HtmlEncode(item.Provincias != null ?  item.Provincias.Descripcion: ""),
                HttpUtility.HtmlEncode(GridHelperExts.ActionsList("provincia-modal")
                        .Add(GridHelperExts.EditAction(Url.Action("GetEntity"), item.Id, "provinciaCallback"))
                        .Add(GridHelperExts.DeleteAction(Url.Action("Delete"), "provincia-grid", item.Id))
                        .End())
            };
        }

        protected override Cantones MapperModelToEntity(CantonesViewModel viewModel)
        {
            var provincia = new Cantones();
            if (viewModel.Id != null && viewModel.Id != Guid.Empty)
            {
                provincia = EntityService.GetById(viewModel.Id.Value);
            }
            return Mapper.Map(viewModel, provincia);
        }

        protected override CantonesViewModel MapperEntityToModel(Cantones entity)
        {
            return Mapper.Map<Cantones, CantonesViewModel>(entity);
        }

        public override IEnumerable<FieldFilter> Filters
        {
            get
            {
                var filters = new List<FieldFilter>
                {
                    new FieldFilter
                    {
                        Description = "Descripción",
                        Name = "descripcion",
                        Type = FilterType.Textbox
                    },
                    new FieldFilter
                    {
                        Description = "Código",
                        Name = "codigo",
                        Type = FilterType.Textbox
                    }
                };
                return filters;
            }
        }

        [AllowAnonymous]
        public async Task<JsonResult> GetValues(Guid? id)
        {
            try
            {
                var elements = await EntityService.GetAllAsync();

                var result = await elements.Where(q => q.ProvinciasId == id).Select(q => new
                {
                    value = q.Id,
                    text = q.Descripcion
                }).ToListAsync();

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
        public ActionResult ListaCantones(string sortOrder, string currentFilter, string filtro, int? page, string tipoCuenta, string Estado, string term)
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

            var students = EntityService.GetAll();
            if (!String.IsNullOrEmpty(filtro))
            {
                students = EntityService.Where(s => s.Descripcion.Contains(filtro)
                                       || s.Codigo.Contains(filtro));
            }
            if (!String.IsNullOrEmpty(term))
            {
                students = EntityService.Where(s => s.Descripcion.Contains(term));
            }
            switch (sortOrder)
            {
                case "name_desc":
                    students = students.OrderByDescending(s => s.Descripcion);
                    break;
                case "Date":
                    students = students.OrderBy(s => s.Codigo);
                    break;
                default:  // Name ascending 
                    students = students.OrderBy(s => s.Descripcion);
                    break;
            }

            int pageSize = 10;
            int pageNumber = (page ?? 1);
            ViewBag.Total = students.Count();
            List<CantonesViewModel> cantonesDTO = new List<CantonesViewModel>();
            cantonesDTO = students != null ? Mapper.Map<List<CantonesViewModel>>(students) : new List<CantonesViewModel>();
            if (Estado == "1")
            {
                return Json(cantonesDTO, JsonRequestBehavior.AllowGet);
            }
            return PartialView(cantonesDTO.ToPagedList(pageNumber, pageSize));
        }

        [HttpGet]
        public virtual async Task<JsonResult> GetCantones(Guid? Id)
        {
            var cantones = await EntityService.GetAll().Where(p => p.Id == Id).FirstOrDefaultAsync();
            CantonesViewModel cantonesDTO = new CantonesViewModel();
            cantonesDTO = cantones != null ? Mapper.Map<CantonesViewModel>(cantones) : new CantonesViewModel();
            return Json(cantonesDTO, JsonRequestBehavior.AllowGet);
        }
    }
}