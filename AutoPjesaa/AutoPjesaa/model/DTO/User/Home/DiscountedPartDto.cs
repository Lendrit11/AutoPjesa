namespace AutoPjesaa.model.DTO.User.Home
{
    public class DiscountedPartDto
    {
        public int PartId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal Discount { get; set; }
        public decimal OldPrice { get; set; }
        public string? ImageUrl { get; set; }
        public DateTime ExpireDate { get; set; }
    }
}
