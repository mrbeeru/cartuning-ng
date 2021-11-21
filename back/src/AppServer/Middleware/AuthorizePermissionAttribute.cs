using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;

namespace AppServer.Middleware
{
    [Flags]
    public enum Permissions
    {
        None = 0,
        CanEditTuningTable = 1 << 0,
    }


    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = true)]
    public class AuthorizePermissionAttribute : Attribute, IAuthorizationFilter
    {
        public AuthorizePermissionAttribute(params Permissions[] permissions)
        {
            Permissions = permissions;
        }

        public Permissions[] Permissions { get; }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            
        }
    }
}
