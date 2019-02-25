using HelpDesk.BussinessLogic.Interface;
using HelpDesk.BussinessLogic.Interface.Master;
using HelpDesk.DataAccess.Model;
using HelpDesk.DataAccess.Param;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace HelpDesk.API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class TicketsController : ApiController
    {
        private readonly ITicketService _ticketService;
        public TicketsController(TicketService ticketService)
        {
            _ticketService = ticketService;
        }
        // GET: api/Priorities
        public IEnumerable<Ticket> Get()
        {
            return _ticketService.Get();
        }

        // GET: api/Priorities/5
        public Ticket Get(int id)
        {
            return _ticketService.Get(id);
        }

        // POST: api/Priorities
        public void Post(TicketParam TicketParam)
        {
            _ticketService.Insert(TicketParam);
        }

        // PUT: api/Priorities/5
        public void Put(int id, TicketParam TicketParam)
        {
            _ticketService.Update(id, TicketParam);
        }

        // DELETE: api/Priorities/5
        public void Delete(int id)
        {
            _ticketService.Delete(id);
        }
    }
}
