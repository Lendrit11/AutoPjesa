using System.ComponentModel.DataAnnotations;

namespace AutoPjesa.Domain.Entities
{
    public class Supplier
    {
        [Key]
        public int SupplierId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(100)]
        public string ContactPerson { get; set; }

        [Required]
        [MaxLength(20)]
        public string Phone { get; set; }

        [Required]
        [MaxLength(100)]
        public string Email { get; set; }

        [MaxLength(200)]
        public string Address { get; set; }

        [Required]
        [MaxLength(20)]
        public string Status { get; set; }

        // Many-to-many relationship with Manufacturer
        public ICollection<SupplierManufacturer> SupplierManufacturers { get; set; } = new List<SupplierManufacturer>();
    }
}
