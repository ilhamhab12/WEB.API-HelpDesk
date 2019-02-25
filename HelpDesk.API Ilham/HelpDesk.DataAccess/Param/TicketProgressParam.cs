using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelpDesk.DataAccess.Param
{
    public class TicketProgressParam
    {
        public int Id { get; set; }
        public DateTimeOffset ProgressDate { get; set; }
        public int Statuses { get; set; }
        public int Tickets { get; set; }
        public int Staffs { get; set; }
    }
}
