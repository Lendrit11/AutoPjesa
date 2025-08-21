using AutoPjesa.Domain.Entities;
using AutoPjesa.Infrastructure.Persistence;
using AutoPjesaa.model.DTO.User.Account;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.Security.Claims;

namespace AutoPjesaa.Controllers.User.AccountCon
{
    [ApiController]
    [Route("api/account")]
    public class AccountController: ControllerBase
    {
        private readonly AutoPjesaDbContext _context;
        public AccountController(AutoPjesaDbContext context)
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

        [HttpGet("get-data/{type}")]
        public async Task<IActionResult> GetGroupedOrders(string type)
        {
            try
            {
                var userId = GetUserIdFromToken();
                if (userId == null)
                    return Unauthorized(new { message = "User not authenticated" });


                var userExists = await _context.AppUsers.AnyAsync(u => u.UserId == userId.Value);
                if (!userExists)
                    return NotFound(new { message = "User not found" });

                var orders = _context.Orders
                    .Where(o => o.UserId == userId.Value);

                if (type == "yearly")
                {
                    var yearly = await orders
                        .GroupBy(o => o.OrderDate.Year)
                        .Select(g => new
                        {
                            Period = g.Key.ToString(),
                            OrderCount = g.Count()
                        })
                        .OrderBy(g => g.Period)
                        .ToListAsync();

                    return Ok(yearly);
                }
                else if (type == "monthly")
                {
                    var monthly = await orders
                        .GroupBy(o => new { o.OrderDate.Year, o.OrderDate.Month })
                        .Select(g => new
                        {
                            Year = g.Key.Year,
                            Month = g.Key.Month,
                            OrderCount = g.Count()
                        })
                        .ToListAsync(); // merr të dhënat në memorje

                    var result = monthly
                        .Select(g => new
                        {
                            Period = $"{g.Year}-{g.Month:D2}", // tani funksionon OK
                            g.OrderCount
                        })
                        .OrderBy(g => g.Period)
                        .ToList();

                    return Ok(result);

                }
                else if (type == "weekly")
                {
                    var culture = CultureInfo.CurrentCulture;

                    var weekly = orders
                        .AsEnumerable() // kalon në memorje për të përdorur DateTime
                        .GroupBy(o =>
                        {
                            var date = o.OrderDate.ToDateTime(TimeOnly.MinValue);
                            var week = culture.Calendar.GetWeekOfYear(date, CalendarWeekRule.FirstDay, DayOfWeek.Monday);
                            return $"{date.Year}-W{week:D2}";
                        })
                        .Select(g => new
                        {
                            Period = g.Key,
                            OrderCount = g.Count()
                        })
                        .OrderBy(g => g.Period)
                        .ToList();

                    return Ok(weekly);
                }
                else if (type == "all")
                {
                    var total = await orders.CountAsync();

                    return Ok(new
                    {
                        Period = "all",
                        OrderCount = total
                    });
                }

                return BadRequest(new { message = "Invalid type. Use 'yearly', 'monthly', 'weekly' or 'all'" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetGroupedOrders: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }


        [HttpGet("get-order")]
        public async Task<IActionResult> GetOrder()
        {
            var userId = GetUserIdFromToken();
            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            var orders = await _context.Orders
                .Where(o => o.UserId == userId.Value)
                .Include(o => o.OrderDetails)
                    .ThenInclude(od => od.Part)
                        .ThenInclude(p => p.PartImages)
                .Include(o => o.OrderDetails)
                    .ThenInclude(od => od.Part)
                        .ThenInclude(p => p.Stocks)
                .Include(o => o.OrderHistories)
                .ToListAsync();

            if (orders == null || !orders.Any())
            {
                return NotFound($"User with ID {userId} has no orders.");
            }

            var ordersDto = orders.Select(o => new OrderDto
            {
                OrderId = o.OrderId,
                OrderDate = o.OrderDate,
                OrderStatus = o.OrderStatus,
                TotalAmount = o.TotalAmount,
                OrderDetails = o.OrderDetails.Select(od => {
                    var primaryImage = od.Part.PartImages.FirstOrDefault(img => img.IsPrimary);
                    var currentStock = od.Part.Stocks.OrderByDescending(s => s.LastUpdated).FirstOrDefault();

                    return new OrderDetailDto
                    {
                        OrderDetailId = od.OrderDetailId,
                        Quantity = od.Quantity,
                        Price = od.Price,  // cmimi nga porosia (OrderDetail)
                        PartName = od.Part.Name,
                        PrimaryImageUrl = primaryImage?.ImgUrl,
                        CurrentPrice = currentStock?.Price
                    };
                }).ToList(),
                OrderHistories = o.OrderHistories.Select(oh => new OrderHistoryDto
                {
                    OrderHistoryId = oh.OrderHistoryId,
                    ChangedAt = oh.ChangedAt,
                    Status = oh.Status
                }).ToList()
            }).ToList();

            return Ok(ordersDto);
        }



        [HttpDelete("delete/{orderId}")]
        public async Task<IActionResult> DeleteOrder(int orderId)
        {             var userId = GetUserIdFromToken();
         
            if (userId == null)
            {
                return Unauthorized("User not authenticated.");
            }
            var order = await _context.Orders
                .Include(o => o.OrderDetails)
                .Include(o => o.OrderHistories)
                .FirstOrDefaultAsync(o => o.OrderId == orderId && o.UserId == userId.Value);
            if (order == null)
            {
                return NotFound("Order not found.");
            }
            _context.Orders.Remove(order);
            _context.OrderDetails.RemoveRange(order.OrderDetails);
            await _context.SaveChangesAsync();
            return Ok("Order deleted successfully.");
        }

        [HttpGet("get-user")]
        public async Task<IActionResult> getUser()
        {
            var userId =GetUserIdFromToken();
            if(userId == null)
            {
                return Unauthorized("User not authenticated.");
            }   

            var user = await _context.AppUsers.Include(u => u.Addresses)
        .FirstOrDefaultAsync(u => u.UserId == userId);
            if (user == null)
            {
                return NotFound($"User with ID {userId} not found.");
            }

            return Ok(user);
        }
        [HttpPut("update-user")]
        public async Task<IActionResult> UpdateUser(UpdateUserDto updateUserDto)
        {
            var userid =GetUserIdFromToken() ;
       if (userid == null)
            {
                return Unauthorized("User not authenticated.");
            }
            var user = await _context.AppUsers.Include(u => u.Addresses)
                .FirstOrDefaultAsync(u => u.UserId == userid.Value);
            if(user == null)
                {
                return NotFound($"User with ID {userid.Value} not found.");
            }
            user.FirstName = updateUserDto.FirstName ?? user.FirstName;
            user.LastName = updateUserDto.LastName ?? user.LastName;
            user.PhoneNumber = updateUserDto.PhoneNumber ?? user.PhoneNumber;
            user.email = updateUserDto.Email ?? user.email;
            if (!string.IsNullOrWhiteSpace(updateUserDto.Password))
            {
                // Hash vetëm nëse passwordi nuk duket si i hash-uar
                if (!updateUserDto.Password.StartsWith("$2a$") &&
                    !updateUserDto.Password.StartsWith("$2b$") &&
                    !updateUserDto.Password.StartsWith("$2y$"))
                {
                    user.password = BCrypt.Net.BCrypt.HashPassword(updateUserDto.Password);
                }
            }



            if (updateUserDto.Addresses != null && updateUserDto.Addresses.Any())
            {
                user.Addresses.Clear(); // Clear existing addresses
                foreach (var addressDto in updateUserDto.Addresses)
                {
                    var address = user.Addresses.FirstOrDefault();
                    if (address != null)
                    {
                        var newAddress = updateUserDto.Addresses.First();
                        address.AddressLine = newAddress.AddressLine ?? address.AddressLine;
                        address.City = newAddress.City ?? address.City;
                        address.Country = newAddress.Country ?? address.Country;
                    }
                    else
                    {
                        foreach(var addr in updateUserDto.Addresses)
                            {
                            user.Addresses.Add(new Address
                            {
                                AddressLine = addr.AddressLine,
                                City = addr.City,
                                Country = addr.Country,
                                UserId = user.UserId
                            });
                        }
                    }
                }

            }
            await _context.SaveChangesAsync();
            return Ok("User updated successfully.");

        }


    }
}
