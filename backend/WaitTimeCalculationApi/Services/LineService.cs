using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaitTimeCalculationApi.Dtos.Line;
using WaitTimeCalculationApi.Interfaces;
using WaitTimeCalculationApi.Mappers;
using WaitTimeCalculationApi.Models;
using WaitTimeCalculationApi.Results;

namespace WaitTimeCalculationApi.Services
{
    public class LineService(ILineRepository lineRepo, ILineEntryRepository lineEntryRepo) : ILineService
    {
        private readonly ILineRepository _lineRepo = lineRepo;
        private readonly ILineEntryRepository _lineEntryRepo = lineEntryRepo;

        public async Task<Line> CreateAsync(LineRequestDto lineRequestDto)
        {
            var lineModel = lineRequestDto.ToLineFromRequestDTO();
            await _lineRepo.CreateAsync(lineModel);
            return lineModel;
        }

        public async Task<List<LinesResult>> GetAllForUserAsync(string userId)
        {
            var lines = await _lineRepo.GetAllAsync();
            var userLineEntry = await _lineEntryRepo.GetCurrentEntryAsync(userId);

            var linesResult = lines
            .Select(line => new LinesResult
            {
                Id = line.Id,
                Title = line.Title,
                AverageWaitTime = line.LineEntries
                    .Where(lineEntry => lineEntry.ExitedAt != null)
                    .Select(lineEntry => (lineEntry.ExitedAt!.Value - lineEntry.EnteredAt).TotalSeconds)
                    .DefaultIfEmpty(0)
                    .Average(),
                IsEntry = userLineEntry != null && userLineEntry.LineId == line.Id && userLineEntry.ExitedAt == null,
            })
            .ToList();
            return linesResult;
        }

        public async Task<Line?> GetByIdAsync(Guid id)
        {
            var lineModel = await _lineRepo.GetByIdAsync(id);

            return lineModel;
        }
    }
}