using AutoPjesa.Infrastructure.Persistence;
using AutoPjesaa.model.DTO.User.Home;
using AutoPjesaa.model.DTO.User.product;
using AutoPjesaa.model.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AutoPjesaa.Controllers.User.Product
{
    [ApiController]
    [Route("api/user/product")]
    public class ProductController : ControllerBase
    {
        private readonly AutoPjesaDbContext _context;
        public ProductController(AutoPjesaDbContext context)
        {
            _context = context;
        }
        private int? GetUserIdFromToken()
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier || c.Type == "UserID");
            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
                return userId;
            return null;
        }

        [HttpGet("getproduct/{id}")]
        public IActionResult GetProductById(int id)
        {
            var product = _context.Parts
                .Include(p => p.PartImages)
                .Include(p => p.Stocks)
                .FirstOrDefault(p => p.PartId == id);
            if (product == null)
                return NotFound("Product not found");

            var stock = product.Stocks.FirstOrDefault();

            var dto = new ProductDto
            {
                Id = product.PartId,
                Name = product.Name,
                PartNumber = product.PartNumber,
                Manufacturer = product.Manufacturer,
                Description = product.Description,
                Code = product.PartNumber,
                Available = stock != null && stock.Quantity > 0,
                Price = stock != null ? stock.Price : 0,
                OldPrice = stock != null && stock.Discount > 0 ? stock.Price * (1 - stock.Discount / 100) : null,
                PrimaryImage = product.PartImages.FirstOrDefault()?.ImgUrl,
                OtherImages = product.PartImages.Skip(1).Select(img => img.ImgUrl).ToList()
            };

            return Ok(dto);
        }

        [Authorize]
        [HttpPost("favorites/add")]
        public async Task<IActionResult> AddToFavorites([FromBody] AddFavoriteRequest request)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized("Nuk mund të identifikohet përdoruesi.");

            var userId = int.Parse(userIdClaim.Value);

            var exists = await _context.FavoriteParts
                .AnyAsync(f => f.userid == userId && f.partid == request.PartId);

            if (exists)
                return BadRequest("Produkti është tashmë në favorite.");

            var favorite = new FavoritePart
            {
                userid = userId,
                partid = request.PartId,
                CreatedAt = DateTime.Now
            };

            _context.FavoriteParts.Add(favorite);
            await _context.SaveChangesAsync();

            return Ok("U shtua me sukses në favorite.");
        }

        [HttpGet("getreviews/{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _context.Parts
                .Include(p => p.Reviews)
                    .ThenInclude(r => r.User)  // për info të përdoruesit në review
                .FirstOrDefaultAsync(p => p.PartId == id);

            if (product == null)
                return NotFound();

            // Përndryshe kthe produktin me reviews (mund të bësh DTO nëse don)
            return Ok(product);
        }
        [HttpPost("addreview")]
        [Authorize]
        public async Task<IActionResult> AddReview([FromBody] ReviewDto reviewDto)
        {
            try
            {
                var userid = GetUserIdFromToken();
                if (userid == null)
                    return Unauthorized();

                var part = await _context.Parts.FindAsync(reviewDto.ProductId);
                if (part == null)
                    return NotFound("Produkti nuk u gjet");

                var review = new PartReview
                {
                    ReviewText = reviewDto.ReviewText,
                    Rating = reviewDto.Rating,
                    CreatedAt = DateTime.UtcNow,
                    UserId = userid.Value,
                    PartId = reviewDto.ProductId,
                    Email = reviewDto.Email
                };

                _context.PartReviews.Add(review);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    review.ReviewId,
                    review.Rating,
                    review.ReviewText,
                    review.Email,
                    review.CreatedAt,
                    review.PartId,
                    review.UserId
                });
            }
            catch (Exception ex)
            {
                // Kjo do ta logojë gabimin e vërtetë
                return StatusCode(500, $"Gabim i brendshëm: {ex.Message}");
            }
        }

        [HttpGet("get-last")]
        public async Task<IActionResult> GetLatest(int count = 10)
        {
            var list = await _context.Parts
                .Include(p => p.PartImages)
                .Include(p => p.Stocks)
                .OrderByDescending(p => p.PartId)
                .Take(count)
                .Select(p => new model.DTO.User.Home.PartDto
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
    }
}
