namespace AutoPjesa.Domain.Entities
{
    public class PartCarModel
    {
        public int PartId { get; set; }
        public int CarModelId { get; set; }

        public Part Part { get; set; } = null!; // Navigation property to Part entity
        public CarModel CarModel { get; set; } = null!; // Navigation property to CarModel entity
    }
}
