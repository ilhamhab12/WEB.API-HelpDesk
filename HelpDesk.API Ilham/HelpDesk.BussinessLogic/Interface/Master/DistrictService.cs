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
    public class DistrictService : IDistrictService
    {
        private readonly IDistrictRepository _districtRepository;
        public DistrictService(IDistrictRepository districtRepository)
        {
            _districtRepository = districtRepository;
        }
        bool status = false;
        public bool Delete(int? Id)
        {
            var idDel = Get(Id);
            if (idDel != null)
            {
                status = _districtRepository.Delete(Id);
            }
            return status;
        }

        public List<District> Get()
        {
            return _districtRepository.Get().ToList();
        }

        public District Get(int? Id)
        {
            return _districtRepository.Get(Id);
        }

        public bool Insert(DistrictParam districtParam)
        {
            if (districtParam != null)
            {
                status = _districtRepository.Insert(districtParam);
            }
            return status;
        }

        public bool Update(int? Id, DistrictParam districtParam)
        {
            if (Id != null && districtParam != null)
            {
                status = _districtRepository.Update(Id, districtParam);
            }
            return status;
        }

        public List<District> GetFk(int? Id)
        {
            return _districtRepository.GetFk(Id).ToList();
        }
    }
}
