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
    public class QuotasController : ApiController
    {
        private readonly IQuotaService _quotaService;
        public QuotasController(QuotaService quotaService)
        {
            _quotaService = quotaService;
        }
        // GET: api/Priorities
        public IEnumerable<Quota> Get()
        {
            return _quotaService.Get();
        }

        // GET: api/Priorities/5
        public Quota Get(int id)
        {
            return _quotaService.Get(id);
        }

        // POST: api/Priorities
        public void Post(QuotaParam quotaParam)
        {
            _quotaService.Insert(quotaParam);
        }

        // PUT: api/Priorities/5
        public void Put(int id, QuotaParam quotaParam)
        {
            _quotaService.Update(id, quotaParam);
        }

        // DELETE: api/Priorities/5
        public void Delete(int id)
        {
            _quotaService.Delete(id);
        }

        // GET: api/Role/GetFk/5
        public IEnumerable<Quota> GetFk(int id)
        {
            return _quotaService.GetFk(id);
        }
    }
}
