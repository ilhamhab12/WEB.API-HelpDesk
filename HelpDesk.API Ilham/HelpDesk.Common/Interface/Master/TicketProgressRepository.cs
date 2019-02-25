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
    public class TicketProgressRepository : ITicketProgressRepository
    {
        MyContext myContext = new MyContext();
        TicketProgress ticketProgress = new TicketProgress();
        bool status = false;
        public bool Delete(int? Id)
        {
            var result = 0;
            var ticketProgress = Get(Id);
            ticketProgress.IsDelete = true;
            ticketProgress.DeleteDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }

            return status;
        }

        public List<TicketProgress> Get()
        {
            return myContext.TicketProgresses.Where(x => x.IsDelete == false).ToList();
        }

        public TicketProgress Get(int? Id)
        {
            return myContext.TicketProgresses.Find(Id);
        }

        public bool Insert(TicketProgressParam ticketProgressParam)
        {
           //cari id ticket terahir
            var getTicket = myContext.Tickets.Max(x => x.Id);
         
            var result = 0;
            ticketProgress.ProgressDate = DateTimeOffset.UtcNow.LocalDateTime;
            ticketProgress.Statuses = myContext.Statuses.Find(ticketProgressParam.Statuses);
            ticketProgress.Tickets = myContext.Tickets.Find(getTicket);
            ticketProgress.Staffs = myContext.Staffs.Find(ticketProgressParam.Staffs);
            ticketProgress.CreateDate = DateTimeOffset.UtcNow.LocalDateTime;
            myContext.TicketProgresses.Add(ticketProgress);
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }

        public bool Update(int? Id, TicketProgressParam ticketProgressParam)
        {
            var result = 0;
            var ticketProgress = Get(Id);
            ticketProgress.ProgressDate = DateTimeOffset.UtcNow.LocalDateTime;
            ticketProgress.Statuses = myContext.Statuses.Find(ticketProgressParam.Statuses);
            ticketProgress.Tickets = myContext.Tickets.Find(ticketProgressParam.Tickets);
            ticketProgress.Staffs = myContext.Staffs.Find(ticketProgressParam.Staffs);
            ticketProgress.UpdateDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }
    }
}
