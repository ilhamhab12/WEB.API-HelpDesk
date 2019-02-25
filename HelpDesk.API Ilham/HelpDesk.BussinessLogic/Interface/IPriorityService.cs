using HelpDesk.DataAccess.Model;
using HelpDesk.DataAccess.Param;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelpDesk.BussinessLogic.Interface
{
    public interface IPriorityService
    {
        bool Insert(PriorityParam priorityParam);
        bool Update(int? Id, PriorityParam priorityParam);
        bool Delete(int? Id);
        List<Priority> Get();
        Priority Get(int? Id);
        List<Priority> GetFk(int? Id);
    }
}
