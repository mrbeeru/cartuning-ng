using AppServer.DataAccess.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AppServer.DataAccess.Repositories
{
    public interface ITuningRepository
    {
        Task SaveTuningStructure(IEnumerable<CarBrandEntity> tuningStructure);
        Task<IEnumerable<CarBrandEntity>> GetTuningStructure();
    }
}
