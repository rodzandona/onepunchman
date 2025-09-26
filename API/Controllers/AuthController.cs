using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Services;

namespace API.Controllers
{
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
        public ActionResult<LoginResponse> Login([FromBody] LoginRequest request)
        {
            var response = _authService.Authenticate(request);

            if (!response.Success)
                return Unauthorized(response);

            return Ok(response);
        }
    }
}
