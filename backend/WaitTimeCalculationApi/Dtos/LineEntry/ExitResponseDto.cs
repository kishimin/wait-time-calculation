using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTimeCalculationApi.Dtos.LineEntry
{
    public class ExitResponseDto
    {
        public Guid Id { get; set; }

        public DateTimeOffset EnteredAt { get; set; } = DateTimeOffset.UtcNow;

        public DateTimeOffset ExitedAt { get; set; } = DateTimeOffset.UtcNow;
    }
}