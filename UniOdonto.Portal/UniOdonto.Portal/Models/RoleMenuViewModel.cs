﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using UniOdonto.Comun;
using UniOdonto.DAL.Entidad;

namespace UniOdonto.Models
{
    public class RoleMenuViewModel : BaseModel
    {
        public RoleMenuViewModel()
        {
            AvailableMenus = new List<Menu>();
            SelectedMenus = new List<Menu>();
        }

        [Required(ErrorMessage = "Seleccione un Rol")]
        [Display(Name = "Seleccione Rol")]
        public string ApplicationRoleId { get; set; }
        public IEnumerable<Menu> AvailableMenus { get; set; }
        public IEnumerable<Menu> SelectedMenus { get; set; }
        public PostedMenu PostedMenus { get; set; }
    }

    public class PostedMenu
    {
        public Guid[] MenuIds { get; set; }
    }
}