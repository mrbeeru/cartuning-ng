using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quizalot.Core.Authentication
{
    public interface IJwtAuthentication
    {
        string Authenticate(string email);
    }
}
