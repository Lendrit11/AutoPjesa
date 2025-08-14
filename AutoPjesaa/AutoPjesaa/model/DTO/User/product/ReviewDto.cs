namespace AutoPjesaa.model.DTO.User.product
{
    public class ReviewDto
    {
        public string Email { get; set; } // Opsional, nëse e përdor për identifikim
        public string ReviewText { get; set; }
        public int Rating { get; set; }
        public int ProductId { get; set; }
    }
}
