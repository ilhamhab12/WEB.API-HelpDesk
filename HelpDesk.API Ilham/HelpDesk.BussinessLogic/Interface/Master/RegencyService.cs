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
    public class RegencyService : IRegencyService
    {
        private readonly IRegencyRepository _regencyRepository;
        public RegencyService(IRegencyRepository regencyRepository)
        {
            _regencyRepository = regencyRepository;
        }
        bool status = false;
        public bool Delete(int? Id)
        {
            var idDel = Get(Id);
            if (idDel != null)
            {
                status = _regencyRepository.Delete(Id);
            }
            return status;
        }

        public List<Regency> Get()
        {
            return _regencyRepository.Get().ToList();
        }

        public Regency Get(int? Id)
        {
            return _regencyRepository.Get(Id);
        }

        public bool Insert(RegencyParam regencyParam)
        {
            if (regencyParam != null)
            {
                status = _regencyRepository.Insert(regencyParam);
            }
            return status;
        }

        public bool Update(int? Id, RegencyParam regencyParam)
        {
            if (Id != null && regencyParam != null)
            {
                status = _regencyRepository.Update(Id, regencyParam);
            }
            return status;
        }

        public List<Regency> GetFk(int? Id)
        {
            return _regencyRepository.GetFk(Id).ToList();
        }
    }
}
