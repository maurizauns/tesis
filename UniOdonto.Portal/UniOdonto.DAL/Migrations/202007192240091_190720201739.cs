namespace UniOdonto.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _190720201739 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Antecedentes", "Habitos", c => c.String());
            AddColumn("dbo.Antecedentes", "Cirugias", c => c.String());
            AddColumn("dbo.Antecedentes", "Perinatales", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Antecedentes", "Perinatales");
            DropColumn("dbo.Antecedentes", "Cirugias");
            DropColumn("dbo.Antecedentes", "Habitos");
        }
    }
}
