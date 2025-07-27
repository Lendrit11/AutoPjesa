using AutoPjesa.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AutoPjesa.Infrastructure.Persistence
{
    public class AutoPjesaDbContext : DbContext
    {
        public AutoPjesaDbContext(DbContextOptions<AutoPjesaDbContext> options) : base(options) { }

        public DbSet<Manufacturer> Manufacturers { get; set; }
        public DbSet<CarModel> CarModels { get; set; }
        public DbSet<Part> Parts { get; set; }
        public DbSet<PartCarModel> PartCarModels { get; set; }
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<OrderHistory> OrderHistories { get; set; }
        public DbSet<PartImage> PartImages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Primary keys for many-to-many and composite keys
            modelBuilder.Entity<PartCarModel>().HasKey(pc => new { pc.PartId, pc.CarModelId });
            modelBuilder.Entity<UserRole>().HasKey(ur => new { ur.userId, ur.roleId });
            modelBuilder.Entity<CartItem>().HasKey(ci => ci.CartItemId); // sepse ka ID
            modelBuilder.Entity<OrderDetail>().HasKey(od => od.OrderDetailId); // ka ID

            // Relationships
            modelBuilder.Entity<Part>()
                .HasMany(p => p.PartCarModels)
                .WithOne(pc => pc.Part)
                .HasForeignKey(pc => pc.PartId);

            modelBuilder.Entity<CarModel>()
                .HasMany(cm => cm.PartCarModels)
                .WithOne(pc => pc.CarModel)
                .HasForeignKey(pc => pc.CarModelId);

            modelBuilder.Entity<Part>()
                .HasMany(p => p.PartImages)
                .WithOne(pi => pi.Part)
                .HasForeignKey(pi => pi.PartId);

            modelBuilder.Entity<Part>()
                .HasMany(p => p.CartItems)
                .WithOne(ci => ci.Part)
                .HasForeignKey(ci => ci.PartId);

            modelBuilder.Entity<Cart>()
                .HasMany(c => c.CartItems)
                .WithOne(ci => ci.Cart)
                .HasForeignKey(ci => ci.CartId);

            modelBuilder.Entity<AppUser>()
                .HasMany(u => u.Carts)
                .WithOne(c => c.User)
                .HasForeignKey(c => c.UserId);

            modelBuilder.Entity<AppUser>()
                .HasMany(u => u.UserRoles)
                .WithOne(ur => ur.User)
                .HasForeignKey(ur => ur.roleId);

            modelBuilder.Entity<Role>()
                .HasMany(r => r.UserRoles)
                .WithOne(ur => ur.Role)
                .HasForeignKey(ur => ur.roleId);

            base.OnModelCreating(modelBuilder);
        }
    }
}
