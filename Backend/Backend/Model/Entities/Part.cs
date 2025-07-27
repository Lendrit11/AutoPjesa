using System.ComponentModel.DataAnnotations;

namespace AutoPjesa.Domain.Entities
{
    public class Part
    {
        [Key]
        public int PartId { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; } 
        public string Description { get; set; }

        public string PartNumber { get; set; }
        public string Manufacturer { get; set; }
        public int CompatibleFromYear { get; set; }
        public int CompatibleToYear { get; set; }
           public Category Category { get; set; } = null!;
        public ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
        public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
        public ICollection<PartImage> PartImages { get; set; } = new List<PartImage>();
        public ICollection<PartCarModel> PartCarModels { get; set; } = new List<PartCarModel>();
    }
}
