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

                return new FullPartDto
                {
                    PartId = p.PartId,
                    Name = p.Name,
                    PartNumber = p.PartNumber,
                    Description = p.Description,
                    Manufacturer = p.Manufacturer,
                    CategoryId = p.CategoryId,
                    CompatibleFromYear = p.CompatibleFromYear,
                    CompatibleToYear = p.CompatibleToYear,

                    StockQuantity = stock?.Quantity,
                    StockPrice = stock?.Price,
                    StockDiscount = stock?.Discount,
                    StockReorderLevel = stock?.ReorderLevel,

                    Images = p.PartImages.Select(img => new FullPartDto.ImageDto
                    {
                        ImgId = img.ImgId,
                        ImgUrl = img.ImgUrl,
                        IsPrimary = img.IsPrimary
                    }).ToList(),

                    CompatibleModels = p.PartCarModels.Select(pc => new FullPartDto.ModelDto
                    {
                        CarModelId = pc.CarModelId,
                        ModelName = pc.CarModel.modelName
                    }).ToList()
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
                Name = dto.Name ?? "",
                PartNumber = dto.PartNumber ?? "",
                Description = dto.Description ?? "",
                Manufacturer = dto.Manufacturer ?? "",
                CategoryId = dto.CategoryId != 0 ? dto.CategoryId : 1,
                CompatibleFromYear = dto.CompatibleFromYear != 0 ? dto.CompatibleFromYear : 2000,
                CompatibleToYear = dto.CompatibleToYear != 0 ? dto.CompatibleToYear : DateTime.Now.Year
            };

            _context.Parts.Add(part);
            await _context.SaveChangesAsync();

            // Stock
            var stock = new Stock
            {
                PartId = part.PartId,
                Quantity = dto.StockQuantity != 0 ? dto.StockQuantity : 0,
                Price = dto.Price != 0 ? dto.Price : 0,
                ReorderLevel = dto.ReorderLevel != 0 ? dto.ReorderLevel : 10,
                Discount = dto.Discount,
                LastUpdated = DateTime.Now
            };
            _context.Stocks.Add(stock);

            // Images
            if (dto.ImageUrls != null)
            {
                bool first = true;
                foreach (var url in dto.ImageUrls)
                {
                    if (!string.IsNullOrWhiteSpace(url))
                    {
                        _context.PartImages.Add(new PartImage
                        {
                            PartId = part.PartId,
                            ImgUrl = url,
                            IsPrimary = first,
                            CreatedAt = DateOnly.FromDateTime(DateTime.Now)
                        });
                        first = false;
                    }
                }
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
        public async Task<IActionResult> UpdatePart(int id, [FromBody] UpdateProdDto dto)
        {
            var part = await _context.Parts
                .Include(p => p.Stocks)
                .Include(p => p.PartCarModels)
                .Include(p => p.PartImages)
                .FirstOrDefaultAsync(p => p.PartId == id);

            if (part == null)
                return NotFound();

            // Kontrollo nëse dto.ManufacturerName është null ose bosh
            if (string.IsNullOrWhiteSpace(dto.ManufacturerName))
                return BadRequest("ManufacturerName is required.");

            // Merr Manufacturer nga emri (case insensitive)
            var manufacturer = await _context.Manufacturers
                .FirstOrDefaultAsync(m => m.Name.ToLower() == dto.ManufacturerName.ToLower());

            if (manufacturer == null)
                return BadRequest($"Manufacturer '{dto.ManufacturerName}' not found.");

            // Merr Category nga emri (nëse është dhënë)
            Category? category = null;
            if (!string.IsNullOrWhiteSpace(dto.CategoryName))
            {
                category = await _context.Categories
                    .FirstOrDefaultAsync(c => c.Name.ToLower() == dto.CategoryName.ToLower());

                if (category == null)
                    return BadRequest($"Category '{dto.CategoryName}' not found.");
            }

            // Merr Modelet kompatibile nga emrat dhe filtro për prodhuesin e saktë
            List<CarModel> compatibleModels = new List<CarModel>();
            if (dto.CompatibleModelNames != null && dto.CompatibleModelNames.Any())
            {
                compatibleModels = await _context.CarModels
                    .Where(cm => dto.CompatibleModelNames.Contains(cm.modelName) && cm.ManufacturerId == manufacturer.ManufacturerId)
                    .ToListAsync();

                // Kontrollo nëse ka modele që nuk janë gjetur
                var notFoundModels = dto.CompatibleModelNames
                    .Except(compatibleModels.Select(cm => cm.modelName))
                    .ToList();

                if (notFoundModels.Any())
                    return BadRequest($"The following models were not found: {string.Join(", ", notFoundModels)}");
            }

            // Përditëso fushat bazë të pjesës
            part.Name = dto.Name ?? part.Name;
            part.PartNumber = dto.PartNumber ?? part.PartNumber;
            part.Description = dto.Description ?? part.Description;
            part.Manufacturer = manufacturer.Name;

            if (category != null)
                part.CategoryId = category.CategoryId;

            part.CompatibleFromYear = dto.CompatibleFromYear != 0 ? dto.CompatibleFromYear : part.CompatibleFromYear;
            part.CompatibleToYear = dto.CompatibleToYear != 0 ? dto.CompatibleToYear : part.CompatibleToYear;

            // Përditëso stock-in
            var stock = part.Stocks.FirstOrDefault();
            if (stock != null)
            {
                stock.Quantity = dto.StockQuantity != 0 ? dto.StockQuantity : stock.Quantity;
                stock.Price = dto.Price != 0 ? dto.Price : stock.Price;
                stock.ReorderLevel = dto.ReorderLevel != 0 ? dto.ReorderLevel : stock.ReorderLevel;
                stock.Discount = dto.Discount;
                stock.LastUpdated = DateTime.Now;
            }

            // Përditëso imazhet
            if (dto.ImageUrls != null)
            {
                _context.PartImages.RemoveRange(part.PartImages);

                bool first = true;
                foreach (var url in dto.ImageUrls)
                {
                    if (!string.IsNullOrWhiteSpace(url))
                    {
                        _context.PartImages.Add(new PartImage
                        {
                            PartId = part.PartId,
                            ImgUrl = url,
                            IsPrimary = first,
                            CreatedAt = DateOnly.FromDateTime(DateTime.Now)
                        });
                        first = false;
                    }
                }
            }

            // Përditëso kompatibilitetin me modelet
            _context.PartCarModels.RemoveRange(part.PartCarModels);

            foreach (var model in compatibleModels)
            {
                _context.PartCarModels.Add(new PartCarModel
                {
                    PartId = part.PartId,
                    CarModelId = model.CarModelId
                });
            }

            await _context.SaveChangesAsync();
            return Ok();
        }



        // DELETE: api/Parts/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePart(int id)
        {
            var part = await _context.Parts
                .Include(p => p.Stocks)
                .Include(p => p.PartImages)
                .Include(p => p.PartCarModels)
                .FirstOrDefaultAsync(p => p.PartId == id);

            if (part == null) return NotFound();

            if (part.Stocks.Any()) _context.Stocks.RemoveRange(part.Stocks);
            if (part.PartImages.Any()) _context.PartImages.RemoveRange(part.PartImages);
            if (part.PartCarModels.Any()) _context.PartCarModels.RemoveRange(part.PartCarModels);

            _context.Parts.Remove(part);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // POST: api/Parts/upload
        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Nuk ka file të dërguar.");

            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);

            var fileName = $"{Guid.NewGuid()}_{file.FileName}";
            var filePath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var fileUrl = $"/uploads/{fileName}";
            return Ok(new { url = fileUrl });
        }
    }
}
