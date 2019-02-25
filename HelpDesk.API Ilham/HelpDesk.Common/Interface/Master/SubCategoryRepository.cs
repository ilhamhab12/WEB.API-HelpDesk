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
    public class SubCategoryRepository : ISubCategoryRepository
    {
        MyContext myContext = new MyContext();
        SubCategory subCategory = new SubCategory();
        bool status = false;
        public bool Delete(int? Id)
        {
            var result = 0;
            var SubCategory = Get(Id);
            SubCategory.IsDelete = true;
            SubCategory.DeleteDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }

            return status;
        }

        public List<SubCategory> Get()
        {
            return myContext.SubCategories.Where(x => x.IsDelete == false).ToList();
        }

        public SubCategory Get(int? Id)
        {
            return myContext.SubCategories.Find(Id);
        }

        public List<SubCategory> GetFk(int? Id)
        {
            return myContext.SubCategories.Where(x => x.Categories.Id == Id).ToList();
        }

        public bool Insert(SubCategoryParam subCategoryParam)
        {
            var result = 0;
            subCategory.Name = subCategoryParam.Name;
            subCategory.Categories = myContext.Categories.Find(subCategoryParam.Categories);
            subCategory.CreateDate = DateTimeOffset.UtcNow.LocalDateTime;
            myContext.SubCategories.Add(subCategory);
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }

        public bool Update(int? Id, SubCategoryParam subCategoryParam)
        {
            var result = 0;
            var SubCategory = Get(Id);
            SubCategory.Name = subCategoryParam.Name;
            SubCategory.Categories = myContext.Categories.Find(subCategoryParam.Categories);
            SubCategory.UpdateDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }
    }
}
