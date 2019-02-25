using HelpDesk.DataAccess.Model;
using HelpDesk.DataAccess.Param;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelpDesk.Common.Interface
{
    public interface IStatusRepository
    {
        bool Insert(StatusParam statusParam);
        bool Update(int? Id, StatusParam statusParam);
        bool Delete(int? Id);
        List<Status> Get();
        Status Get(int? Id);
    }
}
