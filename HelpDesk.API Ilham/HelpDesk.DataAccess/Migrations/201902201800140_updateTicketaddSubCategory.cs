namespace HelpDesk.DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateTicketaddSubCategory : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Tickets", "SubCategories_Id", c => c.Int());
            CreateIndex("dbo.Tickets", "SubCategories_Id");
            AddForeignKey("dbo.Tickets", "SubCategories_Id", "dbo.SubCategories", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Tickets", "SubCategories_Id", "dbo.SubCategories");
            DropIndex("dbo.Tickets", new[] { "SubCategories_Id" });
            DropColumn("dbo.Tickets", "SubCategories_Id");
        }
    }
}
