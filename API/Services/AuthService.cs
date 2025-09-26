using API.Models;

namespace API.Services
{
    public class AuthService
    {
        // Simulação - depois conecta no SQL Server via EF Core
        private readonly List<User> _users = new()
        {
            new User { Id = 1, Username = "admin_syspack", PasswordHash = "p@ssw0rd013459", Email = "admin@jj.com" }
        };

        public LoginResponse Authenticate(LoginRequest request)
        {
            var user = _users.FirstOrDefault(u => u.Username == request.Username);

            Console.WriteLine("User: " + user);

            if (user == null || user.PasswordHash != request.Password)
            {
                return new LoginResponse
                {
                    Success = false,
                    Message = "Usuário ou senha inválidos"
                };
            }

            // Aqui você vai gerar um JWT real depois
            var token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());

            return new LoginResponse
            {
                Success = true,
                Token = token,
                Message = "Login realizado com sucesso"
            };
        }
    }
}
