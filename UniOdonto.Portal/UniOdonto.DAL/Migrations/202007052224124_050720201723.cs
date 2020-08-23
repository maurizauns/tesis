namespace UniOdonto.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _050720201723 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ArchivosAdjuntosDet", "FileId", c => c.String());
            DropColumn("dbo.ArchivosAdjuntosDet", "FileExtension");
            DropColumn("dbo.ArchivosAdjuntosDet", "MimeType");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ArchivosAdjuntosDet", "MimeType", c => c.String());
            AddColumn("dbo.ArchivosAdjuntosDet", "FileExtension", c => c.String());
            DropColumn("dbo.ArchivosAdjuntosDet", "FileId");
        }
    }
}
