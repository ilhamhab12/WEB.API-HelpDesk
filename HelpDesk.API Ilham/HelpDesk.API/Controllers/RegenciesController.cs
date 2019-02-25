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
    public class RegenciesController : ApiController
    {
        private readonly IRegencyService _regencyService;
        public RegenciesController(RegencyService regencyService)
        {
            _regencyService = regencyService;
        }
        // GET: api/Regency
        public IEnumerable<Regency> Get()
        {
            return _regencyService.Get();
        }

        // GET: api/Regency/5
        public Regency Get(int id)
        {
            return _regencyService.Get(id);
        }

        // POST: api/Regency
        public void Post(RegencyParam regencyParam)
        {
            _regencyService.Insert(regencyParam);
        }

        // PUT: api/Regency/5
        public void Put(int id, RegencyParam regencyParam)
        {
            _regencyService.Update(id, regencyParam);
        }

        // DELETE: api/Regency/5
        public void Delete(int id)
        {
            _regencyService.Delete(id);
        }

        // GET: api/Regency/GetFk/5
        public IEnumerable<Regency> GetFk(int id)
        {
            return _regencyService.GetFk(id);
        }
    }
}
