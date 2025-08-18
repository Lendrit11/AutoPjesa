namespace AutoPjesaa.model.DTO.User.CartDto
{
    public class AddToCartRequest
    {
        public int PartId { get; set; }
        public int Quantity { get; set; } = 1;
    }
}
