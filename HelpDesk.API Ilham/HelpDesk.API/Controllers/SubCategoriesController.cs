using HelpDesk.BussinessLogic.Interface;
using HelpDesk.BussinessLogic.Interface.Master;
using HelpDesk.DataAccess.Model;
using HelpDesk.DataAccess.Param;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace HelpDesk.API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SubCategoriesController : ApiController
    {
        private readonly ISubCategoryService _subCategoryService;
        public SubCategoriesController(SubCategoryService subCategoryService)
        {
            _subCategoryService = subCategoryService;
        }
        // GET: api/SubCategories
        public IEnumerable<SubCategory> Get()
        {
            return _subCategoryService.Get();
        }

        // GET: api/SubCategories/5
        public SubCategory Get(int id)
        {
            return _subCategoryService.Get(id);
        }

        // POST: api/SubCategories
        public void Post(SubCategoryParam subCategoryParam)
        {
            _subCategoryService.Insert(subCategoryParam);
        }

        // PUT: api/SubCategories/5
        public void Put(int id, SubCategoryParam subCategoryParam)
        {
            _subCategoryService.Update(id, subCategoryParam);
        }

        // DELETE: api/SubCategories/5
        public void Delete(int id)
        {
            _subCategoryService.Delete(id);
        }

        // GET: api/Category/GetFk/5
        public IEnumerable<SubCategory> GetFk(int id)
        {
            return _subCategoryService.GetFk(id);
        }
    }
}
