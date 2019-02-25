using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HelpDesk.DataAccess.Model;
using HelpDesk.DataAccess.Param;
using HelpDesk.DataAccess.Context;

namespace HelpDesk.Common.Interface.Master
{
    public class CustomerRepository : ICustomerRepository
    {
        MyContext myContext = new MyContext();
        Customer customer = new Customer();
        bool status = false;
        public bool Delete(int? Id)
        {
            var result = 0;
            var customer = Get(Id);
            customer.IsDelete = true;
            customer.DeleteDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }

            return status;
        }

        public List<Customer> Get()
        {
            return myContext.Customers.Where(x => x.IsDelete == false).ToList();
        }

        public Customer Get(int? Id)
        {
            return myContext.Customers.Find(Id);
        }

        public bool Insert(CustomerParam customerParam)
        {
            var result = 0;
            customer.FirstName = customerParam.FirstName;
            customer.LastName = customerParam.LastName;
            customer.Dob = customerParam.Dob;
            customer.Pob = customerParam.Pob;
            customer.Gender = customerParam.Gender;
            customer.Religions = myContext.Religions.Find(customerParam.Religions);
            customer.Villages = myContext.Villages.Find(customerParam.Villages);
            customer.Address = customerParam.Address;
            customer.Phone = customerParam.Phone;
            customer.Email = customerParam.Email;
            customer.Username = customerParam.Username;
            customer.Password = customerParam.Password;
            customer.SecretQuestion = customerParam.SecretQuestion;
            customer.SecretAnswer = customerParam.SecretAnswer;
            customer.CreateDate = DateTimeOffset.UtcNow.LocalDateTime;
            myContext.Customers.Add(customer);
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }

        public bool Update(int? Id, CustomerParam customerParam)
        {
            var result = 0;
            var customer = Get(Id);
            customer.FirstName = customerParam.FirstName;
            customer.LastName = customerParam.LastName;
            customer.Dob = customerParam.Dob;
            customer.Pob = customerParam.Pob;
            customer.Gender = customerParam.Gender;
            customer.Religions = myContext.Religions.Find(customerParam.Religions);
            customer.Villages = myContext.Villages.Find(customerParam.Villages);
            customer.Address = customerParam.Address;
            customer.Phone = customerParam.Phone;
            customer.Email = customerParam.Email;
            customer.Username = customerParam.Username;
            customer.Password = customerParam.Password;
            customer.SecretQuestion = customerParam.SecretQuestion;
            customer.SecretAnswer = customerParam.SecretAnswer;
            customer.UpdateDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }

        public Customer Login(string Username, string Password)
        {
            //return myContext.Customers.Find(Username, Password);
            //return myContext.Customers.Where(x => x.Username == Username && x.Password == Password && x.IsDelete == false).SingleOrDefault();
            var get = myContext.Customers.SingleOrDefault(x => x.Username == Username && x.Password == Password && x.IsDelete == false);
            return get;
        }
    }
}
