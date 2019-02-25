using HelpDesk.Core.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelpDesk.DataAccess.Model
{
    public class TicketProgress : BaseModel
    {
        public DateTimeOffset ProgressDate { get; set; }
        public virtual Status Statuses { get; set; }
        public virtual Ticket Tickets { get; set; }
        public virtual Staff Staffs { get; set; }
    }
}
