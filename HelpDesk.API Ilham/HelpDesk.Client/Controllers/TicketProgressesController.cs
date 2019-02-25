using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HelpDesk.Client.Controllers
{
    public class TicketProgressesController : Controller
    {
        // GET: Priorities
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult DetailMenuL1()
        {
            return View();
        }

        public ActionResult MenuL2L3()
        {
            return View();
        }

    }
}