using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaitTimeCalculationApi.Data;
using WaitTimeCalculationApi.Interfaces;
using WaitTimeCalculationApi.Models;

namespace WaitTimeCalculationApi.Repositories
{
    public class LineEntryRepository(ApplicationDbContext context) : ILineEntryRepository
    {
        private readonly ApplicationDbContext _context = context;

        public async Task<LineEntry> CreateAsync(LineEntry lineEntryModel)
        {
            await _context.LineEntries.AddAsync(lineEntryModel);
            await _context.SaveChangesAsync();
            return lineEntryModel;
        }
    }
}