namespace HelpDesk.DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class deleteProblemSolved : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ProblemSolveds", "TicketProgresses_Id", "dbo.TicketProgresses");
            DropIndex("dbo.ProblemSolveds", new[] { "TicketProgresses_Id" });
            AddColumn("dbo.Tickets", "Solution", c => c.String());
            DropTable("dbo.ProblemSolveds");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.ProblemSolveds",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Solution = c.String(),
                        CreateDate = c.DateTimeOffset(nullable: false, precision: 7),
                        UpdateDate = c.DateTimeOffset(nullable: false, precision: 7),
                        DeleteDate = c.DateTimeOffset(nullable: false, precision: 7),
                        IsDelete = c.Boolean(nullable: false),
                        TicketProgresses_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
            DropColumn("dbo.Tickets", "Solution");
            CreateIndex("dbo.ProblemSolveds", "TicketProgresses_Id");
            AddForeignKey("dbo.ProblemSolveds", "TicketProgresses_Id", "dbo.TicketProgresses", "Id");
        }
    }
}
