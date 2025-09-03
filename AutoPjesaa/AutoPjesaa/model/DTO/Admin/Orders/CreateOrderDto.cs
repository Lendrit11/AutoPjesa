namespace AutoPjesaa.model.DTO.Admin.Orders
{
    public class CreateOrderDto
    {
        public int UserId { get; set; }
        public string Customer { get; set; }
        public string CustomerPhone { get; set; }
        public DateTime OrderDate { get; set; } // DateTime për input
        public string ShippingAddress { get; set; }
        public List<PartDto> Parts { get; set; } = new List<PartDto>();
    }
}
