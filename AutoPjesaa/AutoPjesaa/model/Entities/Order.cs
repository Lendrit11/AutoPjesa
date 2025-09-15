using AutoPjesa.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace AutoPjesa.Domain.Entities
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
      
        public int UserId { get; set; }
        [Required]
        public DateOnly OrderDate { get; set; }
        [Required]
        public string OrderStatus { get; set; } // e.g., "Pending", "Shipped", "Delivered"
        [Required]
        public decimal TotalAmount { get; set; } // Total amount for the order
        [Required]
        public string ShippingAddress { get; set; } = string.Empty;
        public AppUser User { get; set; } = null!; // Navigation property to AppUser 

        public ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
        public ICollection<OrderHistory> OrderHistories { get; set; } = new List<OrderHistory>();
    }
}
