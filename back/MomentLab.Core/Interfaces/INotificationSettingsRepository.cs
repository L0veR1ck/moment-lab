using MomentLab.Core.Entities;

namespace MomentLab.Core.Interfaces;

public interface INotificationSettingsRepository
{
    Task<NotificationSettings> GetSettingsAsync();
    Task<NotificationSettings> UpdateSettingsAsync(NotificationSettings settings);
}
