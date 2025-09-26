using AutoPjesa.Domain.Entities;
using AutoPjesa.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoPjesaa.model.DTO.Admin.CarModel;
using Microsoft.AspNetCore.Authorization;

namespace AutoPjesaa.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // 🔐 Kërkon autentifikim me token për të gjitha metodat
    public class CarModelsController : ControllerBase
    {
        private readonly AutoPjesaDbContext _context;

        public CarModelsController(AutoPjesaDbContext context)
        {
            _context = context;
        }

        // ✅ GET: api/CarModels
        [HttpGet]
        [AllowAnonymous] // (Opsionale) Lejon qasjen pa autentifikim në GET
        public async Task<IActionResult> GetCarModels()
        {
            var carModels = await _context.CarModels
                .Include(cm => cm.Manufacturer)
                .Select(cm => new
                {
                    cm.CarModelId,
                    Name = cm.modelName,
                    yearDto = cm.Year.Year,
                    ManufacturerId = cm.ManufacturerId,
                    ManufacturerName = cm.Manufacturer != null ? cm.Manufacturer.Name : null
                })
                .ToListAsync();

            return Ok(carModels);
        }

        // ✅ POST: api/CarModels
        [HttpPost]
        public async Task<IActionResult> AddCarModel([FromBody] AddCarModelDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var carModel = new CarModel
            {
                modelName = dto.ModelName ?? "",
                ManufacturerId = dto.ManufacturerId,
                Year = dto.YearDto.HasValue ? new DateOnly(dto.YearDto.Value, 1, 1) : new DateOnly(2000, 1, 1),
            };

            _context.CarModels.Add(carModel);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                carModel.CarModelId,
                carModel.modelName,
                carModel.ManufacturerId,
                YearStart = carModel.Year.Year,
            });
        }

        // ✅ PUT: api/CarModels/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCarModel(int id, [FromBody] AddCarModelDto dto)
        {
            var carModel = await _context.CarModels.FindAsync(id);
            if (carModel == null)
                return NotFound();

            carModel.modelName = dto.ModelName ?? carModel.modelName;
            carModel.ManufacturerId = dto.ManufacturerId != 0 ? dto.ManufacturerId : carModel.ManufacturerId;
            carModel.Year = dto.YearDto.HasValue ? new DateOnly(dto.YearDto.Value, 1, 1) : carModel.Year;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                carModel.CarModelId,
                carModel.modelName,
                carModel.ManufacturerId,
                YearStart = carModel.Year.Year,
            });
        }

        // ✅ DELETE: api/CarModels/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCarModel(int id)
        {
            var carModel = await _context.CarModels.FindAsync(id);
            if (carModel == null)
                return NotFound();

            _context.CarModels.Remove(carModel);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Car model deleted successfully." });
        }
    }
}
