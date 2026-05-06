using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTimeCalculationApi.Models
{
    public class Line
    {
        public Guid Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Explanation { get; set; } = string.Empty;
    }
}