using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Quizalot.DataAccess.Entities;

namespace Quizalot.DataAccess.Repositories
{
    public interface IRepositoryBase<T> where T : EntityBase
    {
        Task InsertAsync(T obj);
        Task DeleteAsync(ObjectId id);
        Task<List<T>> FindByIdAsync(ObjectId id);
    }
}
