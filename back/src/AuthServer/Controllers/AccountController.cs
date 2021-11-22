using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CartuningServerServices.Account;
using CartuningServerModels.HttpDataModels;
using Microsoft.AspNetCore.Authorization;
using CartuningServer.DataAccess.Repositories;
using MongoDB.Bson;
using CartuningServer.DataAccess.Entities;

namespace CartuningServer.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService accountService;
        private readonly IAccountPermissionRepository accountPermissionRepository;

        public AccountController(IAccountService accountService, IAccountPermissionRepository accountPermissionRepository)
        {
            this.accountService = accountService;
            this.accountPermissionRepository = accountPermissionRepository;
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

        [HttpGet("permissions")]
        [Authorize]
        public async Task<IActionResult> GetPermissions()
        {
            var id = Request.HttpContext.User.Claims?.FirstOrDefault(x => x.Type.Equals("id", StringComparison.OrdinalIgnoreCase))?.Value;
            var permissions = await accountPermissionRepository.FindByAccountIdAsync(ObjectId.Parse(id));

            return Ok(new { Flags = permissions?.Permissions });
        }
    }
}
