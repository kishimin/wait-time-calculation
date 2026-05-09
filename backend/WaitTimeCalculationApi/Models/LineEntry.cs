using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTimeCalculationApi.Models
{
    [Table("LineEntries")]
    public class LineEntry
    {
        public string UserId { get; set; } = string.Empty;

        public Guid LineId { get; set; }

        public DateTimeOffset EnteredAt { get; set; }

        public DateTimeOffset ExitedAt { get; set; }

        public User User { get; set; } = new User();

        public Line Line { get; set; } = new Line();
    }
}