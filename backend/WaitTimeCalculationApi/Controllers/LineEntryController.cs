using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WaitTimeCalculationApi.Extensions;
using WaitTimeCalculationApi.Interfaces;
using WaitTimeCalculationApi.Mappers;
using WaitTimeCalculationApi.Models;

namespace WaitTimeCalculationApi.Controllers
{
    [ApiController]
    [Route("api/lineEntry")]
    public class LineEntryController(UserManager<User> userManager, ILineService lineService, ILineEntryService lineEntryService) : ControllerBase
    {
        private readonly UserManager<User> _userManager = userManager;
        private readonly ILineService _lineService = lineService;
        private readonly ILineEntryService _lineEntryService = lineEntryService;

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Enter([FromBody] Guid LineId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            if (appUser == null) return Unauthorized();

            var line = await _lineService.GetByIdAsync(LineId);
            if (line == null) return BadRequest("Line not found");

            var lineEntry = await _lineEntryService.EnterAsync(line, appUser);

            return Ok(lineEntry.ToEnterResponseDto());
        }

        [HttpPut]
        [Route("{id:guid}")]
        [Authorize]
        public async Task<IActionResult> Exit([FromRoute] Guid id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            if (appUser == null) return Unauthorized();

            var lineEntryModel = await _lineEntryService.ExitAsync(id, appUser.Id);
            if (lineEntryModel == null)
            {
                return NotFound();
            }

            return Ok(lineEntryModel.ToExitResponseDto());
        }
    }
}