using AutoPjesa.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace AutoPjesa.Domain.Entities
{
    public class Cart
    {
        [Key]
        public int CartId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Status { get; set; } // e.g., "Pending", "Completed", "Cancelled"
        public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
        public AppUser User { get; set; } =null!; // Navigation property to AppUser 
    }
}
