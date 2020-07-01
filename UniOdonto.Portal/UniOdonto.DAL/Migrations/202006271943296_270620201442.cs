namespace UniOdonto.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _270620201442 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TipoIdentificacion", "BackgroundColor", c => c.String());
            AddColumn("dbo.TipoIdentificacion", "Color", c => c.String());
            AddColumn("dbo.TipoIdentificacion", "Class", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.TipoIdentificacion", "Class");
            DropColumn("dbo.TipoIdentificacion", "Color");
            DropColumn("dbo.TipoIdentificacion", "BackgroundColor");
        }
    }
}
