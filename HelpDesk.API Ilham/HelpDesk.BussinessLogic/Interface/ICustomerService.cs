using HelpDesk.DataAccess.Model;
using HelpDesk.DataAccess.Param;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelpDesk.BussinessLogic.Interface
{
    public interface ICustomerService
    {
        bool Insert(CustomerParam customerParam);
        bool Update(int? Id, CustomerParam customerParam);
        bool Delete(int? Id);
        List<Customer> Get();
        Customer Get(int? Id);
        Customer Login(string Username, string Password);
    }
}
