namespace AutoPjesaa.model.DTO.Admin.Orders
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string OrderNumber { get; set; }
        public string Customer { get; set; }
        public string CustomerPhone { get; set; }
        public DateTime OrderDate { get; set; }  // Përdor DateTime për output
        public decimal Total { get; set; }
        public string Status { get; set; }
        public string ShippingAddress { get; set; }
        public List<PartDto> Parts { get; set; } = new List<PartDto>();
    }
}
