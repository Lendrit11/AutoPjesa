namespace AutoPjesaa.model.DTO.Admin.Orders
{
    public class PartDto
    {

        public string PartNumber { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        // ✅ E shton këto, backend-i i plotëson kur është e nevojshme:
        public int PartId { get; set; }      // mbushet nga backend
        public decimal Price { get; set; }   // llogaritet nga backend

    }
}
