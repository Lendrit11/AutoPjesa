using System.Linq;
using System.Threading.Tasks;
using AutoPjesaa.model.DTO.Admin.Users;
using AutoPjesa.Domain.Entities;
using AutoPjesa.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoPjesa.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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

            // Merr role ekzistuese
            var role = await _context.Roles.FirstOrDefaultAsync(r => r.Name == dto.Role);
            if (role == null)
            {
                return BadRequest($"Roli '{dto.Role}' nuk ekziston.");
            }

            var userRole = user.UserRoles.FirstOrDefault();
            if (userRole != null)
            {
                // Fshij role-in ekzistues për të shmangur gabimin me primary key
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

            // Vendos Status sipas DTO: "blocked" ose "active"
            user.Status = dto.Status.ToLower() == "blocked" ? "blocked" : "active";

            await _context.SaveChangesAsync();
            return NoContent();
        }

       


        
        
    }
}
