using HelpDesk.Core.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelpDesk.DataAccess.Model
{
    public class Quota : BaseModel
    {
        public int Total { get; set; }
        public virtual Staff Staffs { get; set; }
    }
}
