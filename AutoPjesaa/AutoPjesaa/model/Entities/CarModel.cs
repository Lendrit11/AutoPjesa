using System.ComponentModel.DataAnnotations;

namespace AutoPjesa.Domain.Entities
{
    public class CarModel
    {
        [Key]
        public int CarModelId { get; set; }
        [Required]
        public int ManufacturerId { get; set; }
        [Required]
        public string modelName { get; set; } 
       public DateOnly Year { get; set; }
        public ICollection<PartCarModel> PartCarModels { get; set; } = new List<PartCarModel>();
        public Manufacturer Manufacturer { get; set; } = null!; // Navigation property to Manufacturer entity
    }
}
