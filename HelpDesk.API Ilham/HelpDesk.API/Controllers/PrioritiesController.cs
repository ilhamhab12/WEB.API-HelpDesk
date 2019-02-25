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
    public class PrioritiesController : ApiController
    {
        private readonly IPriorityService _priorityService;
        public PrioritiesController(PriorityService priorityService)
        {
            _priorityService = priorityService;
        }
        // GET: api/Priorities
        public IEnumerable<Priority> Get()
        {
            return _priorityService.Get();
        }

        // GET: api/Priorities/5
        public Priority Get(int id)
        {
            return _priorityService.Get(id);
        }

        // POST: api/Priorities
        public void Post(PriorityParam priorityParam)
        {
            _priorityService.Insert(priorityParam);
        }

        // PUT: api/Priorities/5
        public void Put(int id, PriorityParam priorityParam)
        {
            _priorityService.Update(id, priorityParam);
        }

        // DELETE: api/Priorities/5
        public void Delete(int id)
        {
            _priorityService.Delete(id);
        }

        // GET: api/District/GetFk/5
        public IEnumerable<Priority> GetFk(int id)
        {
            return _priorityService.GetFk(id);
        }
    }
}
