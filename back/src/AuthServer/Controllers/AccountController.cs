using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Quizalot.DataAccess.Entities;
using Quizalot.DataAccess.Repositories;
using Quizalot.Services.Account;
using Quizalot.Models.HttpDataModels;

namespace Quizalot.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService accountService;

        public AccountController(IAccountService accountService)
        {
            this.accountService = accountService;
        }


        [HttpPost("register")]
        public async Task<IActionResult> RegisterAccount(NewAccountModel newAccount)
        {
            try
            {
                await accountService.Register(newAccount);
                return Ok();
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost("auth/default")]
        public async Task<IActionResult> DefaultAuthentication(NewAccountModel account)
        {
            try
            {
                var jwt = await accountService.DefaultAuthentication(account);

                if (jwt == null)
                    return Unauthorized();

                return Ok(jwt);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("auth/discord")]
        public async Task<IActionResult> DiscordAuthentication(DiscordCodeModel payload)
        {
            var jwt = await accountService.DiscordAuthentication(payload.Code);
            
            if (jwt == null)
                return Unauthorized();

            return Ok(jwt);
        }
    }
}
