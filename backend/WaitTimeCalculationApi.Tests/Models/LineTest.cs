using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaitTimeCalculationApi.Models;
using Xunit;

namespace WaitTimeCalculationApi.Tests.Models
{
    public class LineTest
    {
        [Fact]
        public void 初期値が仕様通りである()
        {
            var line = new Line();

            Assert.Equal("", line.Title);
            Assert.Equal("", line.Explanation);
        }
    }
}