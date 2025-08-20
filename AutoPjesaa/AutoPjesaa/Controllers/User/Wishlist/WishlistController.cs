using AutoPjesa.Domain.Entities;
using AutoPjesa.Infrastructure.Persistence;
using AutoPjesaa.model.DTO.User.CartDto;
using AutoPjesaa.model.DTO.User.Wishlist;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AutoPjesaa.Controllers.User.Wishlist
{
    [ApiController]
    [Route("api/Wishlist")]
    public class WishlistController: ControllerBase
    {
        private readonly AutoPjesaDbContext _context;
        public WishlistController(AutoPjesaDbContext context)
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
        [HttpGet("get-wishlist")]
        public async Task<IActionResult> getWishlist()
        {
            var userId = GetUserIdFromToken();

            var favorites = await _context.FavoriteParts
                .Where(fp => fp.userid == userId.Value)
                .Include(fp=> fp.Part)
                  .ThenInclude(p => p.Stocks)
                   .Include(fp => fp.Part.PartImages)
                   .Select(fp => new FavoritePartDto
                   {
                       PartId = fp.Part.PartId,
                       Name = fp.Part.Name,
                       Description = fp.Part.Description,
                       PartNumber = fp.Part.PartNumber,
                       Price = fp.Part.Stocks.FirstOrDefault().Price,
                       Discount = fp.Part.Stocks.FirstOrDefault().Discount,
                       Stock = fp.Part.Stocks.FirstOrDefault().Quantity,
                       ImgUrl = fp.Part.PartImages
                         .Where(img => img.IsPrimary)
                            .Select(img => img.ImgUrl)
                            .FirstOrDefault()
                   })
                   .ToListAsync();

            return Ok(favorites);

        }
        [HttpDelete("remove-from-wishlist/{partId}")]
        public async Task<IActionResult> RemoveFromWishlist(int partId)
        {
            var userId = GetUserIdFromToken();
            if (userId == null)
                return Unauthorized("User not authenticated");

            var favorite = await _context.FavoriteParts
                .FirstOrDefaultAsync(fp => fp.userid == userId.Value && fp.partid == partId);

            if (favorite == null)
                return NotFound("Product not found in wishlist");

            _context.FavoriteParts.Remove(favorite);
            await _context.SaveChangesAsync();

            return Ok("Removed from wishlist");
        }

        [HttpPost("add-cart")]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartRequest request)
        {
            try
            {
                var userIdClaim = GetUserIdFromToken();
                if (userIdClaim == null)
                    return Unauthorized();

                var cart = await _context.Carts
                    .FirstOrDefaultAsync(c => c.UserId == userIdClaim.Value && c.Status == "Pending");

                if (cart == null)
                {
                    cart = new Cart
                    {
                        UserId = userIdClaim.Value,
                        CreatedAt = DateTime.UtcNow,
                        Status = "Pending"
                    };
                    _context.Carts.Add(cart);
                    await _context.SaveChangesAsync();
                }

                var existingCartItem = await _context.CartItems
                    .FirstOrDefaultAsync(ci => ci.CartId == cart.CartId && ci.PartId == request.PartId);

                if (existingCartItem != null)
                {
                    existingCartItem.Quantity += request.Quantity;
                }
                else
                {
                    var newCartItem = new CartItem
                    {
                        PartId = request.PartId,
                        Quantity = request.Quantity,
                        CartId = cart.CartId
                    };
                    _context.CartItems.Add(newCartItem);
                }

                await _context.SaveChangesAsync();
                return Ok(new { Message = "Item added to cart successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }


    }
}
