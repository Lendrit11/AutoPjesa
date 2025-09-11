// Path: AutoPjesaa\Controllers\admin\login\AuthController.cs

using AutoPjesa.Domain.Entities;
using AutoPjesa.Infrastructure.Persistence;
using AutoPjesaa.Infrastructure.authentication;
using AutoPjesaa.model.DTO.Admin.login;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoPjesaa.Controllers.admin.login
{
    [ApiController]
    [Route("admin/login/[controller]")]
    public class AuthController : Controller
    {
        private readonly AutoPjesaDbContext _context;
        private readonly TokenService _tokenService;
        public AuthController(AutoPjesaDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        // POST: admin/login/auth
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] AdminLoginDto loginDto)
        {
            if (string.IsNullOrEmpty(loginDto.Email) || string.IsNullOrEmpty(loginDto.Password))
                return BadRequest("Email and password are required.");

            var user = await _context.AppUsers
                .Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                .FirstOrDefaultAsync(u => u.email == loginDto.Email);

            if (user == null)
                return Unauthorized("Invalid credentials.");

            if (user.Status != "active")
                return BadRequest("This user is blocked");

            // Kontrolloj passwordin me BCrypt, nëse përdor atë në API-në e dytë
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(loginDto.Password, user.password);
            if (!isPasswordValid)
                return Unauthorized("Invalid credentials.");

            var isAdmin = user.UserRoles.Any(ur => ur.Role.Name == "Admin");
            if (!isAdmin)
                return Forbid("Access denied. Only admins can login.");

            // Krijoj token-in me TokenService (si tek API i dyte)
            var authResponse = _tokenService.GenerateToken(user);

            // Vendos refresh token cookie me opsionet e sigurise
            Response.Cookies.Append("refreshToken", authResponse.RefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = authResponse.RefreshTokenExpiration
            });

            return Ok(new
            {
                UserId = user.UserId,
                FullName = $"{user.FirstName} {user.LastName}",
                Email = user.email,
                Phone = user.PhoneNumber,
                Status = user.Status,
                Token = authResponse.Token,
                TokenExpiration = authResponse.Expiration
            });
        }

        // GET: admin/login/auth
        [HttpGet]
        public IActionResult Index()
        {
            return View(); // Optional – nëse nuk e përdor Razor View, mund ta heqësh
        }
    }
}
