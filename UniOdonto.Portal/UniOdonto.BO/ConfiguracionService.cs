using System;
using UniOdonto.DAL.Entidad;
using RP.DAL.Repository;
namespace UniOdonto.BO
{
    public class ConfiguracionService : EntityService<Configuracion>, IService
    {
        public ConfiguracionService()
        {

        }

        public ConfiguracionService(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {

        }

        public static Configuracion ObtenerConfiguracion()
        {
            var configService = new ConfiguracionService();
            var config = configService.FirstOrDefault();
            if (config == null)
            {
                throw new Exception("Error al obtener configuracion");
            }
            configService.Dispose();

            return config;
        }
    }
}
