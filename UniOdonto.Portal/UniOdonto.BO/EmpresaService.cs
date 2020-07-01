using RP.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UniOdonto.DAL;
using UniOdonto.DAL.Entidad;

namespace UniOdonto.BO
{
    public class EmpresaService : EntityService<Empresa>
    {
        public EmpresaService()
        {

        }
        public EmpresaService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        public Empresa ObtenerPorRuc(string ruc)
        {
            return FirstOrDefault(e => e.Ruc == ruc);
        }

        public async Task<Empresa> ObtenerPorRucAsync(string ruc)
        {
            return await FirstOrDefaultAsync(e => e.Ruc == ruc);
        }

        public static Empresa ObtenerConfiguracion(Guid Id)
        {
            var configService = new EmpresaService();
            var config = configService.GetById(Id);
            if (config == null)
            {
                throw new Exception("Error al obtener empresa");
            }
            configService.Dispose();

            return config;
        }

        public static IEnumerable<Menu> GetEmpresasByIdUser(string userId)
        {
            try
            {
                using (var contexto = new WebVentasContext())
                {
                    var consulta = (
                                    from m in contexto.Menus
                                    where m.Roles.Any(
                                           r => contexto.Users.FirstOrDefault(u => u.Id == userId)
                                               .Roles.Any(ur => ur.RoleId == r.Id))
                                    select m
                                ).ToList();

                    var menuLista = consulta.Where(m => m.ParentId == null).OrderBy(m => m.Orden).ToList();
                    return menuLista;
                }
            }
            catch (Exception)
            {
                return new List<Menu>();
            }
        }
    }
}
