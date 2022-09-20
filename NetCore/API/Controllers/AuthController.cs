using Business.Abstract;
using Entities.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public IActionResult Register(AuthDto authDto)
        {
            _authService.Register(authDto);
            var result = _authService.CreateAccessToken();

            return Ok(result);
        }

        [HttpPost("login")]
        public IActionResult Login(AuthDto authDto)
        {
            _authService.Login(authDto);
            var result = _authService.CreateAccessToken();
            return Ok(result);
        }
    }
}
