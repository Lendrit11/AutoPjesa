namespace AutoPjesaa.model.DTO.User.Account
{
    public class UpdateUserDto
    {
        public string? FirstName { get; set; } = string.Empty;
        public string? LastName { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; } = string.Empty;
        public string? Email { get; set; } = string.Empty;
        public string? Password { get; set; } = string.Empty;
        public List<AddressDto>? Addresses { get; set; } = new List<AddressDto>();


    }
}
