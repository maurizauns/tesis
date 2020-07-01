namespace UniOdonto.DAL.Migrations
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity.Infrastructure.Annotations;
    using System.Data.Entity.Migrations;
    
    public partial class _240620202137 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Appointments",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        PersonasId = c.Guid(),
                        UsuarioId = c.Guid(nullable: false),
                        AgendasId = c.Guid(nullable: false),
                        TipoCitaId = c.Guid(),
                        EstadoCitaId = c.Guid(),
                        AppointmentDate = c.DateTime(nullable: false),
                        AppointmentTitle = c.String(),
                        RepetirTipo = c.Int(nullable: false),
                        EnvioRecordatorio = c.Boolean(nullable: false),
                        EnvioCorreo = c.Boolean(nullable: false),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaModificacion = c.DateTime(),
                        FechaEliminacion = c.DateTime(),
                        Estado = c.Byte(nullable: false),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Appointment_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Agendas", t => t.AgendasId, cascadeDelete: true)
                .ForeignKey("dbo.TipoIdentificacion", t => t.EstadoCitaId)
                .ForeignKey("dbo.Personas", t => t.PersonasId)
                .ForeignKey("dbo.TipoIdentificacion", t => t.TipoCitaId)
                .ForeignKey("dbo.Usuarios", t => t.UsuarioId, cascadeDelete: true)
                .Index(t => t.PersonasId)
                .Index(t => t.UsuarioId)
                .Index(t => t.AgendasId)
                .Index(t => t.TipoCitaId)
                .Index(t => t.EstadoCitaId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Appointments", "UsuarioId", "dbo.Usuarios");
            DropForeignKey("dbo.Appointments", "TipoCitaId", "dbo.TipoIdentificacion");
            DropForeignKey("dbo.Appointments", "PersonasId", "dbo.Personas");
            DropForeignKey("dbo.Appointments", "EstadoCitaId", "dbo.TipoIdentificacion");
            DropForeignKey("dbo.Appointments", "AgendasId", "dbo.Agendas");
            DropIndex("dbo.Appointments", new[] { "EstadoCitaId" });
            DropIndex("dbo.Appointments", new[] { "TipoCitaId" });
            DropIndex("dbo.Appointments", new[] { "AgendasId" });
            DropIndex("dbo.Appointments", new[] { "UsuarioId" });
            DropIndex("dbo.Appointments", new[] { "PersonasId" });
            DropTable("dbo.Appointments",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Appointment_RegistrosEliminados", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
        }
    }
}
