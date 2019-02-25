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
    public class QuotaRepository : IQuotaRepository
    {
        MyContext myContext = new MyContext();
        Quota quota = new Quota();
        bool status = false;
        public bool Delete(int? Id)
        {
            var result = 0;
            var Quota = Get(Id);
            Quota.IsDelete = true;
            Quota.DeleteDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }

            return status;
        }

        public List<Quota> Get()
        {
            return myContext.Quotas.Where(x => x.IsDelete == false).ToList();
        }

        public Quota Get(int? Id)
        {
            return myContext.Quotas.Find(Id);
        }

        public List<Quota> GetFk(int? Id)
        {
            return myContext.Quotas.Where(x => x.Staffs.Id == Id).ToList();
        }

        public bool Insert(QuotaParam quotaParam)
        {
            var result = 0;
            quota.Total = quotaParam.Total;
            quota.Staffs = myContext.Staffs.Find(quotaParam.Staffs);
            quota.CreateDate = DateTimeOffset.UtcNow.LocalDateTime;
            myContext.Quotas.Add(quota);
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }

        public bool Update(int? Id, QuotaParam quotaParam)
        {
            var result = 0;
            var quota = Get(Id);
            quota.Total = quotaParam.Total;
            quota.Staffs = myContext.Staffs.Find(quotaParam.Staffs);
            quota.UpdateDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }
    }
}
