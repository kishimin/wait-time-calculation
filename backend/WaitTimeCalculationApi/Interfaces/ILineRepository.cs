using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaitTimeCalculationApi.Models;

namespace WaitTimeCalculationApi.Interfaces
{
    public interface ILineRepository
    {
        Task<List<Line>> GetAllAsync();

        Task<Line?> GetByIdAsync(Guid id);

        Task<Line> CreateAsync(Line lineModel);
    }
}