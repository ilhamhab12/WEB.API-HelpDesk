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
    public class ProvincesController : ApiController
    {
        private readonly IProvinceService _provinceService;
        public ProvincesController(ProvinceService provinceService)
        {
            _provinceService = provinceService;
        }
        // GET: api/Province
        public IEnumerable<Province> Get()
        {
            return _provinceService.Get();
        }

        // GET: api/Province/5
        public Province Get(int id)
        {
            return _provinceService.Get(id);
        }

        // POST: api/Province
        public void Post(ProvinceParam provinceParam)
        {
            _provinceService.Insert(provinceParam);
        }

        // PUT: api/Province/5
        public void Put(int id, ProvinceParam provinceParam)
        {
            _provinceService.Update(id, provinceParam);
        }

        // DELETE: api/Province/5
        public void Delete(int id)
        {
            _provinceService.Delete(id);
        }
    }
}
