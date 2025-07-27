namespace AutoPjesa.Domain.Entities
{
    public class Stock
    {
        public int StockId { get; set; }
        public int PartId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal Discount { get; set; }= 0;
        public DateTime LastUpdated { get; set; }
        // Navigation property to Part entity
        public Part Part { get; set; } = null!;
        // Constructor to initialize LastUpdated to current time
     
    }
}
