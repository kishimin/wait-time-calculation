using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaitTimeCalculationApi.Dtos.Line;
using WaitTimeCalculationApi.Models;

namespace WaitTimeCalculationApi.Interfaces
{
    public interface ILineService
    {
        Task<List<Line>> GetAllAsync();

        Task<LineResponseDto?> GetByIdAsync(Guid id);

        Task<LineResponseDto> CreateAsync(LineRequestDto lineRequestDto);
    }
}