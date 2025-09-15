using AutoPjesa.Domain.Entities;
using AutoPjesa.Infrastructure.Persistence;
using AutoPjesaa.model.DTO.Admin.Blog;
using AutoPjesaa.model.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AutoPjesa.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly AutoPjesaDbContext _context;
      

        public BlogController(AutoPjesaDbContext context)
        {
            _context = context;
           
        }

        // GET: api/Blog
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var blogs = await _context.Blogs
                .Include(b => b.User)
                .OrderByDescending(b => b.CreatedAt)
                .Select(b => new
                {
                    b.blogId,
                    b.Title,
                    b.description,
                    b.photoUrl,
                    b.CreatedAt,
                    User = new
                    {
                        b.User.UserId,
                        b.User.FirstName,
                        b.User.LastName,
                        b.User.email
                    }
                })
                .ToListAsync();

            return Ok(blogs);
        }


        

        // POST: api/Blog
        [HttpPost]
      
        public async Task<IActionResult> Create([FromBody] BlogCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = GetUserIdFromToken();
            if (userId == null)
                return Unauthorized("Nuk jeni të identifikuar.");

            var blog = new Blog
            {
                Title = dto.Title,
                description = dto.Description,
                photoUrl = dto.PhotoUrl,
                CreatedAt = DateTime.UtcNow,
                UserId = userId.Value
            };

            _context.Blogs.Add(blog);
            await _context.SaveChangesAsync();

            var user = await _context.AppUsers.FindAsync(userId.Value);

            return Ok(new
            {
                blog.blogId,
                blog.Title,
                blog.description,
                blog.photoUrl,
                blog.CreatedAt,
                User = new
                {
                    user.UserId,
                    user.FirstName,
                    user.LastName
                }
            });
        }

        // PUT: api/Blog/5
        [HttpPut("{id}")]
       
        public async Task<IActionResult> Update(int id, [FromBody] BlogUpdateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var blog = await _context.Blogs.FindAsync(id);
            if (blog == null)
                return NotFound("Blogu nuk u gjet.");

            var userId = GetUserIdFromToken();
            if (userId == null)
                return Unauthorized("Nuk jeni të identifikuar.");

            if (blog.UserId != userId.Value)
                return Forbid("Nuk keni leje të modifikoni këtë blog.");

            blog.Title = dto.Title ?? blog.Title;
            blog.description = dto.Description ?? blog.description;
            if (!string.IsNullOrWhiteSpace(dto.PhotoUrl))
                blog.photoUrl = dto.PhotoUrl;

            _context.Blogs.Update(blog);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Blogu u përditësua me sukses." });
        }

        // DELETE: api/Blog/5
        [HttpDelete("{id}")]
       
        public async Task<IActionResult> Delete(int id)
        {
            var blog = await _context.Blogs.FindAsync(id);
            if (blog == null)
                return NotFound("Blogu nuk ekziston.");

            _context.Blogs.Remove(blog);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Blogu u fshi me sukses." });
        }
    }
}
