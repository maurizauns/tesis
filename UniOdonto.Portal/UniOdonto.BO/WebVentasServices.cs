using RP.DAL.Repository;
using System;
namespace UniOdonto.BO
{
    public class WebVentasServices : IUnitOfWorkService, IDisposable
    {
        public IUnitOfWork UnitOfWork { get; set; }
        public WebVentasServices()
        {
            UnitOfWork = new UnitOfWork();
        }

        #region Services

  
        private AuditoriaService _auditoriaService;
        public AuditoriaService AuditoriaService
        {
            get
            {
                if (this._auditoriaService == null)
                {
                    return this._auditoriaService = new AuditoriaService(UnitOfWork);
                }
                return _auditoriaService;
            }
        }
        

        private UsuarioService _usuarioService;
        public UsuarioService UsuarioService
        {
            get
            {
                if (this._usuarioService == null)
                {
                    return this._usuarioService = new UsuarioService(UnitOfWork);
                }
                return _usuarioService;
            }
        }

        private EmpresaService _empresaService;
        public EmpresaService EmpresaService
        {
            get
            {
                if (this._empresaService == null)
                {
                    return this._empresaService = new EmpresaService(UnitOfWork);
                }
                return _empresaService;
            }
        }

        #endregion

        public void Dispose()
        {
            if (_auditoriaService != null)
            {
                _auditoriaService.Dispose();
            }
          
            if (_usuarioService != null)
            {
                _usuarioService.Dispose();
            }
            if (_empresaService != null)
            {
                _empresaService.Dispose();
            }
        }
    }
}
