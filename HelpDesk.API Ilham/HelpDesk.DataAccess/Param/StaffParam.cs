using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelpDesk.DataAccess.Param
{
    public class StaffParam
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Dob { get; set; }
        public string Pob { get; set; }
        public string Gender { get; set; }
        public int Religions { get; set; }
        public int Villages { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int Roles { get; set; }
        public string SecretQuestion { get; set; }
        public string SecretAnswer { get; set; }
        public string Picture { get; set; }

    }
}
