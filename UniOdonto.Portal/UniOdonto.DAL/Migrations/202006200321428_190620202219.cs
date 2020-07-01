namespace UniOdonto.DAL.Migrations
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity.Infrastructure.Annotations;
    using System.Data.Entity.Migrations;
    
    public partial class _190620202219 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Diente",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        OdontogramaId = c.Guid(nullable: false),
                        Numero = c.Int(nullable: false),
                        Numero2 = c.Int(),
                        Vestibular = c.String(),
                        Oclusal = c.String(),
                        Lingual = c.String(),
                        Distal = c.String(),
                        Mesial = c.String(),
                        SellanteI = c.Boolean(nullable: false),
                        SellanteR = c.Boolean(nullable: false),
                        ExtraccionI = c.Boolean(nullable: false),
                        ExtraccionR = c.Boolean(nullable: false),
                        AusenteI = c.Boolean(nullable: false),
                        CoronaI = c.Boolean(nullable: false),
                        CoronaR = c.Boolean(nullable: false),
                        EndodonciaI = c.Boolean(nullable: false),
                        EndodonciaR = c.Boolean(nullable: false),
                        PuenteI = c.Boolean(nullable: false),
                        PuenteR = c.Boolean(nullable: false),
                        RemovidoI = c.Boolean(nullable: false),
                        RemovidoR = c.Boolean(nullable: false),
                        ProtesisI = c.Boolean(nullable: false),
                        ProtesisR = c.Boolean(nullable: false),
                        Color = c.String(),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Diente_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Odontograma", t => t.OdontogramaId, cascadeDelete: true)
                .Index(t => t.OdontogramaId);
            
            CreateTable(
                "dbo.Odontograma",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        PersonasId = c.Guid(nullable: false),
                        Comentarios = c.String(),
                        Acciones = c.String(),
                        Fecha = c.DateTime(nullable: false),
                        R1 = c.String(),
                        R2 = c.String(),
                        R3 = c.String(),
                        R4 = c.String(),
                        R5 = c.String(),
                        R6 = c.String(),
                        R7 = c.String(),
                        R8 = c.String(),
                        R9 = c.String(),
                        R10 = c.String(),
                        R11 = c.String(),
                        R12 = c.String(),
                        R13 = c.String(),
                        R14 = c.String(),
                        R15 = c.String(),
                        R16 = c.String(),
                        M1 = c.String(),
                        M2 = c.String(),
                        M3 = c.String(),
                        M4 = c.String(),
                        M5 = c.String(),
                        M6 = c.String(),
                        M7 = c.String(),
                        M8 = c.String(),
                        M9 = c.String(),
                        M10 = c.String(),
                        M11 = c.String(),
                        M12 = c.String(),
                        M13 = c.String(),
                        M14 = c.String(),
                        M15 = c.String(),
                        M16 = c.String(),
                        Re1 = c.String(),
                        Re2 = c.String(),
                        Re3 = c.String(),
                        Re4 = c.String(),
                        Re5 = c.String(),
                        Re6 = c.String(),
                        Re7 = c.String(),
                        Re8 = c.String(),
                        Re9 = c.String(),
                        Re10 = c.String(),
                        Re11 = c.String(),
                        Re12 = c.String(),
                        Re13 = c.String(),
                        Re14 = c.String(),
                        Re15 = c.String(),
                        Re16 = c.String(),
                        Mo1 = c.String(),
                        Mo2 = c.String(),
                        Mo3 = c.String(),
                        Mo4 = c.String(),
                        Mo5 = c.String(),
                        Mo6 = c.String(),
                        Mo7 = c.String(),
                        Mo8 = c.String(),
                        Mo9 = c.String(),
                        Mo10 = c.String(),
                        Mo11 = c.String(),
                        Mo12 = c.String(),
                        Mo13 = c.String(),
                        Mo14 = c.String(),
                        Mo15 = c.String(),
                        Mo16 = c.String(),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Odontograma_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Personas", t => t.PersonasId, cascadeDelete: true)
                .Index(t => t.PersonasId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Odontograma", "PersonasId", "dbo.Personas");
            DropForeignKey("dbo.Diente", "OdontogramaId", "dbo.Odontograma");
            DropIndex("dbo.Odontograma", new[] { "PersonasId" });
            DropIndex("dbo.Diente", new[] { "OdontogramaId" });
            DropTable("dbo.Odontograma",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Odontograma_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
            DropTable("dbo.Diente",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Diente_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
        }
    }
}
