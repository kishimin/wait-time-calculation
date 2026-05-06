using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaitTimeCalculationApi.Dtos.Line;
using WaitTimeCalculationApi.Interfaces;
using WaitTimeCalculationApi.Mappers;
using WaitTimeCalculationApi.Models;
using WaitTimeCalculationApi.Repositories;

namespace WaitTimeCalculationApi.Services
{
    public class LineService : ILineService
    {
        private readonly ILineRepository _lineRepo;

        public LineService(ILineRepository lineRepo)
        {
            _lineRepo = lineRepo;
        }

        public async Task<LineResponseDto> CreateAsync(LineRequestDto lineRequestDto)
        {
            var lineModel = lineRequestDto.ToLineFromRequestDTO();
            await _lineRepo.CreateAsync(lineModel);
            return lineModel.ToLineResponseDto();
        }

        public async Task<List<Line>> GetAllAsync()
        {
            return await _lineRepo.GetAllAsync();
        }
    }
}