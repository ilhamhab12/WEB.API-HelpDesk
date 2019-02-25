using HelpDesk.BussinessLogic.Interface;
using HelpDesk.BussinessLogic.Interface.Master;
using HelpDesk.Common.Interface;
using HelpDesk.Common.Interface.Master;
using System.Web.Http;
using Unity;
using Unity.WebApi;

namespace HelpDesk.API
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();
            //this is service area
            container.RegisterType<IProvinceService, ProvinceService>();
            container.RegisterType<IRegencyService, RegencyService>();
            container.RegisterType<IDistrictService, DistrictService>();
            container.RegisterType<IVillageService, VillageService>();
            container.RegisterType<IPriorityService, PriorityService>();
            container.RegisterType<IRoleService, RoleService>();
            container.RegisterType<IReligionService, ReligionService>();
            container.RegisterType<ICategoryService, CategoryService>();
            container.RegisterType<ICustomerService, CustomerService>();
            container.RegisterType<ITicketService, TicketService>();
            container.RegisterType<ITicketProgressService, TicketProgressService>();
            container.RegisterType<IStatusService, StatusService>();
            container.RegisterType<IStaffService, StaffService>();
            container.RegisterType<IQuotaService, QuotaService>();
            container.RegisterType<ISubCategoryService, SubCategoryService>();

            //this is repository area
            container.RegisterType<IProvinceRepository, ProvinceRepository>();
            container.RegisterType<IRegencyRepository, RegencyRepository>();
            container.RegisterType<IDistrictRepository, DistrictRepository>();
            container.RegisterType<IVillageRepository, VillageRepository>();
            container.RegisterType<IPriorityRepository, PriorityRepository>();
            container.RegisterType<IRoleRepository, RoleRepository>();
            container.RegisterType<IReligionRepository, ReligionRepository>();
            container.RegisterType<ICategoryRepository, CategoryRepository>();
            container.RegisterType<ICustomerRepository, CustomerRepository>();
            container.RegisterType<ITicketRepository, TicketRepository>();
            container.RegisterType<ITicketProgressRepository, TicketProgressRepository>();
            container.RegisterType<IStatusRepository, StatusRepository>();
            container.RegisterType<IStaffRepository, StaffRepository>();
            container.RegisterType<IQuotaRepository, QuotaRepository>();
            container.RegisterType<ISubCategoryRepository, SubCategoryRepository>();

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}