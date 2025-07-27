using System.ComponentModel.DataAnnotations;

namespace AutoPjesa.Domain.Entities
{
    public class OrderDetail
    {
        [Key]
        public int OrderDetailId { get; set; }
        public int OrderId { get; set; }
        public int PartId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }

        public Order Order { get; set; } = null!; // Navigation property to Order entity

        public Part Part { get; set; } = null!; // Navigation property to Part entity
    }
}
