using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTimeCalculationApi.Results
{
    public class LinesResult
    {
        public Guid Id { get; set; }

        public string Title { get; set; } = string.Empty;

        // Lineの平均待ち時間
        public double? AverageWaitTime { get; set; }

        // userが入場しているか
        public bool IsEntry { get; set; } = false;
    }
}