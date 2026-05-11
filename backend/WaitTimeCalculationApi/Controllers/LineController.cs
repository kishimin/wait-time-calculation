using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WaitTimeCalculationApi.Dtos.Line;
using WaitTimeCalculationApi.Interfaces;
using WaitTimeCalculationApi.Mappers;

namespace WaitTimeCalculationApi.Controllers
{
    [ApiController]
    [Route("api/line")]
    public class LineController(ILineService lineService) : ControllerBase
    {
        private readonly ILineService _lineService = lineService;

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Index()
        {
            var linesResult = await _lineService.GetAllAsync();

            var linesResponse = linesResult.Select(l => l.ToLinesResponseDtoFromLinesResult()).ToList();

            return Ok(linesResponse);
        }

        [HttpGet("{id:guid}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var line = await _lineService.GetByIdAsync(id);

            if (line == null)
            {
                return NotFound();
            }

            return Ok(line.ToLineResponseDto());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] LineRequestDto lineRequestDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var line = await _lineService.CreateAsync(lineRequestDto);

            return CreatedAtAction(nameof(GetById), new { id = line.Id }, line.ToLineResponseDto());
        }
    }
}