using AutoPjesa.Domain.Entities;

namespace AutoPjesaa.model.Entities
{
    public class Blog
    {
        public int blogId { get; set; }
        public string Title { get; set; } = null!;
        public string Content { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public int UserId { get; set; }
        public AppUser User { get; set; } = null!; // Navigation property to AppUser
    }
}
