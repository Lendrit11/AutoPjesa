using AutoPjesaa.Infrastructure.authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Lexo çelësin sekret nga konfigurimi
var secretKey = configuration["JwtSettings:SecretKey"];
if (string.IsNullOrEmpty(secretKey))
    throw new Exception("JWT SecretKey nuk është caktuar në konfigurim.");

var key = Encoding.UTF8.GetBytes(secretKey);
var symmetricKey = new SymmetricSecurityKey(key);

// Autentikimi dhe autorizimi
builder.Services.AddAuthorization();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // URL e frontend-it
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// JWT Auth
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = configuration["JwtSettings:Issuer"],
        ValidAudience = configuration["JwtSettings:Audience"],
        IssuerSigningKey = symmetricKey
    };

    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            var token = context.Request.Cookies["token"]; // ✅ Drejt!
            if (!string.IsNullOrEmpty(token))
            {
                context.Token = token;
            }
            return Task.CompletedTask;
        }
    };

});

// DbContext
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AutoPjesa.Infrastructure.Persistence.AutoPjesaDbContext>(options =>
    options.UseSqlServer(connectionString));

// Shërbimet
builder.Services.AddScoped<TokenService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Middleware dhe konfigurime
app.UseStaticFiles();

// Endpoint për upload file
app.MapPost("/api", async (HttpRequest request, IWebHostEnvironment env) =>
{
    if (!request.HasFormContentType)
        return Results.BadRequest("No form data");

    var form = await request.ReadFormAsync();
    var file = form.Files["file"];

    if (file == null || file.Length == 0)
        return Results.BadRequest("File is empty");

    var uploadsFolder = Path.Combine(env.WebRootPath, "uploads");
    if (!Directory.Exists(uploadsFolder))
        Directory.CreateDirectory(uploadsFolder);

    var fileName = Path.GetRandomFileName() + Path.GetExtension(file.FileName);
    var filePath = Path.Combine(uploadsFolder, fileName);

    using var stream = new FileStream(filePath, FileMode.Create);
    await file.CopyToAsync(stream);

    var url = $"{request.Scheme}://{request.Host}/uploads/{fileName}";

    return Results.Ok(new { url });
});

// Swagger vetëm në zhvillim
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
