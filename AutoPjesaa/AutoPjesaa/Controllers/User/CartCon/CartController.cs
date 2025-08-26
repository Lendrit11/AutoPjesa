using AutoPjesa.Domain.Entities;
using AutoPjesa.Infrastructure.Persistence;
using AutoPjesaa.model.DTO.User.CartDto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
namespace AutoPjesaa.Controllers.User.CartCon
{
    [ApiController]
    [Route("api/user/cart")]
    public class CartController : ControllerBase
    {
        private int? GetUserIdFromToken()
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier || c.Type == "UserID");
            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
                return userId;
            return null;
        }
        private readonly AutoPjesaDbContext _context;
        public CartController(AutoPjesaDbContext context)
        {
            _context = context;
        }
        [HttpGet("MyCart")]
        [Authorize]
        public async Task<IActionResult> GetMyCart()
        {
            var userIdClaim = GetUserIdFromToken();
            if (userIdClaim == null)
                return Unauthorized();


            var cart = await _context.Carts
                .Include(c => c.CartItems)
                    .ThenInclude(ci => ci.Part)
                        .ThenInclude(p => p.PartImages)
                .Include(c => c.CartItems)
                    .ThenInclude(ci => ci.Part)
                        .ThenInclude(p => p.Stocks)
                .FirstOrDefaultAsync(c => c.UserId == userIdClaim && c.Status == "Pending");

            if (cart == null)
                return NotFound("Cart not found.");

            var result = cart.CartItems.Select(ci =>
            {
                var part = ci.Part;

                // Marrim vetëm një foto (preferencë: IsPrimary)
                var primaryImage = part.PartImages.FirstOrDefault(i => i.IsPrimary) ??
                                   part.PartImages.FirstOrDefault();

                // Marrim stokun më të fundit (ose të parin)
                var stock = part.Stocks.OrderByDescending(s => s.LastUpdated).FirstOrDefault();

                decimal finalPrice = stock != null && stock.Discount > 0 && stock.expireddiscount > DateTime.UtcNow
                    ? stock.Price - (stock.Price * stock.Discount / 100)
                    : stock?.Price ?? 0;

                return new
                {
                    ci.CartItemId,
                    ci.Quantity,
                    ImageUrl = primaryImage?.ImgUrl,
                    AvailableStock = stock?.Quantity ?? 0,
                    Price = finalPrice
                };
            });

            return Ok(result);
        }
        [HttpPost("add-cart")]
        [Authorize]
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
                        CartId = cart.CartId // **Sigurohu që po cakton CartId!**
                    };
                    _context.CartItems.Add(newCartItem);
                }

                await _context.SaveChangesAsync();
                return Ok(new { Message = "Item added to cart successfully." });
            }
            catch (Exception ex)
            {
                // Kthe mesazh të detajuar për debug (nuk rekomandohet në prodhim)
                return StatusCode(500, new { error = ex.Message });
            }
        }
        [HttpDelete("remove-cart-item/{cartItemId}")]
        [Authorize]
        public async Task<IActionResult> RemoveCartItem(int cartItemId)
        {
            var userIdClaim = GetUserIdFromToken();
            if (userIdClaim == null)
                return Unauthorized();

            // Gjej CartItem duke u siguruar që i përket userit
            var cartItem = await _context.CartItems
                .Include(ci => ci.Cart)
                .FirstOrDefaultAsync(ci => ci.CartItemId == cartItemId && ci.Cart.UserId == userIdClaim.Value);

            if (cartItem == null)
                return NotFound("Cart item not found or you don't have permission.");

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Cart item removed successfully." });
        }



    }
}
