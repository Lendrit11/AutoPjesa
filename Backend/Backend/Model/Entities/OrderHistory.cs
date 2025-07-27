using System.ComponentModel.DataAnnotations;

namespace AutoPjesa.Domain.Entities
{
    public class OrderHistory
    {
        [Key]
        public int OrderHistoryId { get; set; }
        public int orderId { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateOnly ChangedAt { get; set; }

        public Order Order { get; set; } = null!; // Navigation property to Order entity
    }
}
