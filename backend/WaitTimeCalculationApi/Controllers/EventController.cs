using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.ComponentModel.Design;
using WaitTimeCalculationApi.Models;

namespace WaitTimeCalculationApi.Controllers
{
    public class EventController : Controller
    {
        public ActionResult Index()
        {
            var events = new List<Event>();
            return Ok(events);
        }
    }
}