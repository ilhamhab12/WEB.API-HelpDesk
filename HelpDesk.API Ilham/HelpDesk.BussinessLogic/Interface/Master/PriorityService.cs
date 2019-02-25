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
    public class PriorityService : IPriorityService
    {
        private readonly IPriorityRepository _priorityRepository;
        public PriorityService(IPriorityRepository priorityRepository)
        {
            _priorityRepository = priorityRepository;
        }
        bool status = false;
        public bool Delete(int? Id)
        {
            var idDel = Get(Id);
            if (idDel != null)
            {
                status = _priorityRepository.Delete(Id);
            }
            return status;
        }

        public List<Priority> Get()
        {
            return _priorityRepository.Get().ToList();
        }

        public Priority Get(int? Id)
        {
            return _priorityRepository.Get(Id);
        }

        public bool Insert(PriorityParam priorityParam)
        {
            if (priorityParam != null)
            {
                status = _priorityRepository.Insert(priorityParam);
            }
            return status;
        }

        public bool Update(int? Id, PriorityParam priorityParam)
        {
            if (Id != null && priorityParam != null)
            {
                status = _priorityRepository.Update(Id, priorityParam);
            }
            return status;
        }

        public List<Priority> GetFk(int? Id)
        {
            return _priorityRepository.GetFk(Id).ToList();
        }
    }
}
