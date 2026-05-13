using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTimeCalculationApi.Projections
{
    public class CurrentEntryInfo
    {
        public Guid LineId { get; set; }

        public DateTimeOffset? ExitedAt { get; set; }
    }
}