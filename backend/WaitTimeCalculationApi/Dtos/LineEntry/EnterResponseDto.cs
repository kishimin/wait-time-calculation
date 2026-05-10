using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTimeCalculationApi.Dtos.LineEntry
{
    public class EnterResponseDto
    {
        public Guid Id { get; set; }
        public DateTimeOffset EnteredAt { get; set; } = DateTimeOffset.UtcNow;
    }
}