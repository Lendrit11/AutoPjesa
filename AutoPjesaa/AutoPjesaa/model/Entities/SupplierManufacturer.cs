namespace AutoPjesa.Domain.Entities
{
    public class SupplierManufacturer
    {
        public int SupplierId { get; set; }
        public Supplier Supplier { get; set; }

        public int ManufacturerId { get; set; }
        public Manufacturer Manufacturer { get; set; }
    }
}
