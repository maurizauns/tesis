using System.Diagnostics;
using UniOdonto.DAL.Entidad;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace UniOdonto.DAL.Migrations
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;

    public sealed class Configuration : DbMigrationsConfiguration<WebVentasContext>
    {
        private readonly bool _exists;
        public Configuration()
        {
            AutomaticMigrationsEnabled =
                Convert.ToBoolean(System.Configuration.ConfigurationManager.AppSettings["MigrateDatabaseToLatestVersion"]);


            using (DbContext context = new WebVentasContext())
            {
                _exists = context.Database.Exists();
            }
        }

        protected override void Seed(WebVentasContext context)
        {
            if (_exists)
            {
                return;
            }

            var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));
            const string email = "mauricio";
            var user = new ApplicationUser { UserName = email, Email = email };
            var result = userManager.Create(user, "Admin123.");

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    Debug.Print(error);
                }
            }

            var roleStore = new RoleStore<ApplicationRole>(context);
            var roleManager = new RoleManager<ApplicationRole>(roleStore);
            var rolAdministrador = roleManager.FindByName("Administrador");
            var rolUsuario = roleManager.FindByName("Usuario");
            var rolCliente = roleManager.FindByName("Cliente");
            var rolEmpleado = roleManager.FindByName("Empleado");

            if (rolAdministrador == null)
            {
                rolAdministrador = new ApplicationRole { Name = "Administrador" };
                roleManager.Create(rolAdministrador);

                rolUsuario = new ApplicationRole { Name = "Usuario" };
                roleManager.Create(rolUsuario);

                rolCliente = new ApplicationRole { Name = "Cliente" };
                roleManager.Create(rolCliente);

                rolEmpleado = new ApplicationRole { Name = "Empleado" };
                roleManager.Create(rolEmpleado);
            }

            var manager = userManager.FindByName(user.UserName);
            if (manager != null)
            {
                userManager.AddToRole(manager.Id, "Administrador");
            }

            var menuConfiguracion = new Menu
            {
                Nombre = "Administracion",
                Descripcion = "Administración",
                Orden = 1,
                Url = ""
            };

            var menuConfiguracion1 = new Menu
            {
                Parent = menuConfiguracion,
                Nombre = "Empresas",
                Descripcion = "Empresas",
                Orden = 1,
                Url = "Empresas"
            };

            var menuConfiguracion2 = new Menu
            {
                Parent = menuConfiguracion,
                Nombre = "Usuarios",
                Descripcion = "Usuarios",
                Orden = 2,
                Url = "Usuarios/Lista"
            };

            var menuConfiguracion3 = new Menu
            {
                Parent = menuConfiguracion,
                Nombre = "Configuracion",
                Descripcion = "Configuración General",
                Orden = 3,
                Url = "Configuracion"
            };

            var menuConfiguracion4 = new Menu
            {
                Parent = menuConfiguracion,
                Nombre = "Medicamentos",
                Descripcion = "Medicamentos",
                Orden = 4,
                Url = "Medicamentos"
            };


            var menuPersonas = new Menu
            {
                Nombre = "Personas",
                Descripcion = "Personas",
                Orden = 2,
                Url = ""
            };

            var menuOperaciones = new Menu
            {
                Nombre = "Operaciones",
                Descripcion = "Operaciones",
                Orden = 3,
                Url = ""
            };

            var menuOperaciones1 = new Menu
            {
                Parent = menuOperaciones,
                Nombre = "Agendas",
                Descripcion = "Agendas",
                Orden = 1,
                Url = "Agendas"
            };

            var menuOdontologiaGeneral = new Menu
            {
                Nombre = "OdontologiaGeneral",
                Descripcion = "Odontología General",
                Orden = 4,
                Url = ""
            };

            var menuOdontologiaGeneral1 = new Menu
            {
                Parent = menuOdontologiaGeneral,
                Nombre = "Odontograma",
                Descripcion = "Odontograma",
                Orden = 1,
                Url = "Odontograma"
            };

            var menuEspecialidades = new Menu
            {
                Nombre = "EspecialidadesOdontologicas",
                Descripcion = "Especialidades Odontológicas",
                Orden = 5,
                Url = ""
            };

            var menuEspecialidades1 = new Menu
            {
                Parent = menuEspecialidades,
                Nombre = "Periodoncia",
                Descripcion = "Periodoncia",
                Orden = 1,
                Url = "Periodoncia"
            };

            var menuDocumentos = new Menu
            {
                Nombre = "Documentos",
                Descripcion = "Documentos",
                Orden = 6,
                Url = ""
            };

            var menuDocumentos1 = new Menu
            {
                Parent = menuDocumentos,
                Nombre = "ArchivosAdjuntos",
                Descripcion = "Archivos Adjuntos",
                Orden = 1,
                Url = "ArchivosAdjuntos"
            };



            context.Menus.Add(menuConfiguracion);
            context.Menus.Add(menuConfiguracion2);
            context.Menus.Add(menuConfiguracion1);
            context.Menus.Add(menuConfiguracion3);
            context.Menus.Add(menuConfiguracion4);

            context.Menus.Add(menuPersonas);

            context.Menus.Add(menuOperaciones);
            context.Menus.Add(menuOperaciones1);

            context.Menus.Add(menuOdontologiaGeneral);
            context.Menus.Add(menuOdontologiaGeneral1);

            context.Menus.Add(menuEspecialidades);
            context.Menus.Add(menuEspecialidades1);

            context.Menus.Add(menuDocumentos);
            context.Menus.Add(menuDocumentos1);



            rolAdministrador.Menus.Add(menuConfiguracion);
            rolAdministrador.Menus.Add(menuConfiguracion1);
            rolAdministrador.Menus.Add(menuConfiguracion2);
            rolAdministrador.Menus.Add(menuConfiguracion3);
            rolAdministrador.Menus.Add(menuConfiguracion4);

            rolAdministrador.Menus.Add(menuPersonas);

            rolAdministrador.Menus.Add(menuOperaciones);
            rolAdministrador.Menus.Add(menuOperaciones1);

            rolAdministrador.Menus.Add(menuOdontologiaGeneral);
            rolAdministrador.Menus.Add(menuOdontologiaGeneral1);

            rolAdministrador.Menus.Add(menuEspecialidades);
            rolAdministrador.Menus.Add(menuEspecialidades1);

            rolAdministrador.Menus.Add(menuDocumentos);
            rolAdministrador.Menus.Add(menuDocumentos1);

            #region Insertar 
           
            var subTipoIdentificacionDocIde = new SubTipoIdentificacion
            {
                Codigo = "DocIde",
                Descripcion = "DocumentoIdentidad",
            };

            var subTipoIdentificacionDocIde1 = new TipoIdentificacion
            {
                SubTipoIdentificacion = subTipoIdentificacionDocIde,
                Codigo = "Ruc",
                Descripcion = "Ruc"
            };
            var subTipoIdentificacionDocIde2 = new TipoIdentificacion
            {
                SubTipoIdentificacion = subTipoIdentificacionDocIde,
                Codigo = "Ced",
                Descripcion = "Cedula"
            };
            var subTipoIdentificacionDocIde3 = new TipoIdentificacion
            {
                SubTipoIdentificacion = subTipoIdentificacionDocIde,
                Codigo = "Pas",
                Descripcion = "Pasaporte"
            };


            var subTipoIdentificacionEstCiv = new SubTipoIdentificacion
            {
                Codigo = "EstCiv",
                Descripcion = "Estado Civil",
            };

            var subTipoIdentificacionEstCiv1 = new TipoIdentificacion
            {
                SubTipoIdentificacion = subTipoIdentificacionEstCiv,
                Codigo = "SO",
                Descripcion = "Soltero"
            };
            var subTipoIdentificacionEstCiv2 = new TipoIdentificacion
            {
                SubTipoIdentificacion = subTipoIdentificacionEstCiv,
                Codigo = "CA",
                Descripcion = "Casado"
            };
            var subTipoIdentificacionEstCiv3 = new TipoIdentificacion
            {
                SubTipoIdentificacion = subTipoIdentificacionEstCiv,
                Codigo = "DI",
                Descripcion = "Divorciado"
            };

            var subTipoIdentificacionTipPac = new SubTipoIdentificacion
            {
                Codigo = "TipPac",
                Descripcion = "Tipo de Paciente",
            };
            var subTipoIdentificacionTipPac1 = new TipoIdentificacion
            {
                SubTipoIdentificacion = subTipoIdentificacionTipPac,
                Codigo = "PR",
                Descripcion = "Privado"
            };
            var subTipoIdentificacionTipPac2 = new TipoIdentificacion
            {
                SubTipoIdentificacion = subTipoIdentificacionTipPac,
                Codigo = "SM",
                Descripcion = "Seguro Medico"
            };


            var subTipoIdentificacionSegMed = new SubTipoIdentificacion
            {
                Codigo = "SegMed",
                Descripcion = "Seguro Medico",
            };
            var subTipoIdentificacionSegMed1 = new TipoIdentificacion
            {
                SubTipoIdentificacion = subTipoIdentificacionSegMed,
                Codigo = "BM",
                Descripcion = "Bmi"
            };
            var subTipoIdentificacionSegMed2 = new TipoIdentificacion
            {
                SubTipoIdentificacion = subTipoIdentificacionSegMed,
                Codigo = "HU",
                Descripcion = "Humana"
            };


            var subTipoIdentificacionTipoPar = new SubTipoIdentificacion
            {
                Codigo = "TipoPar",
                Descripcion = "Tipo de Pariente",
            };
            var subTipoIdentificacionTipoPar1 = new TipoIdentificacion
            {
                SubTipoIdentificacion = subTipoIdentificacionTipoPar,
                Codigo = "MA",
                Descripcion = "Madre"
            };
            var subTipoIdentificacionTipoPar2 = new TipoIdentificacion
            {
                SubTipoIdentificacion = subTipoIdentificacionTipoPar,
                Codigo = "PA",
                Descripcion = "Padre"
            };


            var subTipoIdentificacionTipSan = new SubTipoIdentificacion
            {
                Codigo = "TipSan",
                Descripcion = "Tipo de Sangre",
            };
            var subTipoIdentificacionTipSan1 = new TipoIdentificacion
            {
                SubTipoIdentificacion = subTipoIdentificacionTipSan,
                Codigo = "Opo",
                Descripcion = "O +"
            };
            var subTipoIdentificacionTipSan2 = new TipoIdentificacion
            {
                SubTipoIdentificacion = subTipoIdentificacionTipSan,
                Codigo = "One",
                Descripcion = "O -"
            };



            var subTipoIdentificacionSex = new SubTipoIdentificacion
            {
                Codigo = "Sex",
                Descripcion = "Sexo",
            };
            var subTipoIdentificacionSex1 = new TipoIdentificacion
            {
                SubTipoIdentificacion = subTipoIdentificacionSex,
                Codigo = "MA",
                Descripcion = "Masculino"
            };
            var subTipoIdentificacionSex2 = new TipoIdentificacion
            {
                SubTipoIdentificacion = subTipoIdentificacionSex,
                Codigo = "FE",
                Descripcion = "Femenino"
            };
            var subTipoIdentificacionSex3 = new TipoIdentificacion
            {
                SubTipoIdentificacion = subTipoIdentificacionSex,
                Codigo = "OT",
                Descripcion = "Otros"
            };


            var subTipoIdentificacionOcu = new SubTipoIdentificacion
            {
                Codigo = "Ocu",
                Descripcion = "Ocupacion",
            };
            var subTipoIdentificacionOcu1 = new TipoIdentificacion
            {
                SubTipoIdentificacion = subTipoIdentificacionOcu,
                Codigo = "AC",
                Descripcion = "Ama de casa"
            };



            var subTipoIdentificacionDurCit = new SubTipoIdentificacion
            {
                Codigo = "DurCit",
                Descripcion = "Duracion de Citas",
            };
            var subTipoIdentificacionDurCit1 = new TipoIdentificacion
            {
                SubTipoIdentificacion = subTipoIdentificacionDurCit,
                Codigo = "VeiMin",
                Descripcion = "20"
            };
            var subTipoIdentificacionDurCit2 = new TipoIdentificacion
            {
                SubTipoIdentificacion = subTipoIdentificacionDurCit,
                Codigo = "SesMin",
                Descripcion = "60"
            };
            var subTipoIdentificacionDurCit3 = new TipoIdentificacion
            {
                SubTipoIdentificacion = subTipoIdentificacionDurCit,
                Codigo = "TreMin",
                Descripcion = "30"
            };
            var subTipoIdentificacionDurCit4 = new TipoIdentificacion
            {
                SubTipoIdentificacion = subTipoIdentificacionDurCit,
                Codigo = "QuiMin",
                Descripcion = "15"
            };

            #endregion

            context.SubTipoIdentificacion.Add(subTipoIdentificacionDocIde);
            context.TipoIdentificacion.Add(subTipoIdentificacionDocIde1);
            context.TipoIdentificacion.Add(subTipoIdentificacionDocIde2);
            context.TipoIdentificacion.Add(subTipoIdentificacionDocIde3);

            context.SubTipoIdentificacion.Add(subTipoIdentificacionEstCiv);
            context.TipoIdentificacion.Add(subTipoIdentificacionEstCiv1);
            context.TipoIdentificacion.Add(subTipoIdentificacionEstCiv2);
            context.TipoIdentificacion.Add(subTipoIdentificacionEstCiv3);

            context.SubTipoIdentificacion.Add(subTipoIdentificacionTipPac);
            context.TipoIdentificacion.Add(subTipoIdentificacionTipPac1);
            context.TipoIdentificacion.Add(subTipoIdentificacionTipPac2);

            context.SubTipoIdentificacion.Add(subTipoIdentificacionSegMed);
            context.TipoIdentificacion.Add(subTipoIdentificacionSegMed1);
            context.TipoIdentificacion.Add(subTipoIdentificacionSegMed2);

            context.SubTipoIdentificacion.Add(subTipoIdentificacionTipoPar);
            context.TipoIdentificacion.Add(subTipoIdentificacionTipoPar1);
            context.TipoIdentificacion.Add(subTipoIdentificacionTipoPar2);

            context.SubTipoIdentificacion.Add(subTipoIdentificacionTipSan);
            context.TipoIdentificacion.Add(subTipoIdentificacionTipSan1);
            context.TipoIdentificacion.Add(subTipoIdentificacionTipSan2);

            context.SubTipoIdentificacion.Add(subTipoIdentificacionSex);
            context.TipoIdentificacion.Add(subTipoIdentificacionSex1);
            context.TipoIdentificacion.Add(subTipoIdentificacionSex2);
            context.TipoIdentificacion.Add(subTipoIdentificacionSex3);

            context.SubTipoIdentificacion.Add(subTipoIdentificacionOcu);
            context.TipoIdentificacion.Add(subTipoIdentificacionOcu1);

            context.SubTipoIdentificacion.Add(subTipoIdentificacionDurCit);
            context.TipoIdentificacion.Add(subTipoIdentificacionDurCit1);
            context.TipoIdentificacion.Add(subTipoIdentificacionDurCit2);
            context.TipoIdentificacion.Add(subTipoIdentificacionDurCit3);
            context.TipoIdentificacion.Add(subTipoIdentificacionDurCit4);


            context.Configuraciones.Add(new Configuracion()
            {
                RutaAplicacion = "C:\\UniOdonto",
                UrlAutorizacionPruebas = "https://celcer.sri.gob.ec/comprobantes-electronicos-ws/AutorizacionComprobantesOffline",
                UrlRecepcionPruebas = "https://celcer.sri.gob.ec/comprobantes-electronicos-ws/RecepcionComprobantesOffline",
                UrlAutorizacionProduccion = "https://cel.sri.gob.ec/comprobantes-electronicos-ws/AutorizacionComprobantesOffline",
                UrlRecepcionProduccion = "https://cel.sri.gob.ec/comprobantes-electronicos-ws/RecepcionComprobantesOffline",
                RegitrosPorPagina = 10,
                FormatoFecha = "dd/MM/yyyy",
                RutaXmls = "C:\\UniOdonto\\Recursos\\Xmls"
            });

            context.SaveChanges();
        }
    }
}