namespace AutoPjesaa.model.DTO.Admin.Orders
{
    public class CreateOrderDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CustomerPhone { get; set; }
        public DateTime OrderDate { get; set; }
        public string ShippingAddress { get; set; }
        public List<PartDto> Parts { get; set; } = new();
    }
}
