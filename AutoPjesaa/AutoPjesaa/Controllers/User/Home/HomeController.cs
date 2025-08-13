using AutoPjesa.Infrastructure.Persistence;
using AutoPjesaa.model.DTO.User.Home;
using AutoPjesaa.model.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoPjesaa.Controllers.User.Home
{
    [ApiController]
    [Route("api/user/home")]
    public class HomeController: ControllerBase
    {
        public readonly AutoPjesaDbContext _context;
        public HomeController(AutoPjesaDbContext context)
        {
            _context = context;
        }
        [HttpGet("latest")]
        public async Task<IActionResult> GetLatest(int count = 10)
        {
            var list = await _context.Parts
                .Include(p => p.PartImages)
                .Include(p => p.Stocks)
                .OrderByDescending(p => p.PartId)
                .Take(count)
                .Select(p => new PartDto
                {
                    PartId = p.PartId,
                    PartName = p.Name,
                    Images = p.PartImages.Select(img => new PartImageDto
                    {
                        ImageId = img.ImgId,
                        ImageUrl = img.ImgUrl
                    }).ToList(),
                    Price = p.Stocks.OrderByDescending(s => s.LastUpdated)
                                    .Select(s => s.Price)
                                    .FirstOrDefault()
                })
                .ToListAsync();

            return Ok(list);
        }


        [HttpPost("favorites")]
        public async Task<IActionResult> AddToFavorites([FromBody] FavoritePart model)
        {
            if (model.userid == 0 || model.partid == 0)
                return BadRequest("Të dhëna të paplota");

            bool exists = _context.FavoriteParts
                            .Any(fp => fp.userid == model.userid && fp.partid == model.partid);
            if (exists) return Conflict("Tashmë në favorites");

            _context.FavoriteParts.Add(model);
            await _context.SaveChangesAsync();
            return Ok(model);
        }
    }
}
