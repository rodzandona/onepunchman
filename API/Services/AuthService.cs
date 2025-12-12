using api.Data;
using API.Models;
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

        public async Task<UserResponseDto?> Authenticate(LoginRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null)
                return null;

            if (!PasswordHasher.Verify(request.Password, user.PasswordHash))
                return null;

            return new UserResponseDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Token = _tokenService.GenerateToken(user.Username)
            };
        }
    }
}
