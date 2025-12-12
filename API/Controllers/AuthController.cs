using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var user = await _authService.Authenticate(request);

        if (user == null)
        {
            return BadRequest(
                ApiResponse<object>.Fail("Usuário ou senha inválidos")
            );
        }

        return Ok(
            ApiResponse<UserResponseDto>.Ok(
                user,
                "Login realizado com sucesso"
            )
        );
    }
}
