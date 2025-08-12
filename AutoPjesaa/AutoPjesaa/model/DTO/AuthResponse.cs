namespace AutoPjesaa.model.DTO
{
    public class AuthResponse
    {
        public string Token { get; set; } = null!;
        public DateTime Expiration { get; set; }
        public string RefreshToken { get; set; } = null!;
    }
}
