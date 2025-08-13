namespace AutoPjesaa.model.DTO.User.Home
{
    public class PartDto
    {
        public int PartId { get; set; }
        public string PartName { get; set; }
        public decimal Price { get; set; }
        public List<PartImageDto> Images { get; set; }
    }
}
