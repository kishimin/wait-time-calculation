using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTimeCalculationApi.Dtos.User
{
    public class RegisterDto
    {
        [Required]
        [MaxLength(50, ErrorMessage = "ユーザー名は50文字以下です")]
        public string Username { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MaxLength(100, ErrorMessage = "パスワードは100文字以下です")]
        public string Password { get; set; } = string.Empty;
    }
}