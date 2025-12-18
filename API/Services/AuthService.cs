using API.Models;
using API.Repositories.Interfaces;

namespace API.Services
{
    public class AuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly TokenService _tokenService;

        public AuthService(
            IUserRepository userRepository,
            TokenService tokenService)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
        }

        public async Task<UserResponseDto?> Authenticate(LoginRequest request)
        {
            var user = await _userRepository
                .GetByUsernameAsync(request.Username);

            if (user == null)
                return null;

            if (!PasswordHasher.Verify(request.Password, user.PasswordHash))
                return null;

            return new UserResponseDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Token = _tokenService.GenerateToken(user)
            };
        }
    }
}
