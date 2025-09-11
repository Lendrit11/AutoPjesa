// Path: AutoPjesaa\Controllers\admin\login\AuthController.cs

using AutoPjesa.Domain.Entities;
using AutoPjesa.Infrastructure.Persistence;
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

        public AuthController(AutoPjesaDbContext context)
        {
            _context = context;
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
            if(user.Status == "blocked")
            {
                return BadRequest("This user its blocked");
            }
            if (user == null || user.password != loginDto.Password)
                return Unauthorized("Invalid credentials.");

            var isAdmin = user.UserRoles.Any(ur => ur.Role.Name == "Admin");

            if (!isAdmin)
                return Forbid("Access denied. Only admins can login.");

            return Ok(new
            {
                UserId = user.UserId,
                FullName = $"{user.FirstName} {user.LastName}",
                Email = user.email,
                Phone = user.PhoneNumber,
                Status = user.Status
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
