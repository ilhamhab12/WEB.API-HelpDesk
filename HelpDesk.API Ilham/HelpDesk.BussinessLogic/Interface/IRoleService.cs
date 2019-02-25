using HelpDesk.DataAccess.Model;
using HelpDesk.DataAccess.Param;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelpDesk.BussinessLogic.Interface
{
    public interface IRoleService
    {
        bool Insert(RoleParam roleParam);
        bool Update(int? Id, RoleParam roleParam);
        bool Delete(int? Id);
        List<Role> Get();
        Role Get(int? Id);
    }
}
