using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaitTimeCalculationApi.Models;
using WaitTimeCalculationApi.Projections;

namespace WaitTimeCalculationApi.Interfaces
{
    public interface ILineEntryRepository
    {
        Task<LineEntry> CreateAsync(LineEntry lineEntryModel);

        Task<UserLatestEntryInfo?> GetCurrentEntryAsync(Guid lineId, string userId);

        Task<LineEntry?> UpdateAsync(Guid id, string userId, LineEntry lineEntryModel);

        Task<bool> ExistsCurrentEntryAsync(Guid lineId, string userId);
    }
}