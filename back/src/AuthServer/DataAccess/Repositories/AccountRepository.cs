using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Quizalot.DataAccess.Entities;
using MongoDB.Bson;

namespace Quizalot.DataAccess.Repositories
{
    public class AccountRepository : RepositoryBase<AccountEntity>, IAccountRepository
    {
        public AccountRepository(IMongoClient mongoClient, IClientSessionHandle clientSessionHandle) : base(mongoClient, clientSessionHandle)
        {
        }

        public async Task<AccountEntity> FindByEmailAsync(string email)
        {
            var result = await Collection.FindAsync(x => x.Email == email);
            return await result.SingleOrDefaultAsync();
        }
    }
}
