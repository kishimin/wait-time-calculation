using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaitTimeCalculationApi.Models;
using Xunit;

namespace WaitTimeCalculationApi.Tests.Models
{
    public class QueueTest
    {
        [Fact]
        public void 初期値が仕様通りである()
        {
            var queue = new Queue();

            Assert.Equal("", queue.Title);
            Assert.Equal("", queue.Explanation);
        }
    }
}