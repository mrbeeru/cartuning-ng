using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace CartuningServer.DataAccess.Entities
{
    public class CarGenerationEntity
    {
        public int StartYear { get; set; }
        public int EndYear { get; set; }
        public string IconPath { get; set; }
        public List<CarEngineEntity> DieselEngines { get; set; }
        public List<CarEngineEntity> PetrolEngines { get; set; }
    }
}
