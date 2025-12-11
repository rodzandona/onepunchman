using api.Data;
using API.Models;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class AuthService
    {
        private readonly DataBaseContext _context;
        private readonly TokenService _tokenService;

        public AuthService(DataBaseContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        public async Task<LoginResponse> Authenticate(LoginRequest request)
        {
            //Console.WriteLine(PasswordHasher.Hash("123456"));

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null)
            {
                return new LoginResponse
                {
                    Success = false,
                    Message = "Usuário ou senha inválidos",
                    Data = null
                };
            }

            // Verificar Hash
            if (!PasswordHasher.Verify(request.Password, user.PasswordHash))
            {
                return new LoginResponse
                {
                    Success = false,
                    Message = "Usuário ou senha inválidos",
                    Data = null
                };
            }

            // Gerar JWT real
            var token = _tokenService.GenerateToken(user.Username);

            var userResponse = new UserResponseDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Token = token
            };

            return new LoginResponse
            {
                Success = true,
                Message = "Login realizado com sucesso",
                Data = userResponse
            };
        }
    }
}
