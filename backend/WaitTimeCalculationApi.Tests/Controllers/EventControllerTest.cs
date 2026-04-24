using Microsoft.AspNetCore.Mvc;
using WaitTimeCalculationApi.Controllers;
using WaitTimeCalculationApi.Models;

namespace WaitTimeCalculationApi.Tests.Controllers
{
    public class EventControllerTest
    {
        [Fact]
        public void Index()
        {
            var controller = new EventController();

            var result = controller.Index();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<Event>>(okResult.Value);
        }
    }
}