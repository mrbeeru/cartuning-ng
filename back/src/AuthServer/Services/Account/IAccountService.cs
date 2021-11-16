using AuthServer.Models;
using Quizalot.DataAccess.Entities;
using Quizalot.Models.HttpDataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quizalot.Services.Account
{
    public interface IAccountService
    {
        Task Register(NewAccountModel account);
        Task<AuthenticationResultModel> DefaultAuthentication(NewAccountModel account);
        Task<AuthenticationResultModel> DiscordAuthentication(string code);
    }
}
