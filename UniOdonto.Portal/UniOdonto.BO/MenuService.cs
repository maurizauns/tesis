using RP.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using UniOdonto.DAL;
using UniOdonto.DAL.Entidad;

namespace UniOdonto.BO
{
    public class MenuService : EntityService<Menu>, IService
    {
        public MenuService()
        {

        }

        public MenuService(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {

        }

        public static IEnumerable<Menu> GetMenuByIdUser(string userId)
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
                    foreach (var menu in menuLista)
                    {
                        menu.MenuItems = consulta.Where(m => m.ParentId == menu.Id).OrderBy(m => m.Orden).ToList();
                    }
                    return menuLista;
                }
            }
            catch (Exception ex)
            {
                return new List<Menu>();
            }

        }
    }
}
