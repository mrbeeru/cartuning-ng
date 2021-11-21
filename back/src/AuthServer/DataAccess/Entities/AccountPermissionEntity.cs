using MongoDB.Bson;

namespace CartuningServer.DataAccess.Entities
{
    [BsonCollection("account.permissions")]
    public class AccountPermissionEntity : EntityBase
    {
        public ObjectId AccountId { get; set; }
    }
}
