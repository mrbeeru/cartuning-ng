using AuthServer.Models;
using CartuningServerModels.HttpDataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartuningServerServices.Account
{
    public interface IAccountService
    {
        Task Register(NewAccountModel account);
        Task<AuthenticationResultModel> DefaultAuthentication(NewAccountModel account);
        Task<AuthenticationResultModel> DiscordAuthentication(string code);
    }
}
