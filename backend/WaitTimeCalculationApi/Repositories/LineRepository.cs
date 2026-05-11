using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WaitTimeCalculationApi.Data;
using WaitTimeCalculationApi.Interfaces;
using WaitTimeCalculationApi.Models;

namespace WaitTimeCalculationApi.Repositories
{
    public class LineRepository(ApplicationDbContext context) : ILineRepository
    {
        private readonly ApplicationDbContext _context = context;

        public async Task<Line> CreateAsync(Line lineModel)
        {
            await _context.Lines.AddAsync(lineModel);
            await _context.SaveChangesAsync();

            return lineModel;
        }

        public Task<List<Line>> GetAllAsync()
        {
            return _context.Lines.Include(l => l.LineEntries).ToListAsync();
        }

        public async Task<Line?> GetByIdAsync(Guid id)
        {
            return await _context.Lines.FindAsync(id);
        }
    }
}