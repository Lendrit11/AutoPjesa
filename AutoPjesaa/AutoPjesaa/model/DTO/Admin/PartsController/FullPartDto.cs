namespace AutoPjesaa.model.DTO.Admin.PartsController
{
    public class FullPartDto
    {
        public int PartId { get; set; }
        public string Name { get; set; }
        public string PartNumber { get; set; }
        public string Description { get; set; }
        public string Manufacturer { get; set; }
        public int CategoryId { get; set; }
        public int? CompatibleFromYear { get; set; }
        public int? CompatibleToYear { get; set; }

        // Krejt te tjerat janë pjesë e këtij DTO-je
        public int? StockQuantity { get; set; }
        public decimal? StockPrice { get; set; }
        public decimal? StockDiscount { get; set; }
        public int? StockReorderLevel { get; set; }

        public List<ImageDto> Images { get; set; }
        public List<ModelDto> CompatibleModels { get; set; }

        public class ImageDto
        {
            public int ImgId { get; set; }
            public string ImgUrl { get; set; }
            public bool IsPrimary { get; set; }
        }

        public class ModelDto
        {
            public int CarModelId { get; set; }
            public string ModelName { get; set; }
        }
    }

}
