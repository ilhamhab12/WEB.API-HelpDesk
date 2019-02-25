namespace HelpDesk.DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateTicketprogress : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.TicketProgresses", "ProgressDate", c => c.DateTimeOffset(nullable: false, precision: 7));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.TicketProgresses", "ProgressDate", c => c.DateTime(nullable: false));
        }
    }
}
