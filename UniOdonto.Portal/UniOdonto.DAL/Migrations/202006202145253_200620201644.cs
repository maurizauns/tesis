namespace UniOdonto.DAL.Migrations
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity.Infrastructure.Annotations;
    using System.Data.Entity.Migrations;
    
    public partial class _200620201644 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.DientesPerio",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        PeriodonciaId = c.Guid(nullable: false),
                        Implante = c.Int(nullable: false),
                        Numero = c.Int(nullable: false),
                        Movilidad = c.Int(nullable: false),
                        Pronostico = c.String(),
                        Furca = c.Int(nullable: false),
                        Sangrado1 = c.Int(nullable: false),
                        Sangrado2 = c.Int(nullable: false),
                        Sangrado3 = c.Int(nullable: false),
                        Placa1 = c.Int(nullable: false),
                        Placa2 = c.Int(nullable: false),
                        Placa3 = c.Int(nullable: false),
                        Anchura = c.String(),
                        Margen1 = c.Int(nullable: false),
                        Margen2 = c.Int(nullable: false),
                        Margen3 = c.Int(nullable: false),
                        Profundidad1 = c.Int(nullable: false),
                        Profundidad2 = c.Int(nullable: false),
                        Profundidad3 = c.Int(nullable: false),
                        FurcaDos = c.Int(nullable: false),
                        Ausente = c.Boolean(nullable: false),
                        ProfundidadB1 = c.Int(nullable: false),
                        ProfundidadB2 = c.Int(nullable: false),
                        ProfundidadB3 = c.Int(nullable: false),
                        MargenB1 = c.Int(nullable: false),
                        MargenB2 = c.Int(nullable: false),
                        MargenB3 = c.Int(nullable: false),
                        PlacaB1 = c.Int(nullable: false),
                        PlacaB2 = c.Int(nullable: false),
                        PlacaB3 = c.Int(nullable: false),
                        SangradoB1 = c.Int(nullable: false),
                        SangradoB2 = c.Int(nullable: false),
                        SangradoB3 = c.Int(nullable: false),
                        NIC1 = c.Int(),
                        NIC2 = c.Int(),
                        NIC3 = c.Int(),
                        NICB1 = c.Int(),
                        NICB2 = c.Int(),
                        NICB3 = c.Int(),
                        Nota = c.String(),
                        FurcaB = c.Int(nullable: false),
                        FurcaBDos = c.Int(nullable: false),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_DientesPerio_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Periodoncia", t => t.PeriodonciaId, cascadeDelete: true)
                .Index(t => t.PeriodonciaId);
            
            CreateTable(
                "dbo.Periodoncia",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        PersonasId = c.Guid(nullable: false),
                        Fecha = c.DateTime(nullable: false),
                        Pronostico = c.String(),
                        Tratamiento = c.String(),
                        Diagnostico = c.String(),
                        AccionesClinicas = c.String(),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Periodoncia_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Personas", t => t.PersonasId, cascadeDelete: true)
                .Index(t => t.PersonasId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Periodoncia", "PersonasId", "dbo.Personas");
            DropForeignKey("dbo.DientesPerio", "PeriodonciaId", "dbo.Periodoncia");
            DropIndex("dbo.Periodoncia", new[] { "PersonasId" });
            DropIndex("dbo.DientesPerio", new[] { "PeriodonciaId" });
            DropTable("dbo.Periodoncia",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Periodoncia_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
            DropTable("dbo.DientesPerio",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_DientesPerio_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
        }
    }
}
