using AutoPjesa.Domain.Entities;
using AutoPjesa.Infrastructure.Persistence;
using AutoPjesaa.Infrastructure.authentication;
using AutoPjesaa.model.DTO.User.Login;
using AutoPjesaa.model.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;

namespace AutoPjesaa.Controllers.User.Login
{
    [ApiController]
    [Route("api/center")]
    public class LoginController : ControllerBase
    {
        private readonly TokenService _tokenService;
        private readonly AutoPjesaDbContext _context;
        public LoginController(AutoPjesaDbContext context,TokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (_context.AppUsers.Any(u => u.email == dto.email))
                return BadRequest("Email already exists.");

            if (dto.Password != dto.ConfirmPassword)
                return BadRequest("Passwords do not match.");

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            var user = new AppUser
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                email = dto.email,
                PhoneNumber = dto.PhoneNumber,
                CreatedAt = DateOnly.FromDateTime(DateTime.Now),
                password = hashedPassword
            };

            var userRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "User");
            if (userRole == null)
            {
                userRole = new Role { Name = "User" };
                _context.Roles.Add(userRole);
                await _context.SaveChangesAsync();
            }

            var userUserRole = new UserRole
            {
                User = user,
                Role = userRole
            };

            user.UserRoles.Add(userUserRole);

            _context.AppUsers.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully" });
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            var user = _context.AppUsers
                .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
                .FirstOrDefault(u => u.email == dto.Email);

            if (user == null)
                return Unauthorized("Invalid email");

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(dto.Password, user.password);
            if (!isPasswordValid)
                return Unauthorized("Invalid email or password");

            var authResponse = _tokenService.GenerateToken(user);
            Response.Cookies.Append("refreshToken", authResponse.RefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite=SameSiteMode.Strict,
                Expires = authResponse.RefreshTokenExpiration
            });


            return Ok(new
            {
                message = "Login successful",
                user = new
                {
                    user.UserId,
                    user.FirstName,
                    user.LastName,
                    user.email,
                    Roles = user.UserRoles.Select(ur => ur.Role.Name).ToList()
                },
                token = authResponse.Token,
                tokenexpiration = authResponse.Expiration
            });
        }


        [HttpPost("request-password-reset")]
        public async Task<IActionResult> RequestPasswordReset([FromBody] EmailDto dto)
        {
            try
            {
                var email = dto.Email;

                var user = await _context.AppUsers.FirstOrDefaultAsync(u => u.email == email);
                if (user == null)
                    return NotFound("User with this email does not exist.");

                var code = new Random().Next(100000, 999999).ToString();

                var resetCode = new PasswordResetCode
                {
                    Email = email,
                    Code = code,
                    ExpirationTime = DateTime.UtcNow.AddMinutes(10)
                };

                _context.PasswordResetCodes.Add(resetCode);
                await _context.SaveChangesAsync();

                await SendEmailAsync(email, "Your password reset code", $"Your code is: {code}");

                return Ok("Reset code sent to your email.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        private async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            var smtpClient = new SmtpClient("smtp.gmail.com") // ❓ A ekziston ky host?
            {
                Port = 587,
                Credentials = new NetworkCredential("falcon.solidstate1@gmail.com", "jspb ddil tsnn jpai"), // ❗ Kontrollo këtu
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress("falcon.solidstate1@gmail.com"), // ❗ Kontrollo këtu gjithashtu
                Subject = subject,
                Body = body,
                IsBodyHtml = false,
            };
            mailMessage.To.Add(toEmail);

            await smtpClient.SendMailAsync(mailMessage); // ❗ Nëse kjo dështon, shkakton 500
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
        {
            var resetCode = await _context.PasswordResetCodes
                .FirstOrDefaultAsync(c => c.Email == dto.Email && c.Code == dto.Code);

            if (resetCode == null || resetCode.ExpirationTime < DateTime.UtcNow)
                return BadRequest("Invalid or expired code.");

            var user = await _context.AppUsers.FirstOrDefaultAsync(u => u.email == dto.Email);
            if (user == null)
                return NotFound("User not found.");

            user.password = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            _context.PasswordResetCodes.Remove(resetCode); // remove code after use
            await _context.SaveChangesAsync();

            return Ok("Password has been reset.");
        }

    }


}
