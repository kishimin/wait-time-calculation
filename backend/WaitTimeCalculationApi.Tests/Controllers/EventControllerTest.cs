using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Web.Mvc;
using WaitTimeCalculationApi.Models;
using System.Reflection;

namespace WaitTimeCalculationApi.Tests.Controllers
{
    [TestClass]
    public class EventControllerTest
    {
        [TestMethod]
        public void Index()
        {
            var controller = new EventController();

            var result = (ViewResult)controller.Index();

            Assert.IsInstanceOfType(result.ViewData.Model, typeof(IEnumerable));
        }
    }
}