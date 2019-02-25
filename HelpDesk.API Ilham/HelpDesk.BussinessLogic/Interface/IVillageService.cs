using HelpDesk.DataAccess.Model;
using HelpDesk.DataAccess.Param;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelpDesk.BussinessLogic.Interface
{
    public interface IVillageService
    {
        bool Insert(VillageParam villageParam);
        bool Update(int? Id, VillageParam villageParam);
        bool Delete(int? Id);
        List<Village> Get();
        Village Get(int? Id);
        List<Village> GetFk(int? Id);
    }
}
