using Microsoft.AspNetCore.Authorization;
using System;

namespace CartuningServer.Middleware
{
    [Flags]
    public enum Permission
    {
        None = 0,
        CanEditTuningTable = 1 << 0,
    }

    public class PermissionRequirement : IAuthorizationRequirement
    {
        public PermissionRequirement(Permission permissions)
        {
            Permission = permissions;
        }

        public Permission Permission { get; }
    }
}
