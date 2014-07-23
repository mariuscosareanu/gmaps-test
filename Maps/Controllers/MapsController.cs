using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Maps.Models;
using RequireJS;

namespace Maps.Controllers
{
    [RoutePrefix("Demo")]
    public class MapsController : RequireJsController
    {
        [Route]
        public ActionResult Index()
        {
            return View();
        }

        [Route("Route/{step=One}/{substep?}")]
        public ActionResult RouteTest(string substep, string step)
        {
            var viewModel = new StepsViewModel {SelectedStep = (StepEnum) Enum.Parse(typeof (StepEnum), step)};

            if (viewModel.SelectedStep == StepEnum.Five)
            {
                if (!string.IsNullOrEmpty(substep))
                {
                    viewModel.SelectedSubStep = (SubStepEnum)Enum.Parse(typeof(SubStepEnum), substep);
                }
                else
                {
                    viewModel.SelectedSubStep = SubStepEnum.First;
                }
            }

            return View(viewModel);
        }

        public override void RegisterGlobalOptions()
        {

        }
    }
}
