using Microsoft.AspNetCore.Mvc;
using WaitTimeCalculationApi.Controllers;
using WaitTimeCalculationApi.Models;

namespace WaitTimeCalculationApi.Tests.Controllers
{
    public class QueueControllerTest
    {
        [Fact]
        public void Index()
        {
            var controller = new QueueController();

            var result = controller.Index();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<QueueViewModel>>(okResult.Value);
        }
    }
}