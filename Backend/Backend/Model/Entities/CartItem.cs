using System.ComponentModel.DataAnnotations;

namespace AutoPjesa.Domain.Entities
{
    public class CartItem
    {
        [Key]
        public int CartItemId { get; set; }
        public int CartId { get; set; }
        public int PartId { get; set; }
        public int Quantity { get; set; }

        public Cart Cart { get; set; } = null!; // Navigation property to Cart
        public Part Part { get; set; } = null!; // Navigation property to Part
    }
}
