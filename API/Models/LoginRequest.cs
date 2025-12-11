using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class LoginRequest
    {
        [Required(ErrorMessage = "O campo Username é obrigatório.")]
        public string Username { get; set; } = null!;

        [Required(ErrorMessage = "O campo Password é obrigatório.")]
        public string Password { get; set; } = null!;
    }
}
