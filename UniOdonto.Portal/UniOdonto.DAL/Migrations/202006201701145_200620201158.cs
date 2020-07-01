namespace UniOdonto.DAL.Migrations
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity.Infrastructure.Annotations;
    using System.Data.Entity.Migrations;
    
    public partial class _200620201158 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.EvolucionesOdontograma",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        OdontogramaId = c.Guid(nullable: false),
                        EvolucionDate = c.DateTime(nullable: false),
                        Diente = c.String(),
                        Pieza = c.String(),
                        Pieza2 = c.String(),
                        EstadoDiente = c.String(),
                        Indicacion = c.String(),
                        Cara = c.Boolean(nullable: false),
                        Cara1 = c.Boolean(nullable: false),
                        Cara2 = c.Boolean(nullable: false),
                        Cara3 = c.Boolean(nullable: false),
                        Cara4 = c.Boolean(nullable: false),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_EvolucionesOdontograma_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Odontograma", t => t.OdontogramaId, cascadeDelete: true)
                .Index(t => t.OdontogramaId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.EvolucionesOdontograma", "OdontogramaId", "dbo.Odontograma");
            DropIndex("dbo.EvolucionesOdontograma", new[] { "OdontogramaId" });
            DropTable("dbo.EvolucionesOdontograma",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_EvolucionesOdontograma_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
        }
    }
}
