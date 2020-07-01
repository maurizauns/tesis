using AutoMapper;
using MvcJqGrid;
using RP.Website.Helpers;
using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using UniOdonto.BO;
using UniOdonto.DAL.Entidad;
using UniOdonto.Models;

namespace UniOdonto.Controllers
{
    public class MedicamentosController : BaseController<Guid, Medicamentos, MedicamentosViewModel>
    {
        public MedicamentosController()
        {
            EntityService = new MedicamentoService();
            Title = "Medicamentos";
        }
        protected override IQueryable<Medicamentos> ApplyFilters(IQueryable<Medicamentos> generalQuery, Rule[] filters)
        {
            if (filters == null)
            {
                return generalQuery;
            }

            foreach (var item in filters)
            {
                var term = item.data.Trim().ToUpper();
                if (String.Equals(item.field, "generico", StringComparison.OrdinalIgnoreCase))
                {
                    generalQuery = generalQuery.Where(x => x.Generico.Trim().ToUpper().Contains(term));
                }
                //else if (String.Equals(item.field, "persona", StringComparison.OrdinalIgnoreCase))
                //{
                //    var tipoIdentificacion = Guid.Parse(item.data);
                //    generalQuery = generalQuery.Where(x => x.Id == tipoIdentificacion);
                //}
                //else if (String.Equals(item.field, "tipoIdentificacion", StringComparison.OrdinalIgnoreCase))
                //{
                //    var tipoIdentificacion = Guid.Parse(item.data);
                //    generalQuery = generalQuery.Where(x => x.TipoIdentificacionId == tipoIdentificacion);
                //}
                //else if (String.Equals(item.field, "empresa", StringComparison.OrdinalIgnoreCase))
                //{
                //    var empresaId = Guid.Parse(item.data);
                //    generalQuery = generalQuery.Where(x => x.EmpresaId == empresaId);
                //}

            }
            return generalQuery;
        }
       
        protected override string[] GetRow(Medicamentos item)
        {
            return new[]
           {
                HttpUtility.HtmlEncode(item.Generico.ToUpper().Trim()),
                HttpUtility.HtmlEncode(item.Comercial.ToUpper().Trim()),
                HttpUtility.HtmlEncode(item.Dosis),
                HttpUtility.HtmlEncode(item.Presentacion.ToUpper().Trim()),
                HttpUtility.HtmlEncode(item.Cantidad),
                HttpUtility.HtmlEncode(item.Indicaciones.ToUpper().Trim()),
                HttpUtility.HtmlEncode(GridHelperExts.ActionsList("medicamentos-modal")
                           .Add(GridHelperExts.EditAction(Url.Action("GetEntity"), item.Id, "medicamentosCallback"))
                        .Add(GridHelperExts.DeleteAction(Url.Action("Delete"), "medicamentos-grid", item.Id))
                        .End())
            };
        }
        protected override MedicamentosViewModel MapperEntityToModel(Medicamentos entity)
        {
            return Mapper.Map<Medicamentos, MedicamentosViewModel>(entity);
        }

        protected override Medicamentos MapperModelToEntity(MedicamentosViewModel viewModel)
        {
            var provincia = new Medicamentos();
            if (viewModel.Id != null && viewModel.Id != Guid.Empty)
            {
                provincia = EntityService.GetById(viewModel.Id.Value);
            }
            return Mapper.Map(viewModel, provincia);
        }
    }
}