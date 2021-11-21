using CartuningServer.DataAccess.Entities;
using CartuningServer.DataAccess.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CartuningServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TuningCatalogController : ControllerBase
    {
        private readonly ITuningRepository tuningRepository;

        public TuningCatalogController(ITuningRepository tuningRepository)
        {
            this.tuningRepository = tuningRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var tuningStructure = await tuningRepository.GetTuningStructure();
                return Ok(tuningStructure);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        // POST api/<TuningCatalogController>
        [HttpPost]
        [Authorize, Authorize(Policy = "CanEditTuningTable")]
        public async Task<IActionResult> Post(IEnumerable<CarBrandEntity> tuningStructure)
        {
            await tuningRepository.SaveTuningStructure(tuningStructure);
            return Ok();
        }
    }
}
