using AutoPjesa.Domain.Entities;

namespace AutoPjesaa.model.Entities
{
    public class PartReview
    {

        public int ReviewId { get; set; }
        public int PartId { get; set; }
        public int UserId { get; set; }
        public string ReviewText { get; set; }
        public string Email { get; set; }
        public int Rating { get; set; } 
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public Part Part { get; set; }
        public AppUser User { get; set; }

    }
}
