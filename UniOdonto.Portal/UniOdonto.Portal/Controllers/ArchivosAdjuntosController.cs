using AutoMapper;
using MvcJqGrid;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using UniOdonto.BO;
using UniOdonto.Comun;
using UniOdonto.DAL.Entidad;
using UniOdonto.Models;

namespace UniOdonto.Controllers
{
    public class ArchivosAdjuntosController : BaseController<Guid, ArchivosAdjuntos, ArchivosAdjuntosViewModel>
    {
        NumeracionService NumeracionService;
        Guid EmpresaID = Context.CurrentEmpresaId;
        public ArchivosAdjuntosController()
        {
            Title = "Archivos Adjuntos";
            EntityService = new ArchivosAdjuntoService();
            NumeracionService = new NumeracionService();
        }
        public ActionResult ArchivosAdjuntos()
        {
            return PartialView();
        }

        protected override IQueryable<ArchivosAdjuntos> ApplyFilters(IQueryable<ArchivosAdjuntos> generalQuery, Rule[] filters)
        {
            throw new NotImplementedException();
        }

        protected override string[] GetRow(ArchivosAdjuntos item)
        {
            throw new NotImplementedException();
        }

        protected override ArchivosAdjuntosViewModel MapperEntityToModel(ArchivosAdjuntos entity)
        {
            return Mapper.Map<ArchivosAdjuntos, ArchivosAdjuntosViewModel>(entity);
        }

        protected override ArchivosAdjuntos MapperModelToEntity(ArchivosAdjuntosViewModel viewModel)
        {
            var agenda = new ArchivosAdjuntos();
            if (viewModel.Id != null && viewModel.Id != Guid.Empty)
            {
                agenda = EntityService.GetById(viewModel.Id.Value);
            }
            return Mapper.Map(viewModel, agenda);
        }

        [HttpGet]
        public async Task<JsonResult> GetData(Guid id)
        {
            var consultas = await EntityService.GetAll().Where(x => x.PersonasId == id).ToListAsync();
            var consultasDto = Mapper.Map<List<ArchivosAdjuntosViewModel>>(consultas);
            return Json(new { consultasDto }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SaveArchivos()
        {
            Guid newId = Guid.NewGuid();
            string id = "";
            foreach (string fileName in Request.Files)
            {
                HttpPostedFileBase file = Request.Files[fileName];
                if (file != null && file.ContentLength > 0)
                {
                    var fileNames = Path.GetFileName(file.FileName);
                    id = newId.ToString() + "." + file.ContentType.ToString().Split('/')[1];
                    file.SaveAs(Path.Combine(Server.MapPath(@"~\Content\Images\ArchivosAdjuntos"), id));
                }
            }
            return Json(new { FileId = id });
        }
        public ActionResult RemoveArchivos(string id)
        {
            var path = Server.MapPath(@"~\Content\Images\ArchivosAdjuntos\" + id);
            if ((System.IO.File.Exists(path)))
            {
                System.IO.File.Delete(path);
            }
            return Json(new { Message = "Id a removido " + id });
        }
        [HttpPost]
        public async Task<ActionResult> SaveArchivosAdjuntos(ArchivosAdjuntosViewModel viewModel)
        {
            OnBeginCrudAction();

            if (!ModelState.IsValid)
            {
                return await Task.Run(() => Json(new { success = false, message = GetValidationMessages() }, JsonRequestBehavior.AllowGet));
            }

            try
            {
                viewModel.Codigo = NumeracionService.GetCodigoSecuencial(EmpresaID, "Archivos Adjuntos", '0', 9);
                var entity = MapperModelToEntity(viewModel);

                var saveResult = await EntityService.SaveAsync(entity);

                if (saveResult.Succeeded)
                {
                    return await Task.Run(() => Json(new { data = MapperEntityToModel(entity), success = true, message = string.Empty }, JsonRequestBehavior.AllowGet));
                }

                return await Task.Run(() => Json(new { success = false, message = saveResult.GetErrorsString() }, JsonRequestBehavior.AllowGet));
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Archivos(Guid id)
        {
            var result = EntityService.GetById(id);
            var resultDto = Mapper.Map<List<ArchivosAdjuntosDetViewModel>>(result.ArchivosAdjuntosDet.ToList());
            return PartialView(resultDto);
        }
    }
}