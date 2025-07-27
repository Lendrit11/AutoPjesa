using System.ComponentModel.DataAnnotations;

namespace AutoPjesa.Domain.Entities
{
    public class Manufacturer
    {
        [Key]
        public int ManufacturerId { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [Required]
        [MaxLength(100)]
        public string Country { get; set; }
        public ICollection<CarModel> CarModels { get; set; } = new List<CarModel>();
    }
}
