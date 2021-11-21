using CartuningServer.Middleware;
using Microsoft.AspNetCore.Authorization;
using MongoDB.Bson;
using Quizalot.DataAccess.Repositories;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace AppServer.Middleware
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

            context.Succeed(requirement);
        }
    }
}
