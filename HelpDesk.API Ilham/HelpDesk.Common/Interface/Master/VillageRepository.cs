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
    public class VillageRepository : IVillageRepository
    {
        MyContext myContext = new MyContext();
        Village village = new Village();
        bool status = false;
        public bool Delete(int? Id)
        {
            var result = 0;
            var Village = Get(Id);
            Village.IsDelete = true;
            Village.DeleteDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }

            return status;
        }

        public List<Village> Get()
        {
            return myContext.Villages.Where(x => x.IsDelete == false).ToList();
        }

        public Village Get(int? Id)
        {
            return myContext.Villages.Find(Id);
        }

        public bool Insert(VillageParam villageParam)
        {
            var result = 0;
            village.Name = villageParam.Name;
            village.Districts = myContext.Districts.Find(villageParam.Districts);
            village.CreateDate = DateTimeOffset.UtcNow.LocalDateTime;
            myContext.Villages.Add(village);
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }

        public bool Update(int? Id, VillageParam villageParam)
        {
            var result = 0;
            var Village = Get(Id);
            Village.Name = villageParam.Name;
            Village.Districts = myContext.Districts.Find(villageParam.Districts);
            Village.UpdateDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }

        public List<Village> GetFk(int? Id)
        {
            return myContext.Villages.Where(x => x.Districts.Id == Id).ToList();
        }
    }
}
