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
using Microsoft.AspNetCore.Authorization;

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
                var authResult = await accountService.DefaultAuthentication(account);
                return Ok(authResult);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("auth/discord")]
        public async Task<IActionResult> DiscordAuthentication(DiscordCodeModel payload)
        {
            var authResult = await accountService.DiscordAuthentication(payload.Code);
            return Ok(authResult);
        }

        [HttpGet("details")]
        [Authorize]
        public async Task<IActionResult> GetAccountDetails()
        {
            return Ok();
        }
    }
}
