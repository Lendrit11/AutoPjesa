using AutoPjesa.Domain.Entities;
using AutoPjesa.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoPjesaa.model.DTO.Admin.CarModel;

namespace AutoPjesaa.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarModelsController : ControllerBase
    {
        private readonly AutoPjesaDbContext _context;

        public CarModelsController(AutoPjesaDbContext context)
        {
            _context = context;
        }

        // GET: api/CarModels
        [HttpGet]
        public async Task<IActionResult> GetCarModels()
        {
            var carModels = await _context.CarModels
                .Include(cm => cm.Manufacturer)
                .Select(cm => new
                {
                    cm.CarModelId,
                    Name = cm.modelName,
                    YearStart = cm.YearStart.Year,
                    YearEnd = cm.YearEnd.HasValue ? cm.YearEnd.Value.Year : (int?)null,
                    ManufacturerId = cm.ManufacturerId,
                    ManufacturerName = cm.Manufacturer != null ? cm.Manufacturer.Name : null
                })
                .ToListAsync();

            return Ok(carModels);
        }

        // POST: api/CarModels
        [HttpPost]
        public async Task<IActionResult> AddCarModel([FromBody] AddCarModelDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var carModel = new CarModel
            {
                modelName = dto.ModelName ?? "",
                ManufacturerId = dto.ManufacturerId,
                YearStart = dto.YearStart.HasValue ? new DateOnly(dto.YearStart.Value, 1, 1) : new DateOnly(2000, 1, 1),
                YearEnd = dto.YearEnd.HasValue ? new DateOnly(dto.YearEnd.Value, 1, 1) : null
            };

            _context.CarModels.Add(carModel);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                carModel.CarModelId,
                carModel.modelName,
                carModel.ManufacturerId,
                YearStart = carModel.YearStart.Year,
                YearEnd = carModel.YearEnd?.Year
            });
        }

       
    }
}
