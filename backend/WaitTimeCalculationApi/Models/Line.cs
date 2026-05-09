using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTimeCalculationApi.Models
{
    [Table("Lines")]
    public class Line
    {
        public Guid Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(400)]
        public string Explanation { get; set; } = string.Empty;

        public DateTimeOffset CreatedAt { get; set; }

        public DateTimeOffset UpdatedAt { get; set; }

        public List<LineEntry> LineEntries { get; set; } = [];
    }
}