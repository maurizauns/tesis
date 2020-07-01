namespace UniOdonto.DAL.Migrations
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity.Infrastructure.Annotations;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Agendas",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        DuracionCitaId = c.Guid(nullable: false),
                        Nombre = c.String(),
                        PropietarioId = c.Guid(),
                        Codigo = c.String(),
                        Descripcion = c.String(),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Agendas_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.TipoIdentificacion", t => t.DuracionCitaId, cascadeDelete: true)
                .ForeignKey("dbo.Usuarios", t => t.PropietarioId)
                .Index(t => t.DuracionCitaId)
                .Index(t => t.PropietarioId);
            
            CreateTable(
                "dbo.AgendaUsuarios",
                c => new
                    {
                        UsuarioId = c.Guid(nullable: false),
                        AgendaId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.UsuarioId, t.AgendaId })
                .ForeignKey("dbo.Agendas", t => t.AgendaId, cascadeDelete: true)
                .ForeignKey("dbo.Usuarios", t => t.UsuarioId, cascadeDelete: true)
                .Index(t => t.UsuarioId)
                .Index(t => t.AgendaId);
            
            CreateTable(
                "dbo.Usuarios",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        Identificacion = c.String(),
                        TipoIdentificacion = c.String(),
                        NombresCompletos = c.String(),
                        ApplicationUserId = c.String(maxLength: 128),
                        Email = c.String(),
                        EmpresaId = c.Guid(nullable: false),
                        Establecimientos = c.String(),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Usuario_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Empresas", t => t.EmpresaId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUserId)
                .Index(t => t.ApplicationUserId)
                .Index(t => t.EmpresaId);
            
            CreateTable(
                "dbo.AspNetUsers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_ApplicationUser_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
            CreateTable(
                "dbo.AspNetUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.Empresas",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        Ruc = c.String(),
                        RazonSocial = c.String(),
                        NombreComercial = c.String(),
                        DireccionMatriz = c.String(),
                        ContribuyenteEspecial = c.Boolean(nullable: false),
                        ObligadoContabilidad = c.Boolean(nullable: false),
                        SmtpServidor = c.String(),
                        SmtpUsuario = c.String(),
                        SmtpClave = c.String(),
                        SmtpPuerto = c.Int(nullable: false),
                        SmtpHabilitaSsl = c.Boolean(nullable: false),
                        EmailAsunto = c.String(),
                        EmailIncluyeTipoDocumento = c.Boolean(nullable: false),
                        EmailDe = c.String(),
                        EmailPara = c.String(),
                        EmailParaAdicional = c.String(),
                        EmailCc = c.String(),
                        EmailCco = c.String(),
                        EmailMensajeHtml = c.String(),
                        RecepcionTimeOut = c.Int(nullable: false),
                        AutorizacionTimeOut = c.Int(nullable: false),
                        GeneraClaveAcceso = c.Boolean(nullable: false),
                        InformacionAdicional1 = c.String(),
                        InformacionAdicional2 = c.String(),
                        InformacionAdicional3 = c.String(),
                        DocumentoPathId = c.Guid(),
                        Decimales = c.Int(nullable: false),
                        NumeroEstablecimientos = c.String(),
                        Exportador = c.Boolean(nullable: false),
                        Telefonos = c.String(),
                        ActividadEconomica = c.String(),
                        EmailInventario = c.String(),
                        Imagen = c.Binary(),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Empresa_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.AspNetUserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.Medicamentos",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        Generico = c.String(),
                        Comercial = c.String(),
                        Dosis = c.String(),
                        Presentacion = c.String(),
                        Cantidad = c.Int(nullable: false),
                        Indicaciones = c.String(),
                        ApplicationUserId = c.String(maxLength: 128),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Medicamentos_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUserId)
                .Index(t => t.ApplicationUserId);
            
            CreateTable(
                "dbo.AspNetUserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.TipoIdentificacion",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        SubTipoIdentificacionId = c.Guid(nullable: false),
                        Codigo = c.String(),
                        Descripcion = c.String(),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_TipoIdentificacion_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.SubTipoIdentificacion", t => t.SubTipoIdentificacionId, cascadeDelete: true)
                .Index(t => t.SubTipoIdentificacionId);
            
            CreateTable(
                "dbo.SubTipoIdentificacion",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        Codigo = c.String(),
                        Descripcion = c.String(),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_SubTipoIdentificacion_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Horarios",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        AgendasId = c.Guid(nullable: false),
                        Dia = c.Int(nullable: false),
                        HoraInicio = c.Time(nullable: false, precision: 7),
                        HoraFin = c.Time(nullable: false, precision: 7),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Horarios_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Agendas", t => t.AgendasId, cascadeDelete: true)
                .Index(t => t.AgendasId);
            
            CreateTable(
                "dbo.Auditorias",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        TipoError = c.Byte(nullable: false),
                        Ruc = c.String(),
                        Modulo = c.String(),
                        Programa = c.String(),
                        Accion = c.String(),
                        Mensaje1 = c.String(),
                        Mensaje2 = c.String(),
                        Mensaje3 = c.String(),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Auditoria_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Cantones",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        ProvinciasId = c.Guid(),
                        Codigo = c.String(),
                        Descripcion = c.String(),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Cantones_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Provincias", t => t.ProvinciasId)
                .Index(t => t.ProvinciasId);
            
            CreateTable(
                "dbo.Provincias",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        Codigo = c.String(),
                        Descripcion = c.String(),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Provincias_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Configuracions",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        RutaAplicacion = c.String(),
                        RegitrosPorPagina = c.Int(nullable: false),
                        UrlAutorizacionPruebas = c.String(),
                        UrlRecepcionPruebas = c.String(),
                        UrlAutorizacionProduccion = c.String(),
                        UrlRecepcionProduccion = c.String(),
                        Proxy = c.String(),
                        FormatoFecha = c.String(),
                        RutaXmls = c.String(),
                        UrlPublicacionExterna = c.String(),
                        IntegracionMenatics = c.Boolean(nullable: false),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Configuracion_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Menus",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        Nombre = c.String(),
                        Descripcion = c.String(),
                        Url = c.String(),
                        Orden = c.Int(nullable: false),
                        ParentId = c.Guid(),
                        icon = c.String(),
                        iconColor = c.String(),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Menu_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Menus", t => t.ParentId)
                .Index(t => t.ParentId);
            
            CreateTable(
                "dbo.AspNetRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                        Discriminator = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
            CreateTable(
                "dbo.Numeraciones",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        EmpresaId = c.Guid(nullable: false),
                        TipoDoc = c.String(),
                        Establecimiento = c.Int(nullable: false),
                        PuntoEmision = c.Int(nullable: false),
                        Secuencial = c.Int(nullable: false),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Numeraciones_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Empresas", t => t.EmpresaId, cascadeDelete: true)
                .Index(t => t.EmpresaId);
            
            CreateTable(
                "dbo.Paneles",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        EmpresaId = c.Guid(nullable: false),
                        Nombre = c.String(),
                        Descripcion = c.String(),
                        Texto = c.String(),
                        Estilo = c.String(),
                        Color = c.String(),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Paneles_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Empresas", t => t.EmpresaId, cascadeDelete: true)
                .Index(t => t.EmpresaId);
            
            CreateTable(
                "dbo.Personas",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        EmpresaId = c.Guid(),
                        TipoIdentificacionId = c.Guid(nullable: false),
                        TipoSangreId = c.Guid(),
                        SexoId = c.Guid(),
                        EstadoCivilId = c.Guid(),
                        TipoPacienteId = c.Guid(),
                        SeguroMedicoId = c.Guid(),
                        TipoParienteId = c.Guid(),
                        OcupacionId = c.Guid(),
                        ProvinciasId = c.Guid(),
                        CantonesId = c.Guid(),
                        PersonaAsoId = c.Guid(),
                        FechaNacimiento = c.DateTime(),
                        NumeroPaciente = c.String(),
                        Identificacion = c.String(),
                        PrimerNombre = c.String(),
                        SegundoNombre = c.String(),
                        PrimerApellido = c.String(),
                        SegundoApellido = c.String(),
                        NombreComercial = c.String(),
                        Telefonos = c.String(),
                        Direccion = c.String(),
                        Extranjero = c.Boolean(nullable: false),
                        Email = c.String(),
                        EsPaciente = c.Boolean(nullable: false),
                        EsPariente = c.Boolean(nullable: false),
                        Discapacidad = c.Boolean(nullable: false),
                        PorcentajeDiscapacidad = c.String(),
                        Referenia = c.String(),
                        Codigo = c.String(),
                        Descripcion = c.String(),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Personas_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Cantones", t => t.CantonesId)
                .ForeignKey("dbo.Empresas", t => t.EmpresaId)
                .ForeignKey("dbo.TipoIdentificacion", t => t.EstadoCivilId)
                .ForeignKey("dbo.TipoIdentificacion", t => t.OcupacionId)
                .ForeignKey("dbo.Personas", t => t.PersonaAsoId)
                .ForeignKey("dbo.Provincias", t => t.ProvinciasId)
                .ForeignKey("dbo.TipoIdentificacion", t => t.SeguroMedicoId)
                .ForeignKey("dbo.TipoIdentificacion", t => t.SexoId)
                .ForeignKey("dbo.TipoIdentificacion", t => t.TipoIdentificacionId, cascadeDelete: true)
                .ForeignKey("dbo.TipoIdentificacion", t => t.TipoPacienteId)
                .ForeignKey("dbo.TipoIdentificacion", t => t.TipoParienteId)
                .ForeignKey("dbo.TipoIdentificacion", t => t.TipoSangreId)
                .Index(t => t.EmpresaId)
                .Index(t => t.TipoIdentificacionId)
                .Index(t => t.TipoSangreId)
                .Index(t => t.SexoId)
                .Index(t => t.EstadoCivilId)
                .Index(t => t.TipoPacienteId)
                .Index(t => t.SeguroMedicoId)
                .Index(t => t.TipoParienteId)
                .Index(t => t.OcupacionId)
                .Index(t => t.ProvinciasId)
                .Index(t => t.CantonesId)
                .Index(t => t.PersonaAsoId);
            
            CreateTable(
                "dbo.EmpresaApplicationUsers",
                c => new
                    {
                        Empresa_Id = c.Guid(nullable: false),
                        ApplicationUser_Id = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.Empresa_Id, t.ApplicationUser_Id })
                .ForeignKey("dbo.Empresas", t => t.Empresa_Id, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUser_Id, cascadeDelete: true)
                .Index(t => t.Empresa_Id)
                .Index(t => t.ApplicationUser_Id);
            
            CreateTable(
                "dbo.ApplicationUserApplicationUsers",
                c => new
                    {
                        ApplicationUser_Id = c.String(nullable: false, maxLength: 128),
                        ApplicationUser_Id1 = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.ApplicationUser_Id, t.ApplicationUser_Id1 })
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUser_Id)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUser_Id1)
                .Index(t => t.ApplicationUser_Id)
                .Index(t => t.ApplicationUser_Id1);
            
            CreateTable(
                "dbo.ApplicationRoleMenus",
                c => new
                    {
                        ApplicationRole_Id = c.String(nullable: false, maxLength: 128),
                        Menu_Id = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.ApplicationRole_Id, t.Menu_Id })
                .ForeignKey("dbo.AspNetRoles", t => t.ApplicationRole_Id, cascadeDelete: true)
                .ForeignKey("dbo.Menus", t => t.Menu_Id, cascadeDelete: true)
                .Index(t => t.ApplicationRole_Id)
                .Index(t => t.Menu_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.Personas", "TipoSangreId", "dbo.TipoIdentificacion");
            DropForeignKey("dbo.Personas", "TipoParienteId", "dbo.TipoIdentificacion");
            DropForeignKey("dbo.Personas", "TipoPacienteId", "dbo.TipoIdentificacion");
            DropForeignKey("dbo.Personas", "TipoIdentificacionId", "dbo.TipoIdentificacion");
            DropForeignKey("dbo.Personas", "SexoId", "dbo.TipoIdentificacion");
            DropForeignKey("dbo.Personas", "SeguroMedicoId", "dbo.TipoIdentificacion");
            DropForeignKey("dbo.Personas", "ProvinciasId", "dbo.Provincias");
            DropForeignKey("dbo.Personas", "PersonaAsoId", "dbo.Personas");
            DropForeignKey("dbo.Personas", "OcupacionId", "dbo.TipoIdentificacion");
            DropForeignKey("dbo.Personas", "EstadoCivilId", "dbo.TipoIdentificacion");
            DropForeignKey("dbo.Personas", "EmpresaId", "dbo.Empresas");
            DropForeignKey("dbo.Personas", "CantonesId", "dbo.Cantones");
            DropForeignKey("dbo.Paneles", "EmpresaId", "dbo.Empresas");
            DropForeignKey("dbo.Numeraciones", "EmpresaId", "dbo.Empresas");
            DropForeignKey("dbo.ApplicationRoleMenus", "Menu_Id", "dbo.Menus");
            DropForeignKey("dbo.ApplicationRoleMenus", "ApplicationRole_Id", "dbo.AspNetRoles");
            DropForeignKey("dbo.Menus", "ParentId", "dbo.Menus");
            DropForeignKey("dbo.Cantones", "ProvinciasId", "dbo.Provincias");
            DropForeignKey("dbo.Agendas", "PropietarioId", "dbo.Usuarios");
            DropForeignKey("dbo.Horarios", "AgendasId", "dbo.Agendas");
            DropForeignKey("dbo.Agendas", "DuracionCitaId", "dbo.TipoIdentificacion");
            DropForeignKey("dbo.TipoIdentificacion", "SubTipoIdentificacionId", "dbo.SubTipoIdentificacion");
            DropForeignKey("dbo.Usuarios", "ApplicationUserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.ApplicationUserApplicationUsers", "ApplicationUser_Id1", "dbo.AspNetUsers");
            DropForeignKey("dbo.ApplicationUserApplicationUsers", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.Medicamentos", "ApplicationUserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Usuarios", "EmpresaId", "dbo.Empresas");
            DropForeignKey("dbo.EmpresaApplicationUsers", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.EmpresaApplicationUsers", "Empresa_Id", "dbo.Empresas");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AgendaUsuarios", "UsuarioId", "dbo.Usuarios");
            DropForeignKey("dbo.AgendaUsuarios", "AgendaId", "dbo.Agendas");
            DropIndex("dbo.ApplicationRoleMenus", new[] { "Menu_Id" });
            DropIndex("dbo.ApplicationRoleMenus", new[] { "ApplicationRole_Id" });
            DropIndex("dbo.ApplicationUserApplicationUsers", new[] { "ApplicationUser_Id1" });
            DropIndex("dbo.ApplicationUserApplicationUsers", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.EmpresaApplicationUsers", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.EmpresaApplicationUsers", new[] { "Empresa_Id" });
            DropIndex("dbo.Personas", new[] { "PersonaAsoId" });
            DropIndex("dbo.Personas", new[] { "CantonesId" });
            DropIndex("dbo.Personas", new[] { "ProvinciasId" });
            DropIndex("dbo.Personas", new[] { "OcupacionId" });
            DropIndex("dbo.Personas", new[] { "TipoParienteId" });
            DropIndex("dbo.Personas", new[] { "SeguroMedicoId" });
            DropIndex("dbo.Personas", new[] { "TipoPacienteId" });
            DropIndex("dbo.Personas", new[] { "EstadoCivilId" });
            DropIndex("dbo.Personas", new[] { "SexoId" });
            DropIndex("dbo.Personas", new[] { "TipoSangreId" });
            DropIndex("dbo.Personas", new[] { "TipoIdentificacionId" });
            DropIndex("dbo.Personas", new[] { "EmpresaId" });
            DropIndex("dbo.Paneles", new[] { "EmpresaId" });
            DropIndex("dbo.Numeraciones", new[] { "EmpresaId" });
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropIndex("dbo.Menus", new[] { "ParentId" });
            DropIndex("dbo.Cantones", new[] { "ProvinciasId" });
            DropIndex("dbo.Horarios", new[] { "AgendasId" });
            DropIndex("dbo.TipoIdentificacion", new[] { "SubTipoIdentificacionId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.Medicamentos", new[] { "ApplicationUserId" });
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.Usuarios", new[] { "EmpresaId" });
            DropIndex("dbo.Usuarios", new[] { "ApplicationUserId" });
            DropIndex("dbo.AgendaUsuarios", new[] { "AgendaId" });
            DropIndex("dbo.AgendaUsuarios", new[] { "UsuarioId" });
            DropIndex("dbo.Agendas", new[] { "PropietarioId" });
            DropIndex("dbo.Agendas", new[] { "DuracionCitaId" });
            DropTable("dbo.ApplicationRoleMenus");
            DropTable("dbo.ApplicationUserApplicationUsers");
            DropTable("dbo.EmpresaApplicationUsers");
            DropTable("dbo.Personas",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Personas_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
            DropTable("dbo.Paneles",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Paneles_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
            DropTable("dbo.Numeraciones",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Numeraciones_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
            DropTable("dbo.AspNetRoles");
            DropTable("dbo.Menus",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Menu_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
            DropTable("dbo.Configuracions",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Configuracion_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
            DropTable("dbo.Provincias",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Provincias_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
            DropTable("dbo.Cantones",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Cantones_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
            DropTable("dbo.Auditorias",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Auditoria_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
            DropTable("dbo.Horarios",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Horarios_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
            DropTable("dbo.SubTipoIdentificacion",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_SubTipoIdentificacion_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
            DropTable("dbo.TipoIdentificacion",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_TipoIdentificacion_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.Medicamentos",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Medicamentos_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.Empresas",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Empresa_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.AspNetUsers",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_ApplicationUser_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
            DropTable("dbo.Usuarios",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Usuario_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
            DropTable("dbo.AgendaUsuarios");
            DropTable("dbo.Agendas",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Agendas_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
        }
    }
}
