namespace AutoPjesaa.model.DTO.Admin.Users
{
    public class UpdateAdminProfileDto
    {
        public string Name { get; set; } = null!; // do ndahet në FirstName dhe LastName
        public string Email { get; set; } = null!;
        public string? Password { get; set; } // opsionale
    }
}
