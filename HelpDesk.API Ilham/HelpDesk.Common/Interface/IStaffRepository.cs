using HelpDesk.DataAccess.Model;
using HelpDesk.DataAccess.Param;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelpDesk.Common.Interface
{
    public interface IStaffRepository
    {
        bool Insert(StaffParam staffParam);
        bool Update(int? Id, StaffParam staffParam);
        bool Delete(int? Id);
        List<Staff> Get();
        Staff Get(int? Id);
        List<Staff> GetFk(int? Id);
    }
}
