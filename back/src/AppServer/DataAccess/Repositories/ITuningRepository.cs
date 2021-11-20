using AppServer.DataAccess.Entities;

namespace AppServer.DataAccess.Repositories
{
    public interface ITuningRepository
    {
        Task SaveTuningStructure(IEnumerable<CarBrandEntity> tuningStructure);
        Task<IEnumerable<CarBrandEntity>> GetTuningStructure();
    }
}
