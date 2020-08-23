namespace UniOdonto.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _180720201107 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Menus", "TipoMenu", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Menus", "TipoMenu");
        }
    }
}
