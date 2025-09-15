using AutoPjesa.Domain.Entities;
using AutoPjesa.Infrastructure.Persistence;
using AutoPjesaa.model.DTO.Admin.Category;
using Microsoft.AspNetCore.Authorization;  // <-- Shto këtë
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoPjesaa.Controllers.Admin.CategoryCon
{
    [ApiController]
    [Route("api/admin/categories")]
    [Authorize]  // <-- Shtojmë sigurinë këtu (duhet token i vlefshëm)
    public class CategoriesController : ControllerBase
    {
        private readonly AutoPjesaDbContext _context;

        public CategoriesController(AutoPjesaDbContext context)
        {
            _context = context;
        }

        // =================== GET ALL ===================
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
            var categories = await _context.Categories
                                           .AsNoTracking()
                                           .Select(c => new CategoryDto
                                           {
                                               CategoryId = c.CategoryId,
                                               Name = c.Name
                                           })
                                           .ToListAsync();

            return Ok(categories);
        }

        // =================== GET BY ID ===================
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetCategory(int id)
        {
            var category = await _context.Categories
                                         .AsNoTracking()
                                         .Where(c => c.CategoryId == id)
                                         .Select(c => new CategoryDto
                                         {
                                             CategoryId = c.CategoryId,
                                             Name = c.Name
                                         })
                                         .FirstOrDefaultAsync();

            if (category == null)
                return NotFound(new { message = "Kategoria nuk u gjet." });

            return Ok(category);
        }

        // =================== POST ===================
        [HttpPost]
        public async Task<ActionResult<CategoryDto>> CreateCategory([FromBody] CategoryCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var category = new Category
            {
                Name = dto.Name
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            var result = new CategoryDto
            {
                CategoryId = category.CategoryId,
                Name = category.Name
            };

            return CreatedAtAction(nameof(GetCategory), new { id = category.CategoryId }, result);
        }

        // =================== PUT ===================
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody] CategoryUpdateDto dto)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                return NotFound(new { message = "Kategoria nuk ekziston." });

            category.Name = dto.Name;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // =================== DELETE ===================
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.Include(c => c.Parts)
                                                    .FirstOrDefaultAsync(c => c.CategoryId == id);
            if (category == null)
                return NotFound(new { message = "Kategoria nuk ekziston." });

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
