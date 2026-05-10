using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaitTimeCalculationApi.Models;

namespace WaitTimeCalculationApi.Interfaces
{
    public interface ILineEntryService
    {
        Task<LineEntry> EnterAsync(Line line, User user);

        Task<LineEntry> ExitAsync(Guid id);
    }
}