using AutoPjesa.Domain.Entities;
using AutoPjesa.Infrastructure.Persistence;
using AutoPjesaa.model.DTO.Admin.Orders;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoPjesaa.Controllers.Admin.OrderCon
{
    [ApiController]
    [Route("api/admin/orders")]
    public class AdminOrdersController : ControllerBase
    {
        private readonly AutoPjesaDbContext _context;

        public AdminOrdersController(AutoPjesaDbContext context)
        {
            _context = context;
        }

        // GET: api/admin/orders
        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.User)
                .Include(o => o.OrderDetails)
                    .ThenInclude(od => od.Part)
                .ToListAsync();

            var result = orders.Select(o => new OrderDto
            {
                Id = o.OrderId,
                OrderNumber = $"ORD-{o.OrderId:D3}",
                Customer = $"{o.User.FirstName} {o.User.LastName}",
                CustomerPhone = o.User.PhoneNumber,
                OrderDate = o.OrderDate.ToDateTime(TimeOnly.MinValue),
                Total = o.TotalAmount,
                Status = o.OrderStatus,

                // Merr ShippingAddress direkt nga Order, pa fallback në User.Addresses
                ShippingAddress = !string.IsNullOrEmpty(o.ShippingAddress)
                    ? o.ShippingAddress
                    : "Nuk ka adresë",

                Parts = o.OrderDetails.Select(od => new PartDto
                {
                    PartId = od.PartId,
                    Name = od.Part.Name,
                    Quantity = od.Quantity,
                    Price = od.Price
                }).ToList()
            });

            return Ok(result);
        }



        // POST: api/admin/orders
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto dto)
        {
            if (dto.Parts == null || !dto.Parts.Any())
                return BadRequest("Të paktën një pjesë duhet të përfshihet në porosi.");

            // Gjej përdoruesin
            var user = await _context.AppUsers.FirstOrDefaultAsync(u =>
                u.FirstName == dto.FirstName &&
                u.LastName == dto.LastName &&
                u.PhoneNumber == dto.CustomerPhone);

            if (user == null)
                return NotFound("Nuk u gjet përdoruesi me këto të dhëna.");

            // Merr të gjitha pjesët me PartNumber që vijnë nga frontend
            var partNumbers = dto.Parts.Select(p => p.PartNumber).ToList();

            var partsFromDb = await _context.Parts
                .Include(p => p.Stocks)
                .Where(p => partNumbers.Contains(p.PartNumber))
                .ToListAsync();

            if (partsFromDb.Count != dto.Parts.Count)
                return BadRequest("Disa pjesë nuk u gjetën në sistem.");

            var orderDetails = new List<OrderDetail>();
            decimal totalAmount = 0;

            foreach (var partDto in dto.Parts)
            {
                var matchedPart = partsFromDb.FirstOrDefault(p => p.PartNumber == partDto.PartNumber);
                if (matchedPart == null)
                    return BadRequest($"Pjesa me PartNumber {partDto.PartNumber} nuk ekziston.");

                // Merr stock-un e fundit aktiv për këtë pjesë
                var stock = matchedPart.Stocks
                    .OrderByDescending(s => s.LastUpdated)
                    .FirstOrDefault();

                if (stock == null)
                    return BadRequest($"Nuk ka stok për pjesën {matchedPart.Name}.");

                if (stock.Quantity < partDto.Quantity)
                    return BadRequest($"Nuk ka sasi të mjaftueshme në stok për pjesën {matchedPart.Name}.");

                // Llogarit çmimin me zbritje nëse është aktive
                decimal effectivePrice = stock.Price;

                if (stock.Discount > 0 && stock.expireddiscount >= DateTime.Now)
                {
                    effectivePrice -= (stock.Price * stock.Discount / 100);
                }

                // Llogarit totalin
                decimal lineTotal = effectivePrice * partDto.Quantity;
                totalAmount += lineTotal;

                // Shto detajin e porosisë
                orderDetails.Add(new OrderDetail
                {
                    PartId = matchedPart.PartId,
                    Quantity = partDto.Quantity,
                    Price = effectivePrice
                });

                // Ul sasinë nga stoku
                stock.Quantity -= partDto.Quantity;
            }

            // Krijo porosinë
            var order = new Order
            {
                UserId = user.UserId,
                OrderDate = DateOnly.FromDateTime(dto.OrderDate),
                OrderStatus = "Pending",
                ShippingAddress = dto.ShippingAddress,
                TotalAmount = totalAmount,
                OrderDetails = orderDetails
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Porosia u krijua me sukses", orderId = order.OrderId });
        }


        // PUT: api/admin/orders/{id}/status
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] string newStatus)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
                return NotFound("Porosia nuk u gjet.");

            order.OrderStatus = newStatus;
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Statusi u përditësua në {newStatus}" });
        }

        // DELETE: api/admin/orders/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderDetails)
                .FirstOrDefaultAsync(o => o.OrderId == id);

            if (order == null)
                return NotFound("Porosia nuk u gjet.");

            _context.OrderDetails.RemoveRange(order.OrderDetails);
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Porosia u fshi me sukses." });
        }
    }
}
