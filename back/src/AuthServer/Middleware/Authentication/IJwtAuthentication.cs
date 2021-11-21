using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartuningServer.Middleware.Authentication
{
    public interface IJwtAuthentication
    {
        string Authenticate(string email, ObjectId id);
    }
}
