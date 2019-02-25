using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HelpDesk.DataAccess.Model;
using HelpDesk.DataAccess.Param;
using HelpDesk.Common.Interface;

namespace HelpDesk.BussinessLogic.Interface.Master
{
    public class TicketService : ITicketService
    {
        private readonly ITicketRepository _ticketRepository;
        public TicketService(ITicketRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }
        bool status = false;
        public bool Delete(int? Id)
        {
            var idDel = Get(Id);
            if (idDel != null)
            {
                status = _ticketRepository.Delete(Id);
            }
            return status;
        }

        public List<Ticket> Get()
        {
            return _ticketRepository.Get().ToList();
        }

        public Ticket Get(int? Id)
        {
            return _ticketRepository.Get(Id);
        }

        public bool Insert(TicketParam ticketParam)
        {
            if (ticketParam != null)
            {
                status = _ticketRepository.Insert(ticketParam);
            }
            return status;
        }

        public bool Update(int? Id, TicketParam ticketParam)
        {
            if (Id != null && ticketParam != null)
            {
                status = _ticketRepository.Update(Id, ticketParam);
            }
            return status;
        }
    }
}
