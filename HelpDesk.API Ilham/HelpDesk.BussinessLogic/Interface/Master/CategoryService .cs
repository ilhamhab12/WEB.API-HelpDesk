using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HelpDesk.DataAccess.Model;
using HelpDesk.DataAccess.Param;
using HelpDesk.Common.Interface;

namespace HelpDesk.BussinessLogic.Interface.Master
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }
        bool status = false;
        public bool Delete(int? Id)
        {
            var idDel = Get(Id);
            if (idDel != null)
            {
                status = _categoryRepository.Delete(Id);
            }
            return status;
        }

        public List<Category> Get()
        {
            return _categoryRepository.Get().ToList();
        }

        public Category Get(int? Id)
        {
            return _categoryRepository.Get(Id);
        }

        public bool Insert(CategoryParam categoryParam)
        {
            if (categoryParam != null)
            {
                status = _categoryRepository.Insert(categoryParam);
            }
            return status;
        }

        public bool Update(int? Id, CategoryParam categoryParam)
        {
            if (Id != null && categoryParam != null)
            {
                status = _categoryRepository.Update(Id, categoryParam);
            }
            return status;
        }
    }
}
