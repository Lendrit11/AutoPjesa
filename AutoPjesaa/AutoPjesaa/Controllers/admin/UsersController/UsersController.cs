using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoPjesaa.model.DTO.Admin.Users;
using AutoPjesa.Domain.Entities;
using AutoPjesa.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoPjesa.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")] // Kërkon JWT token dhe Roli të jetë Admin
    public class UsersController : ControllerBase
    {
        private readonly AutoPjesaDbContext _context;

        public UsersController(AutoPjesaDbContext context)
        {
            _context = context;
        }

        // GET: api/users
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.AppUsers
                .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
                .Select(u => new
                {
                    id = u.UserId,
                    name = u.FirstName + " " + u.LastName,
                    email = u.email,
                    role = u.UserRoles.Any() ? u.UserRoles.First().Role.Name : "staff",
                    status = string.IsNullOrEmpty(u.Status) ? "active" : u.Status
                })
                .ToListAsync();

            return Ok(users);
        }

        // PUT: api/users/{id}/role
        [HttpPut("{id}/role")]
        public async Task<IActionResult> UpdateUserRole(int id, [FromBody] UpdateUserRoleDto dto)
        {
            var user = await _context.AppUsers
                .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
                .FirstOrDefaultAsync(u => u.UserId == id);

            if (user == null) return NotFound("User not found");

            var role = await _context.Roles.FirstOrDefaultAsync(r => r.Name == dto.Role);
            if (role == null)
            {
                return BadRequest($"Roli '{dto.Role}' nuk ekziston.");
            }

            var userRole = user.UserRoles.FirstOrDefault();
            if (userRole != null)
            {
                _context.UserRoles.Remove(userRole);
            }

            user.UserRoles.Add(new UserRole { User = user, Role = role });
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/users/{id}/status
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateUserStatus(int id, [FromBody] UpdateUserStatusDto dto)
        {
            var user = await _context.AppUsers.FindAsync(id);
            if (user == null) return NotFound("User not found");

            user.Status = dto.Status.ToLower() == "blocked" ? "blocked" : "active";
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.AppUsers
                .Include(u => u.UserRoles)
                .FirstOrDefaultAsync(u => u.UserId == id);

            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            if (user.UserRoles.Any())
            {
                _context.UserRoles.RemoveRange(user.UserRoles);
            }

            _context.AppUsers.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User deleted successfully" });
        }

        // PUT: api/users/profile
        [HttpPut("profile")]
        public async Task<IActionResult> UpdateAdminProfile([FromBody] UpdateAdminProfileDto dto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized("Invalid token: UserId not found.");
            }

            var user = await _context.AppUsers.FindAsync(userId);
            if (user == null) return NotFound("Admin not found");
            
            var names = dto.Name.Split(' ', 2);
            user.FirstName = names[0];
            user.LastName = names.Length > 1 ? names[1] : "";
            user.email = dto.Email;


            if (!string.IsNullOrWhiteSpace(dto.Password))
            {
                user.password = BCrypt.Net.BCrypt.HashPassword(dto.Password); // Hash password
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }
        // GET: api/users/profile
        [HttpGet("profile")]
        public async Task<IActionResult> GetAdminProfile()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized("Invalid token: UserId not found.");
            }

            var user = await _context.AppUsers.FindAsync(userId);
            if (user == null) return NotFound("Admin not found");

            var profileDto = new
            {
                name = user.FirstName + " " + user.LastName,
                email = user.email
            };

            return Ok(profileDto);
        }

    }
}

