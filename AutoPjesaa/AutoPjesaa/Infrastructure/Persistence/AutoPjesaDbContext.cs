using AutoPjesa.Domain.Entities;
using AutoPjesaa.model.Entities;
using AutoPjesaa.model.Token;
using Microsoft.EntityFrameworkCore;

namespace AutoPjesa.Infrastructure.Persistence
{
    public class AutoPjesaDbContext : DbContext
    {
        public AutoPjesaDbContext(DbContextOptions<AutoPjesaDbContext> options) : base(options) { }

        public DbSet<Manufacturer> Manufacturers { get; set; }
        public DbSet<CarModel> CarModels { get; set; }
        public DbSet<PartReview> PartReviews { get; set; }
        public DbSet<PasswordResetCode> PasswordResetCodes { get; set; }
        public DbSet<Part> Parts { get; set; }
        public DbSet<PartCarModel> PartCarModels { get; set; }
        public DbSet<FavoritePart> FavoriteParts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Token> Tokens { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<OrderHistory> OrderHistories { get; set; }
        public DbSet<PartImage> PartImages { get; set; }

        // 🎯 Tabela e re për furnitorët
        public DbSet<Supplier> Suppliers { get; set; }
        // 🎯 Tabela lidhëse many-to-many Supplier-Manufacturer
        public DbSet<SupplierManufacturer> SupplierManufacturers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Primary keys
            modelBuilder.Entity<PartCarModel>().HasKey(pc => new { pc.PartId, pc.CarModelId });
            modelBuilder.Entity<UserRole>().HasKey(ur => new { ur.UserId, ur.RoleId });
            modelBuilder.Entity<CartItem>().HasKey(ci => ci.CartItemId);
            modelBuilder.Entity<OrderDetail>().HasKey(od => od.OrderDetailId);

            // Many-to-many Supplier-Manufacturer
            modelBuilder.Entity<SupplierManufacturer>()
                .HasKey(sm => new { sm.SupplierId, sm.ManufacturerId });

            modelBuilder.Entity<SupplierManufacturer>()
                .HasOne(sm => sm.Supplier)
                .WithMany(s => s.SupplierManufacturers)
                .HasForeignKey(sm => sm.SupplierId);

            modelBuilder.Entity<SupplierManufacturer>()
                .HasOne(sm => sm.Manufacturer)
                .WithMany(m => m.SupplierManufacturers)
                .HasForeignKey(sm => sm.ManufacturerId);

            // Relationships për pjesët e tjera
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
                .HasForeignKey(ur => ur.UserId);

            modelBuilder.Entity<Role>()
                .HasMany(r => r.UserRoles)
                .WithOne(ur => ur.Role)
                .HasForeignKey(ur => ur.RoleId);

            modelBuilder.Entity<Blog>()
                .HasOne(b => b.User)
                .WithMany(u => u.Blogs)
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<FavoritePart>()
                .HasIndex(fp => new { fp.userid, fp.partid })
                .IsUnique();

            modelBuilder.Entity<FavoritePart>()
                .HasOne(fp => fp.User)
                .WithMany(u => u.FavoriteParts)
                .HasForeignKey(fp => fp.userid)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<FavoritePart>()
                .HasOne(fp => fp.Part)
                .WithMany(p => p.FavoritedByUsers)
                .HasForeignKey(fp => fp.partid)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PartReview>()
                .HasKey(pr => pr.ReviewId);

            modelBuilder.Entity<PartReview>()
                .HasOne(pr => pr.Part)
                .WithMany(p => p.Reviews)
                .HasForeignKey(pr => pr.PartId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PartReview>()
                .HasOne(pr => pr.User)
                .WithMany(u => u.Reviews)
                .HasForeignKey(pr => pr.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
    }
}
