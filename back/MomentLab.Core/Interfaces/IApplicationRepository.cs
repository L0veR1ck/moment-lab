using MomentLab.Core.Entities;

namespace MomentLab.Core.Interfaces;

public interface IApplicationRepository
{
    Task<ApplicationRequest> CreateAsync(ApplicationRequest application);
    Task<ApplicationRequest?> GetByIdAsync(Guid id);
    Task<(List<ApplicationRequest> Items, int TotalCount)> GetAllAsync(int page, int pageSize);
    Task<ApplicationRequest> UpdateAsync(ApplicationRequest application);
    Task<List<ApplicationRequest>> GetUnprocessedApplicationsAsync();
}

