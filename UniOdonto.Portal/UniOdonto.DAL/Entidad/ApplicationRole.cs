using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;

namespace UniOdonto.DAL.Entidad
{

    public class ApplicationRole : IdentityRole
    {
        public ApplicationRole()
        {
            Menus = new HashSet<Menu>();
        }

        public virtual ICollection<Menu> Menus { get; set; }
    }
}
