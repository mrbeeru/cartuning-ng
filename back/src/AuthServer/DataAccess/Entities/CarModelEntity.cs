using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace CartuningServer.DataAccess.Entities
{
    public class CarModelEntity
    {
        public string Name { get; set; }
        public string IconPath { get; set; }
        public List<CarGenerationEntity> Generations { get; set; }
    }
}
