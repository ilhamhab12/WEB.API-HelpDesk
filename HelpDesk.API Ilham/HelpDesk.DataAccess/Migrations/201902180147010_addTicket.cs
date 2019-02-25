namespace HelpDesk.DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addTicket : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Customers",
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
            
            CreateTable(
                "dbo.Religions",
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
            
            CreateTable(
                "dbo.Villages",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        CreateDate = c.DateTimeOffset(nullable: false, precision: 7),
                        UpdateDate = c.DateTimeOffset(nullable: false, precision: 7),
                        DeleteDate = c.DateTimeOffset(nullable: false, precision: 7),
                        IsDelete = c.Boolean(nullable: false),
                        Districts_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Districts", t => t.Districts_Id)
                .Index(t => t.Districts_Id);
            
            CreateTable(
                "dbo.Districts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        CreateDate = c.DateTimeOffset(nullable: false, precision: 7),
                        UpdateDate = c.DateTimeOffset(nullable: false, precision: 7),
                        DeleteDate = c.DateTimeOffset(nullable: false, precision: 7),
                        IsDelete = c.Boolean(nullable: false),
                        Regencies_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Regencies", t => t.Regencies_Id)
                .Index(t => t.Regencies_Id);
            
            CreateTable(
                "dbo.Roles",
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
            
            CreateTable(
                "dbo.Tickets",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Problem = c.String(),
                        DueDate = c.DateTime(nullable: false),
                        CreateDate = c.DateTimeOffset(nullable: false, precision: 7),
                        UpdateDate = c.DateTimeOffset(nullable: false, precision: 7),
                        DeleteDate = c.DateTimeOffset(nullable: false, precision: 7),
                        IsDelete = c.Boolean(nullable: false),
                        Categories_Id = c.Int(),
                        Customers_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Categories", t => t.Categories_Id)
                .ForeignKey("dbo.Customers", t => t.Customers_Id)
                .Index(t => t.Categories_Id)
                .Index(t => t.Customers_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Tickets", "Customers_Id", "dbo.Customers");
            DropForeignKey("dbo.Tickets", "Categories_Id", "dbo.Categories");
            DropForeignKey("dbo.Customers", "Villages_Id", "dbo.Villages");
            DropForeignKey("dbo.Villages", "Districts_Id", "dbo.Districts");
            DropForeignKey("dbo.Districts", "Regencies_Id", "dbo.Regencies");
            DropForeignKey("dbo.Customers", "Religions_Id", "dbo.Religions");
            DropIndex("dbo.Tickets", new[] { "Customers_Id" });
            DropIndex("dbo.Tickets", new[] { "Categories_Id" });
            DropIndex("dbo.Districts", new[] { "Regencies_Id" });
            DropIndex("dbo.Villages", new[] { "Districts_Id" });
            DropIndex("dbo.Customers", new[] { "Villages_Id" });
            DropIndex("dbo.Customers", new[] { "Religions_Id" });
            DropTable("dbo.Tickets");
            DropTable("dbo.Roles");
            DropTable("dbo.Districts");
            DropTable("dbo.Villages");
            DropTable("dbo.Religions");
            DropTable("dbo.Customers");
        }
    }
}
