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
    public class DistrictsController : ApiController
    {
        private readonly IDistrictService _districtService;
        public DistrictsController(DistrictService districtService)
        {
            _districtService = districtService;
        }
        // GET: api/District
        public IEnumerable<District> Get()
        {
            return _districtService.Get();
        }

        // GET: api/District/5
        public District Get(int id)
        {
            return _districtService.Get(id);
        }

        // POST: api/District
        public void Post(DistrictParam districtParam)
        {
            _districtService.Insert(districtParam);
        }

        // PUT: api/District/5
        public void Put(int id, DistrictParam districtParam)
        {
            _districtService.Update(id, districtParam);
        }

        // DELETE: api/District/5
        public void Delete(int id)
        {
            _districtService.Delete(id);
        }

        // GET: api/District/GetFk/5
        public IEnumerable<District> GetFk(int id)
        {
            return _districtService.GetFk(id);
        }
    }
}
