using HelpDesk.Core.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelpDesk.DataAccess.Model
{
    public class Ticket : BaseModel
    {
        public string Problem { get; set; }
        public DateTime DueDate { get; set; }
        public string Solution { get; set; }
        public virtual Category Categories { get; set; }
        public virtual SubCategory SubCategories { get; set; }
        public virtual Priority Priorities { get; set; }
        public virtual Customer Customers { get; set; }
    }
}
