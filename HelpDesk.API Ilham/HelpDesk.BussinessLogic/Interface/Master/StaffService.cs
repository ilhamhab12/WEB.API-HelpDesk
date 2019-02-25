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
    public class StaffService : IStaffService
    {
        private readonly IStaffRepository _staffRepository;
        public StaffService(IStaffRepository staffRepository)
        {
            _staffRepository = staffRepository;
        }
        bool status = false;
        public bool Delete(int? Id)
        {
            var idDel = Get(Id);
            if (idDel != null)
            {
                status = _staffRepository.Delete(Id);
            }
            return status;
        }

        public List<Staff> Get()
        {
            return _staffRepository.Get().ToList();
        }

        public Staff Get(int? Id)
        {
            return _staffRepository.Get(Id);
        }

        public bool Insert(StaffParam staffParam)
        {
            if (staffParam != null)
            {
                status = _staffRepository.Insert(staffParam);
            }
            return status;
        }

        public bool Update(int? Id, StaffParam staffParam)
        {
            if (Id != null && staffParam != null)
            {
                status = _staffRepository.Update(Id, staffParam);
            }
            return status;
        }

        public List<Staff> GetFk(int? Id)
        {
            return _staffRepository.GetFk(Id).ToList();
        }
    }
}
