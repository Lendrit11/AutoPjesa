using AutoPjesa.Domain.Entities;

namespace AutoPjesa.Domain.Entities
{
    public class UserRole
    {
        public int userId { get; set; }
        public int roleId { get; set; }
        public AppUser User { get; set; } = null!; // Navigation property to AppUser 
        public Role Role { get; set; } = null!; // Navigation property to Role entity
    }
}
