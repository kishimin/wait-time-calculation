using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaitTimeCalculationApi.Dtos.Line;
using Xunit;

namespace WaitTimeCalculationApi.Tests.Dtos.Line
{
    public class CreateLineRequestDtoTest
    {
        [Fact]
        public void 初期値が仕様通りである()
        {
            var line = new CreateLineRequestDto();

            Assert.Equal("", line.Title);
            Assert.Equal("", line.Explanation);
        }
    }
}