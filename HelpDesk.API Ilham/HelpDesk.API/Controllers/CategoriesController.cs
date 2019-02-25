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
    public class CategoriesController : ApiController
    {
        private readonly ICategoryService _categoryService;
        public CategoriesController(CategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        // GET: api/Priorities
        public IEnumerable<Category> Get()
        {
            return _categoryService.Get();
        }

        // GET: api/Priorities/5
        public Category Get(int id)
        {
            return _categoryService.Get(id);
        }

        // POST: api/Priorities
        public void Post(CategoryParam CategoryParam)
        {
            _categoryService.Insert(CategoryParam);
        }

        // PUT: api/Priorities/5
        public void Put(int id, CategoryParam CategoryParam)
        {
            _categoryService.Update(id, CategoryParam);
        }

        // DELETE: api/Priorities/5
        public void Delete(int id)
        {
            _categoryService.Delete(id);
        }
    }
}
