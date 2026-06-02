using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTimeCalculationApi.Dtos.Line
{
    public class LineRequestDto
    {
        [Required]
        [MaxLength(100, ErrorMessage = "タイトルは100文字以下です")]
        public string Title { get; set; } = string.Empty;

        [MaxLength(400, ErrorMessage = "説明は400文字以下です")]
        public string Explanation { get; set; } = string.Empty;
    }
}