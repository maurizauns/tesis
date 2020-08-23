namespace UniOdonto.DAL.Migrations
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity.Infrastructure.Annotations;
    using System.Data.Entity.Migrations;
    
    public partial class _190720201329 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Receta", "CantonesId", "dbo.Cantones");
            DropForeignKey("dbo.Receta", "ProvinciasId", "dbo.Provincias");
            DropIndex("dbo.Receta", new[] { "ProvinciasId" });
            DropIndex("dbo.Receta", new[] { "CantonesId" });
            CreateTable(
                "dbo.Antecedentes",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        PersonasId = c.Guid(nullable: false),
                        SinPatologiaFamiliares = c.Boolean(nullable: false),
                        DetalleFamiliares = c.String(),
                        ComentarioFamiliares = c.String(),
                        SinPatologiaPersonales = c.Boolean(nullable: false),
                        DetallePersonales = c.String(),
                        ComentarioPersonales = c.String(),
                        OtrosPersonales = c.String(),
                        Medicamentos = c.String(),
                        Alergias = c.String(),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Antecedentes_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Personas", t => t.PersonasId, cascadeDelete: true)
                .Index(t => t.PersonasId);
            
            AddColumn("dbo.Receta", "Indicaciones", c => c.String());
            AddColumn("dbo.Receta", "Ciudad", c => c.String());
            AlterColumn("dbo.Receta", "Fecha", c => c.DateTime(nullable: false));
            DropColumn("dbo.Receta", "ProvinciasId");
            DropColumn("dbo.Receta", "CantonesId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Receta", "CantonesId", c => c.Guid());
            AddColumn("dbo.Receta", "ProvinciasId", c => c.Guid());
            DropForeignKey("dbo.Antecedentes", "PersonasId", "dbo.Personas");
            DropIndex("dbo.Antecedentes", new[] { "PersonasId" });
            AlterColumn("dbo.Receta", "Fecha", c => c.DateTime());
            DropColumn("dbo.Receta", "Ciudad");
            DropColumn("dbo.Receta", "Indicaciones");
            DropTable("dbo.Antecedentes",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Antecedentes_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
            CreateIndex("dbo.Receta", "CantonesId");
            CreateIndex("dbo.Receta", "ProvinciasId");
            AddForeignKey("dbo.Receta", "ProvinciasId", "dbo.Provincias", "Id");
            AddForeignKey("dbo.Receta", "CantonesId", "dbo.Cantones", "Id");
        }
    }
}
