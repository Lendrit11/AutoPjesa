using System.ComponentModel.DataAnnotations;

namespace AutoPjesa.Domain.Entities
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } 
        public ICollection<Part> Parts { get; set; } = new List<Part>();
    }
}
