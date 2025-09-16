using AutoPjesa.Domain.Entities;

namespace AutoPjesa.Domain.Entities
{
    public class UserRole
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public AppUser User { get; set; } = null!; // Navigation property to AppUser 
        public Role Role { get; set; } = null!; // Navigation property to Role entity
    }
}
