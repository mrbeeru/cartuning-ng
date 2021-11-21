using CartuningServer.DataAccess.Entities;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartuningServer.DataAccess.Repositories
{
    public interface IRepositoryBase<T> where T : EntityBase
    {
        Task InsertAsync(T obj);
        Task DeleteAsync(ObjectId id);
        Task<T> FindByIdAsync(ObjectId id);
    }
}
