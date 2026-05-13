using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaitTimeCalculationApi.Dtos.Line;
using WaitTimeCalculationApi.Models;
using WaitTimeCalculationApi.Results;

namespace WaitTimeCalculationApi.Interfaces
{
    public interface ILineService
    {
        Task<List<LinesResult>> GetAllForUserAsync(string userId);

        Task<Line?> GetByIdAsync(Guid id);

        Task<Line> CreateAsync(LineRequestDto lineRequestDto);
    }
}