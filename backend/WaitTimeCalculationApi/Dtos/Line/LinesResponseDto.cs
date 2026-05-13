using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTimeCalculationApi.Dtos.Line
{
    public class LinesResponseDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; } = string.Empty;

        // Lineの平均待ち時間
        public double? AverageWaitTime { get; set; }

        // userが入場しているか
        public bool IsEntry { get; set; } = false;
    }
}