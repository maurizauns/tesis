using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using UniOdonto.DAL.Entidad;
using UniOdonto.Models;
using UniOdonto.Models.Filters;
using MvcJqGrid;
using RP.Website.Helpers;

namespace UniOdonto.Controllers
{
    [Authorize(Roles = "Administrador")]
    public class BaseConfiguracionGeneralController<TEntity> : BaseController<Guid, TEntity, ConfiguracionGeneralViewModel>
        where TEntity : BaseConfiguracionGeneral, new()
    {
        protected override IQueryable<TEntity> ApplyFilters(IQueryable<TEntity> generalQuery, Rule[] filters)
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
                    generalQuery = generalQuery.Where(x => x.Descripcion.Trim().ToUpper().Contains(term));
                }
            }
            return generalQuery;
        }

        protected override string[] GetRow(TEntity item)
        {
            return new[]
            {
                HttpUtility.HtmlEncode(item.Codigo),
                HttpUtility.HtmlEncode(item.Descripcion),
                HttpUtility.HtmlEncode(GridHelperExts.ActionsList("configuracionGeneral-modal")
                            .Add(GridHelperExts.EditAction(Url.Action("GetEntity"), item.Id, "configuracionGeneralCallback"))
                            .Add(GridHelperExts.DeleteAction(Url.Action("Delete"), "configuracionGeneral-grid", item.Id))
                            .End())
            };
        }

        protected override TEntity MapperModelToEntity(ConfiguracionGeneralViewModel viewModel)
        {
            return new TEntity()
            {
                Id = viewModel.Id.GetValueOrDefault(),
                Codigo = viewModel.Codigo,
                Descripcion = viewModel.Descripcion,
            };
        }

        protected override ConfiguracionGeneralViewModel MapperEntityToModel(TEntity entity)
        {
            return new ConfiguracionGeneralViewModel()
            {
                Id = entity.Id,
                Codigo = entity.Codigo,
                Descripcion = entity.Descripcion,
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
        public async Task<JsonResult> GetValues()
        {
            try
            {
                var elements = await EntityService.GetAllAsync();

                var result = await elements.Select(q => new
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