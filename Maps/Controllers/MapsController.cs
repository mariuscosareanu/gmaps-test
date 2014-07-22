using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RequireJS;

namespace Maps.Controllers
{
    public class MapsController : RequireJsController
    {
        //
        // GET: /Maps/

        public ActionResult Index()
        {
            return View();
        }

        public override void RegisterGlobalOptions()
        {
            
        }
    }
}
