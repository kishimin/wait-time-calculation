using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaitTimeCalculationApi.Dtos.Line;
using WaitTimeCalculationApi.Dtos.LineEntry;
using WaitTimeCalculationApi.Models;

namespace WaitTimeCalculationApi.Mappers
{
    public static class LineEntryMappers
    {
        public static EnterResponseDto ToEnterResponseDto(this LineEntry lineEntryModel)
        {
            return new EnterResponseDto
            {
                EnteredAt = lineEntryModel.EnteredAt
            };
        }
    }
}