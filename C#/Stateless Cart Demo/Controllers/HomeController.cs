using System.Web.Mvc;

namespace Checkout.WebAPI.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult Items()
        {
            ViewBag.Title = "Items";

            return View();
        }

        public ActionResult Shipping()
        {
            ViewBag.Title = "Shipping";

            return View();
        }

        public ActionResult Billing()
        {
            ViewBag.Title = "Billing";

            return View();
        }

        public ActionResult PersonalInformation()
        {
            ViewBag.Title = "Personal Information";

            return View();
        }
    }
}
