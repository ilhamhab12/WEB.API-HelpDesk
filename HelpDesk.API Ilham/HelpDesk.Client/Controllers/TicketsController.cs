using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HelpDesk.Client.Controllers
{
    public class TicketsController : Controller
    {
        // GET: Priorities
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult History()
        {
            return View();
        }
    }
}