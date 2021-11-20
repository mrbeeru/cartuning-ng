using Quizalot.DataAccess.Entities;

namespace AppServer.DataAccess.Entities
{
    public class CarEngineEntity
    {
        public string? Kind { get; set; }
        public string? Name { get; set; }
        public int Hp { get; set; }
        public int Nm { get; set; }
        public CarStageEntity? Stage1 { get; set; }
    }
}
