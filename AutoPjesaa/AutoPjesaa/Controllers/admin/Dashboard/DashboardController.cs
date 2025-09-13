using AutoPjesa.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace AutoPjesaa.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/dashboard")]
    public class DashboardController : ControllerBase
    {
        private readonly AutoPjesaDbContext _context;

        public DashboardController(AutoPjesaDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Merr numrin total të përdoruesve dhe adminëve, dhe sa janë shtuar këtë muaj
        /// </summary>
        [HttpGet("user-counts")]
        public async Task<IActionResult> GetUserCounts()
        {
            var totalUsers = await _context.AppUsers.CountAsync();

            var adminRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "Admin");

            int totalAdmins = 0;
            int newAdminsThisMonth = 0;

            if (adminRole != null)
            {
                totalAdmins = await _context.UserRoles.CountAsync(ur => ur.RoleId == adminRole.RoleId);

                var firstDayOfMonth = new DateOnly(DateTime.Today.Year, DateTime.Today.Month, 1);

                newAdminsThisMonth = await _context.UserRoles
                    .Include(ur => ur.User)
                    .CountAsync(ur => ur.RoleId == adminRole.RoleId && ur.User.CreatedAt >= firstDayOfMonth);
            }

            var firstDayOfMonthUsers = new DateOnly(DateTime.Today.Year, DateTime.Today.Month, 1);
            var newUsersThisMonth = await _context.AppUsers.CountAsync(u => u.CreatedAt >= firstDayOfMonthUsers);

            return Ok(new
            {
                totalUsers,
                totalAdmins,
                newUsersThisMonth,
                newAdminsThisMonth
            });
        }

        /// <summary>
        /// Merr trendin ditor të regjistrimeve të përdoruesve dhe adminëve për 14 ditët e fundit
        /// </summary>
        [HttpGet("user-registration-trends")]
        public async Task<IActionResult> GetUserRegistrationTrends()
        {
            var adminRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "Admin");

            var today = DateOnly.FromDateTime(DateTime.Today);
            var startDate = today.AddDays(-13);

            var usersInRange = await _context.AppUsers
                .Where(u => u.CreatedAt >= startDate && u.CreatedAt <= today)
                .ToListAsync();

            var adminUserIds = adminRole == null ? new List<int>() :
                 await _context.UserRoles
                 .Where(ur => ur.RoleId == adminRole.RoleId)
                 .Select(ur => ur.UserId)
                .ToListAsync();
            var trendData = Enumerable.Range(0, 14).Select(i =>
            {
                var date = startDate.AddDays(i);

                var usersCount = usersInRange.Count(u => u.CreatedAt == date);
                var adminsCount = usersInRange
                    .Where(u => adminUserIds.Contains(u.UserId))
                    .Count(u => u.CreatedAt == date);

                return new
                {
                    date = date.ToDateTime(TimeOnly.MinValue).ToString("yyyy-MM-dd"),
                    users = usersCount,
                    admins = adminsCount
                };
            }).ToList();

            return Ok(trendData);
        }

        /// <summary>
        /// Merr përmbledhjen e shitjeve totale dhe shitjet ditore për 14 ditët e fundit
        /// </summary>
        [HttpGet("sales-summary")]
        public async Task<IActionResult> GetSalesSummary()
        {
            var today = DateOnly.FromDateTime(DateTime.Today);
            var daysBack = 14;

            var orders = await _context.Orders
                .Where(o => o.OrderDate >= today.AddDays(-daysBack))
                .ToListAsync();

            var totalSales = orders.Sum(o => o.TotalAmount);

            var dailySales = orders
                .GroupBy(o => o.OrderDate)
                .Select(g => new
                {
                    Date = g.Key.ToDateTime(TimeOnly.MinValue).ToString("yyyy-MM-dd"),
                    Total = g.Sum(x => x.TotalAmount)
                })
                .OrderBy(x => x.Date)
                .ToList();

            return Ok(new { totalSales, dailySales });
        }

        /// <summary>
        /// Merr përmbledhjen e pagesave (porositë e kompletuara) dhe pagesat ditore për 14 ditët e fundit
        /// </summary>
        [HttpGet("payments-summary")]
        public async Task<IActionResult> GetPaymentsSummary()
        {
            var today = DateOnly.FromDateTime(DateTime.Today);
            var daysBack = 14;

            var completedOrders = await _context.Orders
                .Where(o => o.OrderStatus == "Completed" && o.OrderDate >= today.AddDays(-daysBack))
                .ToListAsync();

            var totalPayments = completedOrders.Count;

            var dailyPayments = completedOrders
                .GroupBy(o => o.OrderDate)
                .Select(g => new
                {
                    Date = g.Key.ToDateTime(TimeOnly.MinValue).ToString("yyyy-MM-dd"),
                    Count = g.Count()
                })
                .OrderBy(x => x.Date)
                .ToList();

            return Ok(new { totalPayments, dailyPayments });
        }
    }
}
