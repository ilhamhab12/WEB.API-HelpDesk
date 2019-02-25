using HelpDesk.DataAccess.Model;
using HelpDesk.DataAccess.Param;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelpDesk.BussinessLogic.Interface
{
    public interface ITicketService
    {
        bool Insert(TicketParam ticketParam);
        bool Update(int? Id, TicketParam ticketParam);
        bool Delete(int? Id);
        List<Ticket> Get();
        Ticket Get(int? Id);
    }
}
