using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HelpDesk.DataAccess.Model;
using HelpDesk.DataAccess.Param;
using HelpDesk.DataAccess.Context;

namespace HelpDesk.Common.Interface.Master
{
    public class TicketRepository : ITicketRepository
    {
        MyContext myContext = new MyContext();
        Ticket ticket = new Ticket();
        bool status = false;
        public bool Delete(int? Id)
        {
            var result = 0;
            var ticket = Get(Id);
            ticket.IsDelete = true;
            ticket.DeleteDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }

            return status;
        }

        public List<Ticket> Get()
        {
            return myContext.Tickets.Where(x => x.IsDelete == false).ToList();
        }

        public Ticket Get(int? Id)
        {
            return myContext.Tickets.Find(Id);
        }

        public bool Insert(TicketParam TicketParam)
        {
            var result = 0;
            ticket.Problem = TicketParam.Problem;
            //ticket.DueDate = TicketParam.DueDate;
            //ticket.Solution = TicketParam.Solution;
            //ticket.Categories = myContext.Categories.Find(TicketParam.Categories);
            //ticket.SubCategories = myContext.SubCategories.Find(TicketParam.SubCategories);
            //ticket.Priorities = myContext.Priorities.Find(TicketParam.Priorities);
            //ticket.Customers = myContext.Customers.Find(TicketParam.Customers);
            ticket.CreateDate = DateTimeOffset.UtcNow.LocalDateTime;
            myContext.Tickets.Add(ticket);
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }

        public bool Update(int? Id, TicketParam TicketParam)
        {       
            var result = 0;
            var ticket = Get(Id);
            ticket.Problem = TicketParam.Problem;
            ticket.DueDate = TicketParam.DueDate;
            ticket.Solution = TicketParam.Solution;
            ticket.Categories = myContext.Categories.Find(TicketParam.Categories);
            ticket.SubCategories = myContext.SubCategories.Find(TicketParam.SubCategories);
            ticket.Priorities = myContext.Priorities.Find(TicketParam.Priorities);
            ticket.Customers = myContext.Customers.Find(TicketParam.Customers);
            ticket.UpdateDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }
    }
}
