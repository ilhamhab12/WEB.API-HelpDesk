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
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;
        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }
        bool status = false;
        public bool Delete(int? Id)
        {
            var idDel = Get(Id);
            if (idDel != null)
            {
                status = _roleRepository.Delete(Id);
            }
            return status;
        }

        public List<Role> Get()
        {
            return _roleRepository.Get().ToList();
        }

        public Role Get(int? Id)
        {
            return _roleRepository.Get(Id);
        }

        public bool Insert(RoleParam roleParam)
        {
            if (roleParam != null)
            {
                status = _roleRepository.Insert(roleParam);
            }
            return status;
        }

        public bool Update(int? Id, RoleParam roleParam)
        {
            if (Id != null && roleParam != null)
            {
                status = _roleRepository.Update(Id, roleParam);
            }
            return status;
        }
    }
}
