using HelpDesk.DataAccess.Model;
using HelpDesk.DataAccess.Param;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelpDesk.Common.Interface
{
    public interface ICategoryRepository
    {
        bool Insert(CategoryParam categoryParam);
        bool Update(int? Id, CategoryParam categoryParam);
        bool Delete(int? Id);
        List<Category> Get();
        Category Get(int? Id);
    }
}
