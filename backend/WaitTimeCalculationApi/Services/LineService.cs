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
    public class LineService(ILineRepository lineRepo) : ILineService
    {
        private readonly ILineRepository _lineRepo = lineRepo;

        public async Task<Line> CreateAsync(LineRequestDto lineRequestDto)
        {
            var lineModel = lineRequestDto.ToLineFromRequestDTO();
            await _lineRepo.CreateAsync(lineModel);
            return lineModel;
        }

        public async Task<List<LinesResult>> GetAllAsync(string userId)
        {
            var lines = await _lineRepo.GetAllAsync();

            var linesResult = lines
            // 平均待ち時間を算出
            .Select(line =>
                line.LineEntries.Select(lineEntry =>
                    (lineEntry.ExitedAt - lineEntry.EnteredAt)
            ).Average()
            // IsEntryを算出
            .Select(line =>
            line
            // RepositoryでuserIdから、LineEntryの中で、UpdatedAtが最新のもののみ取得
            )
            )
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