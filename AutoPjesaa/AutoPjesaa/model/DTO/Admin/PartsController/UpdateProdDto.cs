namespace AutoPjesaa.model.DTO.Admin.PartsController
{
    public class UpdateProdDto
    {
        public string? Name { get; set; }
        public string? PartNumber { get; set; }
        public string? Description { get; set; }

        public string? ManufacturerName { get; set; } // nga emri
        public string? CategoryName { get; set; }     // nga emri
        public List<string>? CompatibleModelNames { get; set; } // lista e emrave të modeleve

        public int CompatibleFromYear { get; set; }
        public int CompatibleToYear { get; set; }

        public int StockQuantity { get; set; }
        public decimal Price { get; set; }
        public int ReorderLevel { get; set; }
        public decimal Discount { get; set; }

        public List<string>? ImageUrls { get; set; }
    }
}
