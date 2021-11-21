using CartuningServer.DataAccess.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CartuningServer.DataAccess.Repositories
{
    public interface ITuningRepository
    {
        Task SaveTuningStructure(IEnumerable<CarBrandEntity> tuningStructure);
        Task<IEnumerable<CarBrandEntity>> GetTuningStructure();
    }
}
