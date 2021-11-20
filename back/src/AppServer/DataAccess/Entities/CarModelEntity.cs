using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Quizalot.DataAccess.Entities;

namespace AppServer.DataAccess.Entities
{
    [BsonCollection("carModels")]
    public class CarModelEntity
    {
        public string? Name { get; set; }
        public string? IconPath { get; set; }
        public List<CarGenerationEntity>? Generations { get; set; }
    }
}
