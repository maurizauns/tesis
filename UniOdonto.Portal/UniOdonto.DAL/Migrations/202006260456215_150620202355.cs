namespace UniOdonto.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _150620202355 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Horarios", "PropietarioId", c => c.Guid());
            CreateIndex("dbo.Horarios", "PropietarioId");
            AddForeignKey("dbo.Horarios", "PropietarioId", "dbo.Usuarios", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Horarios", "PropietarioId", "dbo.Usuarios");
            DropIndex("dbo.Horarios", new[] { "PropietarioId" });
            DropColumn("dbo.Horarios", "PropietarioId");
        }
    }
}