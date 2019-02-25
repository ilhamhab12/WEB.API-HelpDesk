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
    public class CustomersController : ApiController
    {
        private readonly ICustomerService _customerService;
        public CustomersController(CustomerService customerService)
        {
            _customerService = customerService;
        }
        // GET: api/Priorities
        public IEnumerable<Customer> Get()
        {
            return _customerService.Get();
        }

        // GET: api/Priorities/5
        public Customer Get(int id)
        {
            return _customerService.Get(id);
        }

        // POST: api/Priorities
        public void Post(CustomerParam customerParam)
        {
            _customerService.Insert(customerParam);
        }

        // PUT: api/Priorities/5
        public void Put(int id, CustomerParam customerParam)
        {
            _customerService.Update(id, customerParam);
        }

        // DELETE: api/Priorities/5
        public void Delete(int id)
        {
            _customerService.Delete(id);
        }

        [HttpGet]
        public Customer Login(string username, string password)
        {
            return _customerService.Login(username, password);
        }
    }
}
