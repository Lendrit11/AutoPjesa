using AutoPjesa.Domain.Entities;
using AutoPjesa.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoPjesaa.model.DTO.Admin.PartsController;

namespace AutoPjesaa.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PartsController : ControllerBase
    {
        private readonly AutoPjesaDbContext _context;

        public PartsController(AutoPjesaDbContext context)
        {
            _context = context;
        }

        // GET: api/Parts
        [HttpGet]
        public async Task<IActionResult> GetParts()
        {
            var parts = await _context.Parts
                .Include(p => p.Stocks)
                .Include(p => p.PartImages)
                .Include(p => p.PartCarModels)
                    .ThenInclude(pc => pc.CarModel)
                .ToListAsync();

            var result = parts.Select(p =>
            {
                var stock = p.Stocks.FirstOrDefault();
                return new
                {
                    p.PartId,
                    p.Name,
                    p.PartNumber,
                    p.Description,
                    p.Manufacturer,
                    p.CategoryId,
                    p.CompatibleFromYear,
                    p.CompatibleToYear,
                    Stock = stock != null ? new
                    {
                        stock.Quantity,
                        stock.Price,
                        stock.Discount,
                        stock.ReorderLevel
                    } : null,
                    Images = p.PartImages.Select(img => new { img.ImgId, img.ImgUrl, img.IsPrimary }),
                    CompatibleModels = p.PartCarModels.Select(pc => new { pc.CarModelId, pc.CarModel.modelName })
                };
            });

            return Ok(result);
        }

        // POST: api/Parts
        [HttpPost]
        public async Task<IActionResult> AddPart([FromBody] PartsDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var part = new Part
            {
                Name = dto.Name,
                PartNumber = dto.PartNumber,
                Description = dto.Description,
                Manufacturer = dto.Manufacturer,
                CategoryId = dto.CategoryId,
                CompatibleFromYear = dto.CompatibleFromYear,
                CompatibleToYear = dto.CompatibleToYear
            };

            _context.Parts.Add(part);
            await _context.SaveChangesAsync();

            // Stock
            var stock = new Stock
            {
                PartId = part.PartId,
                Quantity = dto.StockQuantity,
                Price = dto.Price,
                ReorderLevel = dto.ReorderLevel,
                Discount = dto.Discount,
                LastUpdated = DateTime.Now
            };
            _context.Stocks.Add(stock);

            // Images
            if (!string.IsNullOrEmpty(dto.ImageUrl))
            {
                _context.PartImages.Add(new PartImage
                {
                    PartId = part.PartId,
                    ImgUrl = dto.ImageUrl,
                    IsPrimary = true,
                    CreatedAt = DateOnly.FromDateTime(DateTime.Now)
                });
            }

            // Compatible Models
            if (dto.CompatibleModelIds != null)
            {
                foreach (var modelId in dto.CompatibleModelIds)
                {
                    _context.PartCarModels.Add(new PartCarModel
                    {
                        PartId = part.PartId,
                        CarModelId = modelId
                    });
                }
            }

            await _context.SaveChangesAsync();
            return Ok(new { part.PartId });
        }

        // PUT: api/Parts/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePart(int id, [FromBody] PartsDto dto)
        {
            var part = await _context.Parts
                .Include(p => p.Stocks)
                .Include(p => p.PartCarModels)
                .Include(p => p.PartImages)
                .FirstOrDefaultAsync(p => p.PartId == id);

            if (part == null) return NotFound();

            part.Name = dto.Name;
            part.PartNumber = dto.PartNumber;
            part.Description = dto.Description;
            part.Manufacturer = dto.Manufacturer;
            part.CategoryId = dto.CategoryId;
            part.CompatibleFromYear = dto.CompatibleFromYear;
            part.CompatibleToYear = dto.CompatibleToYear;

            // Update Stock
            var stock = part.Stocks.FirstOrDefault();
            if (stock != null)
            {
                stock.Quantity = dto.StockQuantity;
                stock.Price = dto.Price;
                stock.ReorderLevel = dto.ReorderLevel;
                stock.Discount = dto.Discount;
                stock.LastUpdated = DateTime.Now;
            }

            // Update Images
            var existingImage = part.PartImages.FirstOrDefault();
            if (!string.IsNullOrEmpty(dto.ImageUrl))
            {
                if (existingImage != null)
                {
                    existingImage.ImgUrl = dto.ImageUrl;
                    existingImage.CreatedAt = DateOnly.FromDateTime(DateTime.Now);
                    existingImage.IsPrimary = true;
                }
                else
                {
                    _context.PartImages.Add(new PartImage
                    {
                        PartId = part.PartId,
                        ImgUrl = dto.ImageUrl,
                        CreatedAt = DateOnly.FromDateTime(DateTime.Now),
                        IsPrimary = true
                    });
                }
            }

            // Update Compatible Models
            _context.PartCarModels.RemoveRange(part.PartCarModels);
            if (dto.CompatibleModelIds != null)
            {
                foreach (var modelId in dto.CompatibleModelIds)
                {
                    _context.PartCarModels.Add(new PartCarModel
                    {
                        PartId = part.PartId,
                        CarModelId = modelId
                    });
                }
            }

            await _context.SaveChangesAsync();
            return Ok();
        }

        
    }
}

