namespace AutoPjesaa.model.DTO.User
{
    public class blogdto
    {
        public int BlogId { get; set; }
        public string Title { get; set; } = null!;
        public string? PhotoUrl { get; set; }
        public string Description { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public int UserId { get; set; }
        public userblogdto User { get; set; } = null!;
    }
}
