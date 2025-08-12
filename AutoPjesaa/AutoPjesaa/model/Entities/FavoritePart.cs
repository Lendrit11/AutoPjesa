using AutoPjesa.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace AutoPjesaa.model.Entities
{
    public class FavoritePart
    {
        [Key]
        public int favoriteid { get; set; }
        [Required]
        public int partid { get; set; }
        [Required]
        public int userid { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public AppUser User { get; set; }
        public Part Part { get; set; }
    }
}
