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
        private readonly IAccountPermissionRepository accountPermissionRepository;

        public PermissionAuthorizationHandler(IAccountPermissionRepository accountPermissionRepository)
        {
            this.accountPermissionRepository = accountPermissionRepository;
        }

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
        {
            var accountId = context.User.Claims?.FirstOrDefault(x => x.Type.Equals("id", StringComparison.OrdinalIgnoreCase))?.Value;
            var permission = await accountPermissionRepository.FindByAccountIdAsync(ObjectId.Parse(accountId));

            if ((permission.Permissions & requirement.Permission) == requirement.Permission)
                context.Succeed(requirement);
            else 
                context.Fail();
        }
    }
}
