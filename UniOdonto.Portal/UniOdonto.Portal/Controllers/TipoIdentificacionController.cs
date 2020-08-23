using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using UniOdonto.DAL.Entidad;
using UniOdonto.BO;
using UniOdonto.Models;
using MvcJqGrid;
using AutoMapper;
using System.Web;
using RP.Website.Helpers;
using UniOdonto.Models.Filters;
using System.Collections.Generic;

namespace UniOdonto.Controllers
{
    public class TipoIdentificacionController : BaseController<Guid, TipoIdentificacion, TipoIdentificacionViewModel>
    {
        private readonly SubTipoIdentificacionService SubTipoIdentificacionService;
        public TipoIdentificacionController()
        {
            SubTipoIdentificacionService = new SubTipoIdentificacionService();
            EntityService = new TipoIdentificacionService();
            Title = "Tipo Identificación";
        }

        public override void OnBeginIndex()
        {
            using (var tipoIdentificacionService = new SubTipoIdentificacionService())
            {
                ViewBag.subTipoIdentificacionId = new SelectList(tipoIdentificacionService.GetAll().ToList(), "Id", "Descripcion", null);
            }
        }

        protected override IQueryable<TipoIdentificacion> ApplyFilters(IQueryable<TipoIdentificacion> generalQuery, Rule[] filters)
        {
            if (filters == null)
            {
                return generalQuery;
            }

            foreach (var item in filters)
            {
                if (String.Equals(item.field, "tipoConfiguracion", StringComparison.OrdinalIgnoreCase))
                {
                    var tipoIdentificacion = Guid.Parse(item.data);
                    generalQuery = generalQuery.Where(x => x.SubTipoIdentificacionId == tipoIdentificacion);
                }
            }
            return generalQuery;
        }

        protected override string[] GetRow(TipoIdentificacion item)
        {
            return new[]
           {
                HttpUtility.HtmlEncode(item.Codigo),
                HttpUtility.HtmlEncode(item.Descripcion),
                HttpUtility.HtmlEncode(item.SubTipoIdentificacion != null ?  item.SubTipoIdentificacion.Descripcion: ""),
                HttpUtility.HtmlEncode(GridHelperExts.ActionsList("provincia-modal")
                        .Add(GridHelperExts.EditAction(Url.Action("GetEntity"), item.Id, "provinciaCallback"))
                        .Add(GridHelperExts.DeleteAction(Url.Action("Delete"), "provincia-grid", item.Id))
                        .End())
            };
        }
        public override IEnumerable<FieldFilter> Filters
        {
            get
            {
                var filters = new List<FieldFilter>
                {
                     new FieldFilter
                    {
                        Description = "Tipo Configuración",
                        Name = "tipoConfiguracion",
                        Type = FilterType.Select,
                        UrlData = Url.Action("GetValues","SubTipoIdentificacion")
                    }
                };
                return filters;
            }
        }
        protected override TipoIdentificacionViewModel MapperEntityToModel(TipoIdentificacion entity)
        {
            return Mapper.Map<TipoIdentificacion, TipoIdentificacionViewModel>(entity);
        }

        protected override TipoIdentificacion MapperModelToEntity(TipoIdentificacionViewModel viewModel)
        {
            var producto = new TipoIdentificacion();
            if (viewModel.Id != null && viewModel.Id != Guid.Empty)
            {
                producto = EntityService.GetById(viewModel.Id.Value);
                producto.SubTipoIdentificacion = SubTipoIdentificacionService.FirstOrDefault(x => x.Id == producto.SubTipoIdentificacionId);
            }
            return Mapper.Map(viewModel, producto);
        }

        [AllowAnonymous]
        public async Task<JsonResult> GetValuesTipoDocumento(string Tipo = "DocIde")
        {
            try
            {
                var elements = await EntityService.GetAllAsync();

                var result = await elements.Where(x => x.SubTipoIdentificacion.Codigo == Tipo).Select(q => new
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
    }
}