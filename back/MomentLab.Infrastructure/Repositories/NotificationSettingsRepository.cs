using Microsoft.EntityFrameworkCore;
using MomentLab.Core.Entities;
using MomentLab.Core.Interfaces;
using MomentLab.Infrastructure.Data;

namespace MomentLab.Infrastructure.Repositories;

public class NotificationSettingsRepository(ApplicationDbContext context) : INotificationSettingsRepository
{
    public async Task<NotificationSettings> GetSettingsAsync()
    {
        // Всегда должна быть только одна запись настроек
        var settings = await context.NotificationSettings.FirstOrDefaultAsync();
        
        if (settings == null)
        {
            // Создаем настройки по умолчанию, если их нет
            settings = new NotificationSettings
            {
                Id = Guid.NewGuid(),
                IsTelegramEnabled = true,
                IsEmailEnabled = true,
                IsBitrixEnabled = true,
                UpdatedAt = DateTime.UtcNow
            };
            
            context.NotificationSettings.Add(settings);
            await context.SaveChangesAsync();
        }
        
        return settings;
    }

    public async Task<NotificationSettings> UpdateSettingsAsync(NotificationSettings settings)
    {
        settings.UpdatedAt = DateTime.UtcNow;
        context.NotificationSettings.Update(settings);
        await context.SaveChangesAsync();
        return settings;
    }
}
