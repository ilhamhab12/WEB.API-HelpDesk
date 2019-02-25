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
    public class TicketProgressService : ITicketProgressService
    {
        private readonly ITicketProgressRepository _ticketProgressRepository;
        public TicketProgressService(ITicketProgressRepository ticketProgressRepository)
        {
            _ticketProgressRepository = ticketProgressRepository;
        }
        bool status = false;
        public bool Delete(int? Id)
        {
            var idDel = Get(Id);
            if (idDel != null)
            {
                status = _ticketProgressRepository.Delete(Id);
            }
            return status;
        }

        public List<TicketProgress> Get()
        {
            return _ticketProgressRepository.Get().ToList();
        }

        public TicketProgress Get(int? Id)
        {
            return _ticketProgressRepository.Get(Id);
        }

        public bool Insert(TicketProgressParam ticketProgressParam)
        {
            if (ticketProgressParam != null)
            {
                status = _ticketProgressRepository.Insert(ticketProgressParam);
            }
            return status;
        }

        public bool Update(int? Id, TicketProgressParam ticketProgressParam)
        {
            if (Id != null && ticketProgressParam != null)
            {
                status = _ticketProgressRepository.Update(Id, ticketProgressParam);
            }
            return status;
        }
    }
}
