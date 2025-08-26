using AutoPjesa.Domain.Entities;

namespace AutoPjesaa.model.Entities
{
    public class Blog
    {
        public int blogId { get; set; }
        public string Title { get; set; } = null!;
        public string? photoUrl { get; set; } = null!;
        public string description { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public int UserId { get; set; }
        public AppUser User { get; set; } = null!; 
    }
}
