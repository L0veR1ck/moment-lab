using MomentLab.Core.Entities;

namespace MomentLab.Core.Interfaces;

public interface IEventRepository
{
    Task<Event?> GetByIdAsync(Guid id);
    Task<(IEnumerable<Event> items, int totalCount)> GetAllAsync(int page, int pageSize, bool? isActive = null);
    Task<Event> CreateAsync(Event @event);
    Task<Event> UpdateAsync(Event @event);
    Task<bool> DeleteAsync(Guid id);
    Task<EventPhoto> AddPhotoAsync(EventPhoto photo);
    Task<bool> DeletePhotoAsync(Guid photoId);
}



