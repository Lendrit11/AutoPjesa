namespace AutoPjesaa.model.DTO.User.Wishlist
{
    public class FavoritePartDto
    {
        public int PartId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string PartNumber { get; set; } = string.Empty;
        public int Stock { get; set; }
        public decimal Price { get; set; }
        public decimal Discount { get; set; } = 0;
        public string ImgUrl { get; set; } = string.Empty;
    }
}
