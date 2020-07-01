using MvcJqGrid;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using UniOdonto.BO;
using UniOdonto.DAL.Entidad;
using UniOdonto.Models;

namespace UniOdonto.Controllers
{
    public class HorariosController : BaseController<Guid, Horarios, HorariosViewModel>
    {
        protected override IQueryable<Horarios> ApplyFilters(IQueryable<Horarios> generalQuery, Rule[] filters)
        {
            throw new NotImplementedException();
        }

        protected override string[] GetRow(Horarios item)
        {
            throw new NotImplementedException();
        }

        protected override HorariosViewModel MapperEntityToModel(Horarios entity)
        {
            throw new NotImplementedException();
        }

        protected override Horarios MapperModelToEntity(HorariosViewModel viewModel)
        {
            throw new NotImplementedException();
        }
    }
}