using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Quizalot.DataAccess.Entities;

namespace Quizalot.DataAccess.Repositories
{
    public interface IAccountRepository : IRepositoryBase<AccountEntity>
    {
        Task<AccountEntity> FindByEmailAsync(string email);
    }
}
