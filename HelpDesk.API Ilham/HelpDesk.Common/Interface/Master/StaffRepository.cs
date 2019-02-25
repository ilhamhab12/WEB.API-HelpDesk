using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HelpDesk.DataAccess.Model;
using HelpDesk.DataAccess.Param;
using HelpDesk.DataAccess.Context;

namespace HelpDesk.Common.Interface.Master
{
    public class StaffRepository : IStaffRepository
    {
        MyContext myContext = new MyContext();
        Staff staff = new Staff();
        bool status = false;
        public bool Delete(int? Id)
        {
            var result = 0;
            var staff = Get(Id);
            staff.IsDelete = true;
            staff.DeleteDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }

            return status;
        }

        public List<Staff> Get()
        {
            return myContext.Staffs.Where(x => x.IsDelete == false).ToList();
        }

        public Staff Get(int? Id)
        {
            return myContext.Staffs.Find(Id);
        }

        public List<Staff> GetFk(int? Id)
        {
            return myContext.Staffs.Where(x => x.Roles.Id == Id).ToList();
        }

        public bool Insert(StaffParam staffParam)
        {
            var result = 0;
            staff.FirstName = staffParam.FirstName;
            staff.LastName = staffParam.LastName;
            staff.Dob = staffParam.Dob;
            staff.Pob = staffParam.Pob;
            staff.Gender = staffParam.Gender;
            staff.Religions = myContext.Religions.Find(staffParam.Religions);
            staff.Villages = myContext.Villages.Find(staffParam.Villages);
            staff.Address = staffParam.Address;
            staff.Phone = staffParam.Phone;
            staff.Email = staffParam.Email;
            staff.Username = staffParam.Username;
            staff.Password = staffParam.Password;
            staff.Roles = myContext.Roles.Find(staffParam.Roles);
            staff.SecretQuestion = staffParam.SecretQuestion;
            staff.SecretAnswer = staffParam.SecretAnswer;
            staff.Picture = staffParam.Picture;
            staff.CreateDate = DateTimeOffset.UtcNow.LocalDateTime;
            myContext.Staffs.Add(staff);
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }

        public bool Update(int? Id, StaffParam staffParam)
        {
            var result = 0;
            var staff = Get(Id);
            staff.FirstName = staffParam.FirstName;
            staff.LastName = staffParam.LastName;
            staff.Dob = staffParam.Dob;
            staff.Pob = staffParam.Pob;
            staff.Gender = staffParam.Gender;
            staff.Religions = myContext.Religions.Find(staffParam.Religions);
            staff.Villages = myContext.Villages.Find(staffParam.Villages);
            staff.Address = staffParam.Address;
            staff.Phone = staffParam.Phone;
            staff.Email = staffParam.Email;
            staff.Username = staffParam.Username;
            staff.Password = staffParam.Password;
            staff.Roles = myContext.Roles.Find(staffParam.Roles);
            staff.SecretQuestion = staffParam.SecretQuestion;
            staff.SecretAnswer = staffParam.SecretAnswer;
            staff.Picture = staffParam.Picture;
            staff.UpdateDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }
    }
}
