using AutoPjesa.Infrastructure.Persistence;
using AutoPjesaa.model.DTO.User;
using AutoPjesaa.model.DTO.User.shop;
using AutoPjesaa.model.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AutoPjesaa.Controllers.User.shop
{
    [ApiController]
    [Route("api/user/shop")]
    public class Shop : ControllerBase
    {
        private readonly AutoPjesaDbContext _context;
        private int? GetUserIdFromToken()
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier || c.Type == "UserID");
            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
                return userId;
            return null;
        }

        public Shop(AutoPjesaDbContext context)
        {
            _context = context;
        }

        [HttpGet("parts")]
        public async Task<IActionResult> GetParts(
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice,
            [FromQuery] string? manufacturer,
            [FromQuery] int? categoryId,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 9)
        {
            var query = _context.Parts
                .Include(p => p.PartImages)
                .Include(p => p.Category)
                .Include(p => p.Stocks)
                .AsQueryable();

            // Filter by price with discount applied
            if (minPrice.HasValue)
            {
                query = query.Where(p =>
                    p.Stocks.Any() &&
                    p.Stocks.OrderByDescending(s => s.LastUpdated)
                        .Select(s => s.Price - (s.Price * s.Discount / 100))
                        .FirstOrDefault() >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                query = query.Where(p =>
                    p.Stocks.Any() &&
                    p.Stocks.OrderByDescending(s => s.LastUpdated)
                        .Select(s => s.Price - (s.Price * s.Discount / 100))
                        .FirstOrDefault() <= maxPrice.Value);
            }

            if (!string.IsNullOrEmpty(manufacturer))
            {
                query = query.Where(p =>
                    p.Manufacturer.ToLower().Contains(manufacturer.ToLower()));
            }

            if (categoryId.HasValue)
            {
                query = query.Where(p => p.CategoryId == categoryId.Value);
            }

            var totalItems = await query.CountAsync();

            var parts = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new PartDto
                {
                    PartId = p.PartId,
                    Name = p.Name,
                    Description = p.Description,
                    PartNumber = p.PartNumber,
                    Manufacturer = p.Manufacturer,
                    CompatibleFromYear = p.CompatibleFromYear,
                    CompatibleToYear = p.CompatibleToYear,
                    CategoryName = p.Category.Name,
                    PrimaryImages = p.PartImages
                         .Where(pi => pi.IsPrimary)
                         .Select(pi => pi.ImgUrl)
                         .FirstOrDefault(),
                    Images = p.PartImages.Select(pi => pi.ImgUrl).ToList(),
                    Discount = p.Stocks
                        .OrderByDescending(s => s.LastUpdated)
                        .Select(s => s.Discount)
                        .FirstOrDefault(),
                    Price = p.Stocks
                        .OrderByDescending(s => s.LastUpdated)
                        .Select(s => s.Price - (s.Price * s.Discount / 100))
                        .FirstOrDefault()
                })
                .ToListAsync();

            return Ok(new
            {
                TotalItems = totalItems,
                Page = page,
                PageSize = pageSize,
                Parts = parts
            });
        }

        [HttpGet("manufacturers")]
        public async Task<IActionResult> GetManufacturers()
        {
            var manufacturers = await _context.Parts
                .Where(p => !string.IsNullOrEmpty(p.Manufacturer))
                .Select(p => p.Manufacturer)
                .Distinct()
                .ToListAsync();

            return Ok(manufacturers);
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _context.Categories
                .Select(c => new
                {
                    c.CategoryId,
                    c.Name,
                })
                .ToListAsync();

            return Ok(categories);
        }

        [HttpPost("add-favorites")]
        [Authorize]
        public async Task<IActionResult> AddToFavorites([FromBody] FavoritePartDto model)
        {
            var userId = GetUserIdFromToken();
            if (userId == null)
                return Unauthorized();

            if (model.PartId == 0)
                return BadRequest("ID e pjesës mungon.");

            bool exists = _context.FavoriteParts.Any(fp => fp.userid == userId && fp.partid == model.PartId);
            if (exists)
                return Conflict("Ky produkt është tashmë në favorites");

            var fav = new FavoritePart
            {
                userid = userId.Value,
                partid = model.PartId
            };

            _context.FavoriteParts.Add(fav);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Pjesa u shtua në favorites", FavoritePartId = fav.favoriteid });
        }

    }
}
