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
    public class StatusService : IStatusService
    {
        private readonly IStatusRepository _statusRepository;
        public StatusService(IStatusRepository statusRepository)
        {
            _statusRepository = statusRepository;
        }
        bool status = false;
        public bool Delete(int? Id)
        {
            var idDel = Get(Id);
            if (idDel != null)
            {
                status = _statusRepository.Delete(Id);
            }
            return status;
        }

        public List<Status> Get()
        {
            return _statusRepository.Get().ToList();
        }

        public Status Get(int? Id)
        {
            return _statusRepository.Get(Id);
        }

        public bool Insert(StatusParam statusParam)
        {
            if (statusParam != null)
            {
                status = _statusRepository.Insert(statusParam);
            }
            return status;
        }

        public bool Update(int? Id, StatusParam statusParam)
        {
            if (Id != null && statusParam != null)
            {
                status = _statusRepository.Update(Id, statusParam);
            }
            return status;
        }
    }
}
