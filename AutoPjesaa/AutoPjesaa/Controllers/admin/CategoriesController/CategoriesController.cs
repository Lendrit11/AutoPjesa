using AutoPjesa.Domain.Entities;
using AutoPjesa.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoPjesaa.Controllers.Admin.CategoryCon
{
    [ApiController]
    [Route("api/admin/categories")]
    public class CategoriesController : ControllerBase
    {
        private readonly AutoPjesaDbContext _context;

        public CategoriesController(AutoPjesaDbContext context)
        {
            _context = context;
        }

        // =================== GET ALL ===================
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            var categories = await _context.Categories.AsNoTracking().ToListAsync();
            return Ok(categories);
        }

        // =================== GET BY ID ===================
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _context.Categories
                                         .AsNoTracking()
                                         .FirstOrDefaultAsync(c => c.CategoryId == id);

            if (category == null)
                return NotFound(new { message = "Kategoria nuk u gjet." });

            return Ok(category);
        }
    }
}