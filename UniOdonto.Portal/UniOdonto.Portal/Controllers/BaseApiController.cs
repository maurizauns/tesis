using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using UniOdonto.BO;
using UniOdonto.Models;

namespace UniOdonto.Controllers
{
    public class BaseApiController : ApiController
    {
        private readonly TipoIdentificacionService _tipoIdentificacionService;

        public BaseApiController(TipoIdentificacionService tipoIdentificacionService)
        {
            _tipoIdentificacionService = tipoIdentificacionService;
        }

        [HttpGet]
        public List<TipoIdentificacionViewModel> Index() 
            => Mapper.Map<List<TipoIdentificacionViewModel>>(_tipoIdentificacionService.GetAllAsync());
    }
}