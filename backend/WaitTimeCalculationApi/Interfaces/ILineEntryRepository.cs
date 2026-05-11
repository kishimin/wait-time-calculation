using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaitTimeCalculationApi.Models;

namespace WaitTimeCalculationApi.Interfaces
{
    public interface ILineEntryRepository
    {
        Task<LineEntry> CreateAsync(LineEntry lineEntryModel);

        Task<LineEntry?> UpdateAsync(Guid id, LineEntry lineEntryModel);

        // userIdから、LineEntryの中で、UpdatedAtが最新のもののみ取得
    }
}