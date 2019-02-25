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
    public class TicketProgressesController : ApiController
    {
        private readonly ITicketProgressService _ticketProgressService;
        public TicketProgressesController(TicketProgressService ticketProgressService)
        {
            _ticketProgressService = ticketProgressService;
        }
        // GET: api/Priorities
        public IEnumerable<TicketProgress> Get()
        {
            return _ticketProgressService.Get();
        }

        // GET: api/Priorities/5
        public TicketProgress Get(int id)
        {
            return _ticketProgressService.Get(id);
        }

        // POST: api/Priorities
        public void Post(TicketProgressParam ticketProgressParam)
        {
            _ticketProgressService.Insert(ticketProgressParam);
        }

        // PUT: api/Priorities/5
        public void Put(int id, TicketProgressParam ticketProgressParam)
        {
            _ticketProgressService.Update(id, ticketProgressParam);
        }

        // DELETE: api/Priorities/5
        public void Delete(int id)
        {
            _ticketProgressService.Delete(id);
        }
    }
}
