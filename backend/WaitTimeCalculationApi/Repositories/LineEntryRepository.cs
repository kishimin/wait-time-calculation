using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WaitTimeCalculationApi.Data;
using WaitTimeCalculationApi.Interfaces;
using WaitTimeCalculationApi.Models;
using WaitTimeCalculationApi.Projections;

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

        public async Task<UserLatestEntryInfo?> GetCurrentEntryAsync(Guid lineId, string userId)
        {
            return await _context.LineEntries
                .AsNoTracking()
                .Where(x =>
                    x.LineId == lineId &&
                    x.UserId == userId &&
                    x.ExitedAt == null)
                .OrderByDescending(x => x.EnteredAt)
                .Select(x => new UserLatestEntryInfo
                {
                    LineEntryId = x.Id
                })
                .FirstOrDefaultAsync();
        }

        public async Task<LineEntry?> UpdateAsync(Guid id, string userId, LineEntry lineEntryModel)
        {
            var existingLineEntry = await _context.LineEntries
                .FirstOrDefaultAsync(e => e.Id == id && e.UserId == userId);

            if (existingLineEntry == null)
            {
                return null;
            }

            existingLineEntry.ExitedAt = lineEntryModel.ExitedAt;
            existingLineEntry.UpdatedAt = lineEntryModel.UpdatedAt;

            await _context.SaveChangesAsync();
            return existingLineEntry;
        }
    }
}