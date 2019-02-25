using HelpDesk.DataAccess.Model;
using HelpDesk.DataAccess.Param;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelpDesk.BussinessLogic.Interface
{
    public interface ITicketProgressService
    {
        bool Insert(TicketProgressParam ticketProgress);
        bool Update(int? Id, TicketProgressParam ticketProgress);
        bool Delete(int? Id);
        List<TicketProgress> Get();
        TicketProgress Get(int? Id);
    }
}
