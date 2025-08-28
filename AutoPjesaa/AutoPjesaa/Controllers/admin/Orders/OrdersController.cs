using Microsoft.AspNetCore.Mvc;

namespace AutoPjesaa.Controllers.admin.Orders
{
    public class OrdersController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
