using AutoPjesaa.model.Entities;
using System.ComponentModel.DataAnnotations;

namespace AutoPjesa.Domain.Entities
{
    public class AppUser
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        public string password { get; set; } = null!;
        [Required]
        public DateOnly CreatedAt { get; set; }
        public string Status { get; set; } = "active";
        public ICollection<Address> Addresses { get; set; } = new List<Address>();
        public ICollection<Cart> Carts { get; set; } = new List<Cart>();
        public ICollection<Order> Orders { get; set; } = new List<Order>();
        public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();

        public ICollection<Blog> Blogs { get; set; } = new List<Blog>();
        public ICollection<PartReview> Reviews { get; set; } = new List<PartReview>();

        public ICollection<FavoritePart> FavoriteParts { get; set; }

    }
}
