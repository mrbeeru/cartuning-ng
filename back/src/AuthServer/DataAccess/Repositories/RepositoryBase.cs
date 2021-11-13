using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Quizalot.DataAccess.Entities;

namespace Quizalot.DataAccess.Repositories
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : EntityBase
    {
        private const string DATABASE = "cartuningDB";
        private readonly IMongoClient mongoClient;
        private readonly IClientSessionHandle clientSessionHandle;
        private readonly string collectionName;

        public RepositoryBase(IMongoClient mongoClient, IClientSessionHandle clientSessionHandle)
        {
            this.mongoClient = mongoClient;
            this.clientSessionHandle = clientSessionHandle;
            this.collectionName = (typeof(T).GetCustomAttributes(typeof(BsonCollectionAttribute), true).FirstOrDefault() as BsonCollectionAttribute).CollectionName;

            if (!mongoClient.GetDatabase(DATABASE).ListCollectionNames().ToList().Contains(collectionName))
                mongoClient.GetDatabase(DATABASE).CreateCollection(collectionName);

            Collection = mongoClient.GetDatabase(DATABASE).GetCollection<T>(collectionName);
        }

        protected IMongoCollection<T> Collection { get; }

        public async Task InsertAsync(T obj) => await Collection.InsertOneAsync(clientSessionHandle, obj);

        public async Task DeleteAsync(ObjectId id) => await Collection.DeleteOneAsync(clientSessionHandle, f => f.Id == id);
    }
}
