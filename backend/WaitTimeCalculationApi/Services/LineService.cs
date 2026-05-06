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
        private readonly LineRepository _lineRepo;

        public LineService(LineRepository lineRepo)
        {
            _lineRepo = lineRepo;
        }

        public async Task<List<Line>> GetAllAsync()
        {
            return await _lineRepo.GetAllAsync();
        }
    }
}