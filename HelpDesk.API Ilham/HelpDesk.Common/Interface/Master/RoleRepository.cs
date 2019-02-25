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
    public class RoleRepository : IRoleRepository
    {
        MyContext myContext = new MyContext();
        Role role = new Role();
        bool status = false;
        public bool Delete(int? Id)
        {
            var result = 0;
            var Role = Get(Id);
            Role.IsDelete = true;
            Role.DeleteDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }

            return status;
        }

        public List<Role> Get()
        {
            return myContext.Roles.Where(x => x.IsDelete == false).ToList();
        }

        public Role Get(int? Id)
        {
            return myContext.Roles.Find(Id);
        }

        public bool Insert(RoleParam roleParam)
        {
            var result = 0;
            role.Name = roleParam.Name;
            role.CreateDate = DateTimeOffset.UtcNow.LocalDateTime;
            myContext.Roles.Add(role);
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }

        public bool Update(int? Id, RoleParam roleParam)
        {
            var result = 0;
            var Role = Get(Id);
            Role.Name = roleParam.Name;
            Role.UpdateDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }
    }
}
