using System.ComponentModel.DataAnnotations;

namespace AutoPjesa.Domain.Entities
{
    public class PartImage
    {
        [Key]
        public int ImgId { get; set; }
        [Required]
        public int PartId { get; set; }
        [Required]
        [MaxLength(500)]
        public string ImgUrl { get; set; } 
        public bool IsPrimary { get; set; } = false;
        public DateOnly CreatedAt { get; set; } = DateOnly.FromDateTime(DateTime.Now);

        public Part Part { get; set; } = null!; // Navigation property to Part
    }
}
