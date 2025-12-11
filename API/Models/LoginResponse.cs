namespace API.Models
{
    public class LoginResponse
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public UserResponseDto? Data { get; set; }

    }

}
