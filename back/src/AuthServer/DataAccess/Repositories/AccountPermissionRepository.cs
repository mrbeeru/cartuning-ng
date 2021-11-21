using CartuningServer.DataAccess.Entities;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace CartuningServer.DataAccess.Repositories
{
    public class AccountPermissionRepository : RepositoryBase<AccountPermissionEntity>, IAccountPermissionRepository
    {
        public AccountPermissionRepository(IMongoClient mongoClient, IClientSessionHandle clientSessionHandle) : base(mongoClient, clientSessionHandle)
        {
        }

        public async Task<AccountPermissionEntity> FindByAccountIdAsync(ObjectId accountId)
        {
            return (await Collection.FindAsync(x => x.AccountId == accountId)).SingleOrDefault();
        }
    }
}
