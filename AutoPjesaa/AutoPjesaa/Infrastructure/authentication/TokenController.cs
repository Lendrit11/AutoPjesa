using AutoPjesa.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoPjesaa.Infrastructure.authentication
{
    [ApiController]
    [Route("api/Tokenservices")]
    public class TokenController:ControllerBase
    {
        private readonly AutoPjesaDbContext _context;
        private readonly TokenService _tokenService;
        public TokenController(AutoPjesaDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }
        [HttpPost("refresh")]
        public IActionResult Refresh()
        {
            if (!Request.Cookies.TryGetValue("refreshToken", out var refreshToken))
            {
                return Unauthorized("Refresh token is missing.");
            }

            var newTokens = _tokenService.RefreshAccessToken(refreshToken);

            if (newTokens == null)
            {
                return Unauthorized("Refresh token is invalid or expired.");
            }

            // Përditëso cookie me refresh token të ri (opsionale)
            Response.Cookies.Append("refreshToken", newTokens.RefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = newTokens.RefreshTokenExpiration
            });

            return Ok(new
            {
                token = newTokens.Token,
                expiration = newTokens.Expiration
            });
        }




    }
}
