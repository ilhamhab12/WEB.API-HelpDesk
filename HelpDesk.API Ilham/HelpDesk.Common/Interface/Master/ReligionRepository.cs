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
    public class ReligionRepository : IReligionRepository
    {
        MyContext myContext = new MyContext();
        Religion religion = new Religion();
        bool status = false;
        public bool Delete(int? Id)
        {
            var result = 0;
            var Religion = Get(Id);
            Religion.IsDelete = true;
            Religion.DeleteDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }

            return status;
        }

        public List<Religion> Get()
        {
            return myContext.Religions.Where(x => x.IsDelete == false).ToList();
        }

        public Religion Get(int? Id)
        {
            return myContext.Religions.Find(Id);
        }

        public bool Insert(ReligionParam religionParam)
        {
            var result = 0;
            religion.Name = religionParam.Name;
            religion.CreateDate = DateTimeOffset.UtcNow.LocalDateTime;
            myContext.Religions.Add(religion);
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }

        public bool Update(int? Id, ReligionParam religionParam)
        {
            var result = 0;
            var Religion = Get(Id);
            Religion.Name = religionParam.Name;
            Religion.UpdateDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }
    }
}
