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
    public class StatusesController : ApiController
    {
        private readonly IStatusService _statusService;
        public StatusesController(StatusService statusService)
        {
            _statusService = statusService;
        }
        // GET: api/Priorities
        public IEnumerable<Status> Get()
        {
            return _statusService.Get();
        }

        // GET: api/Priorities/5
        public Status Get(int id)
        {
            return _statusService.Get(id);
        }

        // POST: api/Priorities
        public void Post(StatusParam StatusParam)
        {
            _statusService.Insert(StatusParam);
        }

        // PUT: api/Priorities/5
        public void Put(int id, StatusParam StatusParam)
        {
            _statusService.Update(id, StatusParam);
        }

        // DELETE: api/Priorities/5
        public void Delete(int id)
        {
            _statusService.Delete(id);
        }
    }
}
