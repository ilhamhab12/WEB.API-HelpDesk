using HelpDesk.DataAccess.Model;
using HelpDesk.DataAccess.Param;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelpDesk.Common.Interface
{
    public interface ISubCategoryRepository
    {
        bool Insert(SubCategoryParam subCategoryParam);
        bool Update(int? Id, SubCategoryParam subCategoryParam);
        bool Delete(int? Id);
        List<SubCategory> Get();
        SubCategory Get(int? Id);
        List<SubCategory> GetFk(int? Id);

    }
}
