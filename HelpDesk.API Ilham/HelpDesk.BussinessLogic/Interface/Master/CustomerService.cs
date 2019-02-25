using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HelpDesk.DataAccess.Model;
using HelpDesk.DataAccess.Param;
using HelpDesk.Common.Interface;

namespace HelpDesk.BussinessLogic.Interface.Master
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;
        public CustomerService(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }
        bool status = false;
        public bool Delete(int? Id)
        {
            var idDel = Get(Id);
            if (idDel != null)
            {
                status = _customerRepository.Delete(Id);
            }
            return status;
        }

        public List<Customer> Get()
        {
            return _customerRepository.Get().ToList();
        }

        public Customer Get(int? Id)
        {
            return _customerRepository.Get(Id);
        }

        public bool Insert(CustomerParam customerParam)
        {
            if (customerParam != null)
            {
                status = _customerRepository.Insert(customerParam);
            }
            return status;
        }

        public bool Update(int? Id, CustomerParam customerParam)
        {
            if (Id != null && customerParam != null)
            {
                status = _customerRepository.Update(Id, customerParam);
            }
            return status;
        }

        public Customer Login(string Username, string Password)
        {
            return _customerRepository.Login(Username, Password);
        }
    }
}
