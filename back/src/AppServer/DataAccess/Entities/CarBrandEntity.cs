using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Quizalot.DataAccess.Entities;

namespace AppServer.DataAccess.Entities
{
    [BsonCollection("carBrands")]
    public class CarBrandEntity : EntityBase
    {
        public string? Name { get; set; }
        public string? IconPath { get; set; }
        public List<CarModelEntity>? Models { get; set; }
    }
}
