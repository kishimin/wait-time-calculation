using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaitTimeCalculationApi.Dtos.Line;
using WaitTimeCalculationApi.Interfaces;
using WaitTimeCalculationApi.Mappers;
using WaitTimeCalculationApi.Models;

namespace WaitTimeCalculationApi.Services
{
    public class LineService(ILineRepository lineRepo) : ILineService
    {
        private readonly ILineRepository _lineRepo = lineRepo;

        public async Task<LineResponseDto> CreateAsync(LineRequestDto lineRequestDto)
        {
            var lineModel = lineRequestDto.ToLineFromRequestDTO();
            await _lineRepo.CreateAsync(lineModel);
            return lineModel.ToLineResponseDto();
        }

        public async Task<List<LineResponseDto>> GetAllAsync()
        {
            var lines = await _lineRepo.GetAllAsync();
            return lines.Select(l => l.ToLineResponseDto()).ToList();
        }

        public async Task<LineResponseDto?> GetByIdAsync(Guid id)
        {
            var lineModel = await _lineRepo.GetByIdAsync(id);

            if (lineModel == null)
            {
                return null;
            }

            return lineModel.ToLineResponseDto();
        }
    }
}