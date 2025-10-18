using Microsoft.EntityFrameworkCore;
using MomentLab.Core.Entities;
using MomentLab.Core.Enums;
using MomentLab.Core.Interfaces;
using MomentLab.Infrastructure.Data;

namespace MomentLab.Infrastructure.Repositories;

public class ApplicationRepository(
    ApplicationDbContext context
) : IApplicationRepository
{
    public async Task<ApplicationRequest> CreateAsync(ApplicationRequest application)
    {
        application.Id = Guid.NewGuid();
        application.CreatedAt = DateTime.UtcNow;
        application.UpdatedAt = DateTime.UtcNow;

        await context.ApplicationRequests.AddAsync(application);
        await context.SaveChangesAsync();

        return application;
    }

    public async Task<ApplicationRequest?> GetByIdAsync(Guid id)
    {
        return await context.ApplicationRequests.FindAsync(id);
    }

    public async Task<(List<ApplicationRequest> Items, int TotalCount)> GetAllAsync(int page, int pageSize)
    {
        var query = context.ApplicationRequests.OrderByDescending(a => a.CreatedAt);

        var totalCount = await query.CountAsync();
        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalCount);
    }

    public async Task<ApplicationRequest> UpdateAsync(ApplicationRequest application)
    {
        application.UpdatedAt = DateTime.UtcNow;
        context.ApplicationRequests.Update(application);
        await context.SaveChangesAsync();

        return application;
    }

    public async Task<List<ApplicationRequest>> GetUnprocessedApplicationsAsync()
    {
        return await context.ApplicationRequests
            .Where(a => a.Status == ApplicationStatus.New
                        && (!a.IsTelegramNotificationSent || !a.IsBitrixSent || !a.IsEmailSent))
            .OrderBy(a => a.CreatedAt)
            .ToListAsync();
    }
}
