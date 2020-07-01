namespace UniOdonto.DAL.Migrations
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity.Infrastructure.Annotations;
    using System.Data.Entity.Migrations;
    
    public partial class _160620201904 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Consultas",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        PersonasId = c.Guid(nullable: false),
                        Fc = c.String(),
                        Fr = c.String(),
                        So2 = c.String(),
                        Ta = c.String(),
                        Temp = c.String(),
                        Peso = c.String(),
                        Talla = c.String(),
                        Motivo = c.String(),
                        EnfermedadActual = c.String(),
                        Diagnostico = c.String(),
                        Plan = c.String(),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Consultas_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Personas", t => t.PersonasId, cascadeDelete: true)
                .Index(t => t.PersonasId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Consultas", "PersonasId", "dbo.Personas");
            DropIndex("dbo.Consultas", new[] { "PersonasId" });
            DropTable("dbo.Consultas",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Consultas_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
        }
    }
}
