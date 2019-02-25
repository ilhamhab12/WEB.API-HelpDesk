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
    public class DistrictRepository : IDistrictRepository
    {
        MyContext myContext = new MyContext();
        District district = new District();
        bool status = false;
        public bool Delete(int? Id)
        {
            var result = 0;
            var District = Get(Id);
            District.IsDelete = true;
            District.DeleteDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }

            return status;
        }

        public List<District> Get()
        {
            return myContext.Districts.Where(x => x.IsDelete == false).ToList();
        }

        public District Get(int? Id)
        {
            return myContext.Districts.Find(Id);
        }

        public bool Insert(DistrictParam districtParam)
        {
            var result = 0;
            district.Name = districtParam.Name;
            district.Regencies = myContext.Regencies.Find(districtParam.Regencies);
            district.CreateDate = DateTimeOffset.UtcNow.LocalDateTime;
            myContext.Districts.Add(district);
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }

        public bool Update(int? Id, DistrictParam districtParam)
        {
            var result = 0;
            var District = Get(Id);
            District.Name = districtParam.Name;
            District.Regencies = myContext.Regencies.Find(districtParam.Regencies);
            District.UpdateDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }

        public List<District> GetFk(int? Id)
        {
            return myContext.Districts.Where(x => x.Regencies.Id == Id).ToList();
        }
    }
}
