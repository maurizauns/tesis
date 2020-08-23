namespace UniOdonto.DAL.Migrations
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity.Infrastructure.Annotations;
    using System.Data.Entity.Migrations;
    
    public partial class _190720201313 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.RecetaDet", "MedicamentosId", "dbo.Medicamentos");
            DropForeignKey("dbo.RecetaDet", "RecetaId", "dbo.Receta");
            DropIndex("dbo.RecetaDet", new[] { "RecetaId" });
            DropIndex("dbo.RecetaDet", new[] { "MedicamentosId" });
            DropTable("dbo.RecetaDet",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_RecetaDet_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
        }
        
        public override void Down()
        {
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
                .PrimaryKey(t => t.Id);
            
            CreateIndex("dbo.RecetaDet", "MedicamentosId");
            CreateIndex("dbo.RecetaDet", "RecetaId");
            AddForeignKey("dbo.RecetaDet", "RecetaId", "dbo.Receta", "Id", cascadeDelete: true);
            AddForeignKey("dbo.RecetaDet", "MedicamentosId", "dbo.Medicamentos", "Id", cascadeDelete: true);
        }
    }
}
