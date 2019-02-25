namespace HelpDesk.DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addStaffTicketProgressProblemSolved : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Categories", "Priorities_Id", "dbo.Priorities");
            DropIndex("dbo.Categories", new[] { "Priorities_Id" });
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
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.TicketProgresses", t => t.TicketProgresses_Id)
                .Index(t => t.TicketProgresses_Id);
            
            CreateTable(
                "dbo.TicketProgresses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ProgressDate = c.DateTime(nullable: false),
                        Status = c.String(),
                        CreateDate = c.DateTimeOffset(nullable: false, precision: 7),
                        UpdateDate = c.DateTimeOffset(nullable: false, precision: 7),
                        DeleteDate = c.DateTimeOffset(nullable: false, precision: 7),
                        IsDelete = c.Boolean(nullable: false),
                        Staffs_Id = c.Int(),
                        Tickets_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Staffs", t => t.Staffs_Id)
                .ForeignKey("dbo.Tickets", t => t.Tickets_Id)
                .Index(t => t.Staffs_Id)
                .Index(t => t.Tickets_Id);
            
            CreateTable(
                "dbo.Staffs",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Dob = c.DateTime(nullable: false),
                        Pob = c.String(),
                        Gender = c.String(),
                        Address = c.String(),
                        Phone = c.String(),
                        Email = c.String(),
                        Username = c.String(),
                        Password = c.String(),
                        Role = c.String(),
                        Quota = c.Int(nullable: false),
                        SecretQuestion = c.String(),
                        SecretAnswer = c.String(),
                        CreateDate = c.DateTimeOffset(nullable: false, precision: 7),
                        UpdateDate = c.DateTimeOffset(nullable: false, precision: 7),
                        DeleteDate = c.DateTimeOffset(nullable: false, precision: 7),
                        IsDelete = c.Boolean(nullable: false),
                        Religions_Id = c.Int(),
                        Villages_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Religions", t => t.Religions_Id)
                .ForeignKey("dbo.Villages", t => t.Villages_Id)
                .Index(t => t.Religions_Id)
                .Index(t => t.Villages_Id);
            
            AddColumn("dbo.Tickets", "Priorities_Id", c => c.Int());
            CreateIndex("dbo.Tickets", "Priorities_Id");
            AddForeignKey("dbo.Tickets", "Priorities_Id", "dbo.Priorities", "Id");
            DropColumn("dbo.Categories", "Priorities_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Categories", "Priorities_Id", c => c.Int());
            DropForeignKey("dbo.ProblemSolveds", "TicketProgresses_Id", "dbo.TicketProgresses");
            DropForeignKey("dbo.TicketProgresses", "Tickets_Id", "dbo.Tickets");
            DropForeignKey("dbo.Tickets", "Priorities_Id", "dbo.Priorities");
            DropForeignKey("dbo.TicketProgresses", "Staffs_Id", "dbo.Staffs");
            DropForeignKey("dbo.Staffs", "Villages_Id", "dbo.Villages");
            DropForeignKey("dbo.Staffs", "Religions_Id", "dbo.Religions");
            DropIndex("dbo.Tickets", new[] { "Priorities_Id" });
            DropIndex("dbo.Staffs", new[] { "Villages_Id" });
            DropIndex("dbo.Staffs", new[] { "Religions_Id" });
            DropIndex("dbo.TicketProgresses", new[] { "Tickets_Id" });
            DropIndex("dbo.TicketProgresses", new[] { "Staffs_Id" });
            DropIndex("dbo.ProblemSolveds", new[] { "TicketProgresses_Id" });
            DropColumn("dbo.Tickets", "Priorities_Id");
            DropTable("dbo.Staffs");
            DropTable("dbo.TicketProgresses");
            DropTable("dbo.ProblemSolveds");
            CreateIndex("dbo.Categories", "Priorities_Id");
            AddForeignKey("dbo.Categories", "Priorities_Id", "dbo.Priorities", "Id");
        }
    }
}
