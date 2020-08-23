namespace UniOdonto.DAL.Migrations
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity.Infrastructure.Annotations;
    using System.Data.Entity.Migrations;
    
    public partial class _180720202036 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Receta",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        PersonasId = c.Guid(nullable: false),
                        ProvinciasId = c.Guid(),
                        CantonesId = c.Guid(),
                        ProximaCita = c.DateTime(),
                        Diagnostico = c.String(),
                        Recomendaciones = c.String(),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Receta_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Cantones", t => t.CantonesId)
                .ForeignKey("dbo.Personas", t => t.PersonasId, cascadeDelete: true)
                .ForeignKey("dbo.Provincias", t => t.ProvinciasId)
                .Index(t => t.PersonasId)
                .Index(t => t.ProvinciasId)
                .Index(t => t.CantonesId);
            
            CreateTable(
                "dbo.RecetaDet",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        RecetaId = c.Guid(nullable: false),
                        MedicamentosId = c.Guid(nullable: false),
                        Dosis = c.String(),
                        Presentacion = c.String(),
                        Cantidad = c.Int(nullable: false),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_RecetaDet_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Medicamentos", t => t.MedicamentosId, cascadeDelete: true)
                .ForeignKey("dbo.Receta", t => t.RecetaId, cascadeDelete: true)
                .Index(t => t.RecetaId)
                .Index(t => t.MedicamentosId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.RecetaDet", "RecetaId", "dbo.Receta");
            DropForeignKey("dbo.RecetaDet", "MedicamentosId", "dbo.Medicamentos");
            DropForeignKey("dbo.Receta", "ProvinciasId", "dbo.Provincias");
            DropForeignKey("dbo.Receta", "PersonasId", "dbo.Personas");
            DropForeignKey("dbo.Receta", "CantonesId", "dbo.Cantones");
            DropIndex("dbo.RecetaDet", new[] { "MedicamentosId" });
            DropIndex("dbo.RecetaDet", new[] { "RecetaId" });
            DropIndex("dbo.Receta", new[] { "CantonesId" });
            DropIndex("dbo.Receta", new[] { "ProvinciasId" });
            DropIndex("dbo.Receta", new[] { "PersonasId" });
            DropTable("dbo.RecetaDet",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_RecetaDet_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
            DropTable("dbo.Receta",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Receta_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
        }
    }
}
