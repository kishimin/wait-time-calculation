using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTimeCalculationApi.Dtos.Line
{
    public class CreateLineRequestDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        public string Explanation { get; set; } = string.Empty;
    }
}