namespace UniOdonto.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _250620200024 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Appointments", "AppointmentLenght", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Appointments", "AppointmentLenght");
        }
    }
}
