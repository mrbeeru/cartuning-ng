using CartuningServer.DataAccess.Entities;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CartuningServer.DataAccess.Repositories
{
    public class TuningRepository : RepositoryBase<CarBrandEntity>, ITuningRepository
    {
        public TuningRepository(IMongoClient mongoClient, IClientSessionHandle clientSessionHandle) : base(mongoClient, clientSessionHandle)
        {
        }

        public async Task SaveTuningStructure(IEnumerable<CarBrandEntity> tuningStructure)
        {
            await Collection.DeleteManyAsync(Builders<CarBrandEntity>.Filter.Empty);
            await Collection.InsertManyAsync(tuningStructure);
        }

        public async Task<IEnumerable<CarBrandEntity>> GetTuningStructure()
        {
            return await Collection.Find(_ => true).ToListAsync();
        }
    }
}
