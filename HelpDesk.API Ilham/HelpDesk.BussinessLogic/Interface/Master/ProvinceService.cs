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
    public class ProvinceService : IProvinceService
    {
        private readonly IProvinceRepository _provinceRepository;
        public ProvinceService(IProvinceRepository provinceRepository)
        {
            _provinceRepository = provinceRepository;
        }
        bool status = false;
        public bool Delete(int? Id)
        {
            var idDel = Get(Id);
            if (idDel != null)
            {
                status = _provinceRepository.Delete(Id);
            }
            return status;
        }

        public List<Province> Get()
        {
            return _provinceRepository.Get().ToList();
        }

        public Province Get(int? Id)
        {
            return _provinceRepository.Get(Id);
        }

        public bool Insert(ProvinceParam provinceParam)
        {
            if (provinceParam != null)
            {
                status = _provinceRepository.Insert(provinceParam);
            }
            return status;
        }

        public bool Update(int? Id, ProvinceParam provinceParam)
        {
            if (Id != null && provinceParam != null)
            {
                status = _provinceRepository.Update(Id, provinceParam);
            }
            return status;
        }
    }
}
