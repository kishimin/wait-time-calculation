using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaitTimeCalculationApi.Interfaces;
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

        public async Task<Line> CreateAsync(Line lineModel)
        {
            return await _lineRepo.CreateAsync(lineModel);
        }

        public async Task<List<Line>> GetAllAsync()
        {
            return await _lineRepo.GetAllAsync();
        }
    }
}