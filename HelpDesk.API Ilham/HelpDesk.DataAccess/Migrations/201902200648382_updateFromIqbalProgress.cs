namespace HelpDesk.DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateFromIqbalProgress : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Quotas",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Total = c.Int(nullable: false),
                        CreateDate = c.DateTimeOffset(nullable: false, precision: 7),
                        UpdateDate = c.DateTimeOffset(nullable: false, precision: 7),
                        DeleteDate = c.DateTimeOffset(nullable: false, precision: 7),
                        IsDelete = c.Boolean(nullable: false),
                        Staffs_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Staffs", t => t.Staffs_Id)
                .Index(t => t.Staffs_Id);
            
            CreateTable(
                "dbo.SubCategories",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        CreateDate = c.DateTimeOffset(nullable: false, precision: 7),
                        UpdateDate = c.DateTimeOffset(nullable: false, precision: 7),
                        DeleteDate = c.DateTimeOffset(nullable: false, precision: 7),
                        IsDelete = c.Boolean(nullable: false),
                        Categories_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Categories", t => t.Categories_Id)
                .Index(t => t.Categories_Id);
            
            AddColumn("dbo.Customers", "Picture", c => c.String());
            AddColumn("dbo.Staffs", "Picture", c => c.String());
            AddColumn("dbo.Staffs", "Roles_Id", c => c.Int());
            CreateIndex("dbo.Staffs", "Roles_Id");
            AddForeignKey("dbo.Staffs", "Roles_Id", "dbo.Roles", "Id");
            DropColumn("dbo.Staffs", "Role");
            DropColumn("dbo.Staffs", "Quota");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Staffs", "Quota", c => c.Int(nullable: false));
            AddColumn("dbo.Staffs", "Role", c => c.String());
            DropForeignKey("dbo.SubCategories", "Categories_Id", "dbo.Categories");
            DropForeignKey("dbo.Quotas", "Staffs_Id", "dbo.Staffs");
            DropForeignKey("dbo.Staffs", "Roles_Id", "dbo.Roles");
            DropIndex("dbo.SubCategories", new[] { "Categories_Id" });
            DropIndex("dbo.Staffs", new[] { "Roles_Id" });
            DropIndex("dbo.Quotas", new[] { "Staffs_Id" });
            DropColumn("dbo.Staffs", "Roles_Id");
            DropColumn("dbo.Staffs", "Picture");
            DropColumn("dbo.Customers", "Picture");
            DropTable("dbo.SubCategories");
            DropTable("dbo.Quotas");
        }
    }
}
