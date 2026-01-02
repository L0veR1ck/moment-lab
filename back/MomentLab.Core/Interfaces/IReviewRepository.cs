using MomentLab.Core.Entities;

namespace MomentLab.Core.Interfaces;

public interface IReviewRepository
{
    Task<Review?> GetByIdAsync(Guid id);
    Task<(IEnumerable<Review> items, int totalCount)> GetAllAsync(int page, int pageSize, bool? isApproved = null);
    Task<Review> CreateAsync(Review review);
    Task<Review> UpdateAsync(Review review);
    Task<bool> DeleteAsync(Guid id);
    Task<Review?> ApproveAsync(Guid id);
}

