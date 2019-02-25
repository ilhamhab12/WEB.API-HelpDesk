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
    public class RolesController : ApiController
    {
        private readonly IRoleService _roleService;
        public RolesController(RoleService roleService)
        {
            _roleService = roleService;
        }
        // GET: api/Role
        public IEnumerable<Role> Get()
        {
            return _roleService.Get();
        }

        // GET: api/Role/5
        public Role Get(int id)
        {
            return _roleService.Get(id);
        }

        // POST: api/Role
        public void Post(RoleParam roleParam)
        {
            _roleService.Insert(roleParam);
        }

        // PUT: api/Role/5
        public void Put(int id, RoleParam roleParam)
        {
            _roleService.Update(id, roleParam);
        }

        // DELETE: api/Role/5
        public void Delete(int id)
        {
            _roleService.Delete(id);
        }
    }
}
