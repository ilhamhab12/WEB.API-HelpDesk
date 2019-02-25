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
    public class SubCategoryService : ISubCategoryService
    {
        private readonly ISubCategoryRepository _subCategoryRepository;
        public SubCategoryService(ISubCategoryRepository subCategoryRepository)
        {
            _subCategoryRepository = subCategoryRepository;
        }
        bool status = false;
        public bool Delete(int? Id)
        {
            var idDel = Get(Id);
            if (idDel != null)
            {
                status = _subCategoryRepository.Delete(Id);
            }
            return status;
        }

        public List<SubCategory> Get()
        {
            return _subCategoryRepository.Get().ToList();
        }

        public SubCategory Get(int? Id)
        {
            return _subCategoryRepository.Get(Id);
        }

        public bool Insert(SubCategoryParam subCategoryParam)
        {
            if (subCategoryParam != null)
            {
                status = _subCategoryRepository.Insert(subCategoryParam);
            }
            return status;
        }

        public bool Update(int? Id, SubCategoryParam subCategoryParam)
        {
            if (Id != null && subCategoryParam != null)
            {
                status = _subCategoryRepository.Update(Id, subCategoryParam);
            }
            return status;
        }

        public List<SubCategory> GetFk(int? Id)
        {
            return _subCategoryRepository.GetFk(Id).ToList();
        }
    }
}
