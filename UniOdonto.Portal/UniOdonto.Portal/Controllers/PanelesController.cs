using AutoMapper;
using MvcJqGrid;
using RP.Website.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using UniOdonto.BO;
using UniOdonto.DAL.Entidad;
using UniOdonto.Models;
using UniOdonto.Models.Filters;

namespace UniOdonto.Controllers
{
    [Authorize(Roles = "Administrador")]
    public class PanelesController : BaseController<Guid, Paneles, PanelesViewModel>
    {
        public PanelesController()
        {
            EntityService = new PaneleService();
            Title = "Paneles Informativos";
        }


        protected override IQueryable<Paneles> ApplyFilters(IQueryable<Paneles> generalQuery, Rule[] filters)
        {
            return generalQuery;
        }
        public override IQueryable<Paneles> OnBeginFilter(IQueryable<Paneles> generalQuery)
        {
            //generalQuery = generalQuery.Where(u => u.Empresa.Id == Context.CurrentEmpresaId);
            return generalQuery;
        }
        protected override string[] GetRow(Paneles item)
        {
            return new[]
            {
                HttpUtility.HtmlEncode(item.Nombre),
                HttpUtility.HtmlEncode(item.Descripcion),
                HttpUtility.HtmlEncode(GridHelperExts.ActionsList("Paneles-modal")
                        .Add(GridHelperExts.EditAction(Url.Action("GetEntity"), item.Id, "panelCallback"))
                        .Add(GridHelperExts.DeleteAction(Url.Action("Delete"), "Paneles-grid", item.Id))
                        .End())
            };
        }

        protected override Paneles MapperModelToEntity(PanelesViewModel viewModel)
        {
            var paneles = new Paneles();
            //viewModel.EmpresaId = Context.CurrentEmpresaId;
            if (viewModel.Id != null && viewModel.Id != Guid.Empty)
            {
                paneles = EntityService.GetById(viewModel.Id.Value);
            }
            return Mapper.Map(viewModel, paneles);
        }

        protected override PanelesViewModel MapperEntityToModel(Paneles entity)
        {
            return Mapper.Map<Paneles, PanelesViewModel>(entity);
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
                        Description = "Nombre",
                        Name = "nombre",
                        Type = FilterType.Textbox
                    }
                };
                return filters;
            }
        }

    }
}