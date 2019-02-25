using HelpDesk.Core.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelpDesk.DataAccess.Model
{
    public class District : BaseModel
    {
        public string Name { get; set; }
        public virtual Regency Regencies { get; set; }
    }
}
