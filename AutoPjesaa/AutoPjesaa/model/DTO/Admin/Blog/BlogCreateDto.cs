using System.ComponentModel.DataAnnotations;

namespace AutoPjesaa.model.DTO.Admin.Blog
{
    public class BlogCreateDto
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string PhotoUrl { get; set; }


    }
}
