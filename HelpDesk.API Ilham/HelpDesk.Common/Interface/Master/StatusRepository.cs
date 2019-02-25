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
    public class StatusRepository : IStatusRepository
    {
        MyContext myContext = new MyContext();
        Status status = new Status();
        bool statusR = false;
        public bool Delete(int? Id)
        {
            var result = 0;
            var status = Get(Id);
            status.IsDelete = true;
            status.DeleteDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                statusR = true;
            }

            return statusR;
        }

        public List<Status> Get()
        {
            return myContext.Statuses.Where(x => x.IsDelete == false).ToList();
        }

        public Status Get(int? Id)
        {
            return myContext.Statuses.Find(Id);
        }

        public bool Insert(StatusParam statusParam)
        {
            var result = 0;
            status.Name = statusParam.Name;
            status.CreateDate = DateTimeOffset.UtcNow.LocalDateTime;
            myContext.Statuses.Add(status);
            result = myContext.SaveChanges();
            if (result > 0)
            {
                statusR = true;
            }
            return statusR;
        }

        public bool Update(int? Id, StatusParam statusParam)
        {
            var result = 0;
            var status = Get(Id);
            status.Name = statusParam.Name;
            status.UpdateDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                statusR = true;
            }
            return statusR;
        }
    }
}
