namespace UniOdonto.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _180720202043 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Receta", "Fecha", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Receta", "Fecha");
        }
    }
}
