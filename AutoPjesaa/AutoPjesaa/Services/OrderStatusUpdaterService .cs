using AutoPjesa.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using System.Threading.Tasks;


namespace AutoPjesaa.Services.OrderStatusUpdaterService
{
    public class OrderStatusUpdaterService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;

        public OrderStatusUpdaterService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var context = scope.ServiceProvider.GetRequiredService<AutoPjesaDbContext>();
                    var now = DateTime.Now;

                    var allOrders = await context.Orders.ToListAsync(stoppingToken);

                    foreach (var order in allOrders)
                    {
                        var orderDateTime = order.OrderDate.ToDateTime(TimeOnly.MinValue);

                        if (order.OrderStatus == "Pending" && orderDateTime.AddHours(3) <= now)
                        {
                            order.OrderStatus = "Processing";
                        }
                        else if (order.OrderStatus == "Processing" && orderDateTime.AddDays(2) <= now)
                        {
                            order.OrderStatus = "Shipped";
                        }
                        else if (order.OrderStatus == "Shipped" && orderDateTime.AddHours(1) <= now)
                        {
                            order.OrderStatus = "Completed";
                        }
                    }

                    await context.SaveChangesAsync(stoppingToken);
                }

                // Prit 15 minuta para kontrollës tjetër
                await Task.Delay(TimeSpan.FromMinutes(15), stoppingToken);
            }
        }

    }

}