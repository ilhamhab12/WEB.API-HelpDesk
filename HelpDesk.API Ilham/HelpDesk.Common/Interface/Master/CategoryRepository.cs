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
    public class CategoryRepository : ICategoryRepository
    {
        MyContext myContext = new MyContext();
        Category category = new Category();
        bool status = false;
        public bool Delete(int? Id)
        {
            var result = 0;
            var category = Get(Id);
            category.IsDelete = true;
            category.DeleteDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }

            return status;
        }

        public List<Category> Get()
        {
            return myContext.Categories.Where(x => x.IsDelete == false).ToList();
        }

        public Category Get(int? Id)
        {
            return myContext.Categories.Find(Id);
        }

        public bool Insert(CategoryParam categoryParam)
        {
            var result = 0;
            category.Name = categoryParam.Name;
            category.CreateDate = DateTimeOffset.UtcNow.LocalDateTime;
            myContext.Categories.Add(category);
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }

        public bool Update(int? Id, CategoryParam categoryParam)
        {
            var result = 0;
            var category = Get(Id);
            category.Name = categoryParam.Name;
            category.UpdateDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }
    }
}
