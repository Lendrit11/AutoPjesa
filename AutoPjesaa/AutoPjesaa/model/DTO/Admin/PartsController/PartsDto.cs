namespace AutoPjesaa.model.DTO.Admin.PartsController;

public class PartsDto
{
    public string Name { get; set; } = null!;
    public string PartNumber { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Manufacturer { get; set; } = null!;
    public int CategoryId { get; set; }
    public int CompatibleFromYear { get; set; }
    public int CompatibleToYear { get; set; }
    public decimal Price { get; set; }
    public int StockQuantity { get; set; }
    public int ReorderLevel { get; set; }
    public decimal Discount { get; set; } = 0;
    public string? ImageUrl { get; set; }
    public List<int>? CompatibleModelIds { get; set; }
}
