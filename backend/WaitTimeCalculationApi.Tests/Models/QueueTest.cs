using Microsoft.AspNetCore.Mvc;
using WaitTimeCalculationApi.Models;

namespace WaitTimeCalculationApi.Tests.Models
{
    public class QueueViewModelTest
    {
        [Fact]
        public void 行列が保持する形が正しい()
        {
            var queueViewModel = new QueueViewModel("行列1", "");

            Assert.Equal("行列1", queueViewModel.Title);
            Assert.Equal("", queueViewModel.Explanation);
        }
    }
}