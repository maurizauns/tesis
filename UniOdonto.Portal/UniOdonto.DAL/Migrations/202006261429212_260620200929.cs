namespace UniOdonto.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _260620200929 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AgendaUsuarios", "Inicio", c => c.String());
            AddColumn("dbo.AgendaUsuarios", "Fin", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AgendaUsuarios", "Fin");
            DropColumn("dbo.AgendaUsuarios", "Inicio");
        }
    }
}
