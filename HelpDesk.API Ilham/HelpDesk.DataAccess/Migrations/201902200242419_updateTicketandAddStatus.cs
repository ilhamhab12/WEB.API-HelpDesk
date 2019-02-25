namespace HelpDesk.DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateTicketandAddStatus : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Status",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        CreateDate = c.DateTimeOffset(nullable: false, precision: 7),
                        UpdateDate = c.DateTimeOffset(nullable: false, precision: 7),
                        DeleteDate = c.DateTimeOffset(nullable: false, precision: 7),
                        IsDelete = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.TicketProgresses", "Statuses_Id", c => c.Int());
            CreateIndex("dbo.TicketProgresses", "Statuses_Id");
            AddForeignKey("dbo.TicketProgresses", "Statuses_Id", "dbo.Status", "Id");
            DropColumn("dbo.TicketProgresses", "Status");
        }
        
        public override void Down()
        {
            AddColumn("dbo.TicketProgresses", "Status", c => c.String());
            DropForeignKey("dbo.TicketProgresses", "Statuses_Id", "dbo.Status");
            DropIndex("dbo.TicketProgresses", new[] { "Statuses_Id" });
            DropColumn("dbo.TicketProgresses", "Statuses_Id");
            DropTable("dbo.Status");
        }
    }
}
