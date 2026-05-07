using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaitTimeCalculationApi.Dtos.Line;
using WaitTimeCalculationApi.Models;

namespace WaitTimeCalculationApi.Mappers
{
    public static class LineMappers
    {
        public static LineResponseDto ToLineResponseDto(this Line lineModel)
        {
            return new LineResponseDto
            {
                Id = lineModel.Id,
                Title = lineModel.Title,
                Explanation = lineModel.Explanation
            };
        }

        public static Line ToLineFromRequestDTO(this LineRequestDto lineDto)
        {
            return new Line
            {
                Title = lineDto.Title,
                Explanation = lineDto.Explanation
            };
        }
    }
}