using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
    }
}