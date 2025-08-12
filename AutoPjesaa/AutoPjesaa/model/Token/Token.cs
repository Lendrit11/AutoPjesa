using AutoPjesa.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace AutoPjesaa.model.Token
{
    public class Token
    {
        [Key]
        public int TokenId { get; set; }
        [Required]
        public string AccessToken { get; set; } = null!;
        [Required]
        public string RefreshToken { get; set; } = null!;
        public DateTime Expiration { get; set; }
        public DateTime RefreshTokenExpiration { get; set; }

        [Required]
        public int UserId { get; set; }
        public AppUser User { get; set; } = null!;
   
    }
}
