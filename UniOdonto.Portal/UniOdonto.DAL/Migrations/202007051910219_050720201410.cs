namespace UniOdonto.DAL.Migrations
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity.Infrastructure.Annotations;
    using System.Data.Entity.Migrations;
    
    public partial class _050720201410 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ArchivosAdjuntos",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        PersonasId = c.Guid(nullable: false),
                        Fecha = c.DateTime(nullable: false),
                        Codigo = c.String(),
                        Descripcion = c.String(),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_ArchivosAdjuntos_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Personas", t => t.PersonasId, cascadeDelete: true)
                .Index(t => t.PersonasId);
            
            CreateTable(
                "dbo.ArchivosAdjuntosDet",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        ArchivosAdjuntosId = c.Guid(nullable: false),
                        FileExtension = c.String(),
                        MimeType = c.String(),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_ArchivosAdjuntosDet_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.ArchivosAdjuntos", t => t.ArchivosAdjuntosId, cascadeDelete: true)
                .Index(t => t.ArchivosAdjuntosId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ArchivosAdjuntos", "PersonasId", "dbo.Personas");
            DropForeignKey("dbo.ArchivosAdjuntosDet", "ArchivosAdjuntosId", "dbo.ArchivosAdjuntos");
            DropIndex("dbo.ArchivosAdjuntosDet", new[] { "ArchivosAdjuntosId" });
            DropIndex("dbo.ArchivosAdjuntos", new[] { "PersonasId" });
            DropTable("dbo.ArchivosAdjuntosDet",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_ArchivosAdjuntosDet_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
            DropTable("dbo.ArchivosAdjuntos",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_ArchivosAdjuntos_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
        }
    }
}
