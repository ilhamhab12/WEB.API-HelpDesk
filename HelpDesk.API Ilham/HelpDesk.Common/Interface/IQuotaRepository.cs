using HelpDesk.DataAccess.Model;
using HelpDesk.DataAccess.Param;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelpDesk.Common.Interface
{
    public interface IQuotaRepository
    {
        bool Insert(QuotaParam quotaParam);
        bool Update(int? Id, QuotaParam quotaParam);
        bool Delete(int? Id);
        List<Quota> Get();
        Quota Get(int? Id);
        List<Quota> GetFk(int? Id);
    }
}
