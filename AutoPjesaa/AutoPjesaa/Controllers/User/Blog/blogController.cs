using AutoPjesa.Infrastructure.Persistence;
using AutoPjesaa.model.DTO.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoPjesaa.Controllers.User.Blog
{
    [ApiController]
    [Route("api/user/Blog")]
    public class blogController:ControllerBase
    {
        public readonly AutoPjesaDbContext _context;
        public blogController(AutoPjesaDbContext context)
        {
            _context = context;
        }

        [HttpGet("paged")]
        public async Task<IActionResult> GetPagedBlogs(int pageNumber = 1, int pageSize = 5, string order = "desc")
        {
            var query = _context.Blogs.Include(b => b.User).AsQueryable();

            query = order.ToLower() == "asc"
                ? query.OrderBy(b => b.CreatedAt)
                : query.OrderByDescending(b => b.CreatedAt);

            var totalCount = await query.CountAsync();

            var blogs = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var baseUrl = $"{Request.Scheme}://{Request.Host}";

            var blogDtos = blogs.Select(b => new blogdto
            {
                BlogId = b.blogId,
                Title = b.Title,
                PhotoUrl = string.IsNullOrEmpty(b.photoUrl) ? null : baseUrl + b.photoUrl,
                Description = b.description,
                CreatedAt = b.CreatedAt,
                UserId = b.UserId,
                User = new userblogdto
                {
                    UserId = b.User.UserId,
                }
            }).ToList();

            return Ok(new { blogs = blogDtos, totalCount });
        }



    }
}
