namespace AutoPjesaa.model.DTO.User
{
    public class PartDto
    {
        public int PartId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string PartNumber { get; set; }
        public string Manufacturer { get; set; }
        public int CompatibleFromYear { get; set; }
        public int CompatibleToYear { get; set; }
        public string CategoryName { get; set; }
        public string PrimaryImages { get; set; }
        public List<string> Images { get; set; }
        public decimal? Discount { get; set; }

        public decimal Price { get; set; } 
    }

}
