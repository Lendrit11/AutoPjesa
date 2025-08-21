namespace AutoPjesaa.model.DTO.User.Account
{
    public class OrderDetailDto
    {
        public int OrderDetailId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }  // cmimi nga OrderDetail (ose stock)

        public string PartName { get; set; }
        public string? PrimaryImageUrl { get; set; }
        public decimal? CurrentPrice { get; set; }
    }
}
