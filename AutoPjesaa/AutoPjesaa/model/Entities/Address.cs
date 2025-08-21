using AutoPjesa.Domain.Entities;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

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

        [JsonIgnore]
        public AppUser User { get; set; } = null!;
    }
}
