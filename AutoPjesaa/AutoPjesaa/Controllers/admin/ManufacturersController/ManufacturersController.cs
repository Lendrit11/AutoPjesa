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

        // GET: api/Manufacturers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Manufacturer>>> GetManufacturers()
        {
            return await _context.Manufacturers
                .Include(m => m.SupplierManufacturers)
                .ToListAsync();
        }

        // GET: api/Manufacturers/5
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

        // POST: api/Manufacturers
        [HttpPost]
        public async Task<ActionResult<Manufacturer>> CreateManufacturer(Manufacturer manufacturer)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Manufacturers.Add(manufacturer);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetManufacturer), new { id = manufacturer.ManufacturerId }, manufacturer);
        }

        // PUT: api/Manufacturers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateManufacturer(int id, Manufacturer manufacturer)
        {
            if (id != manufacturer.ManufacturerId)
                return BadRequest("ID mismatch");

            _context.Entry(manufacturer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ManufacturerExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/Manufacturers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteManufacturer(int id)
        {
            var manufacturer = await _context.Manufacturers.FindAsync(id);
            if (manufacturer == null)
                return NotFound();

            _context.Manufacturers.Remove(manufacturer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ManufacturerExists(int id)
        {
            return _context.Manufacturers.Any(e => e.ManufacturerId == id);
        }
    }
}
