
using AutoPjesa.Domain.Entities;
using AutoPjesa.Infrastructure.Persistence;
using AutoPjesaa.Infrastructure.authentication;
using AutoPjesaa.model.DTO.User.Login;
using AutoPjesaa.model.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
namespace AutoPjesaa.Controllers.User.Login
{
    [ApiController]
    [Route("api/user/login")]
    public class LoginCon: ControllerBase
    {
        private readonly TokenService _tokenService;
        private readonly AutoPjesaDbContext _context;
        public LoginCon(AutoPjesaDbContext context, TokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }
        private int? GetUserIdFromToken()
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier || c.Type == "UserID");
            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
                return userId;
            return null;
        }
        [HttpGet("me")]
        public IActionResult GetCurrentUser()
        {
            var userId = GetUserIdFromToken();
            if (userId == null)
                return Unauthorized();

            var user = _context.AppUsers.FirstOrDefault(u => u.UserId == userId);
            if (user == null)
                return NotFound();

            return Ok(new
            {
                user.UserId,
                user.FirstName
            });
        }
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            var token = Request.Cookies["user_token"]; // Përdor emrin që përdor ti në cookie

            // Backup: Lexo edhe nga header nëse s’ka në cookie
            if (string.IsNullOrEmpty(token))
            {
                var authHeader = Request.Headers["Authorization"].FirstOrDefault();
                if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer "))
                {
                    token = authHeader.Substring("Bearer ".Length).Trim();
                }
            }

            Console.WriteLine("Access Token për logout: " + token);

            if (!string.IsNullOrEmpty(token))
            {
                // Merr të gjithë token-at nga DB për krahasim manual
                var allTokens = _context.Tokens.ToList();

                foreach (var t in allTokens)
                {
                    Console.WriteLine("Token ne DB: '" + t.AccessToken + "'");
                    Console.WriteLine("== token nga request? " + (t.AccessToken == token));
                }

                var userToken = allTokens.FirstOrDefault(t => t.AccessToken == token);

                if (userToken != null)
                {
                    _context.Tokens.Remove(userToken);
                    _context.SaveChanges();
                    Console.WriteLine("Token u fshi nga databaza.");
                }
                else
                {
                    Console.WriteLine("Token nuk u gjet në databazë.");
                }
            }
            else
            {
                Console.WriteLine("Nuk u gjet token në request për logout.");
            }

            // Fshi cookie-t duke u siguruar që skadojnë menjëherë
            Response.Cookies.Append("accessToken", "", new CookieOptions
            {
                HttpOnly = true,
                Secure = false, // vendos true nëse përdor HTTPS në prodhim
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddDays(-1) // datë në të kaluar për fshirje
            });

            Response.Cookies.Append("refreshToken", "", new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddDays(-1)
            });
            Response.Cookies.Delete("user_token");

            return Ok(new { message = "Logged out successfully" });
        }


    }
}
