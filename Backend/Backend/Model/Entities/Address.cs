using AutoPjesa.Domain.Entities;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace AutoPjesa.Domain.Entities
{
    public class Address
    {
        [Key]
       public int AdressId { get; set; }
        public int UserId { get; set; }
        [Required]
        public string AddressLine { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Country { get; set; }

          public AppUser User { get; set; } = null!;
    }
}
