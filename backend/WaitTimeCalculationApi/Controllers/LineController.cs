using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WaitTimeCalculationApi.Dtos.Line;
using WaitTimeCalculationApi.Interfaces;

namespace WaitTimeCalculationApi.Controllers
{
    [ApiController]
    [Route("api/line")]
    public class LineController : ControllerBase
    {
        private readonly ILineService _lineService;

        public LineController(ILineService lineService)
        {
            _lineService = lineService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var lines = await _lineService.GetAllAsync();

            return Ok(lines);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var lineResponseDto = await _lineService.GetByIdAsync(id);

            if (lineResponseDto == null)
            {
                return NotFound();
            }

            return Ok(lineResponseDto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] LineRequestDto lineRequestDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var lineResponseDto = await _lineService.CreateAsync(lineRequestDto);

            return CreatedAtAction(nameof(GetById), new { id = lineResponseDto.Id }, lineResponseDto);
        }
    }
}