namespace AutoPjesaa.model.DTO.User.Account
{
    public class OrderDto
    {
        public int OrderId { get; set; }
        public DateOnly OrderDate { get; set; }
        public string OrderStatus { get; set; }
        public decimal TotalAmount { get; set; }
        public List<OrderDetailDto> OrderDetails { get; set; }
        public List<OrderHistoryDto> OrderHistories { get; set; }
    }
}
