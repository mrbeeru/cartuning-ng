
using CartuningServer.DataAccess.Entities;
using MongoDB.Bson;
using System.Threading.Tasks;

namespace CartuningServer.DataAccess.Repositories
{
    public interface IAccountPermissionRepository : IRepositoryBase<AccountPermissionEntity>
    {
        Task<AccountPermissionEntity> FindByAccountIdAsync(ObjectId accountId);
    }
}