using AutoPjesa.Domain.Entities;
using AutoPjesa.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoPjesaa.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ManufacturersController : ControllerBase
    {
        private readonly AutoPjesaDbContext _context;

        public ManufacturersController(AutoPjesaDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Manufacturer>>> GetManufacturers()
        {
            return await _context.Manufacturers
                .Include(m => m.SupplierManufacturers)
                .ToListAsync();
        }
        [HttpGet("{id}")]
 public async Task<ActionResult<Manufacturer>> GetManufacturer(int id)
        {
            var manufacturer = await _context.Manufacturers
                .Include(m => m.SupplierManufacturers)
                .FirstOrDefaultAsync(m => m.ManufacturerId == id);

            if (manufacturer == null)
                return NotFound();

            return manufacturer;
        }
    }
}
