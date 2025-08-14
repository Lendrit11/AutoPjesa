namespace AutoPjesaa.model.DTO.User.product
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PartNumber { get; set; }
        public string Manufacturer { get; set; }
        public string Description { get; set; }

        public string Code { get; set; }
        public bool Available { get; set; }
        public decimal Price { get; set; }
        public decimal? OldPrice { get; set; } // Nëse ka zbritje
        public string? PrimaryImage { get; set; }
        public List<string> OtherImages { get; set; }
    }
}
