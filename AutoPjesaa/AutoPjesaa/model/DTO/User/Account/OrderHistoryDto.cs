namespace AutoPjesaa.model.DTO.User.Account
{
    public class OrderHistoryDto
    {
        public int OrderHistoryId { get; set; }
        public DateOnly ChangedAt { get; set; }
        public string Status { get; set; }
    }
}
