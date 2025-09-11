namespace AutoPjesaa.model.DTO.Admin.CarModel
{
    public class AddCarModelDto
    {
        public string ModelName { get; set; } = null!;
        public int ManufacturerId { get; set; }
        public int? YearStart { get; set; }
        public int? YearEnd { get; set; }
    }
}
