using AutoPjesa.Domain.Entities;
using AutoPjesa.Infrastructure.Persistence;
using AutoPjesaa.model.DTO;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using AutoPjesaa.model.Token;
using System.Security.Cryptography;

namespace AutoPjesaa.Infrastructure.authentication
{
    public class TokenService
    {
        private readonly IConfiguration _configuration;
        private readonly AutoPjesaDbContext _context;
        public TokenService(IConfiguration configuration, AutoPjesaDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }
        public AuthResponse GenerateToken(AppUser user)
        {
            var secretKey = _configuration["JwtSettings:SecretKey"];
            var key = Encoding.UTF8.GetBytes(secretKey);
            var symetricKey = new SymmetricSecurityKey(key);
            var signingCredentials = new SigningCredentials(symetricKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim> {
    new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()) // ✅ kjo është standarde
};


            foreach (var role in user.UserRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role.Role.Name));
            }

            var accessToken = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(
                    int.Parse(_configuration["JwtSettings:AccessTokenExpirationMinutes"])
                ),
                signingCredentials: signingCredentials
            );

            var accessTokenString = new JwtSecurityTokenHandler().WriteToken(accessToken);

            var refreshToken = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
            var refreshExpiration = DateTime.UtcNow.AddDays(
                int.Parse(_configuration["JwtSettings:RefreshTokenExpirationDays"])
            );

            var tokenEntity = new Token
            {
                AccessToken = accessTokenString,
                RefreshToken = refreshToken,
                Expiration = accessToken.ValidTo,
                RefreshTokenExpiration = refreshExpiration,
                UserId = user.UserId
            };

            _context.Tokens.Add(tokenEntity);
            _context.SaveChanges();

            return new AuthResponse
            {
                Token = accessTokenString,
                Expiration = accessToken.ValidTo,
                RefreshToken = refreshToken,
                RefreshTokenExpiration = refreshExpiration
            };
        }


        public bool ValidateToken(string token)
        {
            var tokeninfo= _context.Tokens.FirstOrDefault(t => t.AccessToken == token);
            return tokeninfo != null && tokeninfo.Expiration > DateTime.UtcNow;
        }
        public void RevokeToken(string tokens)
        {
            var token= _context.Tokens.FirstOrDefault(t => t.AccessToken == tokens);
            if (token != null)
            {
                _context.Tokens.Remove(token);
                _context.SaveChanges();
            }
        }

        public AuthResponse? RefreshAccessToken(string refreshToken)
        {
            var existingToken = _context.Tokens.FirstOrDefault(t => t.RefreshToken == refreshToken);

            if (existingToken == null || existingToken.RefreshTokenExpiration < DateTime.UtcNow)
            {
                return null; // Invalid or expired refresh token
            }

            var user = _context.AppUsers.FirstOrDefault(u => u.UserId == existingToken.UserId);

            if (user == null)
            {
                return null; 
            }

            
            _context.Tokens.Remove(existingToken);

            var newAuth = GenerateToken(user);

            return newAuth;
        }


    }
}
