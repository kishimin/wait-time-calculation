using Microsoft.AspNetCore.Mvc;
using WaitTimeCalculationApi.Models;

namespace WaitTimeCalculationApi.Controllers
{
    public class QueueController : Controller
    {
        public ActionResult Index()
        {
            var queues = new List<Queue>();
            return Ok(queues);
        }
    }
}