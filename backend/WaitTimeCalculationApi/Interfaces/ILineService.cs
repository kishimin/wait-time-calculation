using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaitTimeCalculationApi.Dtos.Line;

namespace WaitTimeCalculationApi.Interfaces
{
    public interface ILineService
    {
        Task<List<LineResponseDto>> GetAllAsync();

        Task<LineResponseDto?> GetByIdAsync(Guid id);

        Task<LineResponseDto> CreateAsync(LineRequestDto lineRequestDto);
    }
}