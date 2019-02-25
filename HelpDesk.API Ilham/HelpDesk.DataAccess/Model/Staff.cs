using HelpDesk.Core.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelpDesk.DataAccess.Model
{
    public class Staff : BaseModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Dob { get; set; }
        public string Pob { get; set; }
        public string Gender { get; set; }
        public virtual Religion Religions { get; set; }
        public virtual Village Villages { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public virtual Role Roles { get; set; }
        public string SecretQuestion { get; set; }
        public string SecretAnswer { get; set; }
        public string Picture { get; set; }
    }
}
