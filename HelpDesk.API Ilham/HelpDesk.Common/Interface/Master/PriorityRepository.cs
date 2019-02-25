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
    public class PriorityRepository : IPriorityRepository
    {
        MyContext myContext = new MyContext();
        Priority priority = new Priority();
        bool status = false;
        public bool Delete(int? Id)
        {
            var result = 0;
            var Priority = Get(Id);
            Priority.IsDelete = true;
            Priority.DeleteDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }

            return status;
        }

        public List<Priority> Get()
        {
            return myContext.Priorities.Where(x => x.IsDelete == false).ToList();
        }

        public Priority Get(int? Id)
        {
            return myContext.Priorities.Find(Id);
        }

        public List<Priority> GetFk(int? Id)
        {
            return myContext.Priorities.Where(x => x.Id == Id).ToList();
        }

        public bool Insert(PriorityParam priorityParam)
        {
            var result = 0;
            priority.Name = priorityParam.Name;
            priority.Days = priorityParam.Days;
            priority.CreateDate = DateTimeOffset.UtcNow.LocalDateTime;
            myContext.Priorities.Add(priority);
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }

        public bool Update(int? Id, PriorityParam priorityParam)
        {
            var result = 0;
            var priority = Get(Id);
            priority.Name = priorityParam.Name;
            priority.Days = priorityParam.Days;
            priority.UpdateDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }
    }
}
