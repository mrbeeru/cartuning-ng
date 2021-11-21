using Microsoft.AspNetCore.Authorization;

namespace AppServer.Middleware
{
    public class PermissionAuthorizationHandler : IAuthorizationHandler
    {
        public async Task HandleAsync(AuthorizationHandlerContext context)
        {
            //throw new NotImplementedException();
            await Task.Delay(0);
        }
    }
}
