using System.ComponentModel.DataAnnotations;

namespace WaitTimeCalculationApi.Models
{
    public class QueueViewModel(string title, string explanation)
    {
        [Required]
        public string Title { get; set; } = title;

        public string Explanation { get; set; } = explanation;
    }
}