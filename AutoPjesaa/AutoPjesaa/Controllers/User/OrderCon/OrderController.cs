using AutoPjesa.Domain.Entities;
using AutoPjesa.Infrastructure.Persistence;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AutoPjesaa.Controllers.User.OrderCon
{
    [ApiController]
    [Route("api/user/order")]
    public class OrderController : ControllerBase
    {
        private readonly AutoPjesaDbContext _context;
        public OrderController(AutoPjesaDbContext context)
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
        [HttpPost("from-cart")]
        public async Task<IActionResult> CreateOrderFromCart()
        {
            var userId = GetUserIdFromToken();
            if (userId == null)
                return Unauthorized("User not authenticated.");

            var cart = await _context.Carts
                .Include(c => c.CartItems)
                    .ThenInclude(ci => ci.Part)
                        .ThenInclude(p => p.Stocks)
                .FirstOrDefaultAsync(c => c.UserId == userId.Value && c.Status == "Pending");

            if (cart == null || !cart.CartItems.Any())
            {
                return NotFound("Cart is empty or not found.");
            }

            var order = new Order
            {
                UserId = userId.Value,
                OrderDate = DateOnly.FromDateTime(DateTime.Today),
                OrderStatus = "Pending",
                TotalAmount = 0,
                OrderDetails = new List<OrderDetail>()
            };

            foreach (var cartItem in cart.CartItems)
            {
                var stock = cartItem.Part.Stocks.FirstOrDefault();
                if (stock == null)
                {
                    return BadRequest($"Stock not found for part: {cartItem.Part.Name}");
                }

                if (stock.Quantity < cartItem.Quantity)
                {
                    return BadRequest($"Insufficient stock for part: {cartItem.Part.Name}");
                }

                var price = stock.Price;

                // Zbritja nga stock
                stock.Quantity -= cartItem.Quantity;
                _context.Stocks.Update(stock);

                var orderDetail = new OrderDetail
                {
                    PartId = cartItem.PartId,
                    Quantity = cartItem.Quantity,
                    Price = price
                };

                order.TotalAmount += price * cartItem.Quantity;
                order.OrderDetails.Add(orderDetail);
            }

            _context.Orders.Add(order);
            _context.CartItems.RemoveRange(cart.CartItems);
            cart.Status = "Completed";
            _context.Carts.Update(cart);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Order created successfully and cart cleared.",
                OrderId = order.OrderId,
                Total = order.TotalAmount
            });
        }

        [HttpGet("cart/items")]
        public async Task<IActionResult> GetCartItems()
        {
            var userId = GetUserIdFromToken();
            if (userId == null)
            {
                return Unauthorized("User not authenticated.");
            }

            var cart = await _context.Carts
                .Include(c => c.CartItems)
                    .ThenInclude(ci => ci.Part)
                        .ThenInclude(p => p.PartImages) // Korrekt: nga Part, jo Stock
                .Include(c => c.CartItems)
                    .ThenInclude(ci => ci.Part)
                        .ThenInclude(p => p.Stocks) // merr çmimet
                .FirstOrDefaultAsync(c => c.UserId == userId.Value && c.Status == "Pending");

            if (cart == null || !cart.CartItems.Any())
            {
                return NotFound("Cart is empty.");
            }

            var items = cart.CartItems.Select(ci => new
            {
                PartId = ci.PartId,
                PartName = ci.Part.Name,
                Description = ci.Part.Description,
                Quantity = ci.Quantity,
                Price = ci.Part.Stocks.FirstOrDefault()?.Price ?? 0,
                Total = (ci.Part.Stocks.FirstOrDefault()?.Price ?? 0) * ci.Quantity,
                Images = ci.Part.PartImages.Select(pi => pi.ImgUrl).ToList()
            }).ToList();

            return Ok(items);
        }


    }

}

