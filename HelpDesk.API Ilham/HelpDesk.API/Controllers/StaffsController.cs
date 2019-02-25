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
    public class StaffsController : ApiController
    {
        private readonly IStaffService _staffService;
        public StaffsController(StaffService staffService)
        {
            _staffService = staffService;
        }
        // GET: api/Priorities
        public IEnumerable<Staff> Get()
        {
            return _staffService.Get();
        }

        // GET: api/Priorities/5
        public Staff Get(int id)
        {
            return _staffService.Get(id);
        }

        // POST: api/Priorities
        public void Post(StaffParam staffParam)
        {
            _staffService.Insert(staffParam);
        }

        // PUT: api/Priorities/5
        public void Put(int id, StaffParam staffParam)
        {
            _staffService.Update(id, staffParam);
        }

        // DELETE: api/Priorities/5
        public void Delete(int id)
        {
            _staffService.Delete(id);
        }

        // GET: api/Role/GetFk/5
        public IEnumerable<Staff> GetFk(int id)
        {
            return _staffService.GetFk(id);
        }
    }
}
