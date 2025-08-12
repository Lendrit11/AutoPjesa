using AutoPjesa.Infrastructure.Persistence;
using Microsoft.AspNetCore.Identity.Data;
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
        public IActionResult Refresh([FromBody] RefreshRequest request)
        {
            var token = _context.Tokens.FirstOrDefault(t =>
                t.RefreshToken == request.RefreshToken &&
                t.RefreshTokenExpiration > DateTime.UtcNow);

            if (token == null)
                return Unauthorized("Invalid or expired refresh token");

            var user = _context.AppUsers
                .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
                .FirstOrDefault(u => u.UserId == token.UserId);

            if (user == null)
                return Unauthorized("User not found");

            _context.Tokens.Remove(token);
            _context.SaveChanges();

            var response = _tokenService.GenerateToken(user);
            return Ok(response);
        }

    }
}
