using HelpDesk.DataAccess.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelpDesk.DataAccess.Context
{
    public class MyContext : DbContext
    {
        public MyContext() : base("MyContext") { }
        public DbSet<Province> Provinces { get; set; }
        public DbSet<Regency> Regencies { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<Village> Villages { get; set; }
        public DbSet<Priority> Priorities { get; set; }
        public DbSet<Religion> Religions { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Staff> Staffs { get; set; }
        public DbSet<TicketProgress> TicketProgresses { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<Quota> Quotas { get; set; }
        public DbSet<SubCategory> SubCategories { get; set; }

    }
}
