using HelpDesk.DataAccess.Model;
using HelpDesk.DataAccess.Param;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelpDesk.Common.Interface
{
    public interface IReligionRepository
    {
        bool Insert(ReligionParam religionParam);
        bool Update(int? Id, ReligionParam religionParam);
        bool Delete(int? Id);
        List<Religion> Get();
        Religion Get(int? Id);
    }
}
