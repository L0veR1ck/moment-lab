using MomentLab.Core.Entities;

namespace MomentLab.Core.Interfaces;

public interface IPortfolioRepository
{
    Task<IEnumerable<PortfolioProject>> GetAllAsync();
    Task<PortfolioProject?> GetByIdAsync(Guid id);
    Task<PortfolioProject> CreateAsync(PortfolioProject project);
    Task<PortfolioProject> UpdateAsync(PortfolioProject project);
    Task<bool> DeleteAsync(Guid id);
    Task<PortfolioPhoto> AddPhotoAsync(PortfolioPhoto photo);
    Task<bool> DeletePhotoAsync(Guid photoId);
}
