using AppServer.DataAccess.Entities;
using AppServer.DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AppServer.Controllers
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
        public async Task<IActionResult> Post(IEnumerable<CarBrandEntity> tuningStructure)
        {
            await tuningRepository.SaveTuningStructure(tuningStructure);
            return Ok();
        }
    }
}
