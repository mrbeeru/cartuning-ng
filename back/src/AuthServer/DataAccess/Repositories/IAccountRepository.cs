using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CartuningServer.DataAccess.Entities;

namespace CartuningServer.DataAccess.Repositories
{
    public interface IAccountRepository : IRepositoryBase<AccountEntity>
    {
        Task<AccountEntity> FindByEmailAsync(string email);
    }
}
