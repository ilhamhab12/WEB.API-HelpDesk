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
    public class ReligionService : IReligionService
    {
        private readonly IReligionRepository _religionRepository;
        public ReligionService(IReligionRepository religionRepository)
        {
            _religionRepository = religionRepository;
        }
        bool status = false;
        public bool Delete(int? Id)
        {
            var idDel = Get(Id);
            if (idDel != null)
            {
                status = _religionRepository.Delete(Id);
            }
            return status;
        }

        public List<Religion> Get()
        {
            return _religionRepository.Get().ToList();
        }

        public Religion Get(int? Id)
        {
            return _religionRepository.Get(Id);
        }

        public bool Insert(ReligionParam religionParam)
        {
            if (religionParam != null)
            {
                status = _religionRepository.Insert(religionParam);
            }
            return status;
        }

        public bool Update(int? Id, ReligionParam religionParam)
        {
            if (Id != null && religionParam != null)
            {
                status = _religionRepository.Update(Id, religionParam);
            }
            return status;
        }
    }
}
