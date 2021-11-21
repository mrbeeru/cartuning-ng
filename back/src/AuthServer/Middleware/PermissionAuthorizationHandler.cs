using CartuningServer.DataAccess.Repositories;
using CartuningServer.Middleware;
using Microsoft.AspNetCore.Authorization;
using MongoDB.Bson;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CartuningServer.Middleware
{
    public class PermissionAuthorizationHandler : AuthorizationHandler<PermissionRequirement>
    {
        private readonly IAccountRepository accountRepository;

        public PermissionAuthorizationHandler(IAccountRepository accountRepository)
        {
            this.accountRepository = accountRepository;
        }

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
        {
            var userId = context.User.Claims?.FirstOrDefault(x => x.Type.Equals("id", StringComparison.OrdinalIgnoreCase))?.Value;
            var user = await accountRepository.FindByIdAsync(ObjectId.Parse(userId));

            context.Fail();
        }
    }
}
