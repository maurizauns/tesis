namespace UniOdonto.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _160620202322 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Consultas", "Fecha", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Consultas", "Fecha");
        }
    }
}
