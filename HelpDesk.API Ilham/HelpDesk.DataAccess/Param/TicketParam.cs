using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelpDesk.DataAccess.Param
{
    public class TicketParam
    {
        public int Id { get; set; }
        public string Problem { get; set; }
        public DateTime DueDate { get; set; }
        public string Solution { get; set; }
        public int Categories { get; set; }
        public int SubCategories { get; set; }
        public int Priorities { get; set; }
        public int Customers { get; set; }
    }
}
