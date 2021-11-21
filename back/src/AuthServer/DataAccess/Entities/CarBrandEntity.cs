using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using CartuningServer.DataAccess.Entities;

namespace CartuningServer.DataAccess.Entities
{
    [BsonCollection("carBrands")]
    public class CarBrandEntity : EntityBase
    {
        public string Name { get; set; }
        public string IconPath { get; set; }
        public List<CarModelEntity> Models { get; set; }
    }
}
