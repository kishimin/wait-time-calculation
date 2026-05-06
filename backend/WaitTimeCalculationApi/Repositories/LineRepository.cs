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
    public class LineRepository : ILineRepository
    {
        private readonly ApplicationDbContext _context;

        public LineRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Line> CreateAsync(Line lineModel)
        {
            await _context.Lines.AddAsync(lineModel);
            await _context.SaveChangesAsync();

            return lineModel;
        }

        public Task<List<Line>> GetAllAsync()
        {
            return _context.Lines.ToListAsync();
        }
    }
}