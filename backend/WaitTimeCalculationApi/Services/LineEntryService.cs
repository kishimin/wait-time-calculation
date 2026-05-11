using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaitTimeCalculationApi.Dtos.Line;
using WaitTimeCalculationApi.Dtos.LineEntry;
using WaitTimeCalculationApi.Interfaces;
using WaitTimeCalculationApi.Models;

namespace WaitTimeCalculationApi.Services
{
    public class LineEntryService(ILineEntryRepository lineEntryRepo) : ILineEntryService
    {
        private readonly ILineEntryRepository _lineEntryRepo = lineEntryRepo;

        public async Task<LineEntry> EnterAsync(Line line, User user)
        {
            var lineEntryModel = new LineEntry
            {
                EnteredAt = DateTimeOffset.UtcNow,
                Line = line,
                LineId = line.Id,
                User = user,
                UserId = user.Id,
            };
            await _lineEntryRepo.CreateAsync(lineEntryModel);
            return lineEntryModel;
        }

        public async Task<LineEntry> ExitAsync(Guid id)
        {
            var lineEntryModel = new LineEntry
            {
                ExitedAt = DateTimeOffset.UtcNow,
                UpdatedAt = DateTimeOffset.UtcNow
            };
            var updatedLineEntry = await _lineEntryRepo.UpdateAsync(id, lineEntryModel);
            return updatedLineEntry;
        }
    }
}