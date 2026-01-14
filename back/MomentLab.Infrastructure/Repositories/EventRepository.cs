using Microsoft.EntityFrameworkCore;
using MomentLab.Core.Entities;
using MomentLab.Core.Interfaces;
using MomentLab.Infrastructure.Data;

namespace MomentLab.Infrastructure.Repositories;

public class EventRepository : IEventRepository
{
    private readonly ApplicationDbContext _context;

    public EventRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Event?> GetByIdAsync(Guid id)
    {
        return await _context.Events
            .Include(e => e.Characteristics)
            .Include(e => e.Photos.OrderBy(p => p.DisplayOrder))
            .FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task<(IEnumerable<Event> items, int totalCount)> GetAllAsync(
        int page, 
        int pageSize, 
        bool? isActive = null)
    {
        var query = _context.Events
            .Include(e => e.Characteristics)
            .Include(e => e.Photos.OrderBy(p => p.DisplayOrder))
            .AsQueryable();

        if (isActive.HasValue)
        {
            query = query.Where(e => e.IsActive == isActive.Value);
        }

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderBy(e => e.DisplayOrder)
            .ThenByDescending(e => e.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalCount);
    }

    public async Task<Event> CreateAsync(Event @event)
    {
        @event.Id = Guid.NewGuid();
        @event.CreatedAt = DateTime.UtcNow;
        @event.UpdatedAt = DateTime.UtcNow;

        foreach (var characteristic in @event.Characteristics)
        {
            characteristic.Id = Guid.NewGuid();
            characteristic.EventId = @event.Id;
        }

        _context.Events.Add(@event);
        await _context.SaveChangesAsync();

        return @event;
    }

    public async Task<Event> UpdateAsync(Event @event)
    {
        @event.UpdatedAt = DateTime.UtcNow;

        var existingEvent = await _context.Events
            .Include(e => e.Characteristics)
            .FirstOrDefaultAsync(e => e.Id == @event.Id);

        if (existingEvent != null)
        {
            _context.Entry(existingEvent).CurrentValues.SetValues(@event);

            foreach (var existingCharacteristic in existingEvent.Characteristics.ToList())
            {
                _context.EventCharacteristics.Remove(existingCharacteristic);
            }

            foreach (var characteristic in @event.Characteristics)
            {
                characteristic.Id = Guid.NewGuid();
                characteristic.EventId = @event.Id;
                existingEvent.Characteristics.Add(characteristic);
            }
        }

        await _context.SaveChangesAsync();

        return @event;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var @event = await _context.Events.FindAsync(id);
        if (@event == null)
        {
            return false;
        }

        _context.Events.Remove(@event);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<EventPhoto> AddPhotoAsync(EventPhoto photo)
    {
        photo.Id = Guid.NewGuid();
        photo.UploadedAt = DateTime.UtcNow;

        _context.EventPhotos.Add(photo);
        await _context.SaveChangesAsync();

        return photo;
    }

    public async Task<bool> DeletePhotoAsync(Guid photoId)
    {
        var photo = await _context.EventPhotos.FindAsync(photoId);
        if (photo == null)
        {
            return false;
        }

        _context.EventPhotos.Remove(photo);
        await _context.SaveChangesAsync();

        return true;
    }
}

