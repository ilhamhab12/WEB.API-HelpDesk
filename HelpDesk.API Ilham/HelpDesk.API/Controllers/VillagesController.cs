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
    public class VillagesController : ApiController
    {
        private readonly IVillageService _villageService;
        public VillagesController(VillageService villageService)
        {
            _villageService = villageService;
        }
        // GET: api/Village
        public IEnumerable<Village> Get()
        {
            return _villageService.Get();
        }

        // GET: api/Village/5
        public Village Get(int id)
        {
            return _villageService.Get(id);
        }

        // POST: api/Village
        public void Post(VillageParam villageParam)
        {
            _villageService.Insert(villageParam);
        }

        // PUT: api/Village/5
        public void Put(int id, VillageParam villageParam)
        {
            _villageService.Update(id, villageParam);
        }

        // DELETE: api/Village/5
        public void Delete(int id)
        {
            _villageService.Delete(id);
        }

        // GET: api/Village/GetFk/5
        public IEnumerable<Village> GetFk(int id)
        {
            return _villageService.GetFk(id);
        }
    }
}
