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
    public class QuotaService : IQuotaService
    {
        private readonly IQuotaRepository _quotaRepository;
        public QuotaService(IQuotaRepository quotaRepository)
        {
            _quotaRepository = quotaRepository;
        }
        bool status = false;
        public bool Delete(int? Id)
        {
            var idDel = Get(Id);
            if (idDel != null)
            {
                status = _quotaRepository.Delete(Id);
            }
            return status;
        }

        public List<Quota> Get()
        {
            return _quotaRepository.Get().ToList();
        }

        public Quota Get(int? Id)
        {
            return _quotaRepository.Get(Id);
        }

        public bool Insert(QuotaParam quotaParam)
        {
            if (quotaParam != null)
            {
                status = _quotaRepository.Insert(quotaParam);
            }
            return status;
        }

        public bool Update(int? Id, QuotaParam quotaParam)
        {
            if (Id != null && quotaParam != null)
            {
                status = _quotaRepository.Update(Id, quotaParam);
            }
            return status;
        }

        public List<Quota> GetFk(int? Id)
        {
            return _quotaRepository.GetFk(Id).ToList();
        }
    }
}
