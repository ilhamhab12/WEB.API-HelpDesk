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
    public class ReligionsController : ApiController
    {
        private readonly IReligionService _religionService;
        public ReligionsController(ReligionService religionService)
        {
            _religionService = religionService;
        }
        // GET: api/Religion
        public IEnumerable<Religion> Get()
        {
            return _religionService.Get();
        }

        // GET: api/Religion/5
        public Religion Get(int id)
        {
            return _religionService.Get(id);
        }

        // POST: api/Religion
        public void Post(ReligionParam religionParam)
        {
            _religionService.Insert(religionParam);
        }

        // PUT: api/Religion/5
        public void Put(int id, ReligionParam religionParam)
        {
            _religionService.Update(id, religionParam);
        }

        // DELETE: api/Religion/5
        public void Delete(int id)
        {
            _religionService.Delete(id);
        }
    }
}
