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
                PhotoUrl = string.IsNullOrEmpty(b.photoUrl) ? null
           : (b.photoUrl.StartsWith("http") ? b.photoUrl : baseUrl + "/" + b.photoUrl.TrimStart('/')),
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


        [HttpGet("search")]

        public async Task<IActionResult> SearchParts([FromQuery] string term)
        {
            if (string.IsNullOrWhiteSpace(term))
            {
                return BadRequest("Termi i kërkimit nuk mund të jetë bosh.");
            }

            var parts = await _context.Parts
                .Where(p => p.Name.Contains(term) || p.Description.Contains(term))
                .Select(p => new
                {
                    p.PartId,
                    p.Name,
                    // Merrim foton kryesore (IsPrimary = true)
                    ImageUrl = p.PartImages.FirstOrDefault(img => img.IsPrimary).ImgUrl,
                    // Merrim çmimin më të fundit nga Stock (mund të zgjidhësh logjikën)
                    Price = p.Stocks.OrderByDescending(s => s.LastUpdated).FirstOrDefault().Price
                })
                .ToListAsync();
            return Ok(parts);
        }
    }
}
